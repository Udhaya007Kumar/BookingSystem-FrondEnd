import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Global toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
