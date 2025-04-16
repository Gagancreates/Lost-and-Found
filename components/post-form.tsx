"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import type { Post, PostType } from "@/types/post"
import { ImagePlus } from "lucide-react"

interface PostFormProps {
  type: PostType
  onSubmit: (post: Omit<Post, "id" | "createdAt">) => void
  onCancel: () => void
}

export default function PostForm({ type, onSubmit, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    currentLocation: "",
    contactInfo: "",
    image: "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would upload the image to a server
    // For now, we'll just create a local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
      // In a real app, you would set the image URL from the server response
      setFormData((prev) => ({ ...prev, image: "/placeholder.svg?height=200&width=300" }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Create post object
    const post: Omit<Post, "id" | "createdAt"> = {
      type,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      contactInfo: formData.contactInfo,
      ...(type === "found" && { currentLocation: formData.currentLocation }),
      ...(formData.image && { image: formData.image }),
    }

    onSubmit(post)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Brief title of the item"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Detailed description of the item"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          {type === "lost" ? "Where did you lose it?" : "Where did you find it?"} *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Location details"
        />
      </div>

      {type === "found" && (
        <div>
          <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Where is it currently? *
          </label>
          <input
            type="text"
            id="currentLocation"
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Where are you keeping the item?"
          />
        </div>
      )}

      <div>
        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Info *
        </label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Your name and roll number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image (Optional)</label>
        <div className="mt-1 flex items-center">
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ImagePlus className="h-5 w-5 mr-2 text-gray-500" />
            Upload Image
          </label>
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />

          {/* Image preview */}
          {imagePreview && (
            <div className="ml-4 relative h-16 w-16 rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {/* Comment for image upload handling */}
          {/* In a real app, this would upload the image to a server/storage */}
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
