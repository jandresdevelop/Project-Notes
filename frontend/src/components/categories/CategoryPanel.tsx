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
    <div className="card shadow-sm rounded-4 fade-in">
      <div className="card-body p-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-semibold">📂 Gestión de categorías</h5>

          {editingId !== null && (
            <span className="badge bg-warning text-dark">Editando</span>
          )}
        </div>

        {/* FORM */}
        <form
          className="row g-2 align-items-center mb-4"
          onSubmit={handleSubmit}
        >
          <div className="col flex-grow-1">
            <input
              className="form-control form-control-lg"
              placeholder="Nombre de la categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-auto d-flex gap-2">
            <button className="btn btn-primary px-4" type="submit">
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
          </div>
        </form>

        {/* LIST */}
        <ul className="list-group list-group-flush">
          {categories.length === 0 && (
            <li className="list-group-item text-muted text-center py-4">
              No hay categorías creadas
            </li>
          )}

          {categories.map((cat) => (
            <li
              key={cat.id}
              className="list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <span className="fw-medium">{cat.name}</span>

              <div className="btn-group btn-group-sm">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setEditingId(cat.id);
                    setName(cat.name);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(cat.id)}
                >
                  🗑 Eliminar
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
