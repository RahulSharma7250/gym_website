"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";
import CountUp from "@/components/ui/CountUp";

gsap.registerPlugin(ScrollTrigger);

const POSTS = Array(9).fill(null).map((_, i) => ({
  id: i,
  name: ["MIKE T.", "SARAH J.", "ALEX W.", "CHRIS P."][Math.floor(Math.random() * 4)],
  workout: ["PR Squat 405lb", "Murph Completed", "10k Row", "MMA Sparring"][Math.floor(Math.random() * 4)],
  reactions: Math.floor(Math.random() * 50) + 10,
  initials: ["MT", "SJ", "AW", "CP"][Math.floor(Math.random() * 4)],
  color: ["from-fire-red to-black", "from-[#FFAA00] to-black", "from-fire-orange to-black"][Math.floor(Math.random() * 3)]
}));

export default function CommunityPage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });
      gsap.from(".post-card", {
        scrollTrigger: { trigger: ".feed-container", start: "top 85%" },
        y: 100, opacity: 0, rotateX: 10, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24">
        
        <div className="pt-40 px-6 text-center relative z-10 hero-text mb-16">
          <h1 className="font-bebas text-7xl md:text-9xl text-white">JOIN THE FIRE FAMILY</h1>
        </div>

        {/* Stats Row */}
        <div className="w-full bg-[#0a0500] border-y border-smoke py-8 mb-20 flex justify-center gap-12 flex-wrap px-6">
          <div className="text-center font-bebas">
             <div className="text-4xl text-fire-orange"><CountUp end={500} suffix="+" /></div>
             <div className="text-white tracking-widest text-lg">MEMBERS</div>
          </div>
          <div className="text-center font-bebas">
             <div className="text-4xl text-fire-orange"><CountUp end={10} suffix="K+" /></div>
             <div className="text-white tracking-widest text-lg">WORKOUTS</div>
          </div>
          <div className="text-center font-bebas">
             <div className="text-4xl text-fire-orange"><CountUp end={4.9} duration={1} /></div>
             <div className="text-white tracking-widest text-lg">RATING</div>
          </div>
        </div>

        {/* Feed */}
        <div className="feed-container max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{perspective:"1000px"}}>
           {POSTS.map((post) => (
             <div key={post.id} className="post-card bg-[#120800] p-6 border border-white/5 hover:border-fire-orange/40 transition-colors clip-diagonal">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                     <span className="font-bebas text-white mix-blend-overlay">{post.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-barlow-condensed font-bold text-white tracking-wide">{post.name}</h4>
                    <span className="text-xs text-gray-500 font-barlow">2 hours ago</span>
                  </div>
                </div>
                <p className="font-barlow text-gray-300 mb-4 bg-black/40 p-4 border-l-2 border-fire-orange italic">Logged: {post.workout}</p>
                <div className="flex justify-between items-center text-sm font-barlow text-gray-500">
                  <span className="flex items-center gap-1 hover:text-fire-orange cursor-pointer"><span className="text-fire-orange">🔥</span> {post.reactions}</span>
                  <span className="cursor-pointer hover:text-white">Comment</span>
                </div>
             </div>
           ))}
        </div>

      </main>
    </PageTransition>
  );
}
