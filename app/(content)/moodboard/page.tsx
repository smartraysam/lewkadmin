"use client";
import { useState } from "react";
import { Alert, Stack, TextField } from "@mui/material";
import StoreItem from "@/components/store/StoreItem";
import useSWR from "swr";
import { SessionData } from "@/interface";
import MoodboardItem from "@/components/moodboard";

const Moodboard = () => {
  const [shop, setShop] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: stores,
    isLoading: storeLoading,
    error: storesError,
  } = useSWR("/api/store", fetcher);

  const {
    data: moodboard,
    isLoading: boardLoading,
    error: moodboardError,
  } = useSWR(shop ? `/api/moodboard?shop=${shop}` : "/api/moodboard", fetcher);

  const handleItemClick = (store: SessionData) => {
    if (shop === store.shop) {
      return;
    }
    setShop(store.shop);
  };
  return (
    <div className="mt-5 flex h-[500] gap-2">
      <div className="w-1/6 flex-none ">
        <div className="flex-colrounded-sm h-full border border-white bg-white">
          <div className="border-b-2 border-gray-400 p-4">
            <h4 className="b-4 font-bold">Available Stores</h4>
          </div>

          <div className="overflow-y-scroll">
            {!storeLoading &&
              stores &&
              stores.length > 0 &&
              stores.map((store: SessionData, index: number) => (
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
      <div className="h-5/6 w-4/6 flex-auto">
        <div className="rounded-lg bg-white p-2 h-screen">
          <div>
            <h1 className="text-[40] font-bold text-black m-4">
              Available Moodboard {shop ? `on ${shop}` : ""}
            </h1>
            {!boardLoading && moodboard && moodboard.length > 0 ? (
              <MoodboardItem moodboards={moodboard} />
            ) : (
              <div className="text-center h-screen mt-52">
                {boardLoading
                  ? "Loading..."
                  : moodboardError
                    ? "Error loading data"
                    : "No pre-made moodboard found"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moodboard;
