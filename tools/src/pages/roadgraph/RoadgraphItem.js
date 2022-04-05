export default function RoadgraphItem({
  name,
  progress,
  description,
  date,
  workers,
  whenBack,
}) {
  return (
    <div className="roadgraph-item">
      <button
        className="back"
        onClick={() => {
          whenBack();
        }}
      >
        Voltar
      </button>
      <div className="info">
        <p className="name">{name}</p>
        <div className="progress-date">
          <span>
            <progress value={progress * 100} max={100}></progress>{" "}
            {progress * 100}%
          </span>
          {date && <span>Prazo: {date}</span>}
        </div>
        <p className="description">{description}</p>
        {workers.length > 0 && (
          <div className="workers">
            <h3>Contribuidores ativos</h3>
            <ul>
              {workers.map((worker) => (
                <li>{worker}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
