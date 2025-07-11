"use server"

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geoCodeAddress(address: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data=await response.json();
    const {lat,lng}=data.results[0].geometry.location;
    return {lat,lng};
}

export async function addLocation(formData: FormData, tripId: string) {
    const user = await currentUser();
    if (!user) {
        throw new Error("Unauthorized")
    }
    const address = formData.get("address") as string;
    if (!address) {
        throw new Error("Address is required")
    }
    const {lat,lng}=await geoCodeAddress(address);

    const count=await prisma.location.count({
        where:{
            tripId
        }
    })
    
    await prisma.location.create({
        data:{
            locationTitle: address,
            lat,
            lng,
            tripId,
            order:count
        }
    })
    redirect(`/trips/${tripId}`)
}
