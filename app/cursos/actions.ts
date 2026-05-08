"use server";

import { Curso } from "@/interfaces/cursos";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCursos() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  try {
    const response = await fetch("http://localhost:8080/cursos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["listar-cursos"] },
    });

    if (response.status === 401) {
      redirect("/login");
    }

    const data = await response.json();
    return data as Curso[];

  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function deleteCurso(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/cursos/${id}`, {
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
    revalidateTag("listar-cursos", "max");
    return;
  }

  return data;
}