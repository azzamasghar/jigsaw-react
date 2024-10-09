import React, { useEffect, useRef, useState } from "react";

import Puzzle from "../assets/lib/puzzle";
import Modal from "./Modal";

import { ReactComponent as IconBrushSolid } from "../assets/icons/brush-solid.svg";
import { ReactComponent as IconVialSolid } from "../assets/icons/vial-solid.svg";
import { ReactComponent as IconPuzzleSolid } from "../assets/icons/puzzle-solid.svg";
import { ReactComponent as IconImageSolid } from "../assets/icons/image-solid.svg";
import { ReactComponent as IconEyeSolid } from "../assets/icons/eye-solid.svg";
import { ReactComponent as IconEyeSlashedSolid } from "../assets/icons/eye-slashed-solid.svg";
import { ReactComponent as IconInfoSolid } from "../assets/icons/information-solid.svg";

import "./JigsawPuzzle.css";

const JigsawPuzzle = ({
  containerRef,
  imageUrl,
  rows,
  cols,
  maxImageHeight,
  maxImageWidth,
  hintsEnabled,
  animationDuration,
  fullScreen,
  pieceScroller,
  showSolveCtrl,
  showMixCtrl,
  showEntireImageCtrl,
  showImageOnCanvasCtrl,
  showHintsCtrl,
}) => {
  const [canvasWidth, setCanvasWidth] = useState(900);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [puzzleViewMode, setPuzzleViewMode] = useState("All");
  const [showImageOnCanvas, setShowImageOnCanvas] = useState(false);
  const [showHints, setShowHints] = useState(hintsEnabled);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const puzzle = useRef(null);

  useEffect(() => {
    const parentContainer = containerRef.current;
    const canvas = canvasRef.current;
    const controls = controlsRef.current;
    setCanvasWidth(parentContainer.offsetWidth);

    const styles = window.getComputedStyle(controls);
    const margin =
      parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);
    const controlsHeight = Math.ceil(controls.offsetHeight + margin);

    setCanvasHeight(parentContainer.offsetHeight - controlsHeight);

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      if (!puzzle.current) {
        puzzle.current = new Puzzle({
          canvas: canvas,
          image: img,
          rows: rows,
          columns: cols,
          maxImageHeight: maxImageHeight,
          maxImageWidth: maxImageWidth,
          animationDuration: animationDuration,
          fullScreen: fullScreen,
          pieceScroller: pieceScroller,
          showImageOnCanvas: showImageOnCanvas,
          hintsEnabled: showHints,
          canvasWidth: canvasWidth,
          canvasHeight: parentContainer.offsetHeight - controls.offsetHeight,
          scaleMultiplier: 1,
        });

        puzzle.current.generatePieces();
        if (pieceScroller) {
          puzzle.current.arrangePiecesInScroller(); // Arrange in horizontal scroll
        } else {
          puzzle.current.randomizePieces(); // Scatter pieces randomly
        }
        requestAnimationFrame(puzzle.current.draw.bind(puzzle.current));
      }
    };
  }, [
    containerRef,
    canvasWidth,
    canvasHeight,
    imageUrl,
    rows,
    cols,
    maxImageHeight,
    maxImageWidth,
    animationDuration,
    fullScreen,
    pieceScroller,
    showSolveCtrl,
    showMixCtrl,
    showEntireImageCtrl,
    showImageOnCanvasCtrl,
    showHintsCtrl,
  ]);

  const solvePuzzle = () => {
    puzzle.current.solve();
  };

  const mixPuzzle = () => {
    puzzle.current.mixPuzzle();
  };

  const viewAllPuzzle = () => {
    const val = "All";
    setPuzzleViewMode(val);
    puzzle.current.viewMode = val;
    if (pieceScroller) {
      puzzle.current.arrangePiecesInScroller();
    }
  };

  const viewBorderPuzzle = () => {
    const val = "BorderPieces";
    setPuzzleViewMode(val);
    puzzle.current.viewMode = val;
    if (pieceScroller) {
      puzzle.current.arrangePiecesInScroller();
    }
  };

  const viewEntireImagePuzzle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hideEntireImagePuzzle = () => {
    setIsModalOpen(false);
  };

  const toggleImageOnCanvasPuzzle = () => {
    const val = !showImageOnCanvas;
    setShowImageOnCanvas(val);
    puzzle.current.toggleImageOnCanvas(val);
  };

  const toggleHintsPuzzle = () => {
    const val = !showHints;
    setShowHints(val);
    puzzle.current.toggleHints(val);
  };

  return (
    <>
      <div ref={controlsRef} className="controls">
        {showSolveCtrl ? (
          <div className="btn-icon" onClick={solvePuzzle}>
            <IconBrushSolid></IconBrushSolid>
          </div>
        ) : null}

        {showMixCtrl ? (
          <div className="btn-icon" onClick={mixPuzzle}>
            <IconVialSolid></IconVialSolid>
          </div>
        ) : null}

        {puzzleViewMode === "All" ? (
          <div className="btn-icon" onClick={viewBorderPuzzle}>
            <IconPuzzleSolid></IconPuzzleSolid>
          </div>
        ) : (
          <div className="btn-icon" onClick={viewAllPuzzle}>
            <IconPuzzleSolid></IconPuzzleSolid>
          </div>
        )}

        {showEntireImageCtrl ? (
          <>
            <div
              className={"btn-icon " + (isModalOpen ? "active" : "")}
              onClick={viewEntireImagePuzzle}
            >
              <IconImageSolid></IconImageSolid>
            </div>

            <Modal
              show={isModalOpen}
              onClose={hideEntireImagePuzzle}
              imageSrc={imageUrl}
            />
          </>
        ) : null}

        {showImageOnCanvasCtrl ? (
          <div
            className={"btn-icon " + (showImageOnCanvas ? "active" : "")}
            onClick={toggleImageOnCanvasPuzzle}
          >
            {showImageOnCanvas ? (
              <IconEyeSlashedSolid></IconEyeSlashedSolid>
            ) : (
              <IconEyeSolid></IconEyeSolid>
            )}
          </div>
        ) : null}

        {showHintsCtrl ? (
          <div
            className={"btn-icon " + (showHints ? "active" : "")}
            onClick={toggleHintsPuzzle}
          >
            <IconInfoSolid></IconInfoSolid>
          </div>
        ) : null}
      </div>

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </>
  );
};

export default JigsawPuzzle;
