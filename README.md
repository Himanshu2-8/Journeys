# Journeys - Travel Planner

**Journeys** is a full-stack web application designed to help users plan and visualize their travel itineraries. With an intuitive interface, users can create detailed trip plans, add multiple destinations, and view their entire journey on an interactive map. The application is built with Next.js and leverages a robust stack of modern technologies to deliver a seamless and engaging user experience.

## Key Features

- **User Authentication**: Secure user registration and login functionality provided by Clerk, ensuring that each user's travel plans are private and accessible only to them.
- **Trip Creation and Management**: Users can create new trips by providing essential details such as a title, description, and travel dates. All trips are saved and can be viewed and managed from a central dashboard.
- **Interactive Map Integration**: The application integrates with the Google Maps API to display trip locations on an interactive map. Each destination is marked, providing a clear visual representation of the travel itinerary.
- **Dynamic Itinerary Planning**: For each trip, users can add multiple locations. The application dynamically fetches coordinates for each address and plots them on the map.
- **Image Uploads**: Users can upload cover images for their trips, adding a personal touch to each plan. This feature is powered by UploadThing, a reliable and efficient file-uploading service.
- **Responsive Design**: The application is fully responsive and designed to work seamlessly across devices of all sizes, from desktops to mobile phones.

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: UploadThing
- **Mapping**: Google Maps API
- **Styling**: Tailwind CSS with custom UI components
