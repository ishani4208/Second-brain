import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

type ContentType = "youtube" | "twitter";

// controlled component
export function CreateContentModal({open, onClose}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>("youtube");

    async function addContent() {
        const title = titleRef.current?.value;
        const comment = commentRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            comment,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }

    return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-gradient-to-b from-[#d3d3d3] via-[#c0c0c0] to-[#d3d3d3]rounded-md border-gray-200 max-w-72 border opacity-100 p-4 rounded fixed">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"} />
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>
                <div>
                  <h1></h1>
                  <div className="flex gap-1 justify-center pb-2">
                    <Button
                      text="Youtube"
                      variant={type === "youtube" ? "primary" : "secondary"}
                      onClick={() => setType("youtube")}
                    />
                    <Button
                      text="Twitter"
                      variant={type === "twitter" ? "primary" : "secondary"}
                      onClick={() => setType("twitter")}
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button onClick={addContent} variant="primary" text="Submit" />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}