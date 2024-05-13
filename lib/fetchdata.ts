export const fetchdata = async (
  store: string,
  accessToken: string,
  query: any,
) => {
  const body = JSON.stringify(query);
  const apiUrl = `${store}/admin/api/${process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION}/graphql.json`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": `${accessToken}`,
    }),
    body: body,
  });

  if (!response.ok) {
    return { error: "Not Found" };
  }
  return await response.json();
};
