import React, { Suspense } from 'react';
import { Img } from 'react-image';
import { Loader } from './Loader';

function ImgComponent(props) {
  // console.info('imgComp:', props.sourceURL);

  const altErrorMsg = `Couldn't load image of ${props.caption}`;

  return (
    <Img
      className="pc-image"
      src={[props.sourceURL]}
      loader={<Loader className="fallback-wrapper" />}
      unloader={
        <h1 className="pc-image unloaded">SOME MESSAGE HERE {altErrorMsg}</h1>
      }
      alt={props.caption}
    />
  );
}

export function PokeCard(props) {
  return (
    <div
      className="poke-card"
      onClick={(e) => {
        props.clickTracker(e);
        props.randomizeCards(e);
      }}
    >
      {/* Use suspense to display a loader while the images load */}
      {/* <Suspense fallback={<Loader className="fallback-wrapper" />}> */}
      {/* <ImgComponent */}
      <img
        className="pc-image"
        src={props.sourceURL}
        alt={props.caption}
        // sourceURL={props.sourceURL}
        // caption={props.caption}
        // count={props.count}
      />
      {/* </Suspense> */}

      <p className="pc-caption">{props.caption}</p>
    </div>
  );
}
