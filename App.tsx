// src/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate, BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ProjectsOverviewPage from "@/pages/ProjectsOverviewPage";
import DeveloperProjectsPage from "@/pages/DeveloperProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import AdminPage from "@/pages/AdminPage";
import AIAssistantPage from "@/pages/AIAssistantPage";
import DevelopersListPage from "@/pages/DevelopersListPage";
import AppErrorBoundary from "@/components/AppErrorBoundary";

// 🧠 Fix: Force root route in sandbox (Gemini / usercontent)
if (typeof window !== "undefined") {
  const currentPath = window.location.pathname;
  const isSandbox = window.location.hostname.includes("usercontent.goog");
  if (isSandbox && currentPath !== "/") {
    window.history.replaceState({}, "", "/");
  }
}

// 🌍 Layout with Header + Footer
const AppLayout = () => {
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <div className="bg-brand-navy text-white antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// 🗺️ All app routes
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route element={<AppLayout />}>
      <Route path="/projects" element={<ProjectsOverviewPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/developers" element={<DevelopersListPage />} />
      <Route path="/developers/:developer" element={<DeveloperProjectsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/ai" element={<AIAssistantPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

// ⚙️ SplashScreen controller
const AppController = () => {
  const [showSplash, setShowSplash] = useState(
    () => sessionStorage.getItem("splash-seen") !== "true"
  );

  const handleSplashFinish = () => {
    sessionStorage.setItem("splash-seen", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="animate-fadeIn">
      <Router basename="/">
        <AppRoutes />
      </Router>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

// 🚀 Final export with Error Boundary & i18n
export default function App() {
  return (
    <AppErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <AppController />
      </I18nextProvider>
    </AppErrorBoundary>
  );
}