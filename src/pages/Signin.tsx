import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LampContainer } from "../components/LampDemo";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
    }
    return (
        <LampContainer>
<div className="flex flex-col">
        <div className="font-Jersey text-slate-800 text-6xl">
            SECOND BRAIN
        </div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
        
        <div className="justify-center"><Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="SignIn"
            fullWidth={true}
          />
        </div>
        <p className="mt-4 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      </div>
    </LampContainer>
    );
}