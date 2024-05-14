/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowId,
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
  count: number;
  onValueChange: (value: string) => void;
}

export function ProductsTable({
  shop,
  count,
  onValueChange,
}: Props): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState("");
  const [prev, setPrev] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<GridRowId[]>([]);
  useEffect(() => {
    if (!shop) {
      return;
    }
    setIsLoading(true);
    fetchData();
  }, [shop]);

  useEffect(() => {
    if (selected.length > 0) {
      for (const id of selected) {
        const product = products.find((p) => p.id === id);
        if (product) {
          onValueChange(product.featureImage);
        }
      }
    }
  }, [selected]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/products?query=list&pageinfo=${pageInfo}&shop=${shop}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      if (data.nextPage != undefined) {
        setPageInfo(data.nextPage.page_info);
      }
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <div style={{ height: "800px", width: "95%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={count}
        onPaginationModelChange={(newPaginationModel) => {
          if (newPaginationModel.page < prev) {
            setPageInfo("");
          } else {
            setIsLoading(true);
            fetchData();
          }
          setPrev(newPaginationModel.page);
        }}
        loading={isLoading}
        // getRowHeight={() => "auto"}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 50, page: 0 },
          },
        }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          if (ids.length > 4) {
            return;
          }
          setSelected(ids);
        }}
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
