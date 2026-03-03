"use client";

import React from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>QuickCart</strong>, we value your privacy and are committed 
          to protecting your personal information. This Privacy Policy explains how 
          we collect, use, and safeguard your data when you use our website and services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal information like name, email, phone number, and shipping address.</li>
          <li>Payment information through secure payment gateways like Razorpay.</li>
          <li>Technical information including IP address, browser type, device info, and cookies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To process and deliver your orders.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To send promotional emails if you opt-in.</li>
          <li>To improve our website and services.</li>
          <li>To prevent fraud and comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking</h2>
        <p className="mb-4">
          We use cookies and similar technologies to improve your experience, track website usage, 
          and provide personalized content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>With payment processors for order payments.</li>
          <li>With shipping partners for product delivery.</li>
          <li>With law enforcement or regulatory authorities if required by law.</li>
        </ul>
        <p className="mb-4"><strong>We do not sell your personal information to third parties.</strong></p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p className="mb-4">
          We use reasonable security measures to protect your personal data including SSL encryption, 
          secure servers, and access controls.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Rights</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You can access, correct, or delete your personal information.</li>
          <li>You can opt-out of marketing emails at any time.</li>
          <li>For any privacy-related requests, contact us at <strong>privacy@quickcart.com</strong>.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children’s Privacy</h2>
        <p className="mb-4">
          Our services are not directed at children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page. 
          Last updated: <strong>February 2, 2026</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>
          For any questions regarding this Privacy Policy, please contact us at 
          <strong> privacy@quickcart.com</strong>.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
