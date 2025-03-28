"use client";
import { useState } from "react";
import {
  FaHome,
  FaInbox,
  FaComments,
  FaChartBar,
  FaClock,
  FaPlus,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
  FaFolder,
} from "react-icons/fa";

const menuItems = [
  { icon: FaHome, label: "Home" },
  { icon: FaInbox, label: "Inbox" },
  { icon: FaComments, label: "Chat" },
  { icon: FaChartBar, label: "Dashboards" },
  { icon: FaClock, label: "Timesheets" },
  { icon: FaEllipsisH, label: "More" },
];

const spaceItems = [
  { icon: FaList, label: "Everything" },
  { icon: FaFolder, label: "View all Spaces" },
  { icon: FaPlus, label: "Create Space" },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* زر فتح القائمة */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 focus:outline-none"
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* القائمة الرئيسية */}
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer ${
              activeItem === index ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveItem(index)}
          >
            <item.icon /> {isExpanded && item.label}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-gray-400 text-sm">{isExpanded && "Spaces"}</h3>
        <ul>
          {spaceItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <item.icon /> {isExpanded && item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
