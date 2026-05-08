"use client";

import { Curso } from "@/interfaces/cursos";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurso } from "./actions";

export default function CursoPage() {
    const params = useParams();

    const id =
        params?.id &&
        (Array.isArray(params.id)
            ? params.id[0]
            : params.id);

    const [curso, setCurso] = useState<Curso | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCurso() {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const data = await getCurso(Number(id));
                setCurso(data);
            } catch (error) {
                console.error("Erro ao buscar curso:", error);
                setCurso(null);
            } finally {
                setLoading(false);
            }
        }

        fetchCurso();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800">
                <p className="text-white animate-pulse text-lg">
                    Carregando...
                </p>
            </div>
        );
    }

    if (!curso) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800">
                <p className="text-white text-lg">
                    Curso não encontrado
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 px-4">
            <div className="bg-white text-black p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300 hover:scale-[1.015]">

               
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Curso
                    </h1>

                    <div className="flex gap-2">
                        <Link
                            href={`/curso/${curso.id}/editar`}
                            className="flex items-center gap-2 text-sm bg-black text-white px-3 py-1.5 rounded-full hover:scale-105 transition"
                        >
                            <PenBox size={16} />
                            Editar
                        </Link>

                        <Link
                            href="/cursos"
                            className="border px-3 py-1.5 rounded-full hover:bg-gray-100 transition text-sm"
                        >
                            Voltar
                        </Link>
                    </div>
                </div>

               
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-black to-gray-700 text-white text-3xl font-bold shadow-lg">
                        {curso.nome?.[0]?.toUpperCase() || "?"}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-center">
                        {curso.nome}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        ID #{curso.id}
                    </p>
                </div>

               
                <div className="space-y-3 text-sm">

                    <Info
                        label="Professor"
                        value={curso.professor ?? "Não informado"}
                    />

                    <Info
                        label="Carga Horária"
                        value={`${curso.cargaHoraria}h`}
                    />

                    <Info
                        label="Descrição"
                        value={curso.descricao}
                        breakAll
                    />
                </div>

              
                {curso.alunos && curso.alunos.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            Alunos
                        </h3>

                        <div className="space-y-2">
                            {curso.alunos.map((aluno) => (
                                <Link
                                    key={aluno.id}
                                    href={`/aluno/${aluno.id}`}
                                    className="block bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
                                >
                                    {aluno.nome}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


function Info({
    label,
    value,
    breakAll = false,
}: {
    label: string;
    value: string | number;
    breakAll?: boolean;
}) {
    return (
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition">
            <span className="text-gray-500">
                {label}
            </span>

            <span
                className={`font-medium ${
                    breakAll
                        ? "break-all text-right"
                        : ""
                }`}
            >
                {value}
            </span>
        </div>
    );
}