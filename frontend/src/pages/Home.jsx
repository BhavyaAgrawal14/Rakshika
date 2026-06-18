import MainLayout from "../layouts/MainLayout";
import FeatureCard from "../components/FeatureCard";
import SOSButton from "../components/SOSButton";
import TrustSection from "../components/TrustSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroLogo from "../assets/logo/rakshika-logo.svg";

import {
  Users,
  ShieldAlert,
  BookOpen,
  ShieldCheck,
  Lock,
  Network,
  Clock,
  ArrowRight,
} from "lucide-react";

function Home() {
  const { user } = useAuth();
  return (
    <MainLayout>
      <div className="px-6 md:px-12 py-8 lg:py-10 max-w-7xl mx-auto">
        {/* NEW HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh] mb-0">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            {/* Brand Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{
                borderColor: "rgba(212, 175, 55, 0.4)",
                backgroundColor: "rgba(212, 175, 55, 0.05)",
              }}
            >
              <ShieldCheck size={16} color="var(--rak-gold)" />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "var(--rak-primary)" }}
              >
                Intelligent Personal Safety Platform
              </span>
            </div>

            {/* Headline & Subtitle */}
            {user && (
              <h2
                className="text-2xl font-medium mb-3"
                style={{ color: "var(--rak-secondary)" }}
              >
                Welcome back, {user.name}
              </h2>
            )}

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              style={{ color: "var(--rak-primary)" }}
            >
              YOUR SAFETY.
              <br />
              <span style={{ color: "var(--rak-secondary)" }}>
                YOUR STRENGTH.
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl max-w-xl mb-10 opacity-80 leading-relaxed font-medium"
              style={{ color: "var(--rak-text)" }}
            >
              Stay connected, protected, and prepared with an intelligent safety
              companion designed to provide instant access to trusted contacts,
              emergency assistance, and critical safety resources.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: "var(--rak-primary)" }}
                  >
                    Open Dashboard <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/resources"
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    style={{
                      borderColor: "var(--rak-primary)",
                      color: "var(--rak-primary)",
                    }}
                  >
                    Safety Resources
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: "var(--rak-primary)" }}
                  >
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/resources"
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    style={{
                      borderColor: "var(--rak-primary)",
                      color: "var(--rak-primary)",
                    }}
                  >
                    Explore Resources
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-start justify-center w-full h-150 pt-8"
          >
            {/* Gold Glow Effect */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-112.5 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ backgroundColor: "var(--rak-gold)" }}
            ></div>

            {/* Large Logo */}
            <motion.img
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              src={heroLogo}
              alt="Rakshika Hero Logo"
              className="relative z-10 -mt-12 w-md h-md object-contain drop-shadow-2xl"
            />

            {/* Floating Premium Card */}
          </motion.div>
        </div>

        {/* Trust Strip */}
        <div
          className="border-t border-b py-8 mb-15"
          style={{
            borderColor: "rgba(31,31,31,0.08)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Lock, text: "Secure Authentication" },
              { icon: ShieldCheck, text: "Encrypted Data" },
              { icon: Network, text: "Emergency Network" },
              { icon: Clock, text: "24×7 Access" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(74,14,46,0.08)",
                  }}
                >
                  <badge.icon
                    size={18}
                    style={{
                      color: "var(--rak-secondary)",
                    }}
                  />
                </div>

                <span
                  className="font-semibold text-sm"
                  style={{
                    color: "var(--rak-text)",
                  }}
                >
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* EXISTING SECTIONS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Users size={32} color="var(--rak-secondary)" />}
            title="Emergency Contacts"
            description="Manage trusted contacts and keep them ready during emergencies."
          />

          <FeatureCard
            icon={<ShieldAlert size={32} color="var(--rak-secondary)" />}
            title="SOS Tracking"
            description="Record SOS events and maintain location logs securely."
          />

          <FeatureCard
            icon={<BookOpen size={32} color="var(--rak-secondary)" />}
            title="Safety Resources"
            description="Access helplines, guides, and essential safety information."
          />
        </div>

        <SOSButton />

        <div className="mt-24">
          <TrustSection />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
