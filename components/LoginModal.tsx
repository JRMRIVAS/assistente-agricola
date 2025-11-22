"use client";

import { FormEvent, useState } from "react";
import users from "@/data/users.json";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
};

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: Omit<User, "password">) => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) {
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    console.log("Enviando login con:", { email, password }); // 👈 debug

    const user = (users as User[]).find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.log("Usuario no encontrado");
      setError("Correo o contraseña incorrectos");
      return;
    }

    console.log("Login OK", user);
    onSuccess({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar modal"
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
              Acceso al sistema
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Inicia sesión para continuar
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm"
              defaultValue="demo@agricultor.com" // 👈 para probar rápido
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm"
              defaultValue="123456" // 👈 para probar rápido
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-2xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit" // 👈 IMPORTANTE
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Ingresar al sistema
          </button>
        </form>
      </div>
    </div>
  );
}
