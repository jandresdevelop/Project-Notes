import { useEffect, useState } from "react";
import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
  onCreate: (name: string) => Promise<void>;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const CategoryPanel = ({ categories, onCreate, onUpdate, onDelete }: Props) => {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (editingId === null) {
      setName("");
    }
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingId !== null) {
      await onUpdate(editingId, name);
    } else {
      await onCreate(name);
    }

    setName("");
    setEditingId(null);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">📂 Categorías</h5>

        {/* FORM */}
        <form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Nombre de categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            {editingId !== null ? "Actualizar" : "Crear"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setEditingId(null)}
            >
              Cancelar
            </button>
          )}
        </form>

        {/* LIST */}
        <ul className="list-group list-group-flush">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{cat.name}</span>

              <div className="btn-group btn-group-sm">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setEditingId(cat.id);
                    setName(cat.name);
                  }}
                >
                  Editar
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(cat.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPanel;
