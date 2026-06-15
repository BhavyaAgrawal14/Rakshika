import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition duration-300"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >
      <div className="mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
