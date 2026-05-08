"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { deleteAluno } from "@/app/alunos/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: number;
  nome: string;
}

export default function AlunoItem({ id, nome }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault(); 
    e.stopPropagation();

    try {
      setLoading(true);
      await deleteAluno(id);
      router.refresh();
    } catch (err) {
      console.error("Erro ao deletar:", err);
      alert("Erro ao deletar aluno ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-2">
      <Link
        href={`/aluno/${id}`}
        className="text-gray-700 hover:text-blue-600 flex-1"
      >
        {nome}
      </Link>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        <Trash size={18} />
      </button>
    </div>
  );
}