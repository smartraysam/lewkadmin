"use client";
import React, { FC, use } from "react";
import Image from "next/image";
import { Product } from "@/interface";
import { Delete, DeleteOutline } from "@mui/icons-material";

interface Props {
  moodboards: any;
}

const MoodboardItem: FC<Props> = ({ moodboards }) => {
  return (
    <div className="overflow-y-auto h-screen pb-60">
      <div className="grid grid-cols-4 gap-2">
        {moodboards.map(
          (
            moodboard: { product_items: string; name: string },
            moodboardIndex: number,
          ) => {
            const productItems = JSON.parse(
              moodboard.product_items,
            ) as Product[];
            return (
              <React.Fragment key={moodboardIndex}>
                <div className=" border border-gray-400 rounded-lg">
                  <div className="grid h-fit grid-cols-2 gap-2 bg-white border border-gray-300 rounded-lg m-2 w-fit">
                    {productItems &&
                      productItems.map(
                        (item: { image: string }, itemIndex: number) => (
                          <Image
                            key={itemIndex}
                            src={item.image}
                            width={0}
                            height={10}
                            alt="moodboard"
                            className="m-1 rounded-sm h-36 w-auto"
                          />
                        ),
                      )}
                  </div>
                  <div className="p-2 flex">
                    <p className="text-xs w-full">
                      <span className="font-bold"> Tag:</span> {moodboard.name}
                    </p>
                    {/* <div className="w-fit">
                    <DeleteOutline />
                  </div> */}
                  </div>
                </div>
              </React.Fragment>
            );
          },
        )}
      </div>
    </div>
  );
};

export default MoodboardItem;
