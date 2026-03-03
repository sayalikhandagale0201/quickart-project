'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const Orders = () => {
  const { currency } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders/admin");
      const data = await res.json();

      console.log("API Response:", data); // Debugging

      // Handle different types of response safely
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      <div className="md:p-10 p-4 space-y-5">
        <h2 className="text-lg font-medium">Orders</h2>
        <div className="max-w-4xl rounded-md">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  
                  <p className="flex flex-col gap-3">
                    <span className="font-medium">
                      {Array.isArray(order.items)
                        ? order.items
                            .map(
                              (item) =>
                                `${item.product.name} x ${item.quantity}`
                            )
                            .join(", ")
                        : "No items"}
                    </span>
                    <span>Items : {Array.isArray(order.items) ? order.items.length : 0}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">{order.address?.fullName || "-"}</span>
                    <br />
                    <span>{order.address?.area || "-"}</span>
                    <br />
                    <span>{`${order.address?.city || "-"}, ${order.address?.state || "-"}`}</span>
                    <br />
                    <span>{order.address?.phoneNumber || "-"}</span>
                  </p>
                </div>
                <p className="font-medium my-auto">{currency}{order.amount || 0}</p>
                <div>
                  <p className="flex flex-col">
                    <span>Method : COD</span>
                    <span>
                      Date :{" "}
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "-"}
                    </span>
                    <span>Payment : Pending</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-5">No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
