import { useModal } from "../context/ModalContext";

const HeroSection = () => {
  const { openModal } = useModal();

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="absolute top-[-80px] right-12 w-[500px] h-[calc(90%+80px)] -z-10">
        <div className="absolute inset-0 bg-[#3d7a6c] rounded-b-full overflow-hidden">
          <div className="flex justify-center items-end h-full">
            <img
              src="doctor-image.png"
              alt="Healthcare Professional"
              className="w-[80%] h-[80%] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-xl md:max-w-2xl lg:max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Transforming Healthcare with Expertise
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Expert advice to guide you through every step of your wellness
            journey.
          </p>
          <button
            onClick={() => openModal("registration")}
            className="w-full sm:w-auto bg-[#3d7a6c] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-lg font-medium hover:bg-[#346b5f] transition-colors shadow-lg"
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
