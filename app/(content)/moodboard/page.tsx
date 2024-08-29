"use client";
import { useState } from "react";
import StoreItem from "@/components/store/StoreItem";
import useSWR, { mutate } from "swr";
import { StoreInfo } from "@/interface";
import MoodboardItem from "@/components/moodboard";
import { deleteMoodBoard } from "@/app/actions/moodboard";

const Moodboard = () => {
  const [shop, setShop] = useState<StoreInfo>();

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
    mutate,
  } = useSWR(
    shop ? `/api/moodboard?shop=${shop.shop}` : "/api/moodboard",
    fetcher,
  );

  const refresh = () => {
    console.log("refresh");
    mutate();
  };

  const handleItemClick = (store: StoreInfo) => {
    if (shop === store) {
      return;
    }
    setShop(store);
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
              stores.map((store: StoreInfo, index: number) => (
                <StoreItem
                  key={index}
                  name={store.name.replace(/-|\.myshopify\.com/g, "")}
                  onClick={() => handleItemClick(store)}
                  selected={shop === store}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="h-5/6 w-4/6 flex-auto">
        <div className="rounded-lg bg-white p-2 h-screen">
          <div>
            <h1 className="text-[40] font-bold text-black m-4">
              Available Moodboard {shop ? `on ${shop.name}` : ""}
            </h1>
            {!boardLoading && moodboard && moodboard.length > 0 ? (
              <MoodboardItem moodboards={moodboard} onClick={refresh} />
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
