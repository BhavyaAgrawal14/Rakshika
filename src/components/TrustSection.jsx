function TrustSection() {
  return (
    <section className="my-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold mb-8">
            Built on a Foundation of Trust
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold text-lg">
                Secure Authentication
              </h3>

              <p className="text-gray-600">
                Your account is protected with secure authentication
                mechanisms and encrypted data handling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                SOS Logging
              </h3>

              <p className="text-gray-600">
                Important emergency events can be recorded and
                accessed when needed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Emergency Contact Management
              </h3>

              <p className="text-gray-600">
                Maintain trusted contacts and keep them ready
                for emergency situations.
              </p>
            </div>

          </div>
        </div>

        <div className="bg-gray-100 rounded-3xl p-10 flex items-center justify-center">
          <div className="text-8xl">
            🛡️
          </div>
        </div>

      </div>
    </section>
  );
}

export default TrustSection;