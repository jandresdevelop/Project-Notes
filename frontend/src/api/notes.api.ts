import axios from "./axios";
import type { Note } from "../types/note";

interface NotePayload {
  title: string;
  content: string;
  categoryId?: number;
}

export const getActiveNotes = async (): Promise<Note[]> => {
  const res = await axios.get("/notes/active");
  return res.data;
};

export const getArchivedNotes = async (): Promise<Note[]> => {
  const res = await axios.get("/notes/archived");
  return res.data;
};

export const createNote = async (data: NotePayload): Promise<Note> => {
  const res = await axios.post("/notes", data);
  return res.data;
};

export const updateNote = async (
  id: number,
  data: NotePayload,
): Promise<Note> => {
  const res = await axios.put(`/notes/${id}`, data);
  return res.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`/notes/${id}`);
};

export const archiveNote = async (id: number): Promise<Note> => {
  const res = await axios.patch(`/notes/${id}/archive`);
  return res.data;
};

export const unarchiveNote = async (id: number): Promise<Note> => {
  const res = await axios.patch(`/notes/${id}/unarchive`);
  return res.data;
};
