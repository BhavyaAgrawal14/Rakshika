import { motion } from "framer-motion";

function Resources() {
  const helplines = [
    {
      title: "Women Helpline",
      number: "181",
      icon: "🚺",
    },
    {
      title: "Emergency Response",
      number: "112",
      icon: "🚓",
    },
    {
      title: "Ambulance",
      number: "108",
      icon: "🚑",
    },
    {
      title: "Cyber Crime",
      number: "1930",
      icon: "💻",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Safety Resources</h1>

        <p className="text-gray-500 text-lg">
          Important emergency contacts and safety information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {helplines.map((item) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow"
          >
            <div className="text-4xl mb-4">{item.icon}</div>

            <h2 className="text-2xl font-semibold">{item.title}</h2>

            <p
              className="text-3xl font-bold mt-3"
              style={{
                color: "var(--rak-primary)",
              }}
            >
              {item.number}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 bg-white rounded-3xl p-8 shadow">
        <h2 className="text-3xl font-bold mb-6">Safety Tips</h2>

        <ul className="space-y-4 text-gray-700">
          <li>✅ Share your live location with trusted contacts.</li>
          <li>✅ Keep emergency numbers saved on speed dial.</li>
          <li>✅ Stay aware of your surroundings.</li>
          <li>✅ Inform family before travelling late at night.</li>
          <li>✅ Use verified transportation services.</li>
        </ul>
      </div>
    </div>
  );
}

export default Resources;
