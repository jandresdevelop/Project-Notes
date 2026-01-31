interface Props {
  active: "active" | "archived";
  onChange: (tab: "active" | "archived") => void;
}

const NotesTabs = ({ active, onChange }: Props) => {
  return (
    <ul className="nav nav-tabs mt-3">
      <li className="nav-item">
        <button
          type="button"
          className={`nav-link ${active === "active" ? "active" : ""}`}
          onClick={() => onChange("active")}
        >
          Activas
        </button>
      </li>

      <li className="nav-item">
        <button
          type="button"
          className={`nav-link ${active === "archived" ? "active" : ""}`}
          onClick={() => onChange("archived")}
        >
          Archivadas
        </button>
      </li>
    </ul>
  );
};

export default NotesTabs;
