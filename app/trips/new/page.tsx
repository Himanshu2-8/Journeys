"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function NewTrip() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 py-12 px-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="text-2xl font-extrabold text-sky-700 text-center pb-2 tracking-tight">Create a New Trip</CardHeader>
        <CardContent>
          <form className="space-y-7">
            <div>
              <label className="block text-sm font-bold mb-1 text-sky-700">Place</label>
              <input type="text" placeholder="Japan Trip.." name="title" className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-sky-700">Description</label>
              <Textarea placeholder="How do you plan your trip?" name="description" className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder-gray-400 min-h-[90px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1 text-sky-700">Start Date</label>
                <input type="date" placeholder="Start Date" name="startDate" className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-sky-700">End Date</label>
                <input type="date" placeholder="End Date" name="endDate" className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder-gray-400" />
              </div>
            </div>
            <Button type="submit" className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg shadow-md transition">Create Trip</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}