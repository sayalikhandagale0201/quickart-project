"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:8080/api/products/search?q=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Search results for "{query}"
      </h1>

      {products.length === 0 && (
        <p>No products found</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="border p-3 rounded hover:shadow">
              <Image
                src={product.imageUrls?.split(",")[0]}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover"
              />
              <h3 className="font-medium mt-2">{product.name}</h3>
              <p className="text-orange-600">₹{product.offerPrice}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
