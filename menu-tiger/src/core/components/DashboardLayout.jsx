import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaBell,
  FaCog,
  FaGlobe,
} from "react-icons/fa";
import downloadLogo from "../../assets/img/download.png";
import Faq from "../pages/faq";
import HotActions from "../pages/HotActions";
import Integration from "../pages/Integration";
import Marketing from "../pages/Marketing";
import Dashboard from "../pages/dashboard";
import Menus from "../pages/Menus";
import Orders from "../pages/Orders";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import AddStore from "../pages/AddStore";
import Taxation from "../pages/Taxation";
import Website from "../pages/Website";
import Promotion from "../pages/Promotion";
import Surveys from "../pages/Surveys";
import Customers from "../pages/Customers";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    iconUrl:
      "https://www.app.menutigr.com/static/media/dashboard-selected.ea80f23ead1a505ffd35e3370bb3cfd8.svg",
  },
  {
    name: "Menus",
    iconUrl:
      "https://www.app.menutigr.com/static/media/menus.65e983353342f7fac1c48fcb1506c431.svg",
  },
  {
    name: "Orders",
    iconUrl:
      "https://www.app.menutigr.com/static/media/orders.8bbe8fad28e57e4add01ef75de89cfff.svg",
    borderBottom: true,
  },
  {
    name: "Stores",
    iconUrl: "https://www.app.menutigr.com/static/media/reports.76de79aba6c6a99f6a6d435935e97643.svg",
    children: [
      { name: "Store" },
      { name: "Taxation" },
    ],
  },
  {
    name: "Marketing",
    iconUrl: "https://www.app.menutigr.com/static/media/announce-selected.d4dc57a033fc80de10ce2bc5b900a027.svg",
    children: [
      { name: "Website" },
      { name: "Promotion" },
      { name: "Surveys" },
      { name: "Customers" },
    ],
  },
  {
    name: "Hot Actions",
    iconUrl:
      "https://www.app.menutigr.com/static/media/hot-actions.e42627ee91e9ea6e0052cc56385a658e.svg",
  },
  {
    name: "Reports",
    iconUrl:
      "https://www.app.menutigr.com/static/media/reports.76de79aba6c6a99f6a6d435935e97643.svg",
  },
  {
    name: "FAQ",
    iconUrl:
      "https://www.app.menutigr.com/static/media/faq.6964d233624dd577e627d27843ddbece.svg",
    borderBottom: true,
  },
  {
    name: "Integration",
    iconUrl:
      "https://www.app.menutigr.com/static/media/integrations.1a8ee2afe7be8398e82ee2224e4c46ef.svg",
  },
  {
    name: "Settings",
    iconUrl:
      "https://www.app.menutigr.com/static/media/settings.0e5dc15e8f7496563edb99d1089a6fd2.svg",
    borderBottom: true,
  },
];

const extraItems = [
  {
    name: "Onboarding Video",
    iconUrl:
      "https://www.app.menutigr.com/static/media/video.94336a2d515ea2a96b401489f0034543.svg",
  },
  {
    name: "Download E-book",
    iconUrl:
      "https://www.app.menutigr.com/static/media/faq.6964d233624dd577e627d27843ddbece.svg",
  },
];

const colors = {
  fifth: "#e6f4f1",
  secondary: "#14b8a6",
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [expandedMenus, setExpandedMenus] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const [language, setLanguage] = useState("EN");
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "EN" ? "FR" : "EN"));

  const toggleExpand = (name) => {
    setExpandedMenus((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleMenuItemClick = (name, hasChildren) => {
    if (hasChildren) {
      toggleExpand(name);
    } else {
      setActivePage(name);
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setDarkMode(savedMode === "dark");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is typically the breakpoint for tablets
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleSidebar = () => {
    // On mobile, toggle between hidden and shown
    // On desktop, toggle between expanded and collapsed
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "FAQ":
        return <Faq />;
      case "Hot Actions":
        return <HotActions />;
      case "Integration":
        return <Integration />;
      case "Marketing":
        return <Marketing />;
      case "Dashboard":
        return <Dashboard />;
      case "Menus":
        return <Menus />;
      case "Orders":
        return <Orders />;
      case "Store":
         return <AddStore />;
      case "Reports":
        return <Reports />;
      case "Settings":
        return <Settings />;
      case "Website":
        return <Website />;
      case "Promotion":
        return <Promotion />;
      case "Surveys":
        return <Surveys />;
      case "Customers":
        return <Customers />;
      
      case "Taxation":
        return <Taxation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen bg-gray-100 dark:bg-gray-900`}>
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 fixed top-21 left-0 h-full z-10 ${sidebarOpen ? "w-72" : "w-20"
          } ${isMobile && !sidebarOpen ? 'hidden' : 'flex'} flex-col`}
      >
        <nav className="flex flex-col flex-grow px-4 pt-4 overflow-hidden">
          {menuItems.map(({ name, iconUrl, borderBottom, children }) => {
            const isExpanded = expandedMenus.includes(name);
            const hasChildren = children && children.length > 0;
            const showArrow = hasChildren && (name === "Stores" || name === "Marketing");

            return (
              <div
                key={name}
                className={`${borderBottom ? "border-b border-gray-200 dark:border-gray-700 mb-2" : ""}`}
              >
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(name, hasChildren);
                  }}
                  className={`relative flex items-center justify-between px-2 py-3 mb-2 text-gray-700 dark:text-gray-300 cursor-pointer whitespace-nowrap group hover:bg-fifth overflow-visible hover:rounded-lg transition-all duration-200 ${activePage === name && !hasChildren ? "bg-fifth dark:bg-green-700 rounded-md" : ""
                    }`}
                  title={name}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10">
                      <img
                        src={iconUrl}
                        alt={name}
                        className="mr-3"
                        style={{
                          minWidth: "24px",
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    {sidebarOpen && (
                      <span className="sidebar-text transition-all duration-200">
                        {name}
                      </span>
                    )}
                  </div>

                  {/* Add arrow icon only for Stores and Marketing */}
                  {showArrow && (
                    <FaChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                        } text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300`}
                    />
                  )}
                </a>

                {/* Nested Items with animation */}
                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96" : "max-h-0"}`}
                    style={{
                      transitionProperty: 'max-height',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {isExpanded && sidebarOpen && (
                      <div className="ml-10 mb-6 space-y-6 border-l-2 border-gray-300 dark:border-gray-600 pl-4 relative">
                        {children.map((child, idx) => (
                          <a
                            key={child.name}
                            href="#!"
                            onClick={(e) => {
                              e.preventDefault();
                              setActivePage(child.name);
                            }}
                            className={`flex items-center space-x-2 text-sm ${activePage === child.name
                              ? "text-primary dark:text-teal-300 font-medium"
                              : "text-gray-600 dark:text-gray-400"
                              } hover:text-primary dark:hover:text-teal-300 transition-colors relative`}
                          >
                            <span className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full bg-gray-700 dark:bg-gray-500"></span>
                            <span className="ml-3">{child.name}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {extraItems.map(({ name, iconUrl }) => (
            <a
              key={name}
              href="#!"
              onClick={(e) => e.preventDefault()}
              title={name}
              className="relative flex items-center px-2 py-6 mb-2 text-gray-700 dark:text-gray-300 cursor-pointer whitespace-nowrap group overflow-hidden rounded-lg"
              style={{
                backgroundColor: "#e2e5e8",
              }}
            >
              {/* Curved radial accent at top-right */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, #8591a1 30%, transparent 70%)",
                  borderBottomLeftRadius: "100%",
                  opacity: 0.4,
                }}
              />

              <div className="flex items-center justify-center w-10 relative z-10">
                <img
                  src={iconUrl}
                  alt={name}
                  className="mr-3"
                  style={{
                    minWidth: "24px",
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {sidebarOpen && (
                <span className="sidebar-text transition-all duration-200 relative z-10">
                  {name}
                </span>
              )}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${isMobile
            ? sidebarOpen
              ? 'ml-0'  // When sidebar is open on mobile, don't add margin
              : 'ml-0'   // When sidebar is closed on mobile, no margin
            : sidebarOpen
              ? 'ml-72'  // Desktop with sidebar open
              : 'ml-20'  // Desktop with sidebar collapsed
          }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 sm:px-12 h-20 fixed top-0 left-0 right-0 z-5">
          {/* Left: Sidebar toggle */}
          <div className="flex items-center justify-between space-x-20">
            <img
              src={downloadLogo}
              alt="Logo"
              className={`h-8 transition-all duration-300 ${sidebarOpen ? "block" : "hidden"
                }`}
            />
            {!sidebarOpen && (
              <img src={downloadLogo} alt="Logo Small" className="h-10" />
            )}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
                aria-label="Toggle sidebar"
              >
                <FaBars size={20} />
              </button>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
              title="Toggle Dark Mode"
            >
              {darkMode ? <FaSun size={24} /> : <FaMoon size={22} />}
            </button>

            {/* Translate */}
            <button
              onClick={toggleLanguage}
              title="Translate"
              className="text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-1">
                <FaGlobe size={20} />
                <span className="text-sm font-semibold">{language}</span>
              </div>
            </button>

            {/* Notifications */}
            <button
              title="Notifications"
              className="relative text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <FaBell size={24} />
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Open Preview */}
            <button
              title="Open Preview"
              className="text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.25 4.5h19.5v15H2.25v-15zM6 17.25v-1.5h12v1.5H6z"
                />
              </svg>
            </button>

            {/* Full Screen */}
            <button
              title="Full Screen"
              className="text-gray-700 dark:text-gray-300 bg-fifth rounded-md p-2 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 3A2.25 2.25 0 0 0 3 5.25v4.5a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 0 0-1.5h-4.5Zm13.5 0a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A2.25 2.25 0 0 0 18.75 3h-4.5ZM4.5 13.5a.75.75 0 0 0-1.5 0v4.5A2.25 2.25 0 0 0 5.25 20.25h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm16.5 0a.75.75 0 0 1 1.5 0v4.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 0 .75-.75v-4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* What's New */}
            <div
              title="What's New"
              className="group relative bg-fifth rounded-md p-2 hover:bg-secondary transition-colors duration-200 cursor-pointer"
            >
              <img
                src="https://www.app.menutigr.com/static/media/manage-stores.76de79aba6c6a99f6a6d435935e97643.svg"
                alt="What's New"
                className="w-6 h-6 group-hover:invert group-hover:brightness-0 group-hover:contrast-200 transition duration-200"
              />
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 rounded-full bg-fifth px-3 py-1 hover:bg-secondary hover:text-white transition-colors duration-200 cursor-pointer"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <img
                  src="https://www.app.menutigr.com/static/media/user-round.13b5a31bebd2cc6016d6db2cac8e92d1.svg"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <FaCog size={24} className="text-primary dark:text-teal-300" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-full sm:w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-600">
                  {/* Header */}
                  <div className="p-3">
                    <p className="text-sm sm:text-md font-medium text-gray-800 dark:text-gray-200">
                      Good afternoon Cinematic Highlights,
                    </p>
                  </div>

                  {/* Upgrade Plan Section */}
                  <div className="px-3 sm:px-4 py-3 mx-2 border-gray-200 dark:border-gray-600 bg-[#FFF8E1] dark:bg-[#2a2118]">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      Upgrade your plan
                    </p>
                    <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium mt-1">
                      Up to 8% discount for yearly subscription
                    </p>
                    <button
                      className="mt-2 w-fit sm:w-32 bg-[#FFE57F] hover:bg-[#FFC107] text-gray-800 cursor-pointer dark:text-gray-900 text-xs sm:text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
                    >
                      Check Plans
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-600">
                    <a
                      href="#"
                      className="block px-3 sm:px-4 py-3 text-sm sm:text-[0.9rem] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      Restaurant Settings
                    </a>
                    <a
                      href="#"
                      className="block px-3 sm:px-4 py-3 text-sm sm:text-[0.9rem] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      Profile Settings
                    </a>
                    <a
                      href="#"
                      className="block px-3 sm:px-4 py-3 text-sm sm:text-[0.9rem] text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Content area */}
        <main className="flex-grow pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;