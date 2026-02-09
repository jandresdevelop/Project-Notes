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
        <div className="thirds">
          {" "}
          <h2 className="mb-4">📂Create Categories 📂</h2>
        </div>

        {/* HEADER */}

        {/* FORM */}
        <form
          className="form note-form  row g-2 align-items-center mb-4"
          onSubmit={handleSubmit}
        >
          {" "}
          <div className="d-flex justify-content-between align-items-center mb-4">
            {editingId !== null && (
              <span className="badge bg-warning text-dark">Editing</span>
            )}
          </div>
          <div className="note-form__field">
            <input
              className="form-control form-control-lg"
              placeholder="Categories name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="note-form__actions col-auto d-flex gap-2">
            <button className="btn btn-primary px-4" type="submit">
              {editingId !== null ? "Update" : "Create"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-btn btn btn-outline-primary"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        <div className="thirds">
          <h2 className="mb-4">📂 Categories 📂</h2>
        </div>

        <div className="task-list row g-3 mt-3 list-group list-group-flush">
          {categories.length === 0 && (
            <li className="list-group-item text-muted text-center py-4">
              There is no categories created yet. Create one to start organizing
              your notes!
            </li>
          )}

          {categories.map((cat) => (
            <div
              key={cat.id}
              className="col-md-4 list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <div className="note-card">
                <span className="fw-medium">{cat.name}</span>

                <div className="btn-group btn-group-sm">
                  <p className="note-card__content"></p>
                  <div className="note-card__actions-left">
                    <button
                      className="edit-btn btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setEditingId(cat.id);
                        setName(cat.name);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
