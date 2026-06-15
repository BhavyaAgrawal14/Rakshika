import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import { Users, ShieldAlert, User, Phone, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import API from "../services/api";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sosEvents, setSosEvents] = useState([]);
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    try {
      await API.post("/sos");

      fetchSOSHistory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-8 text-white mb-8"
        style={{
          backgroundColor: "var(--rak-primary)",
        }}
      >
        <h1 className="text-4xl font-bold mb-3">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="text-gray-200">
          Stay connected, stay protected. Manage your safety network from one
          place.
        </p>

        <div className="mt-4 flex gap-6">
          <div>
            <p className="text-3xl font-bold">{contacts.length}</p>

            <p className="text-gray-200 text-sm">Emergency Contacts</p>
          </div>

          <div>
            <p className="text-3xl font-bold">{sosEvents.length}</p>

            <p className="text-gray-200 text-sm">SOS Events</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-white text-black px-5 py-2 rounded-xl font-medium"
        >
          Logout
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users size={22} color="#7C1D3D" />

            <h3 className="text-gray-500">Emergency Contacts</h3>
          </div>

          <p className="text-4xl font-bold">{contacts.length}</p>

          <p className="text-sm text-gray-500 mt-2">Contacts added</p>
        </motion.div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={22} color="#7C1D3D" />

            <h3 className="text-gray-500">SOS Events</h3>
          </div>

          <p className="text-4xl font-bold">{sosEvents.length}</p>

          <p className="text-sm text-gray-500 mt-2">Recorded events</p>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Emergency Contacts</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-xl text-white flex items-center gap-2"
            style={{
              backgroundColor: "var(--rak-primary)",
            }}
          >
            <>
              <Plus size={18} />
              Add Contact
            </>
          </button>
        </div>

        {showForm && <ContactForm onAddContact={handleAddContact} />}

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No emergency contacts added yet.
            </p>

            <p className="text-gray-400 mt-2">
              Add trusted contacts to quickly reach them during emergencies.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={18} color="#7C1D3D" />

                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} color="#6b7280" />

                    <p className="text-gray-500">{contact.phone}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="p-3 rounded-lg text-white"
                  style={{
                    backgroundColor: "#dc2626",
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-3xl p-6 shadow mt-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">SOS Center</h2>

            <p className="text-gray-500">Trigger an emergency alert event.</p>
          </div>

          <button
            onClick={handleTriggerSOS}
            className="px-6 py-3 rounded-xl text-white font-semibold"
            style={{
              backgroundColor: "#dc2626",
            }}
          >
            🚨 Trigger SOS
          </button>
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-3">Alert Recipients</h3>

            {contacts.length === 0 ? (
              <p className="text-gray-500">No emergency contacts available.</p>
            ) : (
              <ul className="space-y-2">
                {contacts.map((contact) => (
                  <li key={contact._id} className="text-gray-700">
                    • {contact.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent SOS Activity</h2>

        {sosEvents.length === 0 ? (
          <p className="text-gray-500">No SOS events recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {sosEvents
              .slice()
              .reverse()
              .map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-l-4 border-red-500 pl-4 py-2"
                >
                  <h3 className="font-semibold text-red-600">
                    Emergency Alert Triggered
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
