"use client";

import { Curso } from "@/interfaces/cursos";
import { useParams } from "next/navigation";
import { useEffect, useState, SubmitEvent } from "react";
import { getCurso, updateCurso } from "../actions";
import { useRouter } from "next/navigation";

export default function CursoPage() {
    const { id } = useParams();
    const [curso, setCurso] = useState({} as Curso);
    const router = useRouter();

    useEffect(() => {
        getCurso(Number(id)).then((response) => setCurso(response));
    }, [id]);

    function handleChange(value: string | number, key: keyof Curso) {
        setCurso((oldState) => ({ ...oldState, [key]: value }));
    }

    async function handleUpdate(e: SubmitEvent) {
        e.preventDefault();

        const response = await updateCurso(Number(id), curso);

        if (response) {
            alert(response);
            return;
        }

        router.push("/cursos");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <form
                onSubmit={handleUpdate}
                className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6"
            >
                <h1 className="text-2xl font-bold text-center text-black">
                    Editar Curso
                </h1>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Nome do Curso
                    </label>

                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={curso.nome || ""}
                        onChange={(e) =>
                            handleChange(e.target.value, "nome")
                        }
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Carga Horária
                    </label>

                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={curso.cargaHoraria || ""}
                        onChange={(e) =>
                            handleChange(
                                Number(e.target.value),
                                "cargaHoraria"
                            )
                        }
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Descrição
                    </label>

                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={curso.descricao || ""}
                        onChange={(e) =>
                            handleChange(e.target.value, "descricao")
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                    Atualizar
                </button>
            </form>
        </div>
    );
}