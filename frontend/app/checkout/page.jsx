"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const CheckoutPage = () => {

  const {
    cartItems,
    getCartAmount,
    currency,
    router,
    products,
  } = useAppContext();

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ================= FETCH ADDRESSES =================
  useEffect(() => {
    fetch("http://localhost:8080/api/addresses")
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(err => console.log(err));
  }, []);

  // ================= FETCH BUY NOW PRODUCT =================
  useEffect(() => {
    if (mode === "buyNow" && productId) {
      fetch(`http://localhost:8080/api/products/${productId}`)
        .then(res => res.json())
        .then(data => setBuyNowProduct(data));
    }
  }, [mode, productId]);

  // ================= DELETE ADDRESS =================
  const deleteAddress = async (id) => {
    const ok = window.confirm("Delete this address?");
    if (!ok) return;

    await fetch(`http://localhost:8080/api/addresses/${id}`, {
      method: "DELETE",
    });

    setAddresses(prev => prev.filter(a => a.id !== id));

    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  // ================= PLACE ORDER =================
  const placeOrder = async () => {

    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    let orderItems = [];
    let totalAmount = 0;

    if (mode === "buyNow" && buyNowProduct) {
      orderItems = [
        { productId: buyNowProduct.id, quantity: 1 },
      ];
      totalAmount = buyNowProduct.offerPrice;
    } else {
      orderItems = Object.keys(cartItems).map(id => ({
        productId: Number(id),
        quantity: cartItems[id],
      }));
      totalAmount = getCartAmount();
    }

    await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        addressId: selectedAddressId,
        items: orderItems,
        totalAmount,
        paymentMethod,
      }),
    });

    // ✅ CONFIRMATION MESSAGE
    alert("✅ Your order has been confirmed!");

    router.push("/order-placed");
  };

  // ================= ONLINE PAYMENT =================
  const handleOnlinePayment = async () => {

    const totalAmount =
      mode === "buyNow" && buyNowProduct
        ? buyNowProduct.offerPrice
        : getCartAmount();

    const res = await fetch(
      "http://localhost:8080/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      }
    );

    const data = await res.json();

    const options = {
      key: "rzp_test_S9dHIPf99DKpjM",
      amount: data.amount,
      currency: "INR",
      name: "QuickCart",
      order_id: data.id,
      handler: async () => {
        await placeOrder();
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 grid md:grid-cols-2 gap-10">

        {/* ================= ADDRESS ================= */}
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Select Address</h2>
            <button
              onClick={() => router.push("/add-address?redirect=checkout")}
              className="text-orange-600"
            >
              + Add New
            </button>
          </div>

          {addresses.length === 0 && (
            <p className="text-gray-500">No address found</p>
          )}

          {addresses.map(addr => (
            <div
              key={addr.id}
              className={`flex justify-between border p-4 mb-3 rounded
              ${selectedAddressId === addr.id
                  ? "border-orange-600 bg-orange-50"
                  : ""}`}
            >
              <label className="flex gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="accent-orange-600 mt-1"
                />

                <div>
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="text-sm">
                    {addr.area}, {addr.city}, {addr.state}
                  </p>
                  <p className="text-sm">{addr.pincode}</p>
                </div>
              </label>

              <button
                onClick={() => deleteAddress(addr.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="border p-5 rounded">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {mode === "buyNow" && buyNowProduct ? (
            <div className="border p-4 mb-3 rounded">
              <p>{buyNowProduct.title}</p>
              <p>Price: {currency}{buyNowProduct.offerPrice}</p>
              <p>Qty: 1</p>
            </div>
          ) : (
            Object.keys(cartItems).map(id => {
              const product = products.find(p => p.id == id);
              if (!product) return null;

              return (
                <div key={id} className="border p-4 mb-2 rounded">
                  <p>{product.title}</p>
                  <p>Price: {currency}{product.offerPrice}</p>
                  <p>Qty: {cartItems[id]}</p>
                </div>
              );
            })
          )}

          <div className="flex justify-between font-medium mt-4">
            <p>Total</p>
            <p>
              {currency}
              {mode === "buyNow" && buyNowProduct
                ? buyNowProduct.offerPrice
                : getCartAmount()}
            </p>
          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-4">
            <div
              onClick={() => setPaymentMethod("COD")}
              className={`border p-3 mb-2 cursor-pointer
              ${paymentMethod === "COD"
                  ? "border-orange-600 bg-orange-50"
                  : ""}`}
            >
              Cash On Delivery
            </div>

            <div
              onClick={() => setPaymentMethod("ONLINE")}
              className={`border p-3 cursor-pointer
              ${paymentMethod === "ONLINE"
                  ? "border-orange-600 bg-orange-50"
                  : ""}`}
            >
              Online Payment
            </div>
          </div>

          <button
            onClick={() =>
              paymentMethod === "COD"
                ? placeOrder()
                : handleOnlinePayment()
            }
            className="w-full bg-orange-600 text-white py-3 rounded mt-4"
          >
            Place Order
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
