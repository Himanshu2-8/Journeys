"use client"

import { Button } from "./ui/button"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { addLocation } from "@/lib/actions/addLocation"

export default function NewLocationClient({ tripId }: { tripId: string }) {
    const [isPending, startTransition] = useTransition();
    return (
        <div className="container flex items-center mx-auto min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 py-12 px-4">
            <div className="w-full max-w-lg mx-auto">
                <div className="p-8 shadow-lg rounded-b-lg bg-white/80 backdrop-blur-sm">
                    <h1>Add Location</h1>
                    <form className="space-y-6" action={(formData: FormData)=>{
                        startTransition(()=>{
                            addLocation(formData, tripId)
                        })
                    }}>
                        <div>
                            <label className="block text-sm font-bold mb-1 text-sky-700">Address</label>
                            <input type="text" name="address" required className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition placeholder-gray-400"/>
                        </div>
                        <Button type="submit" disabled={isPending} className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg shadow-md transition">{isPending ? <Loader2 className="animate-spin"/> : "Add Location"}</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}