export function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Game {props.result}!</h2>
        <div className="modal-choices">
          <button className="modal-text" onClick={props.retry}>
            Retry?
          </button>
        </div>
      </div>
    </div>
  );
}
