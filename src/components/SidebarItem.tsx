import type { ReactElement } from "react";

export function SidebarItem({ text, icon, onClick }: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="flex text-md text-white py-2 cursor-pointer transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#F4C2C2] to-[#B76E79] hover:text-black rounded max-w-48 pl-4 transition-all duration-150"
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}