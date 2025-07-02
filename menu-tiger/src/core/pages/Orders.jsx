import React, { useState, useRef, useEffect } from "react";
import {
  FaRocket,
  FaUtensils,
  FaSearch,
  FaArrowUp,
  FaCar,
  FaChevronDown,
} from "react-icons/fa";

function Orders() {
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const storeRef = useRef(null);
  const paymentRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (storeRef.current && !storeRef.current.contains(e.target))
        setStoreDropdownOpen(false);
      if (paymentRef.current && !paymentRef.current.contains(e.target))
        setPaymentDropdownOpen(false);
      if (statusRef.current && !statusRef.current.contains(e.target))
        setStatusDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow rounded-lg w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Food Orders</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Order Monitoring and History
          </span>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR Icon"
            className="w-6 h-6 cursor-pointer"
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 sm:p-6 space-y-6 w-full">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {/* Invoice Input */}
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Invoice ID"
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0 focus:border-primary"
            />
          </div>

          {/* Store Dropdown */}
          <div className="relative w-full" ref={storeRef}>
            <div
              onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm flex justify-between items-center text-gray-800 dark:text-gray-100 cursor-pointer"
            >
              {selectedStore}
              <FaChevronDown className="ml-2 text-gray-400" />
            </div>
            <img
              src="https://www.app.menutigr.com/static/media/store.e0808a2a2a59e39e07e4c4eb3c95ad92.svg"
              alt="Store Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            {storeDropdownOpen && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-30">
                {["All", "Store 1", "Store 2"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedStore(option);
                      setStoreDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Payment Dropdown */}
          <div className="relative w-full" ref={paymentRef}>
            <div
              onClick={() => setPaymentDropdownOpen(!paymentDropdownOpen)}
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm flex justify-between items-center text-gray-800 dark:text-gray-100 cursor-pointer"
            >
              {selectedPayment}
              <FaChevronDown className="ml-2 text-gray-400" />
            </div>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-primary text-green-100 px-1.5 py-0.5 rounded text-sm font-medium pointer-events-none">
              $
            </span>
            {paymentDropdownOpen && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-30">
                {["All", "Paid", "Not Paid"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedPayment(option);
                      setPaymentDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full" ref={statusRef}>
            <div
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm flex justify-between items-center text-gray-800 dark:text-gray-100 cursor-pointer"
            >
              {selectedStatus}
              <FaChevronDown className="ml-2 text-gray-400" />
            </div>
            <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 text-base pointer-events-none" />
            {statusDropdownOpen && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg z-30">
                {["All", "Pending", "Completed"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedStatus(option);
                      setStatusDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div className="w-full">
            <button className="w-full bg-secondary cursor-pointer text-white px-4 py-3 rounded-md text-sm hover:bg-primary transition">
              Apply Filters
            </button>
          </div>

          {/* Reset Button */}
          <div className="w-full">
            <button className="w-full border cursor-pointer border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                {[
                  "Invoice ID",
                  "Date",
                  "Time",
                  "Table",
                  "Paid Status",
                  "Payment Method",
                  "Order Status",
                ].map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold text-center">
                    <div className="flex items-center justify-center select-none group">
                      <span>{header}</span>
                      <FaArrowUp className="ml-1 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="py-10 text-center">
                  <img
                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                    alt="No Records"
                    className="mx-auto w-24 sm:w-28 mb-4"
                  />
                  <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
                    No records available
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
