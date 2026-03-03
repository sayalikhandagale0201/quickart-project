"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useAppContext();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        // 👇 imageUrls string ko array banana
        if (data.imageUrls) {
          const imgs = data.imageUrls.split(",");
          setActiveImage(imgs[0]);
        }
      });
  }, [id]);

  if (!product) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const images = product.imageUrls
    ? product.imageUrls.split(",")
    : [];

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT - IMAGES */}
        <div>
          <div className="border rounded-lg bg-gray-100 flex items-center justify-center h-96">
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain"
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 border rounded cursor-pointer flex items-center justify-center
                ${activeImage === img ? "border-orange-600" : ""}`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>

          <p className="text-3xl text-orange-600 font-bold mt-4">
            ₹{product.offerPrice}
          </p>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product.id)}
            className="mt-6 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
