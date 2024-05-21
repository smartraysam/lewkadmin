/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Product } from "@/interface";
import Image from "next/image";
import { Link } from "@mui/material";

function ExpandableCell({ value }: GridRenderCellParams) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      {expanded ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: value.slice(0, 200) }} />
      )}
      {value.length > 200 && (
        <Link
          type="button"
          component="button"
          className="text-blue-400 cursor-pointer"
          sx={{ fontSize: "8px" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "view less" : "view more"}
        </Link>
      )}
    </div>
  );
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Product", width: 150 },
  {
    field: "description",
    headerName: "Description",
    renderCell: (params: GridRenderCellParams) => (
      <ExpandableCell {...params} />
    ),
    sortable: false,
    flex: 1,
  },
  {
    field: "image",
    headerName: "Feature Image",
    renderCell: (params) => (
      <Image
        alt="Image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "180px" }}
        src={params.value}
      />
    ),
    sortable: false,
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Qty.",
    type: "number",
    width: 60,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 120,
  },
];

interface Props {
  shop?: string;
  onValueChange: (value: Product, isSelected: boolean) => void;
  selectedData: Product[];
}

export function ProductsTable({
  shop,
  onValueChange,
  selectedData,
}: Props): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<string | null>("");
  const [prev, setPrev] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  let store = "";
  useEffect(() => {
    if (shop) {
      setIsLoading(true);
      setProducts([]);
      setPageInfo("");
      store = shop;
      fetchData(store, "");
    }
  }, [shop]);

  useEffect(() => {
    if (selectedData.length == 0) {
      setRowSelectionModel([]);
    }
  }, [selectedData]);

  const fetchData = async (store: string | undefined, page: string | null) => {
    try {
      if (page === null) {
        setIsLoading(false);
        return;
      }
      const response = await fetch(
        `/api/products?pageinfo=${page}&shop=${store}`,
      );
      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      if (data.nextPage != undefined) {
        setPageInfo(data.nextPage.page_info);
      } else {
        setPageInfo(null);
      }
      setIsLoading(false);
    } catch (error) {}
  };
  const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 10 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);
  return (
    <div style={{ height: "750px", width: "100%" }}>
      <DataGrid
        getEstimatedRowHeight={() => 100}
        getRowHeight={() => "auto"}
        rows={products}
        columns={columns}
        getRowSpacing={getRowSpacing}
        pagination
        paginationMode="client"
        onPaginationModelChange={(newPaginationModel) => {
          if (newPaginationModel.page < prev) {
            setPageInfo(null);
          } else {
            setIsLoading(true);
            fetchData(shop, pageInfo);
          }
          setPrev(newPaginationModel.page);
        }}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 50, page: 0 },
          },
        }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          const newSelectionSet = new Set(newRowSelectionModel);
          const oldSelectionSet = new Set(rowSelectionModel);

          const added = newRowSelectionModel.filter(
            (x) => !oldSelectionSet.has(x),
          );
          const removed = rowSelectionModel.filter(
            (x) => !newSelectionSet.has(x),
          );

          added.forEach((id) => {
            const product = products.find((p) => p.id === id);
            if (product) {
              onValueChange(product, true);
            }
          });

          removed.forEach((id) => {
            const product = products.find((p) => p.id === id);
            if (product) {
              onValueChange(product, false);
            }
          });

          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
}
