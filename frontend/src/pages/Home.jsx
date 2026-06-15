import MainLayout from "../layouts/MainLayout";
import FeatureCard from "../components/FeatureCard";
import SOSButton from "../components/SOSButton";
import TrustSection from "../components/TrustSection";
import { motion } from "framer-motion";

import { Users, ShieldAlert, BookOpen } from "lucide-react";

function Home() {
  return (
    <MainLayout>
      <div className="p-8">
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            Empowering Women Daily
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Protection At Every Step
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Manage emergency contacts, record SOS events, and access critical
            safety resources from one secure platform.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              Get Started
            </button>

            <button className="border px-6 py-3 rounded-xl">Learn More</button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Users size={32} color="#7C1D3D" />}
            title="Emergency Contacts"
            description="Manage trusted contacts and keep them ready during emergencies."
          />

          <FeatureCard
            icon={<ShieldAlert size={32} color="#7C1D3D" />}
            title="SOS Tracking"
            description="Record SOS events and maintain location logs securely."
          />

          <FeatureCard
            icon={<BookOpen size={32} color="#7C1D3D" />}
            title="Safety Resources"
            description="Access helplines, guides, and essential safety information."
          />
        </div>
        <SOSButton />
        <TrustSection />
      </div>
    </MainLayout>
  );
}

export default Home;
