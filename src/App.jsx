import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1 max-w-7xl mx-auto w-full px-4 py-6"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AppRouter />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
