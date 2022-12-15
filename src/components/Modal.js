export function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Game Over!</h2>
        <div className="modal-choices">
          <button className="modal-text">Retry?</button>
          <button className="modal-text exit">Exit</button>
        </div>
      </div>
    </div>
  );
}
