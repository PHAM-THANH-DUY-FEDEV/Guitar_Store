import {
  BarChart3,
  LayoutDashboard,
  Newspaper,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import SidebarToggle from "../components/ui/SidebarToggle";
import SidebarItem from "../components/ui/SidebarItem";
import SidebarProfileMenu from "../components/ui/SidebarProfileMenu";
const Adminpage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-screen">
      {/* menu bar */}
      <aside
        className={`flex flex-col justify-between bg-gray-900 text-white transition-all duration-300 px-2 py-4 ${
          collapsed ? "w-18 " : "w-66"
        }`}
      >
        <div>
          <div className="mb-4 w-full flex py-1">
            {!collapsed && (
              <span className="">
                <img
                  src="/assets/logo_2.png"
                  alt="DuyGuitar Logo"
                  className="h-11 w-200 object-cover shadow-xl rounded-md transition-all duration-300"
                />
              </span>
            )}
            <SidebarToggle
              collapsed={collapsed}
              onToggle={() => setCollapsed(!collapsed)}
            />
          </div>

          {/* search */}
          <div
            className={`overflow-hidden transition-all duration-300
            `}
          >
            {collapsed ? (
              ""
            ) : (
              <div
                className="my-6 flex items-center gap-1 rounded-full border border-white/10
            from-[#0f1b2a] to-[#0b1522]
            px-1 py-2 text-sm text-white shadow-inner"
              >
                <Search size={20} className="shrink-0 mx-1 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent outline-none placeholder-gray-400"
                />
              </div>
            )}
          </div>

          {collapsed ? (
            <SidebarItem
              icon={<Search size={18} />}
              label="Search"
              collapsed={collapsed}
            />
          ) : (
            ""
          )}
          <div>
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Tổng Quan"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Package size={18} />}
              label="Sản Phẩm"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<ShoppingCart size={18} />}
              label="Đơn Đặt Hàng"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Ticket size={18} />}
              label="Voucher"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Users size={18} />}
              label="Khách Hàng"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<BarChart3 size={18} />}
              label="Thống Kê"
              collapsed={collapsed}
            />
          </div>
          <div className="my-4 mx-2 border-t-2 border-white/10" />
          <div>
            <SidebarItem
              icon={<User size={18} />}
              label="Nhân viên"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Newspaper size={18} />}
              label="Bài Viết"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings size={18} />}
              label="Cài đặt"
              collapsed={collapsed}
            />
          </div>
        </div>
        {/* bottom */}

        <SidebarProfileMenu
          avataSrc="/assets/avata-1.jpg"
          name="Duy Guitar"
          collapsed={collapsed}
        />
      </aside>

      {/* right content */}
      <div></div>
    </div>
  );
};

export default Adminpage;
