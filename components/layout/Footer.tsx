"use client";

import Link from "next/link";
import AngleButton from "@/components/ui/AngleButton";

export default function Footer() {
  return (
    <footer className="bg-deep-black text-white py-16 border-t border-smoke relative overflow-hidden clip-diagonal mt-20">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,34,0,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="font-bebas text-3xl tracking-wide">INFERNO</span>
              <span className="font-bebas text-fire-orange text-3xl tracking-wide">GYM</span>
            </Link>
            <p className="font-barlow text-sm text-gray-400 mb-6">
              Forging champions since 2014. Burn everything that holds you back.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              {["IG", "FB", "YT", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-smoke flex items-center justify-center hover:border-fire-orange hover:text-fire-orange transition-colors font-barlow-condensed font-bold text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-barlow-condensed font-bold tracking-widest text-fire-orange mb-6">EXPLORE</h4>
            <ul className="space-y-3 font-barlow text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
              <li><Link href="/coaches" className="hover:text-white transition-colors">Coaches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-barlow-condensed font-bold tracking-widest text-fire-orange mb-6">SUPPORT</h4>
            <ul className="space-y-3 font-barlow text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-barlow-condensed font-bold tracking-widest text-fire-orange mb-6">STAY IGNITED</h4>
            <p className="font-barlow text-sm text-gray-400 mb-4">
              Subscribe to get the latest routines and nutrition plans.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-smoke border border-ash text-white px-4 py-3 font-barlow text-sm focus:outline-none focus:border-fire-orange transition-colors"
              />
              <AngleButton label="SUBSCRIBE" className="w-full text-center" />
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-smoke flex flex-col md:flex-row items-center justify-between font-barlow text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Inferno Gym. All rights reserved.</p>
          <p>Built completely without fear.</p>
        </div>
      </div>
    </footer>
  );
}
