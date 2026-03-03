'use client'
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {

  const { addToCart } = useAppContext();
  const router = useRouter();

  const images = product.imageUrls
    ? product.imageUrls.split(",")
    : [];

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      router.push(`/checkout?mode=buyNow&productId=${product.id}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">

      {/* IMAGE */}
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        ) : (
          <span className="text-sm text-gray-400">No Image</span>
        )}
      </div>

      {/* NAME */}
      <h3 className="mt-3 font-medium text-sm truncate">
        {product.name}
      </h3>

      {/* PRICE */}
      <p className="text-orange-600 font-semibold mt-1">
        ₹{product.offerPrice}
      </p>

      {/* BUTTONS */}
      <div className="mt-3 flex flex-col gap-2">

        {/* ADD TO CART */}
        <button
          onClick={() => addToCart(product.id)}
          className="w-full border border-orange-600 text-orange-600 py-2 rounded hover:bg-orange-50"
        >
          Add to Cart
        </button>

        {/* BUY NOW */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-orange-600 text-orange py-2 rounded hover:bg-orange-700"
        >
          Buy Now
        </button>

      </div>

    </div>
  );
};

export default ProductCard;
