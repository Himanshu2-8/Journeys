import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripsPage() {
  return (
    <div className="space-y-6 px-4 py-8 container mx-auto">
      <div>Dashboard</div>
      <Link href="/trips/new">
        <Button>New Trip</Button>
      </Link>
    </div>
  );
}