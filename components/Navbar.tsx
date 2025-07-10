import Image from "next/image"
import Link from "next/link"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { User } from "@clerk/nextjs/server"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50/50 transition-all duration-300"
  >
    {children}
  </Link>
);

export const Navbar = ({ user }: { user: User | null }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md py-3 border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 hover:shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-4 lg:px-8">
        <Link href={"/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 flex-shrink-0">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} className="rounded-full shadow-sm" />
          <span className="text-xl font-bold tracking-tight hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 animate-gradient bg-300% bg-animate-gradient hover:from-pink-500 hover:to-purple-600 transition-all duration-500">
            Journeys
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {user && (
            <>
              <NavLink href="/trips">My Trips</NavLink>
              <NavLink href="/globe">Globe</NavLink>
            </>
          )}
          <SignedOut>
            <div className="ml-6">
              <SignInButton>
                <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="ml-6">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 ring-2 ring-sky-500/30 hover:ring-sky-500/50 transition-all duration-300',
                    userButtonAvatarBox: 'w-full h-full',
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}