"use client";

import Image from "next/image";

export default function HomePage() {
  const events = [
    {
      id: 1,
      title: "AVON conference",
      location: "Torwar, Warsaw",
      date: "July 29, 2023",
      image: "/images/event1.jpg",
    },
    {
      id: 2,
      title: "Halo Design #10",
      location: "Miquido, Kraków",
      date: "June 20, 2023",
      image: "/images/event2.jpg",
    },
    {
      id: 3,
      title: "#ProductCon",
      location: "Eventim Apollo, London",
      date: "Feb 1, 2023",
      image: "/images/event3.jpg",
    },
    {
      id: 4,
      title: "Techno Festival",
      location: "ICE Kraków",
      date: "Aug 10, 2023",
      image: "/images/event4.jpg",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-purple-300">◆</span> Event Sphere
          </div>
          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#" className="hover:text-purple-300 transition">
              Calendar
            </a>
            <a href="#" className="hover:text-purple-300 transition">
              Artists
            </a>
            <a href="#" className="hover:text-purple-300 transition">
              Festivals
            </a>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:inline px-4 py-2 text-sm font-medium hover:text-purple-300">
              Log in
            </button>
            <button className="px-5 py-2 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition">
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero-bg.jpg"
          alt="Crowd"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="uppercase text-pink-400 font-semibold mb-2">
            See what’s happening
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover a world of unforgettable events
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            Explore a diverse range of events and experiences that cater to your
            interests. From music festivals to tech conferences, find it all in
            one place.
          </p>

          {/* Search Filters */}
          <div className="bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0">
            <input
              type="text"
              placeholder="What"
              className="flex-1 px-5 py-3 rounded-full focus:outline-none"
            />
            <input
              type="text"
              placeholder="Where"
              className="flex-1 px-5 py-3 rounded-full focus:outline-none"
            />
            <input
              type="date"
              className="flex-1 px-5 py-3 rounded-full focus:outline-none"
            />
            <select className="flex-1 px-5 py-3 rounded-full focus:outline-none">
              <option>Select type</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Conference</option>
            </select>
            <button className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition">
              Find events
            </button>
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Most popular</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-sm text-gray-400 mb-3">{event.date}</p>
                <button className="bg-purple-100 text-purple-700 font-medium px-4 py-1 rounded-full hover:bg-purple-200 transition">
                  Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
