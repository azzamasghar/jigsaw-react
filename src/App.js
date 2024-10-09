import React, { useRef } from "react";
import "./App.css";

import JigsawPuzzle from "./components/JigsawPuzzle";
import puzzleImage from "./assets/image2.png"; // Import the image

const App = () => {
  const parentRef = useRef(null);

  return (
    <div className="App">
      <div ref={parentRef} className="puzzle-container">
        <JigsawPuzzle
          containerRef={parentRef}
          imageUrl={puzzleImage}
          rows={6}
          cols={6}
          maxImageWidth={95}
          maxImageHeight={70}
          animationDuration={250}
          fullScreen={false}
          pieceScroller={true}
          showSolveCtrl={true}
          showMixCtrl={true}
          showEntireImageCtrl={true}
          showImageOnCanvasCtrl={true}
          showHintsCtrl={true}
        />
      </div>
    </div>
  );
};

export default App;
