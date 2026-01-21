import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex ${collapsed ? "px-3 py-3" : "items-center py-3 ml-2"} flex justify-center rounded-md cursor-pointer
      hover:bg-gray-800 transition-all duration-300 `}
    >
      {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
    </button>
  );
}
export default SidebarToggle;
