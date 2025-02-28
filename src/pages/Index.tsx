
import { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import ProfileCard from "src/components/ProfileCard";
import FeatureCard from "src/components/FeatureCard";
import Hero from "src/components/Hero";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 mx-auto space-y-24 pt-8 md:pt-12 max-w-7xl">
        <Hero />

        <section id="features" className="py-12">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm uppercase tracking-wider text-neutral-600 mb-2"
            >
              Transforming Professional Connections
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Key Features
            </motion.h2>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={item}>
              <FeatureCard 
                title="High-Stakes Mode" 
                description="Premium feature revealing only the top 3 most relevant people at events"
                iconName="zap"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard 
                title="Project Cards" 
                description="Create cards for projects or opportunities with goals, needs, and keywords"
                iconName="layout-grid"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard 
                title="Collaboration Board" 
                description="Unlock a shared workspace when users mutually reveal project cards"
                iconName="users"
              />
            </motion.div>
            <motion.div variants={item}>
              <FeatureCard 
                title="Bluffing Mechanism" 
                description="Signal expertise while keeping specific details hidden to create intrigue"
                iconName="eye-off"
              />
            </motion.div>
          </motion.div>
        </section>

        <section id="personas" className="py-12">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm uppercase tracking-wider text-neutral-600 mb-2"
            >
              Designed For Everyone
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Who Benefits
            </motion.h2>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item}>
              <ProfileCard 
                title="Investors" 
                description="Efficient deal flow, streamlined due diligence, and access to a curated network of experts"
                iconName="briefcase"
              />
            </motion.div>
            <motion.div variants={item}>
              <ProfileCard 
                title="Founders" 
                description="Targeted exposure, collaboration opportunities, and a platform to showcase projects"
                iconName="rocket"
              />
            </motion.div>
            <motion.div variants={item}>
              <ProfileCard 
                title="Experts" 
                description="Marketplace to offer fractional services, build reputation, and connect with clients"
                iconName="brain"
              />
            </motion.div>
          </motion.div>
        </section>

        <section id="roadmap" className="py-12">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm uppercase tracking-wider text-neutral-600 mb-2"
            >
              Our Vision
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight"
            >
              Development Roadmap
            </motion.h2>
          </div>

          <div className="space-y-12 max-w-3xl mx-auto">
            <RoadmapItem 
              phase="Phase 1"
              title="Core Networking Mechanics"
              features={[
                "Public profiles with hidden cards",
                "QR scan to join tables",
                "Skill/project matching & partial reveals",
                "Request to reveal more (betting rounds)",
                "Basic notifications"
              ]}
            />
            <RoadmapItem 
              phase="Phase 2"
              title="Gamified Quizzes & Discovery"
              features={[
                "Interactive quizzes",
                "Quiz-based matching",
                "Profile enhancements (quiz results as cards)"
              ]}
            />
            <RoadmapItem 
              phase="Phase 3"
              title="Project Collaboration & Organization"
              features={[
                "Project cards",
                "Collaboration board",
                "Project discovery"
              ]}
            />
            <RoadmapItem 
              phase="Phase 4"
              title="Advanced Gamification & Event Modes"
              features={[
                "Streaks & rewards",
                "Leaderboards",
                "Achievements & badges",
                "Event modes (speed networking, deep dive, team formation)"
              ]}
            />
            <RoadmapItem 
              phase="Phase 5"
              title="High-Stakes Features"
              features={[
                "High-stakes mode",
                "Bluffing mechanism",
                "Showdown mode",
                "Notification bidding"
              ]}
            />
          </div>
        </section>

        <section id="cta" className="py-16">
          <div className="bg-neutral-100 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm border border-neutral-200">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Ready to Transform Your Networking?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-neutral-600 mb-8 max-w-2xl mx-auto"
            >
              Join PokerFace Networking to experience a gamified, engaging, and intentional networking approach that goes beyond traditional platforms.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8">
                Join the Waitlist
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const RoadmapItem = ({ phase, title, features }: { phase: string; title: string; features: string[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row gap-6"
    >
      <div className="md:w-1/4">
        <div className="bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-center md:text-left">
          <p className="text-sm text-neutral-600">{phase}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="md:w-3/4">
        <ul className="space-y-2 pl-5 list-disc text-neutral-700">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Index;
