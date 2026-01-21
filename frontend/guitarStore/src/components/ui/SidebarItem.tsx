import type { ReactNode } from "react";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  collapsed: boolean;
}

function SidebarItem({ icon, label, collapsed }: SidebarItemProps) {
  return (
    <button
      className={`
        w-full h-11
        flex items-center
        rounded-md
        hover:bg-gray-800
        transition-all duration-300
        ${collapsed ? "justify-center" : "px-3 gap-3"}
      `}
    >
      {/* ICON */}
      <span className="w-6 h-6 flex items-center justify-center shrink-0">
        {icon}
      </span>

      {/* LABEL */}
      <span
        className={`
          text-sm whitespace-nowrap
          transition-all duration-300 ease-out
          ${
            collapsed
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100 w-auto delay-200"
          }
        `}
      >
        {label}
      </span>
    </button>
  );
}

export default SidebarItem;
