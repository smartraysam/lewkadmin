"use client";

import Image from "next/image";
import moodboard from "@/data/moodboard/data";
import { Stack } from "@mui/material";

import { ProductsTable } from "@/components/Product/products-table";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";

const Dashboard = () => {
  const [selected, setSelected] = useState(["Date Night"]);

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
      <div className="h-5/6 w-5/6 flex-auto">
        <div className="rounded-lg bg-white p-2">
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
                <h1 className="text-[40] font-bold text-black m-4">
                  Available Products
                </h1>
              </Stack>
            </Stack>
            <ProductsTable />
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
        <div className="m-2 w-full place-content-center">
          <div className="mt-4">
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="tags"
              placeHolder="Tag the moodboard"
            />
            <em className="text-center italic text-xs">
              press enter or comma to add new tag
            </em>
          </div>
          <div className="w-full mt-2">
            <button className="mt-2 h-11 w-full place-content-center rounded-lg bg-blue-700 text-white hover:bg-blue-400">
              Save Moodboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
