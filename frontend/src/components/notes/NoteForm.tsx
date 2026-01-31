import { useEffect, useState } from "react";
import type { Category } from "../../types/category";
import type { Note } from "../../types/note";

interface NotePayload {
  title: string;
  content: string;
  categoryId?: number;
}

interface Props {
  categories: Category[];
  editingNote: Note | null;
  onCreate: (payload: NotePayload) => Promise<void>;
  onUpdate: (id: number, payload: NotePayload) => Promise<void>;
  onCancelEdit: () => void;
}

const NoteForm = ({
  categories,
  editingNote,
  onCreate,
  onUpdate,
  onCancelEdit,
}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategoryId(editingNote.category?.id);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(undefined);
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      categoryId,
    };

    if (editingNote) {
      await onUpdate(editingNote.id, payload);
    } else {
      await onCreate(payload);
    }

    setTitle("");
    setContent("");
    setCategoryId(undefined);
  };

  return (
    <form className="card card-body mb-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">{editingNote ? "Editar nota" : "Nueva nota"}</h5>

      <input
        className="form-control mb-2"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="form-control mb-2"
        placeholder="Contenido"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select
        className="form-select mb-3"
        value={categoryId ?? ""}
        onChange={(e) =>
          setCategoryId(e.target.value ? Number(e.target.value) : undefined)
        }
      >
        <option value="">Sin categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {editingNote ? "Actualizar" : "Crear"}
        </button>

        {editingNote && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
