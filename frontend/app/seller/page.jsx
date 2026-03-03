"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { assets } from "@/assets/assets";

const AddProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // 👈 EDIT ke liye

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 EDIT MODE: product ka data lao
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await fetch(
        `http://localhost:8080/api/products/${productId}`
      );
      const data = await res.json();

      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setOfferPrice(data.offerPrice);
      // images edit abhi skip (next step me kar sakte hain)
    };

    fetchProduct();
  }, [productId]);

  // 🔹 ADD / UPDATE submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    try {
      const url = productId
        ? `http://localhost:8080/api/products/${productId}`
        : "http://localhost:8080/api/products";

      const method = productId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      alert(productId ? "Product updated successfully" : "Product added successfully");
      router.push("/seller/product-list");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* IMAGES */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {[...Array(1)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  id={`image${index}`}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                  className="max-w-24 cursor-pointer border rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            required
            className="border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            rows={4}
            required
            className="border px-3 py-2 rounded resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* CATEGORY & PRICES */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="font-medium">Category</label>
            <select
              className="border px-3 py-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Earphone</option>
              <option>Headphone</option>
              <option>Watch</option>
              <option>Smartphone</option>
              <option>Laptop</option>
              <option>Camera</option>
              <option>Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="font-medium">Price</label>
            <input
              type="number"
              required
              className="border px-3 py-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="font-medium">Offer Price</label>
            <input
              type="number"
              required
              className="border px-3 py-2 rounded"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : productId
            ? "UPDATE PRODUCT"
            : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
