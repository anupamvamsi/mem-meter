// let count = 0;
export function Pokemon(props) {
  // console.log('Pokemon() count:', ++count);

  return (
    <div className="poke-card">
      <img className="pc-image" src={props.sourceURL} alt={props.caption} />
      <p className="pc-caption">{props.caption}</p>
    </div>
  );
}
