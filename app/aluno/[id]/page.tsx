"use client";

import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { getAluno } from "./actions";

function formatCPF(cpf: number | string) {
    const cpfStr = cpf.toString().padStart(11, "0");
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default function AlunoPage() {
    const params = useParams();
    const id = params?.id
        ? Array.isArray(params.id)
            ? params.id[0]
            : params.id
        : null;

    const [aluno, setAluno] = useState<Aluno | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAluno() {
            if (!id) return;

            try {
                const response = await getAluno(Number(id));
                setAluno(response);
            } catch (err) {
                console.error("Erro ao buscar aluno:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAluno();
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 px-4">
            <div className="bg-white text-black p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all duration-300 hover:scale-[1.015]">

                {loading ? (
                    <p className="text-gray-400 animate-pulse text-center">
                        Carregando...
                    </p>
                ) : aluno ? (
                    <>
                     
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-semibold text-gray-700">
                                Perfil
                            </h1>

                            {id && (
                                <Link
                                    href={`/aluno/${id}/editar`}
                                    className="flex items-center gap-2 text-sm bg-black text-white px-3 py-1.5 rounded-full hover:scale-105 transition"
                                >
                                    <PenBox size={16} />
                                    Editar
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-black to-gray-700 text-white text-3xl font-bold shadow-lg">
                                {aluno.nome?.[0]?.toUpperCase() || "?"}
                            </div>

                            <h2 className="mt-4 text-2xl font-bold text-center">
                                {aluno.nome}
                            </h2>

                            <p className="text-gray-500 text-sm">
                                ID #{aluno.id}
                            </p>
                        </div>

                      
                        <div className="space-y-3 text-sm">
                            
                            <Info label="Idade" value={aluno.idade} />
                            <Info label="CPF" value={formatCPF(aluno.cpf)} />
                            <Info label="Email" value={aluno.email} breakAll />

                        </div>
                    </>
                ) : (
                    <p className="text-black text-center">
                        Aluno não encontrado
                    </p>
                )}
            </div>
        </div>
    );
}


function Info({ label, value, breakAll = false }: {
    label: string;
    value: string | number;
    breakAll?: boolean;
}) {
    return (
        <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition">
            <span className="text-gray-500">{label}</span>
            <span className={`font-medium ${breakAll ? "break-all text-right" : ""}`}>
                {value}
            </span>
        </div>
    );
}