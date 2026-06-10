function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;