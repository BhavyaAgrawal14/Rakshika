import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import { Users, ShieldAlert, User, Phone, Plus, Trash2 } from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");

    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
    setShowForm(false);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div
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
            <p className="text-3xl font-bold">0</p>

            <p className="text-gray-200 text-sm">SOS Events</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-white text-black px-5 py-2 rounded-xl font-medium"
        >
          Logout
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-2 mb-2">
            <Users size={22} color="#7C1D3D" />

            <h3 className="text-gray-500">Emergency Contacts</h3>
          </div>

          <p className="text-4xl font-bold">{contacts.length}</p>

          <p className="text-sm text-gray-500 mt-2">Contacts added</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={22} color="#7C1D3D" />

            <h3 className="text-gray-500">SOS Events</h3>
          </div>

          <p className="text-4xl font-bold">0</p>

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
              <div
                key={contact.id}
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
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-3 rounded-lg text-white"
                  style={{
                    backgroundColor: "#dc2626",
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
