"use client"; // This is a Client Component

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Sample event data
  const events = [
    {
      id: 1,
      title: "Colombo International Jazz Festival",
      date: "2023-12-15",
      location: "Colombo",
      category: "Music",
      price: 2500,
      image: "/images/jazz-festival.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Galle Literary Festival",
      date: "2024-01-20",
      location: "Galle",
      category: "Literature",
      price: 1500,
      image: "/images/literary-festival.jpg",
    },
    {
      id: 3,
      title: "Kandy Perahera",
      date: "2024-02-10",
      location: "Kandy",
      category: "Cultural",
      price: 3000,
      image: "/images/perahera.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "Lanka Premier League Cricket",
      date: "2024-03-05",
      location: "Colombo",
      category: "Sports",
      price: 2000,
      image: "/images/cricket.jpg",
    },
    {
      id: 5,
      title: "Baila Night with Desmond De Silva",
      date: "2024-01-12",
      location: "Negombo",
      category: "Music",
      price: 1800,
      image: "/images/baila.jpg",
    },
    {
      id: 6,
      title: "Ananda Drama Festival",
      date: "2024-02-22",
      location: "Colombo",
      category: "Theater",
      price: 1200,
      image: "/images/drama.jpg",
    },
    {
      id: 7,
      title: "In the Moment",
      date: "2025-10-02",
      location: "Negombo",
      category: "Music",
      price: 4500,
      image: "/images/drama.jpg",
    },
    {
      id: 8,
      title: "7s' Rugby Legue",
      date: "2025-10-02",
      location: "Colombo",
      category: "Sports",
      price: 1500,
      image: "/images/drama.jpg",
    },
  ];

  const categories = [
    "All",
    "Music",
    "Sports",
    "Cultural",
    "Theater",
    "Literature",
  ];
  const locations = ["All", "Colombo", "Kandy", "Galle", "Negombo", "Jaffna"];

  const featuredEvents = events.filter((event) => event.featured);
  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      activeCategory === "All" || event.category === activeCategory;
    const locationMatch =
      locationFilter === "All" || event.location === locationFilter;
    return categoryMatch && locationMatch;
  });

  return (
    <>
      <Head>
        <title>Ticketo - Sri Lanka's Premier Ticket Booking Platform</title>
        <meta
          name="description"
          content="Book tickets for events across Sri Lanka"
        />
      </Head>

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt="Sri Lanka background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full text-white min-h-screen flex items-center py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className=" md:w-1/2  mt-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Experience Sri Lanka's Best Events
                </h1>
                <p className="text-xl mb-10">
                  Book tickets for concerts, sports, and cultural events{" "}
                  <br></br> across the island
                </p>
                <button className="mb-30 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-full transition duration-300">
                  Explore Events
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="mb-26 bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                  <h3 className="text-xl font-semibold mb-4">
                    Featured Events
                  </h3>
                  <div className="space-y-4">
                    {featuredEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition duration-300"
                      >
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm">
                          {event.date} • {event.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with semi-transparent background */}
        <div className="bg-white/90 backdrop-blur-sm w-full">
          {/* Categories Section */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Browse by Category
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full transition ${
                      activeCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 hover:bg-gray-300 shadow-md"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Location Filter */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Filter by Location
                </h3>
                <div className="flex flex-wrap gap-3">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setLocationFilter(location)}
                      className={`px-4 py-1 rounded-full text-sm transition ${
                        locationFilter === location
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* REPLACE THE ENTIRE EVENTS GRID SECTION WITH THIS NEW CODE */}
              {/* Events Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Event Image */}
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.location}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-gray-900">
                          LKR {event.price.toLocaleString()}
                        </span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* END OF REPLACED SECTION */}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    No events found matching your filters
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setLocationFilter("All");
                    }}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Call to Action */}
          {/* <section className="bg-blue-600/90 text-white py-16 px-4 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Are you an event organizer?
              </h2>
              <p className="text-xl mb-8">
                List your events on Ticketo and reach thousands of potential
                attendees
              </p>
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default HomePage;
