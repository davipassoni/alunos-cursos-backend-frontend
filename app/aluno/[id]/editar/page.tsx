"use client";
import { Aluno } from "@/interfaces/alunos";
import { useParams } from "next/navigation";
import { useEffect, useState, SubmitEvent } from "react";
import { getAluno, updateAluno } from "../actions";
import { useRouter } from "next/navigation";

export default function AlunoPage() {
    const { id } = useParams();
    const [aluno, setAluno] = useState({} as Aluno);
    const router = useRouter();

    useEffect(() => {
        getAluno(Number(id)).then((response) => setAluno(response));
    }, [id]);

    function handleChange(value: string | number, key: keyof Aluno) {
        setAluno(oldState => ({ ...oldState, [key]: value }));
    }

    async function handleUpdate(e: SubmitEvent) {
        e.preventDefault();
        const response = await updateAluno(Number(id), aluno);

        if (response) {
            alert(response);
            return;
        }
        router.push("/alunos");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <form
                onSubmit={handleUpdate}
                className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6"
            >
                <h1 className="text-2xl font-bold text-center text-black">
                    Editar Aluno
                </h1>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Nome
                    </label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={aluno.nome || ""}
                        onChange={(e) => handleChange(e.target.value, "nome")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        CPF
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={aluno.cpf || ""}
                        onChange={(e) => handleChange(Number(e.target.value), "cpf")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Idade
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={aluno.idade || ""}
                        onChange={(e) => handleChange(Number(e.target.value), "idade")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        value={aluno.email || ""}
                        onChange={(e) => handleChange(e.target.value, "email")}
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