"use client"

import { useState } from "react"
import Header from "@/components/header"
import PostList from "@/components/post-list"
import CreatePostFAB from "@/components/create-post-fab"
import CreatePostModal from "@/components/create-post-modal"
import type { Post, PostType } from "@/types/post"

// Sample data for demonstration
const samplePosts: Post[] = [
  {
    id: "1",
    type: "lost",
    title: "Lost Black Wallet",
    description: "Lost my black leather wallet near the library on Monday afternoon. Contains ID and cards.",
    location: "Main Library, 2nd Floor",
    contactInfo: "John Doe (PES1202200123)",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2023-10-10"),
  },
  {
    id: "2",
    type: "found",
    title: "Found Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle with stickers on it.",
    location: "EC Block, Room 204",
    currentLocation: "EC Block Reception",
    contactInfo: "Jane Smith (PES1202200456)",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2023-10-11"),
  },
  {
    id: "3",
    type: "lost",
    title: "Lost Calculator",
    description: "Lost my scientific calculator during the physics exam.",
    location: "Physics Lab",
    contactInfo: "Mike Johnson (PES1202200789)",
    createdAt: new Date("2023-10-09"),
  },
  {
    id: "4",
    type: "found",
    title: "Found Student ID Card",
    description: "Found a student ID card near the canteen.",
    location: "Main Canteen",
    currentLocation: "Student Affairs Office",
    contactInfo: "Admin Office",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: new Date("2023-10-12"),
  },
]

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<PostType | "all">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>(samplePosts)

  const filteredPosts = activeFilter === "all" ? posts : posts.filter((post) => post.type === activeFilter)

  const handleCreatePost = (newPost: Omit<Post, "id" | "createdAt">) => {
    // In a real app, this would be an API call to create a post
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    setPosts((prevPosts) => [post, ...prevPosts])
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100/10 to-blue-100/50 pb-20">
      <Header activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="container mx-auto px-4 pt-4">
        <PostList posts={filteredPosts} />
      </div>

      <CreatePostFAB onClick={() => setIsModalOpen(true)} />

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreatePost} />
    </main>
  )
}
