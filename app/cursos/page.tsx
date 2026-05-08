import Link from "next/link";
import { getCursos, deleteCurso } from "./actions";

export default async function CursosPage() {
  const cursos = await getCursos();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-linear-to-br from-black via-gray-900 to-black px-4 py-12">
      
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Cursos
          </h1>

          <div className="w-24 h-1 bg-linear-to-r from-white/40 via-white to-white/40 mx-auto mt-4 rounded-full"></div>

          <p className="text-gray-400 mt-3 text-sm">
            Gerencie seus cursos de forma simples
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:scale-[1.01]">
          
          {cursos.length === 0 ? (
            <p className="text-gray-500 text-center">
              Nenhum curso cadastrado.
            </p>
          ) : (
            <ul className="space-y-4">
              {cursos.map((curso) => (
                <li
                  key={curso.id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  {/* Infos */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {curso.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {curso.professor ?? "Sem professor"} • {curso.cargaHoraria}h
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-3 text-sm">
                    <Link
                      href={`/curso/${curso.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>

                  
                    <form
                      action={async () => {
                        "use server";
                        await deleteCurso(curso.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              Total: {cursos.length}
            </span>

            <Link
              href="/curso/cadastro"
              className="px-5 py-2 rounded-lg bg-black text-white font-medium 
                         hover:bg-gray-800 transition-all duration-200 
                         shadow-md hover:shadow-lg"
            >
              + Novo curso
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}