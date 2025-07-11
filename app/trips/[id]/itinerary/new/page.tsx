import { Navbar } from "@/components/Navbar";
import NewLocationClient from "@/components/NewLocationCliend";

export default async function NewLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <Navbar user={null} />
      <NewLocationClient tripId={id} />
    </div>
  )
}   