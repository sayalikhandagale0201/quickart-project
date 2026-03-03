"use client";

import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center gap-6 px-6 md:px-16 lg:px-32 py-3">

        {/* LOGO */}
        <Image
          src={assets.logo}
          alt="QuickCart"
          className="w-32 cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* MENU LINKS */}
        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <Link href="/all-products" className="hover:text-orange-600">Shop</Link>
          <Link href="/about" className="hover:text-orange-600">About</Link>
          <Link href="/contact" className="hover:text-orange-600">Contact</Link>
        </div>

        {/* 🔍 BIG SEARCH BAR */}
        <div className="flex flex-1 max-w-xl items-center border rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search quickcart.com"
            className="w-full px-4 py-2 text-sm outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button
            onClick={() => query && router.push(`/search?q=${query}`)}
            className="bg-orange-500 px-4 py-2 hover:bg-orange-600"
          >
            <Image src={assets.search_icon} alt="search" className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* SELLER */}
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full hover:bg-gray-100"
            >
              Dashboard
            </button>
          )}

          {/* CART */}
          <Link href="/cart" className="relative">
            <Image src={assets.cart_icon} alt="cart" className="w-5 h-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* ACCOUNT */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col text-left leading-tight"
            >
              <span className="text-xs text-gray-500">
                {isLoggedIn ? "Hello," : "Welcome"}
              </span>
              <span className="text-sm font-medium">
                {isLoggedIn ? "Account" : "Sign in"}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/my-orders" className="block px-4 py-2 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
