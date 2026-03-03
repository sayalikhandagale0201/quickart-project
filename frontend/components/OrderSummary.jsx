'use client'
import { useAppContext } from "@/context/AppContext";

const OrderSummary = () => {

  const { currency, getCartCount, getCartAmount, router } = useAppContext();

  return (
    <div className="w-full md:w-96 bg-gray-100 p-5 rounded">
      <h2 className="text-xl font-semibold text-gray-700">
        Cart Summary
      </h2>

      <hr className="my-4" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <p>Items</p>
          <p>{getCartCount()}</p>
        </div>

        <div className="flex justify-between font-medium">
          <p>Total Amount</p>
          <p>{currency}{getCartAmount()}</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="w-full mt-5 bg-orange-600 text-white py-3 rounded hover:bg-orange-700"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
