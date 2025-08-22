import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import type { Content } from "../hooks/useContent";


export function UserContent() {
  const { username } = useParams<{ username: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content/user/${username}`);
        setContents(res.data.content);
      } catch {
        alert("User not found!");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-pink-200">
          {username}’s Public Content
        </h1>
        <button
          onClick={() => navigate(-1)} // goes back to previous page
          className="px-4 py-2 bg-pink-300 hover:bg-pink-700 rounded-lg text-white font-semibold shadow-md"
        >
          Back
        </button>
      </div>

      {contents.length === 0 ? (
        <p className="text-gray-400">No content available.</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title, comment }) => (
            <Card
              key={link}
              type={type}
              link={link}
              title={title}
              comment={comment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
