"use client";

import { Location } from "@/app/generated/prisma"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { Loader2 } from "lucide-react"

interface MapProps {
    itineraries: Location[]
}

export default function MapComponent({ itineraries }: MapProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });
    
    
    if (!isLoaded) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-sky-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading map...</p>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-center">
                    <p className="text-red-600 font-medium">Error loading map</p>
                    <p className="text-sm text-red-500 mt-1">Please check your internet connection and refresh the page</p>
                    <p className="text-xs text-gray-500 mt-2">API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Exists' : 'Missing'}</p>
                </div>
            </div>
        );
    }

    const center = itineraries.length > 0 ?{lat:itineraries[0].lat, lng: itineraries[0].lng} : {lat: 0, lng: 0};


    return (
        <GoogleMap mapContainerStyle={{width:"100%",height:"100%"}} center={center} zoom={10}>
          {
            itineraries.map((location) => (
                <Marker 
                    key={location.id} 
                    position={{ lat: location.lat, lng: location.lng }} 
                    title={location.locationTitle}
                />
            ))
          }
        </GoogleMap>
    )
}