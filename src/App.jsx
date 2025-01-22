import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RegistrationModal from "./components/RegistrationModal";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <ModalProvider>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <RegistrationModal />
      </main>
    </ModalProvider>
  );
}

export default App;
