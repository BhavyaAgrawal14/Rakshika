import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import {
  Users,
  ShieldAlert,
  User,
  Phone,
  Plus,
  Trash2,
  MapPin,
  Activity,
  Clock,
  Navigation,
  AlertCircle,
  Info,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const safetyTips = [
  "Share your live location with trusted contacts when traveling alone.",
  "Trust your instincts. If a situation feels unsafe, leave immediately.",
  "Keep your phone charged and easily accessible when out at night.",
  "Be aware of your surroundings and avoid distractions like texting while walking.",
];

// Mock Data for Phase 3B: Nearby Emergency Services
const nearbyServices = {
  hospitals: [
    { id: 1, name: "City Hospital", distance: "1.2 km", phone: "108" },
    { id: 2, name: "Apollo Clinic", distance: "2.8 km", phone: "108" },
  ],
  police: [
    {
      id: 3,
      name: "Civil Lines Police Station",
      distance: "1.7 km",
      phone: "112",
    },
    { id: 4, name: "Women's Help Desk", distance: "2.3 km", phone: "1091" },
  ],
  support: [
    { id: 5, name: "Sakhi One Stop Center", distance: "3.1 km", phone: "181" },
  ],
};

// Helper Component for Stat Cards
const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
  >
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner shrink-0"
      style={{ backgroundColor: `${color}15` }}
    >
      {React.cloneElement(icon, { color: color })}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
        {title}
      </p>
      <p
        className="text-2xl font-black"
        style={{ color: "var(--rak-primary)" }}
      >
        {value}
      </p>
    </div>
  </motion.div>
);

function Dashboard() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sosEvents, setSosEvents] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await API.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSOSHistory = async () => {
    try {
      const response = await API.get("/sos");
      setSosEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchSOSHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % safetyTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAddContact = async (contact) => {
    try {
      await API.post("/contacts", contact);
      fetchContacts();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTriggerSOS = async () => {
    const sendSOS = async (lat, lng) => {
  console.log("Sending SOS:", {
    latitude: lat,
    longitude: lng,
  });

  try {
    const response = await API.post("/sos", {
      latitude: lat,
      longitude: lng,
    });

    console.log("SOS RESPONSE:", response.data);

    fetchSOSHistory();
    alert("SOS Triggered Successfully! Alerts sent.");
  } catch (error) {
    console.log(error);
    alert("Failed to trigger SOS.");
  }
};

    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser. Sending SOS without location.",
      );
      sendSOS(null, null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendSOS(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        let errorMsg = "Sending SOS without location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Location permission denied. " + errorMsg;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location unavailable. " + errorMsg;
            break;
          case error.TIMEOUT:
            errorMsg = "Location request timed out. " + errorMsg;
            break;
          default:
            errorMsg = "An unknown error occurred. " + errorMsg;
            break;
        }
        alert(errorMsg);
        sendSOS(null, null);
      },
      { timeout: 10000 },
    );
  };

  const handleGetLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Permission to access location was denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get location timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      },
    );
  };

  const latestSOS = sosEvents.length > 0 ? sosEvents[0] : null;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pt-6">
      {/* 1. Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
      >
        <div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{
              color: "var(--rak-primary)",
            }}
          >
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-500 font-medium mt-2 flex items-center gap-2">
            <Clock size={16} />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-white p-2 pr-5 rounded-full shadow-sm">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <span className="font-bold text-sm tracking-wide text-green-700">
            System Protected
          </span>
        </div>
      </motion.div>

      {/* 2. Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          title="Contacts"
          value={contacts.length}
          icon={<Users size={24} />}
          color="var(--rak-primary)"
          delay={0.1}
        />
        <StatCard
          title="SOS Events"
          value={sosEvents.length}
          icon={<ShieldAlert size={24} />}
          color="#dc2626"
          delay={0.2}
        />
        <StatCard
          title="Safety Score"
          value={
            contacts.length === 0 ? "65%" : contacts.length < 3 ? "82%" : "98%"
          }
          icon={<Activity size={24} />}
          color="var(--rak-gold)"
          delay={0.3}
        />
        <StatCard
          title="Last Active"
          value={location ? "Live" : "Offline"}
          icon={<MapPin size={24} />}
          color="var(--rak-secondary)"
          delay={0.4}
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Actions & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* 4. Quick Actions Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2 h-8 rounded-full"
                style={{
                  backgroundColor: "var(--rak-gold)",
                }}
              />
              <h2
                className="text-xl font-bold"
                style={{
                  color: "var(--rak-primary)",
                }}
              >
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={handleTriggerSOS}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-100 transition-colors group shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <ShieldAlert color="#dc2626" size={28} />
                </div>
                <span className="text-sm font-bold text-red-700 tracking-wide">
                  Trigger SOS
                </span>
              </button>

              <button
                onClick={() => setShowForm(!showForm)}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 transition-all group shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"
                  style={{ backgroundColor: "rgba(74, 14, 46, 0.05)" }}
                >
                  <Plus color="var(--rak-primary)" size={28} />
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-wide text-center leading-tight">
                  Add
                  <br />
                  Contact
                </span>
              </button>

              <button
                onClick={handleGetLocation}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 transition-all group shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  {locationLoading ? (
                    <div
                      className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
                      style={{
                        borderColor: "var(--rak-gold)",
                        borderTopColor: "transparent",
                      }}
                    ></div>
                  ) : (
                    <Navigation color="var(--rak-gold)" size={28} />
                  )}
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-wide text-center leading-tight">
                  Live
                  <br />
                  Location
                </span>
              </button>

              <button className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 transition-all group shadow-sm">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner"
                  style={{ backgroundColor: "rgba(106, 27, 77, 0.05)" }}
                >
                  <Phone color="var(--rak-secondary)" size={28} />
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-wide text-center leading-tight">
                  Nearby
                  <br />
                  Helplines
                </span>
              </button>
            </div>
          </motion.div>

          {/* Safety Network (Contacts list & Add Form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--rak-primary)" }}
                >
                  Safety Network
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Your trusted emergency contacts
                </p>
              </div>
            </div>

            {showForm && (
              <div className="mb-6 p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="font-bold"
                    style={{
                      color: "var(--rak-primary)",
                    }}
                  >
                    Add New Contact
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600 font-medium text-sm"
                  >
                    Cancel
                  </button>
                </div>
                <ContactForm onAddContact={handleAddContact} />
              </div>
            )}

            {contacts.length === 0 ? (
              <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                <Users size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 text-sm font-medium">
                  No contacts added yet.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-3 text-sm font-bold hover:underline"
                  style={{
                    color: "var(--rak-primary)",
                  }}
                >
                  Add your first contact
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-white border border-gray-100 rounded-2xl p-4 flex justify-between items-center hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(106, 27, 77, 0.08)" }}
                      >
                        <User size={18} color="var(--rak-secondary)" />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-sm"
                          style={{ color: "var(--rak-primary)" }}
                        >
                          {contact.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                          <Phone size={10} /> {contact.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* 3. Recent Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-8">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--rak-primary)" }}
              >
                Recent Activity
              </h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                Timeline
              </span>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-gray-200 before:to-transparent">
              {sosEvents.slice(0, 4).map((event, idx) => (
                <div
                  key={event._id || idx}
                  className="relative flex items-start gap-6 group"
                >
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-red-500 shadow-sm flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                    <AlertCircle size={16} color="white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-red-600">
                        SOS Alert Triggered
                      </h3>
                      <span className="text-xs text-gray-500 font-bold whitespace-nowrap bg-gray-50 px-2 py-1 rounded-md">
                        {new Date(event.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {event.latitude !== null && event.longitude !== null ? (
                      <div className="mt-2 text-xs text-gray-500 font-medium bg-gray-50 p-2 rounded-lg border border-gray-100 flex gap-3">
                        <span>
                          <span className="text-gray-400">Lat:</span>{" "}
                          {event.latitude != null
                            ? event.latitude.toFixed(6)
                            : "N/A"}
                        </span>

                        <span>
                          <span className="text-gray-400">Lng:</span>{" "}
                          {event.longitude != null
                            ? event.longitude.toFixed(6)
                            : "N/A"}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 font-medium">
                        {new Date(event.timestamp).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {sosEvents.length === 0 && (
                <div className="relative z-10 pl-16">
                  <div className="bg-white/80 p-4 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium text-sm">
                      No recent emergency alerts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Latest SOS Event Widget */}
          {latestSOS && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow mt-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--rak-primary)" }}
                >
                  Latest SOS Event
                </h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  Details
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${latestSOS.latitude !== null && latestSOS.longitude !== null ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${latestSOS.latitude !== null && latestSOS.longitude !== null ? "text-green-600" : "text-red-600"}`}
                    >
                      Status:{" "}
                      {latestSOS.latitude !== null &&
                      latestSOS.longitude !== null
                        ? "VERIFIED ✅"
                        : "UNVERIFIED ❌"}
                    </span>
                  </div>

                  {/* Vertical Stacked Details Layout */}
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Timestamp
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {new Date(latestSOS.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Latitude
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {latestSOS?.latitude != null
                          ? latestSOS.latitude.toFixed(6)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Longitude
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {latestSOS?.longitude != null
                          ? latestSOS.longitude.toFixed(6)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Emergency Message Generator Widget */}
          {latestSOS && latestSOS.latitude != null && latestSOS.longitude != null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow mt-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--rak-primary)" }}
                  >
                    Emergency Alert Message
                  </h2>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Share your exact location and status
                  </p>
                </div>
                <button
                  onClick={() => {
                    const message = `🚨 RAKSHIKA SOS ALERT 🚨\n\nThis emergency alert was generated through Rakshika.\n\nCurrent Location:\nhttps://maps.google.com/?q=${latestSOS.latitude},${latestSOS.longitude}\n\nTimestamp: ${new Date(latestSOS.timestamp).toLocaleString()}\n\nPlease reach out immediately or contact emergency services if necessary.`;
                    navigator.clipboard.writeText(message);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={`bg-white border text-gray-800 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm group ${copied ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300 hover:shadow"}`}
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-500" />
                      <span className="text-green-700">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="text-gray-500 group-hover:text-gray-800 transition-colors" />
                      Copy Message
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-inner relative overflow-hidden text-sm text-gray-700 whitespace-pre-wrap font-medium leading-relaxed">
                <span className="text-red-600 font-bold">🚨 RAKSHIKA SOS ALERT 🚨</span>
                <br /><br />
                This emergency alert was generated through Rakshika.
                <br /><br />
                <span className="text-gray-500">Current Location:</span>
                <br />
                <a 
                  href={`https://maps.google.com/?q=${latestSOS.latitude},${latestSOS.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  https://maps.google.com/?q={latestSOS.latitude},{latestSOS.longitude}
                </a>
                <br /><br />
                <span className="text-gray-500">Timestamp:</span> {new Date(latestSOS.timestamp).toLocaleString()}
                <br /><br />
                Please reach out immediately or contact emergency services if necessary.
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-8">
          {/* Current Location Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--rak-primary)" }}
              >
                Current Location
              </h2>
              <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-100">
                <MapPin size={18} color="var(--rak-gold)" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
              {locationLoading ? (
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                  <div
                    className="w-8 h-8 border-4 border-gray-100 rounded-full animate-spin"
                    style={{
                      borderTopColor: "var(--rak-primary)",
                    }}
                  ></div>
                  <p className="text-sm font-semibold text-gray-500 animate-pulse">
                    Fetching location...
                  </p>
                </div>
              ) : locationError ? (
                <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
                  <AlertCircle
                    size={28}
                    color="#dc2626"
                    className="opacity-80"
                  />
                  <p className="text-sm font-bold text-red-600">
                    {locationError}
                  </p>
                  <button
                    onClick={handleGetLocation}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline mt-1"
                  >
                    Try Again
                  </button>
                </div>
              ) : location ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                      Location Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Latitude
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {location?.latitude != null
                          ? location.latitude.toFixed(6)
                          : "Fetching..."}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Longitude
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {location?.longitude != null
                          ? location.longitude.toFixed(6)
                          : "Fetching..."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <Navigation
                    size={32}
                    color="var(--rak-gold)"
                    className="opacity-40"
                  />
                  <p className="text-sm font-medium text-gray-400">
                    No location shared yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Nearby Emergency Services Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--rak-primary)" }}
              >
                Nearby Emergency Services
              </h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                Local
              </span>
            </div>

            <div className="space-y-6">
              {/* Hospitals */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Activity size={14} color="#dc2626" /> Hospitals & Clinics
                </h3>
                <div className="space-y-3">
                  {nearbyServices.hospitals.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-3 rounded-2xl bg-white border border-gray-100 hover:border-red-200 transition-all group"
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">
                          {service.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {service.distance}
                        </p>
                      </div>
                      <a
                        href={`tel:${service.phone}`}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Phone size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Police */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck size={14} color="var(--rak-secondary)" /> Police
                  Stations
                </h3>
                <div className="space-y-3">
                  {nearbyServices.police.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-3 rounded-2xl bg-white border border-gray-100 hover:border-[#6A1B4D] transition-all group"
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">
                          {service.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {service.distance}
                        </p>
                      </div>
                      <a
                        href={`tel:${service.phone}`}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(106,27,77,0.1)] text-[#6A1B4D] hover:bg-[#6A1B4D] hover:text-white transition-colors"
                      >
                        <Phone size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Centers */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users size={14} color="var(--rak-gold)" /> Women Support
                </h3>
                <div className="space-y-3">
                  {nearbyServices.support.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-3 rounded-2xl bg-white border border-gray-100 hover:border-yellow-400 transition-all group"
                    >
                      <div>
                        <p className="font-bold text-sm text-gray-800">
                          {service.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">
                          {service.distance}
                        </p>
                      </div>
                      <a
                        href={`tel:${service.phone}`}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:text-white transition-colors"
                        style={{
                          backgroundColor: "rgba(212,175,55,0.1)",
                          color: "var(--rak-gold)",
                        }}
                      >
                        <Phone size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. Safety Tips Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-3xl p-8 shadow-lg text-white relative overflow-hidden group"
            style={{
              background:
                "linear-gradient(135deg, var(--rak-primary) 0%, var(--rak-secondary) 100%)",
            }}
          >
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Info size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <ShieldAlert size={20} color="var(--rak-gold)" />
                </div>
                <h2 className="font-bold text-lg tracking-wide">Safety Tip</h2>
              </div>
              <div className="min-h-25">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTip}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/90 font-medium leading-relaxed text-lg"
                  >
                    "{safetyTips[currentTip]}"
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex gap-1.5 mt-6">
                {safetyTips.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentTip ? "w-6" : "w-2 bg-white/30"
                    }`}
                    style={
                      i === currentTip
                        ? {
                            backgroundColor: "var(--rak-gold)",
                          }
                        : {}
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* 6. Emergency Helplines Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "var(--rak-primary)" }}
            >
              Emergency Helplines
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Women Helpline",
                  number: "181",
                  color: "var(--rak-primary)",
                },
                { name: "Emergency Response", number: "112", color: "#dc2626" },
                {
                  name: "Women in Distress",
                  number: "1091",
                  color: "var(--rak-secondary)",
                },
                { name: "Ambulance", number: "108", color: "var(--rak-gold)" },
              ].map((line, idx) => (
                <a
                  key={idx}
                  href={`tel:${line.number}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${line.color}15` }}
                    >
                      <Phone
                        size={16}
                        color={line.color}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="font-bold text-sm text-gray-800">
                      {line.name}
                    </span>
                  </div>
                  <span
                    className="font-black text-lg tracking-wider"
                    style={{ color: line.color }}
                  >
                    {line.number}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
