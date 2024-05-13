import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const shop = request.nextUrl.searchParams.get("shop");
    const accesstoken = request.nextUrl.searchParams.get("accesstoken");
    if (!shop || !accesstoken) {
      return NextResponse.json(
        { error: `shop and accesstoken are required.` },
        { status: 400 },
      );
    }
    const results = {};
    return NextResponse.json(results, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Unable to perform search` },
      { status: 400 },
    );
  }
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export const getAllProducts = async (
  cursor: string | null = null,
  allProducts: any = [],
  admin: any,
  shop: string,
): Promise<any> => {
  const response = await admin.graphql(
    `
      #graphql
      query getProduct {
        products(first: 250, after: ${cursor ? `"${cursor}"` : null}, query: "inventory_total>0") {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            node {
              id
              title
              description
              handle
              tags
              vendor
              status
              productType
              featuredImage {
                url
              }   
            }
          }
        }
      }
    `,
  );

  const { data } = await response.json();
  const { edges, pageInfo }: { edges: any; pageInfo: PageInfo } = data.products;
  edges.forEach(async (edge: any) => {
    const variants = edge.node.variants.edges;
    const arrayVariants: any[] = [];
    variants.forEach((variant: any) => {
      const node = variant.node;
      const [color, size] = node.title.split(" / ");
      arrayVariants.push({
        id: node.id,
        color: color,
        size: size,
        price: node.price,
        image: node?.image === null ? "" : node.image.url,
        variant_details: `Colour- ${color},Size- ${size}`,
      });
    });
    const product = {
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      tags: edge.node.tags.toString(),
      priceRange: {
        maxVariantPrice: {
          amount: edge.node.priceRange.maxVariantPrice.amount,
        },
      },
      featureImage: {
        url:
          edge.node.featuredImage === null ? "" : edge.node.featuredImage.url,
      },
      published: edge.node.status == "active" ? true : false,
      vendor: edge.node.vendor,
      handle: edge.node.handle,
      productType: edge.node.productType,
      variants: arrayVariants,
    };
    allProducts.push(product);
  });

  if (pageInfo.hasNextPage === true && pageInfo.endCursor !== null) {
    return await getAllProducts(
      pageInfo.endCursor,
      [...allProducts],
      admin,
      shop,
    );
  } else {
    return true;
  }
};
