import TripDetail from "@/components/TripDetail";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function TripPage({params}:{params:Promise<{id:string}>}) {
    const user=await currentUser();
    const authUser=await prisma.user.findUnique({
        where: {
            clerkId: user?.id
        }
    })
    if(!user){
        <div>Please login to view this page</div>
    }
    const {id}=await params;
    const trip=await prisma.trip.findFirst({
        where: {
            id,
            userId: authUser?.id
        },
        include: {
            locations: true
        }
    })
    if(!trip){
        <div>Trip not found</div>
    }
    return <div>
        {trip && <TripDetail trip={trip}/>}
    </div>
}