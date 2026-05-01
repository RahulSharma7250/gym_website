"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen relative">
        {children}
        
        {/* Fire Wipe Transition */}
        <motion.div
          className="fixed inset-0 z-[99999] bg-fire-red pointer-events-none origin-bottom"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="fixed inset-0 z-[99998] bg-fire-orange pointer-events-none origin-bottom"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
