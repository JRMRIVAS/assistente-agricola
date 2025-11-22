"use client";

import { useEffect, useState, useRef } from "react";
import LoginModal from "@/components/LoginModal";
import HeroLogin from "@/components/HeroLogin";
import ContenidoPrivado from "@/components/ContenidoPrivado";
import { div } from "motion/react-client";

type AppUser = {
  id: number;
  email: string;
  name: string;
};

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("ai_agricultor_logged");
    const storedUser = localStorage.getItem("ai_agricultor_user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 👉 cuando cambia isAuthenticated y la sección existe, hacemos scroll
  useEffect(() => {
    if (isAuthenticated && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAuthenticated]);


    const handleLoginSuccess = (user: AppUser) => {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("ai_agricultor_logged", "true");
      localStorage.setItem("ai_agricultor_user", JSON.stringify(user));
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      localStorage.removeItem("ai_agricultor_logged");
      localStorage.removeItem("ai_agricultor_user");
    };

    return (
      <main className="min-h-screen bg-[#F6FBF5] text-slate-900">
        {/* Hero siempre visible (pero el resto del contenido no) */}
        <HeroLogin onOpenLogin={() => setIsLoginOpen(true)} />

        {/* Modal de login */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />

        {/* Contenido protegido: solo se ve si hay login */}
        {isAuthenticated && (
          <div ref={sectionRef}>
            <ContenidoPrivado user={currentUser} onLogout={handleLogout} />
          </div>
        )}
      </main>
    );
  }
