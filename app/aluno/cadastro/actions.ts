"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface CreateAluno {
  nome: string;
  idade: number;
  cpf: number;
  email: string;
}

export async function createAluno(aluno: CreateAluno) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const response = await fetch("http://localhost:8080/alunos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
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