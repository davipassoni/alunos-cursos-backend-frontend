"use client";

import { SubmitEvent, useState } from "react";
import { createCurso } from "./actions";
import { useRouter } from "next/navigation";

export default function CursoCadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await createCurso({
      nome,
      descricao,
      cargaHoraria: Number(cargaHoraria),
    });

    setLoading(false);

    if (response?.success) {
      setNome("");
      setProfessor("");
      setCargaHoraria("");
      setDescricao("");
      router.push("/cursos");
      return;
    }

    alert(response?.error || "Erro ao cadastrar curso");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Cadastrar curso
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
            type="text"
            placeholder="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
            type="number"
            placeholder="Carga horária"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
          />

          <textarea
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-800 transition disabled:opacity-50"
            type="submit"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>
      </div>
    </div>
  );
}