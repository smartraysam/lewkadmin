"use client";
import { useState } from "react";
import Image from "next/image";
import moodboard from "@/data/moodboard/data";
import { Alert, Stack, TextField } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import StoreItem from "@/components/store/StoreItem";
import { Moodboard, Product, SessionData, StoreInfo } from "@/interface";
import useSWR from "swr";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Form, Formik } from "formik";
import { saveMoodBoard } from "@/app/actions/moodboard";
import { ProductsTable } from "@/components/product/productstable";
import { Store } from "@mui/x-data-grid/utils/Store";

const boardSchema = z.object({
  tags: z
    .string()
    .array()
    .nonempty("Tag is required")
    .min(1, "Minimum of 1 tags"),
  name: z.string().min(3, "Name must be at least 6 characters"),
});
const initialState = {
  tags: ["Party"],
  name: "",
  product_items: [],
  shop: "",
};
const Dashboard = () => {
  const [tags, setTags] = useState<string[]>(["Party"]);
  const [shop, setShop] = useState<StoreInfo>();
  const [images, setImages] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [response, setResponse] = useState<any>({
    status: "",
    message: "",
  });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: stores, error: storesError } = useSWR("/api/store", fetcher);
  const handleItemClick = (store: StoreInfo) => {
    if (shop === store) {
      return;
    }
    setShop(store);
  };
  const handleImageValueChange = (value: Product, isSelected: boolean) => {
    if (isSelected) {
      if (!images.includes(value.image)) {
        setProducts((prev) => [...prev, value]);
        setImages((prev) => [...prev, value.image]);
      }
    } else {
      setProducts((prev) => prev.filter((product) => product.id !== value.id));
      setImages((prev) => prev.filter((image) => image !== value.image));
    }
  };
  const handleSubmit = async (values: Moodboard, { resetForm }: any) => {
    if (!shop || products.length === 0) {
      setResponse({ status: "error", message: "Select Products" });
      return;
    }
    const formData = {
      tags: tags,
      name: values.name,
      product_items: products,
      shop: shop.shop,
    };
    try {
      const data = await saveMoodBoard(formData);
      setImages([]);
      setProducts([]);
      setTags(["Party"]);
      resetForm({
        tags: [],
        name: "",
        product_items: [],
        shop: "",
      });
      if (data.response === "error") {
        setResponse({ status: "error", message: "Error saving moodboard." });
      } else {
        setResponse({
          status: "success",
          message: "Moodboard saved successfully.",
        });
        setTimeout(() => {
          setResponse({ status: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      setResponse({ status: "error", message: "Error saving moodboard." });
    }
  };

  return (
    <div className="flex min-h-full gap-2">
      <div className="w-[250px] flex-none ">
        <div className="flex-colrounded-sm h-full border border-white bg-white">
          <div className="border-b-2 border-gray-400 p-4">
            <h4 className="b-4 font-bold">Available Stores</h4>
          </div>

          <div className="overflow-y-scroll">
            {stores &&
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
      <div className="w-4/6 flex-auto">
        <div className="rounded-lg h-full bg-white">
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
                <h1 className="text-[40] font-bold text-black m-4">
                  Available Products {shop ? `on ${shop.name}` : ""}
                </h1>
              </Stack>
            </Stack>
            <ProductsTable
              shop={shop}
              onValueChange={handleImageValueChange}
              selectedData={products}
            />
          </Stack>
        </div>
      </div>
      <div className="h-full w-[250px] flex-auto ">
        <div className="grid h-fit grid-cols-2 gap-2 rounded-md border-2 border-white bg-white">
          {images.length === 0
            ? moodboard[0].data.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  width={150}
                  height={150}
                  alt="moodboard"
                  className="m-1 rounded-md"
                />
              ))
            : images.map((image, index) => (
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
          {response.status && (
            <Alert severity={response.status}>{response.message}.</Alert>
          )}
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(boardSchema)}
            validateOnBlur
            isInitialValid={false}
          >
            {({
              handleChange,
              handleBlur,
              errors,
              values,
              isSubmitting,
              touched,
              isValid,
            }) => (
              <Form>
                <div className="mt-4">
                  <label htmlFor="moodboard_name">Moodboard Label</label>
                  <TextField
                    id="name"
                    name="name"
                    className="w-full h-12 border border-gray-400 rounded-lg p-2"
                    variant="outlined"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values?.name}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="mt-4">
                  <TagsInput
                    onChange={setTags}
                    name="tags"
                    onBlur={handleBlur("tags")}
                    value={tags}
                    placeHolder="Tag the moodboard"
                  />
                  <em className="text-center italic text-xs">
                    press enter to add new tag
                  </em>
                  {touched.tags && errors.tags && (
                    <p className="text-xs text-red-500">{errors.tags}</p>
                  )}
                </div>
                <div className="w-full mt-2">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`mt-2 h-11 w-full place-content-center rounded-lg text-white  ${!isValid || isSubmitting ? "cursor-not-allowed bg-gray-400" : " bg-blue-700 hover:bg-blue-400"}`}
                  >
                    {isSubmitting ? "Please wait..." : " Save Moodboard "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
