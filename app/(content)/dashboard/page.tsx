"use client";

import Image from "next/image";
import moodboard from "@/data/moodboard/data";
import { Button, Stack, Typography } from "@mui/material";
import {
  DownloadOutlined,
  PlusOneOutlined,
  UploadFile,
} from "@mui/icons-material";
import { Product, ProductsTable } from "@/components/Product/products-table";
import { ProductFilters } from "@/components/Product/products-filters";
import products from "@/data/products/data";

const Dashboard = () => {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedProducts = applyPagination(products, page, rowsPerPage);
  return (
    <div className="mt-5 flex h-[500] gap-2">
      <div className="w-1/6 flex-none ">
        <div className="flex-colrounded-sm h-full border border-white bg-white">
          <div className="border-b-2 border-gray-400 p-4">
            <h4 className="b-4 font-bold">Available Stores</h4>
          </div>

          <div className="overflow-y-scroll">
            <div className="mx-1 my-2 rounded-md border border-gray-200 hover:cursor-pointer">
              <p className="p-2">Bellisima</p>
            </div>

            <div className="m-1 rounded-md border border-gray-200">
              <p className="p-2">Woven</p>
            </div>

            <div className="m-1 rounded-md border border-gray-200">
              <p className="p-2">Lewk&apos;s Store</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-3/4 w-5/6 flex-auto">
        <div className="rounded-lg bg-white p-2">
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
                <h1 className="text-[40] font-bold text-black m-4">
                  Available Products
                </h1>
              </Stack>
            </Stack>
            <ProductFilters />
            <ProductsTable
              count={paginatedProducts.length}
              page={page}
              rows={paginatedProducts}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </div>
      </div>
      <div className="h-full w-2/6 flex-auto ">
        <div className="grid h-fit grid-cols-2 gap-2 rounded-md border-2 border-white bg-white">
          {moodboard[0].data.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={150}
              height={150}
              alt="moodboard"
              className="m-1 rounded-md"
            />
          ))}
        </div>
        <div className="m-2 flex w-full place-content-center">
          <button className="mt-2 h-11 w-1/2 place-content-center rounded-lg bg-blue-700 text-white hover:bg-blue-400">
            Save Moodboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function applyPagination(
  rows: Product[],
  page: number,
  rowsPerPage: number,
): Product[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
