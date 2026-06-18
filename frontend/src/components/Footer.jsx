import logo from "../assets/logo/rakshika-logo.svg";

function Footer() {
  return (
    <footer
      className="text-white mt-20"
      style={{
        background: "linear-gradient(135deg, #2B081A 0%, #4A0E2E 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Rakshika Logo"
                className="w-14 h-14 object-contain"
              />

              <div>
                <h2 className="text-3xl font-bold">Rakshika</h2>

                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    color: "#D4AF37",
                  }}
                >
                  Your Safety Companion
                </p>
              </div>
            </div>

            <p className="text-white/70 max-w-sm">
              Empowering every woman with modern protection, emergency
              preparedness, and intelligent safety tools.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3 text-white/70">
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                Home
              </li>

              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                Resources
              </li>

              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Emergency Help</h3>

            <ul className="space-y-3 text-white/70">
              <li>181 - Women Helpline</li>
              <li>112 - Emergency</li>
              <li>108 - Medical</li>
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-6 text-white/50 text-sm"
          style={{
            borderColor: "rgba(212,175,55,0.15)",
          }}
        >
          © 2026 Rakshika. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
