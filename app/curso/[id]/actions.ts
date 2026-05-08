"use server";

import { Curso } from "@/interfaces/cursos";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getCurso(id: number) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/cursos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.status === 401) {
    redirect("/login");
  }

  return data as Curso;
}

export async function updateCurso(id: number, curso: Curso) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;

  const response = await fetch(`http://localhost:8080/cursos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(curso),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const data = await response.json();

  if (response.status === 200) {
    return;
  }

  return data;
}