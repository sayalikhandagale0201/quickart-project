"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const MyOrders = () => {

  const router = useRouter();
  const { currency } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const userId = user?.id;

  useEffect(() => {

    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/orders/user/${userId}`
        );
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

  }, [userId, router]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">
        <h2 className="text-xl font-semibold mb-6">My Orders</h2>

        {orders.length === 0 && (
          <p className="text-center text-gray-500">
            You have not placed any orders yet.
          </p>
        )}

        <div className="max-w-4xl space-y-4">

          {orders.map((order) => (

            <div
              key={order.id}
              className="flex flex-col md:flex-row gap-5 justify-between p-5 border rounded-md"
            >

              {/* ITEMS */}
              <div className="flex-1 max-w-80">
                <p className="font-medium mb-2">
                  {order.items?.map(
                    item =>
                      `${item.product?.name} x ${item.quantity}`
                  ).join(", ")}
                </p>

                <span className="text-sm text-gray-600">
                  Items : {order.items?.length || 0}
                </span>
              </div>

              {/* ADDRESS */}
              <div>
                <p>
                  <span className="font-medium">
                    {order.address?.fullName}
                  </span><br />
                  {order.address?.area}<br />
                  {order.address?.city}, {order.address?.state}<br />
                  {order.address?.phoneNumber}
                </p>
              </div>

              {/* PRICE */}
              <p className="font-medium my-auto">
                {currency}{order.amount}
              </p>

              {/* META */}
              <div className="text-sm">
                <p>Method : {order.paymentMethod}</p>
                <p>
                  Date :{" "}
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : "-"}
                </p>
                <p>Status : {order.status}</p>

                {/* TRACK BUTTON */}
                <button
                  onClick={() => router.push(`/track/${order.id}`)}
                  className="mt-2 text-orange-600 underline"
                >
                  Track Order
                </button>
              </div>

            </div>

          ))}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
