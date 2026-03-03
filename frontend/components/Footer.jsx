import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row items-start justify-between 
        px-6 md:px-16 lg:px-32 gap-10 py-14 
        border-b border-gray-500/30 text-gray-500">

        {/* LOGO + ABOUT */}
        <div className="w-full md:w-1/3">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            QuickCart is a modern e-commerce platform offering quality products,
            secure payments, and a seamless shopping experience.
          </p>
        </div>

        {/* COMPANY LINKS */}
        <div className="w-full md:w-1/3">
          <h2 className="font-medium text-gray-900 mb-5">Company</h2>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="w-full md:w-1/3">
          <h2 className="font-medium text-gray-900 mb-5">Get in Touch</h2>

          <p className="text-sm">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+1234567890"
              className="text-orange-600 hover:underline"
            >
              +1-234-567-890
            </a>
          </p>

          <p className="text-sm mt-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@quickcart.com?subject=Support%20Request"
              className="text-orange-600 hover:underline"
            >
              contact@quickcart.com
            </a>
          </p>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2026 © Quickcart All Right Reserved.
      </p>

    </footer>
  );
};

export default Footer;
