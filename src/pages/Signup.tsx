"use client"
import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate, Link } from "react-router-dom"
import { LampContainer } from "../components/LampDemo" // 👈 import your Lamp

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  async function signup() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    })

    alert("You have signed up!")
    navigate("/signin")
  }

  return (
    <LampContainer>
      {/* Signup Card */}
      <div className="flex flex-col">
        <div className="font-Jersey text-slate-800 text-6xl">
            SECOND BRAIN
        </div>
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 min-w-80 p-8 shadow-lg">
        
        <div className="justify-center"><Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
        <p className="mt-4 text-sm text-center text-gray-300">
          Already a user?{" "}
          <Link to="/signin" className="text-cyan-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
      </div>
    </LampContainer>
  )
}
