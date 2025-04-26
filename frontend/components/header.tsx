"use client"

import type { PostType } from "@/types/post"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

interface HeaderProps {
  activeFilter: PostType | "all"
  onFilterChange: (filter: PostType | "all") => void
}

export default function Header({ activeFilter, onFilterChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-400/50 via-purple-200/50 to-blue-400/50 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className={`text-4xl font-bold text-center text-black mb-4 ${instrumentSerif.className}`}>PESU Lost and Found</h1>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("lost")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "lost" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Lost
          </button>
          <button
            onClick={() => onFilterChange("found")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "found" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Found
          </button>
        </div>
      </div>
    </header>
  )
}
