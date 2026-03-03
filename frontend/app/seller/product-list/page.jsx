  "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:8080/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await fetch(`http://localhost:8080/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Products</h1>

      <div className="bg-white border rounded-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 px-4 py-3 border-b text-sm font-medium text-gray-600">
          <div className="col-span-6">Product</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* TABLE BODY */}
        {products.map((product) => {
          const images =
            product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls.split(",")
              : [];

          return (
            <div
              key={product.id}
              className="grid grid-cols-12 px-4 py-4 items-center border-b last:border-b-0 hover:bg-gray-50"
            >
              {/* PRODUCT */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                  {images.length > 0 ? (
                    <Image
                      src={images[0]}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-xs text-gray-400 flex items-center justify-center h-full">
                      No Image
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-800">
                  {product.name}
                </p>
              </div>

              {/* CATEGORY */}
              <div className="col-span-3 text-sm text-gray-600">
                {product.category}
              </div>

              {/* PRICE */}
              <div className="col-span-2 text-sm font-medium text-gray-800">
                ₹{product.offerPrice}
              </div>

              {/* ACTION */}
              <div className="col-span-1 flex justify-end gap-2">
                {/* VISIT */}
                <Link
                  href={`/product/${product.id}`}
                  className="bg-orange-500 text-white text-xs px-2 py-1 rounded hover:bg-orange-600"
                >
                  Visit
                </Link>

                {/* EDIT (FIXED) */}
                <button
                  onClick={() =>
                    router.push(`/seller?id=${product.id}`)
                  }
                  className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  Del
                </button>
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500 text-sm">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
