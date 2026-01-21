import { MoreHorizontal } from "lucide-react";

interface ProfileProps {
  avataSrc: string;
  name: string;
  collapsed: boolean;
}

function SidebarProfileMenu({ avataSrc, name, collapsed }: ProfileProps) {
  return (
    <div
      className={`flex gap-3 p-3 justify-between items-center w-full transition-all duration-300`}
    >
      <div className={`flex gap-3 items-center `}>
        <img
          src={avataSrc}
          alt={name}
          className={`h-10 w-10 rounded-full object-cover shrink-0`}
        />
        <span
          className={`text-sm whitespace-nowrap
          transition-all duration-300 ease-out"
          ${
            collapsed
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100 w-auto delay-200"
          }`}
        >
          {name}
        </span>
      </div>
      <button
        className={`
            transition-all duration-300
            ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 delay-300"}
          `}
      >
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export default SidebarProfileMenu;
