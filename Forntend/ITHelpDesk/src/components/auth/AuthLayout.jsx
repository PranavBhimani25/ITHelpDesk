import React from "react";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-12 bg-gray-100">
        <div className="mb-10">
          <img src="src\assets\helpdesk-logo-BC4n0_jc.png" alt="Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold">IT HelpDesk</h1>
          <p className="text-gray-600">Professional Support Platform</p>
        </div>
        <h2 className="text-3xl font-bold leading-snug">
          Streamline Your <span className="text-sky-500">IT Support</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-md">
          Manage tickets, track issues, and deliver exceptional IT support with our comprehensive helpdesk solution.
        </p>
        <ul className="mt-6 space-y-3 text-gray-700">
          <li>🎧 <strong>24/7 Support</strong> – Round-the-clock assistance</li>
          <li>🛡 <strong>Secure Platform</strong> – Enterprise-grade security</li>
          <li>⚡ <strong>Fast Resolution</strong> – Quick issue resolution</li>
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 justify-center items-center bg-white px-8 lg:px-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
