"use client";

const HeroBanner = () => {
  return (
    <div
      className="relative w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
        <h2 className="text-2xl sm:text-4xl font-bold">
          🏆 RCB and the Feeling of Being Champions
        </h2>
        <p className="text-sm mt-2">04 June 2025</p>
      </div>
    </div>
  );
};

export default HeroBanner;
