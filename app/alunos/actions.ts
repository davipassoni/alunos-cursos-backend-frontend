"use server";

import { Aluno } from "@/interfaces/alunos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAlunos() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  try {
    const response = await fetch("http://localhost:8080/alunos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["listar"] },
    });

    // 👇 Aqui entra o pulo do gato
    if (response.status === 401) {
      redirect("/login");
    }

    const data = await response.json();
    return data as Aluno[];

  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function deleteAluno(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/alunos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();

  if (response.status === 200) {
    revalidateTag("listar", "max");
    return;
  }

  return data;
}