import React from "react";
import { IContainerProps } from "./types";

const Container: React.FC<IContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
