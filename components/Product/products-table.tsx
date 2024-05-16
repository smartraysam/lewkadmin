/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Product } from "@/interface";

const columns: GridColDef[] = [
  { field: "product", headerName: "Product", width: 150 },
  {
    field: "description",
    headerName: "Description",
    renderCell: (params) => (
      <div
        dangerouslySetInnerHTML={{
          __html: params.value,
        }}
      />
    ),
    sortable: false,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Inventory",
    type: "number",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
];

interface Props {
  shop?: string;
  onValueChange: (value: Product) => void;
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

  useEffect(() => {
    if (rowSelectionModel.length > 0) {
      for (const id of rowSelectionModel) {
        const product = products.find((p) => p.id === id);
        if (product) {
          onValueChange(product);
        }
      }
    }
  }, [rowSelectionModel]);

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

  return (
    <div style={{ height: "750px", width: "95%" }}>
      <DataGrid
        rows={products}
        columns={columns}
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
          if (newRowSelectionModel.length > 4) {
            return;
          }
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
