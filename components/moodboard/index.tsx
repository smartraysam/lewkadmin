"use client";
import React, { FC, use } from "react";
import Image from "next/image";
import { Product } from "@/interface";
import { DeleteOutline } from "@mui/icons-material";
import { deleteMoodBoard } from "@/app/actions/moodboard";
import { Bounce, toast } from "react-toastify";

interface Props {
  moodboards: any;
  onClick: () => void;
}

const MoodboardItem: FC<Props> = ({ moodboards, onClick }) => {
  const handleDelete = async (id: string) => {
    const response = await deleteMoodBoard(id);
    if (response.response === "success") {
      onClick();
      toast.success("Moodboard deleted successfully.", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Bounce,
      });
    } else {
      toast.error("Unable to delete moodboard.");
    }
  };
  return (
    <div className="overflow-y-auto h-screen pb-60">
      <div className="grid grid-cols-4 gap-2">
        {moodboards.map(
          (
            moodboard: { product_items: string; name: string; id: string },
            moodboardIndex: number,
          ) => {
            const id = moodboard.id;
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
                    <div className="w-fit">
                      <button
                        onClick={() => {
                          toast.info("Deleting moodbaord. Please wait", {
                            position: "top-right",
                            autoClose: 500,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: true,
                            transition: Bounce,
                          });
                          handleDelete(id);
                        }}
                      >
                        <DeleteOutline />
                      </button>
                    </div>
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
