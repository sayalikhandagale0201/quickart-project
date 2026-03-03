'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";

const AddAddress = () => {
  const router = useRouter();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        throw new Error("Failed to save address");
      }

      alert("Address saved successfully");
      router.push("/checkout");

    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving address");
    }
  };

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </p>

          <div className="space-y-3 mt-10">
            <input
              className="input"
              type="text"
              placeholder="Full name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              required
            />

            <input
              className="input"
              type="text"
              placeholder="Phone"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              required
            />

            <input
              className="input"
              type="text"
              placeholder="Pin code"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              required
            />

            <textarea
              className="input resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              required
            />

            <div className="flex gap-3">
              <input
                className="input"
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />

              <input
                className="input"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
          >
            Save Address
          </button>
        </form>

        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="location"
        />
      </div>

      <Footer />

      {/* Tailwind helper */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(107, 114, 128, 0.3);
          border-radius: 4px;
          outline: none;
        }
        .input:focus {
          border-color: #ea580c;
        }
      `}</style>
    </>
  );
};

export default AddAddress;
