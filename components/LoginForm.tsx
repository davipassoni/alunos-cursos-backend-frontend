"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  onSend: (email: string, password: string) => Promise<void | string>;
}

export default function LoginForm({ onSend }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const response = await onSend(email, password);
    setLoading(false);

    if (response) {
      alert(response);
      return;
    }

    router.push("/");
  }

  return (
    <div className="w-full max-w-xs mx-auto py-8 px-6 bg-white rounded-xl border border-neutral-100">

      <h1 className="text-lg font-semibold text-black mb-1">Entrar</h1>
      <p className="text-xs text-neutral-400 mb-6">Acesse sua conta para continuar</p>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2
              text-xs text-black placeholder-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              transition-all bg-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              Senha
            </label>
            <a href="#" className="text-[10px] text-neutral-400 hover:text-black transition-colors">
              Esqueceu?
            </a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2
              text-xs text-black placeholder-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              transition-all bg-white"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white text-xs font-medium
          rounded-md py-2 px-4
          hover:bg-neutral-800 active:scale-[0.99]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all"
      >
        {loading ? "Entrando..." : "Acessar"}
      </button>

      <p className="mt-4 text-center text-[10px] text-neutral-400">
        Não tem conta?{" "}
        <a href="#" className="text-black font-medium hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}