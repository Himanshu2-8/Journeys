import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { User } from "@clerk/nextjs/server";
import { Navbar } from "@/components/Navbar";

export default async function TripsPage() {
  const user = await currentUser();
  const authUser = await prisma.user.findUnique({
    where: {
      clerkId: user?.id
    }
  })
  const trips = await prisma.trip.findMany({
    where: {
      userId: authUser?.id
    }
  })
  const sortedTrips = [...trips].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter((trip) => {
    new Date(trip.startDate) >= today
  })

  return (
    <div>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-sky-700">Your Trips</h1>
            <Link href="/trips/new">
              <Button className="bg-sky-600 hover:bg-sky-700">New Trip</Button>
            </Link>
          </div>

          <Card className="w-full shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-md mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-extrabold text-sky-700">Welcome Back, {user?.firstName}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {trips.length === 0
                  ? "Start planning your next adventure"
                  : `You have ${trips.length} ${trips.length === 1 ? 'trip' : 'trips'} planned${upcomingTrips.length > 0 ? `, with ${upcomingTrips.length} coming up soon!` : '.'}`
                }
              </p>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-sky-700 mb-6">Your Recent Trips</h2>
            {trips.length === 0 ? (
              <Card className="shadow-2xl rounded-2xl border-0 bg-white/90 backdrop-blur-md">
                <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <h3 className="text-xl font-bold text-sky-700 mb-3">No trips found</h3>
                  <p className="text-gray-600 mb-6 max-w-md">Start planning your next adventure by creating your first trip</p>
                  <Link href="/trips/new">
                    <Button className="bg-sky-600 hover:bg-sky-700">Create Your First Trip</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTrips.slice(0, 6).map((trip, key) => (
                  <Link key={key} href={`/trips/${trip.id}`} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:border-sky-200 border-0 bg-white/90 backdrop-blur-md overflow-hidden">
                      <div className="h-40 bg-sky-100 flex items-center justify-center">
                        {trip.imageUrl ? (
                          <img
                            src={trip.imageUrl}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sky-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                              <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-sky-800 line-clamp-1">{trip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{trip.description || 'No description provided'}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}