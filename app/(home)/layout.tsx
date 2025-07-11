import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (user) {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      }
    })

    if (!loggedInUser && user.emailAddresses[0]?.emailAddress) {
      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {},
        create: {
          clerkId: user.id,
          name: user.fullName || "",
          email: user.emailAddresses[0].emailAddress,
        }
      })
    }
    redirect("/trips")
  }

  return (
    <div>
      <Navbar user={user}/>
      {children}
    </div>
  )
}

export default layout;