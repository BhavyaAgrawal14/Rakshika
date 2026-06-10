function SOSButton() {
  return (
    <section className="my-20">
      <div className="max-w-5xl mx-auto bg-[#4A102A] text-white rounded-3xl px-10 py-12">

        <div className="flex flex-col md:flex-row items-center gap-10">

          <div className="flex justify-center items-center">
            <div className="w-32 h-32 rounded-full border-4 border-pink-300 flex items-center justify-center">

              <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center font-bold text-lg">
                SOS
              </div>

            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              One Tap To Safety
            </h2>

            <p className="text-gray-300 mb-4">
              Trigger an SOS event instantly and securely log
              important safety information for emergency situations.
            </p>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
                Encrypted
              </span>

              <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
                Fast Response
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default SOSButton;