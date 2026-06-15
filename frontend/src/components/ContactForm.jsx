import { useState } from "react";

function ContactForm({ onAddContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone) return;

    onAddContact({
      id: Date.now(),
      name,
      phone,
    });

    setName("");
    setPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-2xl p-6 mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">
        Add Emergency Contact
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-xl px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2 rounded-xl text-white"
        style={{
          backgroundColor: "var(--rak-primary)",
        }}
      >
        Save Contact
      </button>
    </form>
  );
}

export default ContactForm;