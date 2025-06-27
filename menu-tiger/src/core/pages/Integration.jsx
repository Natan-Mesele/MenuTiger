import React from "react";
import { FaPuzzlePiece } from "react-icons/fa";

function Integration() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center gap-3">
          <FaPuzzlePiece className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold">Integration</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Connect your tools and services seamlessly
            </p>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div>
        <p>This is the Integration page content.</p>
      </div>
    </div>
  );
}

export default Integration;
