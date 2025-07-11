import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function TripsPage() {
  const user = await currentUser();
  const authUser =await prisma.user.findUnique({
    where: {
      clerkId: user?.id
    }
  })
  const trips=await prisma.trip.findMany({
    where: {
      userId: authUser?.id
    }
  })
  const sortedTrips=[...trips].sort((a,b)=>{
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  const today=new Date();
  today.setHours(0,0,0,0);

  const upcomingTrips=sortedTrips.filter((trip)=>{
    new Date(trip.startDate)>=today
  })

  return (
    <div className="space-y-6 px-4 py-8 container mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold text-sky-700">Dashboard</div>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back, {user?.firstName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{trips.length===0 ? "Start planning your next trip" : `You have ${trips.length} ${trips.length===1 ? "trip" : "trips"} planned ${upcomingTrips.length>0 ? `${upcomingTrips.length} upcoming` : ""}`}</p>
        </CardContent>
        <div>
          <h2 className="text-2xl font-semibold text-sky-700 mb-4">Your Recent Trips</h2>
          {
            trips.length===0 ? (
              <Card>
                <CardContent>
                  <h3>No trips found</h3>
                  <p>Start planning your next trip</p>
                  <Link href="/trips/new">
                    <Button>New Trip</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div>
                {sortedTrips.map((trip)=>(
                  <div key={trip.id}>
                    <p>{trip.title}</p>
                    <p>{trip.startDate.toString()}</p>
                    <p>{trip.endDate.toString()}</p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </Card>
    </div>
  );
}