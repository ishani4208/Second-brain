import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateComponentModel"
import { PlusIcon } from "../icons/PlusIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent} from "../hooks/useContent"
import type { Content } from "../hooks/useContent"
import { SearchIcon } from "../icons/SearchIcon"
import { useNavigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode";
import { BackgroundBeamsWithCollision } from "../components/bwc"



type TokenPayload = {
  username: string;
};

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [selectedType, setSelectedType] = useState<"all" | "youtube" | "twitter">("all");
  const [greeting, setGreeting] = useState("Hello");
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  async function handleSearch() {
    if (!searchInput.trim()) return;
    navigate(`/user/${searchInput}`);
  }

    const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUsername(decoded.username);
      } catch {
        setUsername(null);
      }
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning. . .");
    else if (hour < 18) setGreeting("Good Afternoon. . .");
    else setGreeting("Good Evening. . .");
  }, []);

  // apply filtering here
  const filteredContents: Content[] =
    selectedType === "all"
      ? contents
      : contents.filter((c) => c.type === selectedType);

return (
  <div className="relative min-h-screen">
    {/* Background Beams */}
    <BackgroundBeamsWithCollision className="absolute inset-0 z-0" />

    {/* Page Content */}
    <div className="relative z-10 flex">
      <Sidebar onSelectType={setSelectedType} />

      <div className="p-6 ml-64 flex-1 min-h-screen ">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div>
          <div className="flex items-center justify-between">
            <div className="text-7xl drop-shadow-[0_2px_1px_theme('colors.red.600')]font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 to-blue-800 font-Jersey">
              {greeting}
            </div>

            <div className="flex items-center w-96 rounded-full border border-gray-600 bg-neutral-900 px-3 py-2">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter username..."
                className="bg-transparent text-white flex-1 outline-none"
              />
              <button onClick={handleSearch} className="text-gray-400 hover:text-white">
                <SearchIcon />
              </button>
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                onClick={() => setModalOpen(true)} 
                variant="primary" 
                text="Add content" 
                startIcon={<PlusIcon />} 
              />
              <div className="text-3xl text-purple-200 font-Jaro">
                {username ? `${username}'s Brain` : "My Brain"}
              </div>
            </div>
          </div>

          <div className="text-4xl tracking-widest  bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 font-Jersey">
            What are your thoughts for the day<span className="text-red-600"> ?</span>
          </div>
        </div>
        <div className="pt-10">
        {/* Render filtered cards */}
        <div className="flex gap-4 flex-wrap">
          {filteredContents.map(({ type, link, title, comment }) => (
            <Card 
              key={link} 
              type={type} 
              link={link} 
              title={title} 
              comment={comment} 
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  </div>
);
}