"use server";

import { Aluno } from "@/interfaces/alunos";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAluno(id: number): Promise<Aluno> {
    const cookiesStore = await cookies();

    const token = cookiesStore.get("access_token")?.value;

    if (!token) {
        redirect("/login");
    }

    const response = await fetch(
        `http://localhost:8080/alunos/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    if (response.status === 401) {
        redirect("/login");
    }

    if (!response.ok) {
        throw new Error("Erro ao buscar aluno");
    }

    const data = await response.json();

    return data as Aluno;
}

export async function updateAluno(
    id: number,
    aluno: Aluno
) {
    const cookiesStore = await cookies();

    const token = cookiesStore.get("access_token")?.value;

    if (!token) {
        redirect("/login");
    }

    const response = await fetch(
        `http://localhost:8080/alunos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(aluno),
        }
    );

    if (response.status === 401) {
        redirect("/login");
    }

    if (response.status === 200) {
        return;
    }

    const data = await response.json();

    return data;
}