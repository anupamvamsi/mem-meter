export function Loader(props) {
  // Credits: Vincenzo Bianco
  // Slightly tweaked from the original (Tweaks are in the CSS)
  // https://codepen.io/vinztt/pen/XjEyvZ
  return (
    <div className="wrapper">
      <div className="pokeball"></div>
    </div>
  );

  // return (
  //   <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     viewBox="0 0 400 400"
  //     preserveAspectRatio="xMidYMid"
  //     display="block"
  //   >
  //     <circle
  //       cx="200"
  //       cy="200"
  //       r="0"
  //       fill="none"
  //       stroke="#e50914"
  //       strokeWidth="2"
  //     >
  //       <animate
  //         attributeName="r"
  //         repeatCount="indefinite"
  //         dur="1s"
  //         values="0;40"
  //         keyTimes="0;1"
  //         keySplines="0 0.2 0.8 1"
  //         calcMode="spline"
  //         begin="0s"
  //       />
  //       <animate
  //         attributeName="opacity"
  //         repeatCount="indefinite"
  //         dur="1s"
  //         values="1;0"
  //         keyTimes="0;1"
  //         keySplines="0.2 0 0.8 1"
  //         calcMode="spline"
  //         begin="0s"
  //       />
  //     </circle>
  //     <circle
  //       cx="200"
  //       cy="200"
  //       r="0"
  //       fill="none"
  //       stroke="#221f1f"
  //       strokeWidth="2"
  //     >
  //       <animate
  //         attributeName="r"
  //         repeatCount="indefinite"
  //         dur="1s"
  //         values="0;40"
  //         keyTimes="0;1"
  //         keySplines="0 0.2 0.8 1"
  //         calcMode="spline"
  //         begin="-0.5s"
  //       />
  //       <animate
  //         attributeName="opacity"
  //         repeatCount="indefinite"
  //         dur="1s"
  //         values="1;0"
  //         keyTimes="0;1"
  //         keySplines="0.2 0 0.8 1"
  //         calcMode="spline"
  //         begin="-0.5s"
  //       />
  //     </circle>
  //   </svg>
  // );
}
