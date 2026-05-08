

import AlunoItem from "@/components/AlunoItem";
import { getAlunos } from "./actions";
import Link from "next/link";

export default async function AlunosPage() {
    const alunos = await getAlunos();

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-linear-to-br from-black via-gray-900 to-black px-4 py-12">
            
            <div className="w-full max-w-2xl">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">
                        Alunos
                    </h1>
                    <div className="w-24 h-1 bg-linear-to-r from-white/40 via-white to-white/40 mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-400 mt-3 text-sm">
                        Gerencie seus alunos de forma simples 
                    </p>
                </div>

                {/* Card principal */}
                <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:scale-[1.01]">
                    
                    <ul className="space-y-4">
                        {alunos.map((aluno) => (
                            <AlunoItem
                                key={aluno.id}
                                nome={aluno.nome}
                                id={aluno.id}
                            />
                        ))}
                    </ul>

                    {/* Footer interno */}
                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                            Total: {alunos.length}
                        </span>

                        <Link
                            href="/aluno/cadastro"
                            className="px-5 py-2 rounded-lg bg-black text-white font-medium 
                                       hover:bg-gray-800 transition-all duration-200 
                                       shadow-md hover:shadow-lg"
                        >
                            + Novo aluno
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}