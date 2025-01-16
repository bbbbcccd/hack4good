import { useState, useEffect } from "react";
import {
  getRandomColor,
  getRandomDirection,
} from "../../util/colourGenerator.js";

export const useRandomColorGradient = () => {
  const [color, setColor] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    setColor(getRandomColor());
    setDirection(getRandomDirection());
  }, []);

  return { color, direction };
};
