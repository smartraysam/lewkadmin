"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import moodboard from "@/data/moodboard/data";
import { Stack } from "@mui/material";
import { ProductsTable } from "@/components/Product/products-table";
import { TagsInput } from "react-tag-input-component";
import StoreItem from "@/components/store/StoreItem";
import { SessionData } from "@/interface";

const Dashboard = () => {
  const [tags, setTags] = useState<string[]>(["Date Night"]);
  const [stores, setStores] = useState<SessionData[]>([]);
  const [shop, setShop] = useState<string>("");
  const [productCnt, setProductCnt] = useState<number>(0);
  const [images, setImages] = useState<string[]>(moodboard[0].data);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/store");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStores();
  }, []);

  const handleItemClick = (store: SessionData) => {
    setShop(store.shop);
    fetchProdCnt(store.shop);
  };

  const fetchProdCnt = async (shop: string) => {
    try {
      const response = await fetch(`/api/products?query=count&shop=${shop}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProductCnt(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleImageValueChange = (value: string) => {
    if (images.length === 4) {
      setImages([]);
    }
    if (images.includes(value)) {
      return;
    }
    setImages((prev) => [...prev, value]);
  };

  return (
    <div className="mt-5 flex h-[500] gap-2">
      <div className="w-1/6 flex-none ">
        <div className="flex-colrounded-sm h-full border border-white bg-white">
          <div className="border-b-2 border-gray-400 p-4">
            <h4 className="b-4 font-bold">Available Stores</h4>
          </div>

          <div className="overflow-y-scroll">
            {stores.map((store, index) => (
              <StoreItem
                key={index}
                name={store.shop.replace(/-|\.myshopify\.com/g, "")}
                onClick={() => handleItemClick(store)}
                selected={shop === store.shop}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-5/6 w-5/6 flex-auto">
        <div className="rounded-lg bg-white p-2">
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
                <h1 className="text-[40] font-bold text-black m-4">
                  Available Products on {shop}
                </h1>
              </Stack>
            </Stack>
            <ProductsTable
              shop={shop}
              count={productCnt}
              onValueChange={handleImageValueChange}
            />
          </Stack>
        </div>
      </div>
      <div className="h-full w-2/6 flex-auto ">
        <div className="grid h-fit grid-cols-2 gap-2 rounded-md border-2 border-white bg-white">
          {images.map((image, index) => (
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
              value={tags}
              onChange={setTags}
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
