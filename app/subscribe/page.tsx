"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "@/components/layout/PageTransition";
import EmberParticles from "@/components/ui/EmberParticles";
import AngleButton from "@/components/ui/AngleButton";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: "DO I NEED TO BE EXPERIENCED?", a: "No. You just need to be willing to suffer and learn." },
  { q: "IS THERE A CANCELLATION FEE?", a: "Cancel anytime before your next billing cycle. No fees." },
  { q: "WHAT'S IN THE NUTRITION PLAN?", a: "Custom macros, meal suggestions tailored to your goals and output." }
];

export default function SubscribePage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const pricesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", { y: -50, opacity: 0, duration: 1, delay: 0.8 });
      gsap.from(".pricing-tier", {
        scrollTrigger: { trigger: pricesRef.current, start: "top 80%" },
        y: 100, opacity: 0, rotateX: 10, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <main ref={containerRef} className="min-h-screen bg-deep-black pb-24 text-white">
        
        {/* Full bg fire blur + embers */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(255,34,0,0.3)_0%,transparent_70%)] pointer-events-none" />
         <div className="absolute inset-x-0 top-0 h-[60vh] z-0 pointer-events-none">
            <EmberParticles />
         </div>

        <div className="pt-40 px-6 text-center relative z-10 hero-text mb-16">
          <h1 className="font-bebas text-7xl md:text-9xl text-white">IGNITE YOUR <span className="text-fire-orange">JOURNEY</span></h1>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16 relative z-10">
           <span className={`font-barlow-condensed font-bold tracking-widest ${!annual ? 'text-fire-orange' : 'text-gray-500'}`}>MONTHLY</span>
           <button 
             onClick={() => setAnnual(!annual)}
             className="w-16 h-8 bg-black border-2 border-fire-orange rounded-full relative transition-colors"
           >
             <div className={`w-5 h-5 bg-fire-orange rounded-full absolute top-1 transition-all ${annual ? 'left-9' : 'left-1'}`} />
           </button>
           <span className={`font-barlow-condensed font-bold tracking-widest ${annual ? 'text-fire-orange' : 'text-gray-500'}`}>
             ANNUAL <span className="text-fire-red text-xs absolute ml-2 -mt-2">SAVE 20%</span>
           </span>
        </div>

        {/* Pricing Layout */}
        <div ref={pricesRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 perspective-[1000px]">
           {[
             { name: "STARTER", price: annual ? Math.floor(2499*12*0.8) : 2499 },
             { name: "PRO", price: annual ? Math.floor(4999*12*0.8) : 4999, pop: true },
             { name: "ELITE", price: annual ? Math.floor(8999*12*0.8) : 8999 }
           ].map((tier, i) => (
              <div key={tier.name} className={`pricing-tier bg-[#0a0500] p-8 clip-diagonal flex flex-col relative ${tier.pop ? 'border-2 border-fire-orange md:scale-110 shadow-2xl z-20' : 'border border-white/10 hover:border-fire-orange/50'}`}>
                 {tier.pop && <div className="absolute top-0 right-0 bg-fire-orange text-black font-barlow-condensed font-bold text-xs tracking-widest px-3 py-1 clip-diagonal">MOST POPULAR</div>}
                 <h2 className="font-bebas text-4xl mb-4">{tier.name}</h2>
                 <div className="font-bebas text-7xl text-white mb-8 flex items-end leading-none">
                    <span className="text-3xl text-fire-orange mb-2 mr-1">₹</span>
                    {/* Key changes trigger React render replacing element, allowing simple framer motion jump */}
                    <AnimatePresence mode="popLayout">
                        <motion.span 
                          key={tier.price}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >{tier.price}</motion.span>
                    </AnimatePresence>
                    <span className="font-barlow text-sm text-gray-500 mb-2 ml-2">/{annual ? 'yr' : 'mo'}</span>
                 </div>
                 <ul className="space-y-4 font-barlow text-gray-300 mb-10 flex-1">
                    <li className="flex gap-2"><span className="text-fire-orange">✓</span> Advanced Training Facility</li>
                    <li className="flex gap-2"><span className="text-fire-orange">✓</span> Locker Room Access</li>
                    {(i > 0) && <li className="flex gap-2"><span className="text-fire-orange">✓</span> Full Class Access</li>}
                    {(i > 1) && <li className="flex gap-2"><span className="text-fire-orange">✓</span> Weekly PT Session</li>}
                 </ul>
                 <AngleButton label="JOIN NOW" variant={tier.pop ? 'primary' : 'outline'} className="w-full text-center" />
              </div>
           ))}
        </div>

        {/* FAQ Area */}
        <div className="max-w-3xl mx-auto px-6 mt-32 relative z-10">
           <h2 className="font-bebas text-6xl text-center mb-12">FAQ</h2>
           <div className="space-y-4">
             {FAQS.map((faq, i) => (
                <div key={i} className="border border-white/10 bg-black/50 p-6 clip-diagonal">
                  <button className="w-full text-left font-bebas text-2xl flex justify-between items-center" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                     {faq.q}
                     <span className={`text-fire-orange transition-transform duration-300 ${openFaq===i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                     {openFaq === i && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden"
                       >
                         <p className="font-barlow text-gray-400 mt-4 leading-relaxed">{faq.a}</p>
                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
             ))}
           </div>
        </div>

      </main>
    </PageTransition>
  );
}
