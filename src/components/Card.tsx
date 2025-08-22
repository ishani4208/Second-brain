import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  comment?: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: () => void;
}

export function Card({ title, comment, link, type, onDelete }: CardProps) {
  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { link },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (onDelete) onDelete(); // refresh parent
    } catch (err) {
      console.error("Failed to delete content", err);
      alert("Error deleting content");
    }
  }

  return (
    <div className="p-4 bg-gradient-to-b from-[#d3d3d3] via-[#c0c0c0] to-[#d3d3d3]rounded-md border-gray-200 max-w-72 border  shadow-[0_0_6px_2px_rgba(192,192,192,0.4)]
  hover:shadow-[0_0_12px_4px_rgba(192,192,192,0.6)] min-w-72">
      <div className="flex justify-between">
        {/* Title + Icon */}
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            {type === "twitter" && <TwitterIcon />}
            {type === "youtube" && <YoutubeIcon />}
          </div>
          {title}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Share */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition"
          >
            <ShareIcon />
          </a>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 transition p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {/* Comment */}
      {comment && (
        <div className="text-sm text-gray-600 mt-2">{comment}</div>
      )}

      {/* Content */}
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link
              .replace("watch", "embed")
              .replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
