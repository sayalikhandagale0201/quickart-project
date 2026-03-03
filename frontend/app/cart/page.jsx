'use client'
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const CartPage = () => {

  const {
    products,
    cartItems,
    updateCartQuantity,
    getCartAmount,
    currency,
    router
  } = useAppContext();

  const cartProducts = products.filter(p => cartItems[p.id]);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

        {cartProducts.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartProducts.map(product => {
              const images = product.imageUrls?.split(",") || [];
              const qty = cartItems[product.id];

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-6 border p-4 rounded"
                >
                  {/* IMAGE */}
                  <Image
                    src={images[0]}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-orange-600 font-semibold">
                      {currency}{product.offerPrice}
                    </p>

                    {/* QTY */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(product.id, qty - 1)
                        }
                        className="border px-2"
                      >
                        −
                      </button>

                      <span>{qty}</span>

                      <button
                        onClick={() =>
                          updateCartQuantity(product.id, qty + 1)
                        }
                        className="border px-2"
                      >
                        +
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => updateCartQuantity(product.id, 0)}
                        className="text-red-500 text-sm ml-4"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* ITEM TOTAL */}
                  <p className="font-medium">
                    {currency}{product.offerPrice * qty}
                  </p>
                </div>
              );
            })}

            {/* SUBTOTAL */}
            <div className="flex justify-end border-t pt-6">
              <div className="w-72 space-y-3">
                <div className="flex justify-between font-medium text-lg">
                  <p>Subtotal</p>
                  <p>{currency}{getCartAmount()}</p>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-orange-600 text-white py-3 rounded"
                >
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
