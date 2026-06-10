import MainLayout from "../layouts/MainLayout";
import FeatureCard from "../components/FeatureCard";
import SOSButton from "../components/SOSButton";
import TrustSection from "../components/TrustSection";

function Home() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="text-center py-20">
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
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Emergency Contacts"
            description="Manage trusted contacts and keep them ready during emergencies."
          />

          <FeatureCard
            title="SOS Tracking"
            description="Record SOS events and maintain location logs securely."
          />

          <FeatureCard
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
