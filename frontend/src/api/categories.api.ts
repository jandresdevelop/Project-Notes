import axios from "./axios";
import type { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get("/categories");
  return res.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const res = await axios.post("/categories", { name });
  return res.data;
};

export const updateCategory = async (
  id: number,
  name: string,
): Promise<Category> => {
  const res = await axios.put(`/categories/${id}`, { name });
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/categories/${id}`);
};
