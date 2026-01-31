import type { Note } from "../../types/note";

interface Props {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
}

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
}: Props) => {
  return (
    <div className="card h-100 shadow-sm note-card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{note.title}</h5>

          {note.category && (
            <span className="badge bg-secondary">{note.category.name}</span>
          )}
        </div>

        <p className="card-text text-muted flex-grow-1">{note.content}</p>

        <small className="text-muted mb-3">
          {new Date(note.createdAt).toLocaleString()}
        </small>

        <div className="btn-group">
          <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
            ✏️ Editar
          </button>

          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            🗑️ Eliminar
          </button>

          {note.isArchived ? (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={onUnarchive}
            >
              ♻️ Restaurar
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={onArchive}
            >
              📦 Archivar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
