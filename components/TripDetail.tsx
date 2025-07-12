"use client"

import { Trip, Location } from "@/app/generated/prisma"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Calendar, MapPin, Clock, CalendarDays, Map, List, PlusCircle, HomeIcon } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { useState } from "react"
import MapComponent from "@/components/MapComponent"

export type TripWithLocations = Trip & {
  locations: Location[]
}

interface TripDetailProps {
  trip: TripWithLocations
}

export default function TripDetail({ trip }: TripDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const tripDuration = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  console.log(trip.locations)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Image and Title */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-md">
          {trip.imageUrl ? (
            <div className="h-64 md:h-80 w-full relative">
              <Image
                src={trip.imageUrl}
                alt={trip.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{trip.title}</h1>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-5 h-5" />
                      <span>{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{tripDuration} {tripDuration === 1 ? 'Day' : 'Days'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-40 bg-sky-100 flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-sky-700 mb-2">{trip.title}</h1>
                <div className="flex items-center justify-center gap-4 text-sky-700">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-5 h-5" />
                    <span>{trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{tripDuration} {tripDuration === 1 ? 'Day' : 'Days'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Card className="shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex border-b border-gray-200 px-6 pt-2">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 text-gray-500 hover:text-sky-600 transition-colors"
              >
                <List className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="itinerary"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 text-gray-500 hover:text-sky-600 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                Itinerary
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-sky-500 data-[state=active]:text-sky-700 text-gray-500 hover:text-sky-600 transition-colors"
              >
                <Map className="w-4 h-4" />
                Map View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-sky-800 mb-4">Trip Summary</h2>
                  {trip.description && (
                    <div className="prose max-w-none text-gray-700 mb-6">
                      {trip.description}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <h3 className="font-semibold text-sky-700">Trip Details</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="w-5 h-5 text-sky-600" />
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="font-medium">{tripDuration} {tripDuration === 1 ? 'Day' : 'Days'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-sky-600" />
                          <div>
                            <p className="text-sm text-gray-500">Starts</p>
                            <p className="font-medium">{trip.startDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-sky-600" />
                          <div>
                            <p className="text-sm text-gray-500">Ends</p>
                            <p className="font-medium">{trip.endDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <h3 className="font-semibold text-sky-700">Quick Actions</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Link
                          href={`/trips/${trip.id}/itinerary/new`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors"
                        >
                          <PlusCircle className="w-5 h-5 text-sky-600" />
                          <span>Add a Location</span>
                        </Link>
                        <div className="flex flex-col gap-4 mt-2 bg-sky-50 border border-sky-100 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <HomeIcon className="w-5 h-5 text-sky-600" />
                            <span className="font-semibold text-sky-700 text-lg">Destinations</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trip.locations.map((location) => (
                              <div key={location.id} className="flex items-center gap-2 p-4 bg-white/80 rounded-lg shadow-sm border border-gray-100">
                                <MapPin className="w-4 h-4 text-sky-600" />
                                <span className="font-medium text-gray-700">{location.locationTitle}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {
                  trip.locations.length > 0 ? (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-sky-800 mb-4">Itinerary</h2>
                      {trip.locations.map((location) => (
                        <div key={location.id} className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-md rounded-lg shadow hover:shadow-lg transition-shadow">
                          <MapPin className="w-8 h-8 text-sky-600" />
                          <div>
                            <h3 className="font-semibold text-sky-700">{location.locationTitle}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <MapPin className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Itinerary Yet</h3>
                      <p className="text-gray-500 mb-6 max-w-md">Start building your trip by adding locations to your itinerary</p>
                      <Link
                        href={`/trips/${trip.id}/itinerary/new`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Your First Location
                      </Link>
                    </div>
                  )
                }

              </div>
            </TabsContent>

            <TabsContent value="map" className="p-6">
              <div className="h-96 rounded-lg overflow-hidden shadow">
                <MapComponent itineraries={trip.locations} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}