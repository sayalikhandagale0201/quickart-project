"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useAppContext(); // ✅ AppContext

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 8)); // sirf popular 8 products
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-xl font-semibold mb-6">Popular Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const images =
            product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls.split(",")
              : [];

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg border p-4 hover:shadow-md transition flex flex-col"
            >
              {/* IMAGE */}
              <Link href={`/product/${product.id}`}>
                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                  <Image
                    src={images[0] || "/placeholder.png"}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="mt-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium line-clamp-2">
                  {product.name}
                </h3>

                {/* RATING */}
                <div className="flex items-center gap-1 text-orange-500 text-xs mt-1">
                  ★★★★☆ <span className="text-gray-500 ml-1">(4.5)</span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold text-gray-900">
                    ₹{product.offerPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="mt-3 flex gap-2">
                  {/* Buy Now -> Checkout */}
                  <Link
                    href={`/checkout?mode=buyNow&productId=${product.id}`}
                    className="flex-1 text-center text-xs px-4 py-1.5 border rounded hover:bg-orange-100"
                  >
                    Buy Now
                  </Link>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex-1 text-center text-xs px-4 py-1.5 border rounded bg-orange-600 text-white hover:bg-orange-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 text-sm mt-6">No products available</p>
      )}
    </section>
  );
};

export default HomeProducts;
