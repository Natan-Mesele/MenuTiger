import React, { useState } from "react";
import { FaRocket, FaEye, FaChevronDown, FaDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const sampleData = {
  Today: {
    orders: 15,
    revenue: 245.5,
    customers: 8,
    feedback: 3,
    qrScans: 12,
    mostSold: "Burger",
  },
  Week: {
    orders: 98,
    revenue: 1850.75,
    customers: 45,
    feedback: 22,
    qrScans: 78,
    mostSold: "Pizza",
  },
  Month: {
    orders: 420,
    revenue: 7850.25,
    customers: 210,
    feedback: 95,
    qrScans: 350,
    mostSold: "Pasta",
  },
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedChart, setSelectedChart] = useState("Orders");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allDropdownOpen, setAllDropdownOpen] = useState(false);
  const chartOptions = ["Orders", "Revenue", "Customer"];
  const [startDate, setStartDate] = useState(new Date("2025-05-26"));
  const [endDate, setEndDate] = useState(new Date("2025-06-24"));
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handlePeriodClick = (period) => {
    if (["Today", "Week", "Month"].includes(period)) {
      setSelectedPeriod(period);
      setSelectedDate("");
      setShowDatePicker(false);
      setAllDropdownOpen(false);
    } else if (period === "Date") {
      setShowDatePicker(!showDatePicker);
      setAllDropdownOpen(false);
    } else if (period === "All") {
      setAllDropdownOpen(!allDropdownOpen);
      setShowDatePicker(false);
    }
  };

  const currentData = sampleData[selectedPeriod] || {
    orders: 0,
    revenue: 0,
    customers: 0,
    feedback: 0,
    qrScans: 0,
    mostSold: "None",
  };

  const [dateRange, setDateRange] = useState({
    start: '2025-05-26',
    end: '2025-06-24'
  });

  const handleDateRangeChange = (e, type) => {
    setDateRange(prev => ({
      ...prev,
      [type]: e.target.value
    }));
  };

  const handleDownload = (format) => {
    alert(`Downloading chart as ${format}`);
    setDownloadDropdownOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white p-6 shadow rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Dashboard!</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 mt-1">
            Hi Cinematic Highlights, Welcome to Menu Tiger
          </span>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer border border-gray-300 rounded-md p-2">
          <img
            src="https://www.app.menutigr.com/static/media/copy.f4a907cfacfdd8f91d823668cd6856bb.svg"
            alt="Copy"
            className="w-6 h-6"
          />
          <img
            src="https://www.app.menutigr.com/static/media/qr.d9e8c248e7e8438effce3b671c66f607.svg"
            alt="QR"
            className="w-6 h-6"
          />
          <button
            onClick={() => alert("Open App clicked!")}
            className="bg-primary text-white px-5 py-2 cursor-pointer rounded-md hover:bg-teal-700 flex items-center transition"
          >
            <FaEye className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-between mb-8 flex-wrap items-start">
        <div className="flex space-x-3 relative">
          {["Today", "Week", "Month"].map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodClick(period)}
              className={`w-42 py-4 px-6 rounded-md cursor-pointer font-semibold transition ${selectedPeriod === period
                ? "bg-primary text-white"
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-teal-500 hover:text-white"
                }`}
            >
              {period}
            </button>
          ))}

          {/* Date Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-80 py-4 px-6 rounded-md font-semibold bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-none cursor-pointer text-left"
            >
              {startDate && endDate
                ? `${format(startDate, 'MM/dd/yyyy')} - ${format(endDate, 'MM/dd/yyyy')}`
                : "Select Date Range"}
            </button>

            {showDatePicker && (
              <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  monthsShown={1}  // Changed from 2 to 1 to show only one month
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            )}
          </div>
        </div>
        {/* All Dropdown */}
        <div className="relative">
          <button
            onClick={() => handlePeriodClick("All")}
            className={`w-42 py-4 px-6 rounded-md cursor-pointer font-semibold flex items-center transition ${allDropdownOpen
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
          >
            <img
              src="https://www.app.menutigr.com/static/media/store.e0808a2a2a59e39e07e4c4eb3c95ad92.svg"
              alt="Store"
              className="w-5 h-5 mr-2"
            />
            All
            <FaChevronDown className="ml-2 text-gray-500" />
          </button>

          {allDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              <div className="py-1">
                {["All Locations", "All Time", "All Categories"].map((item) => (
                  <div
                    key={item}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#09203C] rounded-lg shadow p-6 h-44 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="text-xl font-bold text-gray-300">{currentData.orders}</div>
            <img
              src="https://www.app.menutigr.com/static/media/orders.8bbe8fad28e57e4add01ef75de89cfff.svg"
              className="w-6 h-6 filter brightness-0 invert cursor-pointer"
              alt="Orders"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-300">Total Orders</h2>
        </div>

        <div className="rounded-lg shadow p-6 h-44 flex flex-col justify-between" style={{ backgroundColor: "#099D85" }}>
          <div className="flex justify-between">
            <div className="text-xl font-bold text-gray-200">${currentData.revenue.toFixed(2)}</div>
            <img
              src="https://www.app.menutigr.com/static/media/revenue.6c8de3e78a233ccc1de821451e036f61.svg"
              className="w-6 h-6 cursor-pointer"
              style={{ backgroundColor: "#1B8A70", borderRadius: "6px", padding: "2px" }}
              alt="Revenue"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-200">Revenue</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#09203C] rounded-lg shadow p-6 h-20 flex justify-between items-center">
            <div className="text-md font-bold text-gray-300">{currentData.customers}</div>
            <img
              src="https://www.app.menutigr.com/static/media/customers.02dd3212b7e686e6fddfe72c9de43780.svg"
              className="w-5 h-5 filter brightness-0 cursor-pointer invert"
              alt="Customers"
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-20 flex justify-between items-center">
            <div className="text-md font-bold text-gray-800 dark:text-white">{currentData.feedback}</div>
            <img
              src="https://www.app.menutigr.com/static/media/feedback.2585e98d55b7916d0b47e61056dc823d.svg"
              className="w-5 h-5 cursor-pointer"
              alt="Feedback"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Chart on the left */}
        <div className="bg-white rounded-lg shadow p-6 h-96 flex-[2] flex flex-col">
          <div className="w-full flex justify-between items-center mb-4  pb-2">
            <h3 className="text-lg font-semibold text-left">
              {selectedChart === "Orders" && "Total Orders"}
              {selectedChart === "Revenue" && "Revenue"}
              {selectedChart === "Customer" && "Customer Growth"}
            </h3>
            <div className="flex flex-col justify-end gap-2">
  <div className="relative w-30">
    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="w-full flex justify-between items-center border-3 cursor-pointer border-primary rounded-md px-3 py-4 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {selectedChart}
      <FaChevronDown className="ml-2 text-gray-500" />
    </button>

    {isDropdownOpen && (
      <ul className="absolute top-full mt-1 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md z-20">
        {chartOptions.map((option) => (
          <li
            key={option}
            onClick={() => {
              setSelectedChart(option);
              setIsDropdownOpen(false);
            }}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${selectedChart === option ? "font-semibold text-primary" : ""
              }`}
          >
            {option}
          </li>
        ))}
      </ul>
    )}
  </div>
  
  {/* Download Button - Modified with gray bg and moved to right */}
  <div className="relative flex justify-end">
    <button
      onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      title="Download Chart"
    >
      <FaDownload className="text-gray-600 dark:text-gray-300" />
    </button>
    
    {downloadDropdownOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
        <div className="py-1">
          <button
            onClick={() => handleDownload('PNG')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Download as PNG
          </button>
          <button
            onClick={() => handleDownload('SVG')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Download as SVG
          </button>
          <button
            onClick={() => handleDownload('CSV')}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Download as CSV
          </button>
        </div>
      </div>
    )}
  </div>
</div>
          </div>
          
          {/* Chart Image Area - Added image display */}
          <div className="flex-grow flex justify-center items-center w-full relative">
            {["Today", "Week", "Month"].includes(selectedPeriod) ? (
              <div className="w-full h-full">
                {/* Sample chart image - replace with your actual chart component */}
                <img 
                  src="img/bar-chart" 
                  alt="Chart Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <img
                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                alt="Empty Icon"
                className="w-16 h-16 object-contain"
              />
            )}
          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
            {["Today", "Week", "Month"].includes(selectedPeriod)
              ? `Showing ${selectedChart.toLowerCase()} data for ${selectedPeriod}`
              : selectedPeriod === "Date"
                ? "Select a date to view data"
                : "Select a time period to view data"}
          </p>
        </div>

        {/* Right side: Two smaller stacked cards */}
        <div className="flex flex-col gap-6 flex-[1]">
          {/* QR Scan Count */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-44 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 w-full pb-2 text-left">
              QR Scan Count
            </h2>
            {["Today", "Week", "Month"].includes(selectedPeriod) ? (
              <div className="text-2xl font-bold">{currentData.qrScans}</div>
            ) : (
              <img
                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                alt="Empty Icon"
                className="w-16 h-16 object-contain"
              />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {["Today", "Week", "Month"].includes(selectedPeriod)
                ? `QR scans for ${selectedPeriod}`
                : selectedPeriod === "Date"
                  ? "Select a date to view scans"
                  : "Select a time period to view scans"}
            </p>
          </div>

          {/* Most Sold Foods */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-44 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300 w-full pb-2 text-left">
              Most Sold Foods
            </h2>
            {["Today", "Week", "Month"].includes(selectedPeriod) ? (
              <div className="text-xl font-bold">{currentData.mostSold}</div>
            ) : (
              <img
                src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                alt="Empty Icon"
                className="w-16 h-16 object-contain"
              />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {["Today", "Week", "Month"].includes(selectedPeriod)
                ? `Top item for ${selectedPeriod}`
                : selectedPeriod === "Date"
                  ? "Select a date to view items"
                  : "Select a time period to view items"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
