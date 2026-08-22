import React from "react";
import { RemoteCursor as RemoteCursorType } from "../types";

interface Props {
  cursor: RemoteCursorType;
}

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, color, name } = cursor;
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${position.ch * 8}px`,
    top: `${position.line * 18}px`,
    backgroundColor: color,
    color: "#fff",
    padding: "2px 4px",
    borderRadius: "3px",
    fontSize: "12px",
    pointerEvents: "none",
    transform: "translate(-50%, -100%)",
    zIndex: 10
  };
  return <div style={style}>{name}</div>;
};

export default RemoteCursor;
