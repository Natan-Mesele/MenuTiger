import React, { useState, useRef } from 'react';
import {
  FaRocket,
  FaUtensils,
  FaCog,
  FaUser,
  FaTools,
  FaBell,
  FaCreditCard,
  FaQrcode,
  FaQuestionCircle
} from "react-icons/fa";

function Settings() {
  const [currentPage, setCurrentPage] = useState('profile');
  const [focusedField, setFocusedField] = useState(null);
  const tabs = [
    { id: 'profile', name: 'Profile', icon: <FaUser /> },
    { id: 'restaurant', name: 'Restaurant', icon: <FaUtensils /> },
    { id: 'notification', name: 'Notification', icon: <FaBell /> },
    { id: 'order', name: 'Order Settings', icon: <FaCog /> },
    { id: 'developer', name: 'Developer', icon: <FaTools /> },
    { id: 'billing', name: 'Billing', icon: <FaCreditCard /> },
    { id: 'qr', name: 'Restaurant QR Code', icon: <FaQrcode /> },
  ];
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  });


  const handleBlur = () => {
    setFocusedField(null);
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving profile data:', {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      description: profileData.description,
      profileImage: profileData.profileImage
    });

    // For demo purposes, we'll just show an alert
    alert('Profile saved successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Settings</h1>
            <FaRocket className="text-primary text-lg sm:text-xl" />
          </div>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-1">
            General Settings
          </span>
        </div>
        <div className="flex items-center space-x-4 border border-gray-300 dark:border-gray-600 rounded-md p-2">
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
            className="bg-primary text-white px-5 py-2 rounded-md flex items-center hover:bg-teal-700 transition-colors duration-200 cursor-pointer"
            onClick={() => alert("Open App clicked!")}
          >
            <FaUtensils className="mr-2" />
            Open App
          </button>
        </div>
      </div>

      {/* Tabs and Content Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 font-medium text-sm cursor-pointer flex items-center whitespace-nowrap ${currentPage === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setCurrentPage(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {currentPage === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Profile Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Upload Section */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                <div className="flex flex-col">
                  <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
                    Logo <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="w-[400px] h-[300px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary transition"
                    onClick={triggerFileInput}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    {profileData.previewImage ? (
                      <img
                        src={profileData.previewImage}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center px-4">
                        <img
                          src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                          alt="Upload"
                          className="w-12 h-12 mb-3"
                        />
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          Drag 'n' drop some files here,
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          or click to select files
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Preferred size: 400x300px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-6 max-w-2xl">
                {/* First Name */}
                <div className={`flex items-center border ${focusedField === 'firstName' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                  <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('firstName')}
                    onBlur={handleBlur}
                    placeholder="Enter first name"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className={`flex items-center border ${focusedField === 'lastName' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                  <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('lastName')}
                    onBlur={handleBlur}
                    placeholder="Enter last name"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    required
                  />
                </div>

                {/* Description */}
                <div className={`flex border ${focusedField === 'description' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                  <label className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 w-40 text-center">
                    Description <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={profileData.description}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('description')}
                    onBlur={handleBlur}
                    placeholder="Enter description"
                    rows={3}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          {/* Restaurant Tab */}
          {currentPage === 'restaurant' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Restaurant Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              {/* Divider Line (full width) */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              <div className="max-w-md">

                {/* Cover Image Upload */}
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="flex flex-col w-full">
                    <label className="text-md text-gray-500 font-medium dark:text-gray-300 mb-4">
                      Cover image <span className="text-red-500">*</span>
                    </label>
                    <div
                      className="w-full h-[200px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center relative cursor-pointer hover:border-primary transition"
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      {profileData.previewImage ? (
                        <img
                          src={profileData.previewImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-center px-4">
                          <img
                            src="https://www.app.menutigr.com/static/media/file-upload.b1ad240de0819ef255bbf24eae443b06.svg"
                            alt="Upload"
                            className="w-12 h-12 mb-3"
                          />
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            Drag 'n' drop cover image here,
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            or click to select files
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Restaurant Information */}
                <div className="space-y-6">
                  {/* Restaurant Name */}
                  <div className={`flex items-center border ${focusedField === 'restaurantName' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value="natila"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('restaurantName')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className={`flex items-center border ${focusedField === 'address' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('address')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className={`flex items-center border ${focusedField === 'email' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value="huluale12@gmail.com"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    />
                  </div>

                  {/* Contact Number */}
                  <div className={`flex items-center border ${focusedField === 'contactNumber' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('contactNumber')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                    />
                  </div>

                  {/* Default Language */}
                  <div className={`flex items-center border ${focusedField === 'defaultLanguage' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Language <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="defaultLanguage"
                      value="english"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('defaultLanguage')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className={`flex items-center border ${focusedField === 'currency' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md transition-colors`}>
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap">
                      Currency <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="currency"
                      value="usd"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('currency')}
                      onBlur={handleBlur}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      required
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                    </select>
                  </div>

                  {/* Default Food Image Toggle */}
                  <div className="flex items-center justify-between py-3 border border-gray-300 dark:border-gray-600 rounded-md px-4">
                    <h3 className="font-medium text-sm">Default food image</h3>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

          )}

          {/* Notification Tab */}
          {currentPage === 'notification' && (
            <div>
              {/* Header with Save Button (right-aligned) */}
              <div className="">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      Notification Settings
                    </h2>
                    <div className="flex items-center px-4 py-3 border border-primary rounded-sm">
                      <FaQuestionCircle className="text-primary mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400 ">
                        Manage your notifications sounds
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Divider Line (full width) */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Notification Settings Content (left-aligned) */}
              <div className="max-w-md space-y-6">
                {/* Order Notification Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Order notification sound</h3>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Default Sound</option>
                        <option>Sound 1</option>
                        <option>Sound 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Feedback Notification Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Feedback notification sound</h3>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Sound 1</option>
                        <option>Default Sound</option>
                        <option>Sound 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Hot-action Notification Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Hot-action notification sound</h3>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span className="text-sm">Enable</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Sound <span className="text-red-500">*</span>
                      </label>
                      <select className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md">
                        <option>Sound 2</option>
                        <option>Default Sound</option>
                        <option>Sound 1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Order Settings Tab */}
          {currentPage === 'order' && (
            <div>
              {/* Header with Save Button (full width) */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Order Settings
                </h2>
                <button
                  className="bg-secondary text-white px-4 py-3 rounded-sm hover:bg-primary-dark transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>

              {/* Divider Line (full width) */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Content with restricted width */}
              <div className="max-w-md">
                {/* Customers Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 mb-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Customers</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span>Enable Customer Tip</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-md p-3">
                      <span>Enable Cancel Order</span>
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Invoice Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Invoice</h3>

                  <div className="space-y-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <label className="w-40 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                        Invoice ID Prefix <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value="INVOICE"
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Developer Tab */}
          {currentPage === 'developer' && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md bg-gray-100 px-4 py-3 rounded-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Developer Settings
                </h2>
              </div>

              {/* Divider Line */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6"></div>

              {/* Content */}
              <div className="max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Personal Access Tokens</h3>
                  <button className="text-white text-sm font-medium bg-[#D84343] hover:bg-[#C62828] px-4 py-2 rounded-sm">
                    Revoke All
                  </button>
                </div>

                {/* Token Creation Form */}
                <div className="bg-gray-100 p-6 mb-8">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mb-4">
                    <label className="w-32 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-2 border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                      Token name
                    </label>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 outline-none rounded-r-md"
                      placeholder="Enter token name"
                    />
                  </div>

                  <div className='flex justify-center mb-4'>
                    <span className='text-gray-500 bg-gray-300 px-4 py-3 rounded-sm'>Generate New Token</span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tokens you have generated that can be used to access Menutiger API
                  </p>
                </div>

                {/* Tokens List */}
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://www.app.menutigr.com/static/media/emptyIcon.e5d5b5150b5e6208ac7a2f4dfbdf36a1.svg"
                    alt="No tokens"
                    className="h-24 w-24 mb-4"
                  />
                  <p className="text-gray-500 dark:text-gray-400">No records available</p>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {currentPage === 'billing' && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-md px-4 py-3 border border-gray-200 rounded-sm text-primary dark:bg-gray-700 dark:text-gray-300">
                  Billing & Plans
                </h2>
              </div>

              {/* Parallel Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Current Plan Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Current Plan</h3>
                  <div className="flex items-center justify-between gap-4 border border-gray-200 px-4 py-6 ">
                    <div className="flex flex-row gap-4">
                      <span className="text-xl font-semibold text-primary">FREEMIUM</span>
                      <span className="py-1 px-3 text-xs bg-secondary hover:bg-primary text-white dark:bg-green-900 dark:text-green-200 rounded-2xl ">Active</span>
                    </div>
                    <button className='bg-secondary hover:bg-primary text-sm font-medium px-3 py-2 text-white rounded-sm shadow-md'>
                      Manage
                    </button>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-md p-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Payment method</h3>
                  <div className="flex items-center justify-between gap-4 border border-gray-200 px-4 py-6 ">
                    <span className="text-md text-gray-400">No payment method added</span>
                    <button className='bg-secondary hover:bg-primary text-sm font-medium px-3 py-2 text-white rounded-sm shadow-md'>
                      Manage
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-row gap-4 items-center justify-end my-2'>
                <span>Looking to cancel subscription? </span>
                <button className="border border-red-400 px-4 py-1 rounded-sm text-sm text-red-400 font-medium">Cancel Subscription</button>
              </div>
              {/* Upcoming Bill Section */}
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-6 mb-6">
                <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Upcoming Bill</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <table className="w-full table-fixed">
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-3 text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700 w-1/2">
                          Subscription
                        </td>
                        <td className="p-3 text-left text-gray-500 dark:text-gray-400">
                          1 × Freemium (at $0.00 / month)
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-3 text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                          Total
                        </td>
                        <td className="p-3 text-left text-gray-500 dark:text-gray-400">
                          $0.00
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-gray-600 dark:text-gray-300 font-medium border-r border-gray-200 dark:border-gray-700">
                          Due on
                        </td>
                        <td className="p-3 text-left text-gray-500 dark:text-gray-400">
                          Jul 17, 2025
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Past Invoices Section */}
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Past Invoices</h3>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group">
                            <div className="flex items-center">
                              ID
                              <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                  <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"></path>
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group">
                            <div className="flex items-center">
                              Date
                              <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                  <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"></path>
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group">
                            <div className="flex items-center justify-end">
                              Amount (USD)
                              <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                  <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"></path>
                                </svg>
                              </button>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group">
                            <div className="flex items-center justify-end">
                              Status
                              <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                  <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z"></path>
                                </svg>
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a href="#" className="text-primary hover:underline dark:text-primary-300">
                              in_1Rb4u9BlBJOreIXbfGxIPxBiextenal-link
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                            Jun 17, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-gray-600 dark:text-gray-300">
                            $0
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                              Paid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Restaurant QR Code Tab */}
          {currentPage === 'qr' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Restaurant QR Code</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Share this QR code for customers to access your digital menu.
              </p>
              <div className="mt-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg border shadow-lg">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center dark:bg-gray-700">
                    <div className="text-center">
                      <FaQrcode className="text-4xl mx-auto mb-2" />
                      <p className="text-sm">QR Code Preview</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-x-3">
                  <button className="bg-primary text-white px-4 py-2 rounded-md">
                    Download QR Code
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md">
                    Print QR Code
                  </button>
                </div>

                <div className="mt-8 w-full max-w-md border rounded-lg p-4">
                  <h3 className="font-medium mb-3">QR Code Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">QR Code Size</label>
                      <select className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                        <option>Small (200x200)</option>
                        <option selected>Medium (300x300)</option>
                        <option>Large (400x400)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">QR Code Color</label>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-black border-2 border-blue-500"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                        <div className="w-8 h-8 rounded-full bg-red-600"></div>
                        <div className="w-8 h-8 rounded-full bg-green-600"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;