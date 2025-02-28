
import { motion } from "framer-motion";
import { Button } from "src/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200"
          >
            Redefining Professional Connections
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Strategic Networking with Game Theory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-neutral-600 max-w-lg mx-auto md:mx-0"
          >
            PokerFace transforms networking by blending gamification, strategy, and intentionality to create meaningful professional connections.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8">
              Get Early Access
            </Button>
            <Button variant="outline" size="lg" className="rounded-full group border-neutral-300 hover:border-neutral-900">
              Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="relative z-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
              <div className="p-6 border-b border-neutral-100">
                <h3 className="font-medium text-lg">Networking Table #42</h3>
                <p className="text-sm text-neutral-500">4 participants · 2 spots available</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">John Doe</h4>
                      <p className="text-xs text-neutral-500">Investor · Blockchain</p>
                    </div>
                  </div>
                  <div className="bg-neutral-100 rounded-full px-3 py-1 text-xs font-medium">
                    3 cards hidden
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200">
                      <span className="text-sm font-medium">AS</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Alice Smith</h4>
                      <p className="text-xs text-neutral-500">Founder · AI Startup</p>
                    </div>
                  </div>
                  <div className="bg-neutral-100 rounded-full px-3 py-1 text-xs font-medium">
                    5 cards hidden
                  </div>
                </div>

                <div className="flex justify-center pt-4 space-x-3">
                  <Button variant="outline" size="sm" className="border-neutral-200 text-neutral-700">
                    Skip
                  </Button>
                  <Button size="sm" className="bg-neutral-900 hover:bg-neutral-800 text-white">
                    Request Reveal
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative cards */}
          <div className="absolute -top-6 -right-6 z-0 w-48 h-32 rounded-lg bg-neutral-100 border border-neutral-200 transform rotate-6"></div>
          <div className="absolute -bottom-6 -left-6 z-0 w-48 h-32 rounded-lg bg-neutral-100 border border-neutral-200 transform -rotate-6"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
