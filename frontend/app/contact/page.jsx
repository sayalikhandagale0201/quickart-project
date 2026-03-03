export default function ContactPage() {
  return (
    <div className="px-6 md:px-20 py-12">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>

      <p className="text-gray-600 mb-6">
        Have any questions or need support? We’re here to help.
      </p>

      <div className="space-y-3 text-gray-700">

        {/* Phone */}
        <p>
          <strong>Phone:</strong>{" "}
          <a
            href="tel:+1234567890"
            className="text-orange-600 hover:underline"
          >
            +1-234-567-890
          </a>
        </p>

        {/* Email */}
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:contact@quickcart.com?subject=Support%20Request"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline"
          >
            contact@quickcart.com
          </a>
        </p>

        {/* Support Hours */}
        <p>
          <strong>Support Hours:</strong> Mon - Sat (10 AM - 6 PM)
        </p>

      </div>
    </div>
  );
}
