'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setIsHidden(true);
        } else if (window.scrollY < lastScrollY) {
          // Scrolling up
          setIsHidden(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Mini Logo (appears when navbar is hidden) */}
      <div 
        className={`fixed left-4 top-4 z-50 transition-all duration-500 ${isHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/">
          <div className="relative w-12 h-12">
            <Image
              src="/logo.png"
              alt="Ticketo Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Main Navbar */}
      <header 
        className={`fixed w-full z-40 transition-all duration-500 ${isHidden ? '-translate-y-full' : 'translate-y-0'} ${isHovered ? 'translate-y-0' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo.png"
                    alt="Ticketo Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="ml-3 text-2xl font-bold text-white">
                  Ticketo
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-lg font-medium text-white/90 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <button className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Book Now
                </button>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden z-50 p-2 rounded-md focus:outline-none"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-lg font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}