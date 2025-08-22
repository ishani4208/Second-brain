import { Logo } from "../icons/Logo";
import { HeartIcon } from "../icons/HeartIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export function Sidebar({ onSelectType }: { onSelectType: (t: "youtube" | "twitter" | "all") => void }){
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token"); // clear jwt
    navigate("/signin"); // redirect
  };

    return (
  <div className="h-screen bg-black border-r border-red-500 w-64 fixed left-0 top-0 pl-4 flex flex-col justify-between">
    
    {/* TOP SECTION */}
    <div>
      <div className="flex font-Jaro text-white text-3xl pt-8 items-center">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        second brain
      </div>

      <div className="pt-10 pl-4">
        <SidebarItem text="My Posts" icon={<HeartIcon />} onClick={() => onSelectType("all")} />
        <div className="pt-3">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => onSelectType("twitter")} />
        </div>
        <div className="pt-3">
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => onSelectType("youtube")} />
        </div>
      </div>
    </div>

    {/* BOTTOM SECTION */}
    <div className="p-4">
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
);
}