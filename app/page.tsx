"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center space-y-8">

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Sistema Escolar
          </h1>
          <p className="text-neutral-500 text-sm">
            gerenciador dos alunos
          </p>
        </div>

        <div className="bg-black text-white rounded-2xl p-6 space-y-4 shadow-xl">

          <Link
            href="/login"
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition block"
          >
            Fazer login
          </Link>

          <Link
            href="/alunos"
            className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition block"
          >
            Ver alunos
          </Link>

          <Link
            href="/cursos"
            className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition block"
          >
            Ver cursos
          </Link>

        </div>

        <p className="text-xs text-neutral-400">
          © Sistema Escolar
        </p>

      </div>
    </div>
  );
}