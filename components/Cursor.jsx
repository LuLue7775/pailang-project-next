import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { getRelativeCoordinates } from "../utils/functions";

const css = {
    box: {
      backgroundColor: "linen",
      width: "100vw",
      height: "100vh",
      position: "relative",
      zIndex:"100"
    },
    fly: {
      position: "absolute",
      width: "20px",
      height: "20px",
      margin: "-10px",
      backgroundColor: "red",
      borderRadius: 10
    }
  };

export default function Cursor() {

    const [mousePosition, setMousePosition] = useState({});
    const boxRef = useRef();
    const handleMouseMove = e => {
      setMousePosition(getRelativeCoordinates(e, boxRef.current));
    //   console.log('move')
    };

    return (
      <motion.div
        id="cursor-area"
        ref={boxRef}
        style={{ ...css.box, perspective: 600 }}
        onMouseMove={e => handleMouseMove(e)}
        animate={{
          rotateX: mousePosition.centerX * 20,
          rotateY: mousePosition.centerY * 20
        }}
      >
        <motion.div
          style={css.fly}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y
          }}
        />
        <motion.div
          style={{ ...css.fly, backgroundColor: "gold" }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y
          }}
          transition={{ type: "spring" }}
        />
        <motion.div
          style={{ ...css.fly, backgroundColor: "orange" }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y
          }}
          transition={{ type: "tween" }}
        />
        {mousePosition.x} / {mousePosition.y}
        <br />
        {mousePosition.centerX} / {mousePosition.centerY}
        <br />
        {mousePosition.width} / {mousePosition.height}
        <br />
      </motion.div>
    );
}
