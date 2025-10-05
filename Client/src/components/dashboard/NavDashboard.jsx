import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BarChart3, HistoryIcon } from "lucide-react";

function NavDashboard() {
  return (
    <>
      <nav
        className="bg-[#1a222e] border-b border-[#161B22] sticky top-0 z-50 shadow-md py-2 px-3"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <ul className="flex items-center space-x-4 mx-auto md:mx-0">
            <li>
              <Link
                to="/dashboard/analytics"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-[#00B8D9]/20 transition-colors"
                title="Go to Analytics"
              >
                <BarChart3 className="h-4 w-4 mr-2 text-[#00B8D9]" />
                Analytics
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/history"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-[#00B8D9]/20 transition-colors"
                title="Go to History"
              >
                <HistoryIcon className="h-4 w-4 mr-2 text-[#00B8D9]" />
                History
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default NavDashboard;
