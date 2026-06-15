function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Rakshika
            </h2>

            <p className="text-gray-400">
              Empowering every woman with modern
              protection and dependable safety tools.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Resources</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Emergency Help
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>181 - Women Helpline</li>
              <li>112 - Emergency</li>
              <li>108 - Medical</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm">
          © 2026 Rakshika. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;