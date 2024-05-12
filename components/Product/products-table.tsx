"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import products from "@/data/products/data";

const columns: GridColDef[] = [
  { field: "product", headerName: "Product", width: 150 },
  {
    field: "description",
    headerName: "Description",
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

const rows = products;

export function ProductsTable() {
  return (
    <div style={{ height: "800px", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100, 200]}
        checkboxSelection
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
