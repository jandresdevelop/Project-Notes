interface Props {
  active: "active" | "archived";
  onChange: (tab: "active" | "archived") => void;
}

const NotesTabs = ({ active, onChange }: Props) => {
  return (
    <div className="notes-tabs">
      <button
        type="button"
        className={`notes-tabs__btn ${active === "active" ? "is-active" : ""}`}
        onClick={() => onChange("active")}
      >
        📄 Activas
      </button>

      <button
        type="button"
        className={`notes-tabs__btn ${
          active === "archived" ? "is-active" : ""
        }`}
        onClick={() => onChange("archived")}
      >
        📦 Archivadas
      </button>
    </div>
  );
};

export default NotesTabs;
