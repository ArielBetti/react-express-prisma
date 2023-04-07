import { TUser } from "../types";

type TReturnSucess = {
  name: string;
  email: string;
};

export const createUserData = async (body: TUser): Promise<TReturnSucess> => {
  const response = await fetch("http://localhost:3000/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Não foi possível obter os dados da API.");
  }
  const data = await response.json();
  return data;
};

export const getUserData = async (): Promise<TReturnSucess[]> => {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    throw new Error("Não foi possível obter os dados da API.");
  }
  const data = await response.json();
  return data;
};
