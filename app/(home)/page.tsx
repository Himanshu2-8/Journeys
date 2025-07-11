import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] px-8 flex items-center justify-between bg-gradient-to-br from-sky-200 via-blue-300 to-blue-500 overflow-hidden">
        <div className="max-w-4xl z-10">
          <h1 className="text-6xl font-extrabold text-blue-900 mb-6 mt-4 drop-shadow-lg">
            With{" "}
            <span className="text-sky-600" style={{ fontWeight: "800" }}>
              Journeys
            </span>
          </h1>
          <h2 className="text-5xl font-bold text-blue-900 mb-10 drop-shadow">
            Uncover the world, one journey at a time.
          </h2>
          <p className="text-lg text-blue-900/80 mb-8 max-w-xl">
            Turn your travel dreams into a plan — and your plan into a memory.
          </p>
          <Link href="/trips/new" className="mt-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-blue-700 transition-all font-bold text-lg inline-block">
            Create Your Journey
          </Link>
        </div>
        <div className="absolute right-0 bottom-0 z-0 hidden md:block">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="200"
              cy="200"
              r="200"
              fill="url(#paint0_radial_1_2)"
              fillOpacity="0.3"
            />
            <defs>
              <radialGradient
                id="paint0_radial_1_2"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="translate(200 200) scale(200)"
              >
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#2563eb" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        {/* Wave SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full z-10"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e0f2fe"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,229.3C672,224,768,160,864,133.3C960,107,1056,117,1152,144C1248,171,1344,213,1392,234.7L1440,256L1440,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Title Section */}
      <div className="flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Explore Destinations
        </h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Discover hidden gems, plan dream getaways, and explore unforgettable
          places.
        </p>
      </div>

      <div className="flex justify-between container mx-auto px-8 pb-20 gap-6">
        <div className="w-1/4 text-center">
          <Image
            src="/NewYork.jpg"
            alt="New York"
            width={300}
            height={200}
            className="rounded-xl object-cover"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">New York</p>
        </div>

        <div className="w-1/4 text-center">
          <Image
            src="/Delhi.jpg"
            alt="Delhi"
            width={300}
            height={200}
            className="rounded-xl object-cover"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">Delhi</p>
        </div>

        <div className="w-1/4 text-center">
          <Image
            src="/Paris.jpg"
            alt="Paris"
            width={300}
            height={200}
            className="rounded-xl object-cover"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">Paris</p>
        </div>

        <div className="w-1/4 text-center">
          <Image
            src="/Tokyo.jpg"
            alt="Tokyo"
            width={300}
            height={200}
            className="rounded-xl object-cover"
          />
          <p className="mt-2 text-lg font-semibold text-gray-800">Tokyo</p>
        </div>
      </div>
      <section className="py-20 bg-blue-100 text-center px-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          Plan Your Next Trip
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Add your destination, location, and things you want to do — we’ll showcase your dream itinerary.
        </p>
        <Link href="/trips/new" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Add a New Plan
        </Link>
        
      </section>
      <footer className="bg-blue-950 text-white py-8 text-center">
        <p className="mb-2">© 2025 Journeys. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
