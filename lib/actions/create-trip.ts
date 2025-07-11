"use server"

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { redirect } from "next/navigation";

export async function createTrip(data: FormData) {

  const title = data.get("title")?.toString();
  const description = data.get("description")?.toString();
  const imageUrl = data.get("imageUrl")?.toString();
  const startDateStr = data.get("startDate")?.toString();
  const endDateStr = data.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("All fields are required");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const user = await currentUser();
  const authUserid = await prisma.user.findUnique({
    where: {
      clerkId: user?.id || ""
    },
  })

  try {
    await prisma.trip.create({
      data: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        startDate: startDate,
        endDate: endDate,
        user: {
          connect: {
            id: authUserid?.id
          }
        }
      }
    })
  }catch(error){
    console.log(error)
  }
  redirect("/trips")

  return { success: true, message: "Trip created successfully!" };

}