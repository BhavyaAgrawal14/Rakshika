function SOSButton() {
  return (
    <section className="my-20">
      <div
        className="w-full rounded-3xl px-12 py-16 text-white"
        style={{
          background:
            "linear-gradient(135deg, #4A0E2E 0%, #6A1B4D 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* SOS Circle */}
          <div className="flex justify-center items-center">
            <div className="w-36 h-36 rounded-full border-4 border-pink-300 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center font-bold text-2xl">
                SOS
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">
              One Tap To Safety
            </h2>

            <p className="text-lg text-gray-200 mb-6 max-w-3xl">
              Trigger an SOS event instantly and securely log
              important safety information for emergency situations.
            </p>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-black/20 px-4 py-2 rounded-full text-sm">
                Encrypted
              </span>

              <span className="bg-black/20 px-4 py-2 rounded-full text-sm">
                Fast Response
              </span>

              <span className="bg-black/20 px-4 py-2 rounded-full text-sm">
                Emergency Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SOSButton;