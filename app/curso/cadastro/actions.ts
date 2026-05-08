"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface CreateCurso {
  nome: string;
  descricao: string;
  cargaHoraria: number;
}

export async function createCurso(curso: CreateCurso) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const response = await fetch("http://localhost:8080/cursos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(curso),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();

  if (response.status === 201) {
    return;
  }

  return data;
}