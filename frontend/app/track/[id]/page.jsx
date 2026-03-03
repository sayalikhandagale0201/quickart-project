"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TrackOrderPage = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/admin`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o.id == id);
        setOrder(found);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!order) return <p className="text-center mt-10">Order not found</p>;

  const steps = ["PLACED", "PACKED", "SHIPPED", "DELIVERED"];

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-6 md:px-20 py-10">

        <h2 className="text-2xl font-semibold mb-6">
          Tracking Order #{order.id}
        </h2>

        {/* STATUS BAR */}
        <div className="flex justify-between items-center max-w-3xl mx-auto mb-10">

          {steps.map((step, index) => {

            const active = steps.indexOf(order.status) >= index;

            return (
              <div key={step} className="flex flex-col items-center flex-1">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                    ${active ? "bg-orange-600" : "bg-gray-300"}`}
                >
                  {index + 1}
                </div>

                <p className="mt-2 text-sm">{step}</p>

                {index !== steps.length - 1 && (
                  <div
                    className={`h-1 w-full
                      ${active ? "bg-orange-600" : "bg-gray-300"}`}
                  />
                )}

              </div>
            );
          })}

        </div>

        {/* DETAILS */}
        <div className="max-w-3xl mx-auto border p-6 rounded">

          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.paymentMethod}</p>
          <p><b>Total:</b> ₹{order.amount}</p>

          <p className="mt-2"><b>Items:</b></p>
          <ul className="list-disc ml-6">
            {order.items.map(item => (
              <li key={item.id}>
                {item.product?.name} x {item.quantity}
              </li>
            ))}
          </ul>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default TrackOrderPage;
