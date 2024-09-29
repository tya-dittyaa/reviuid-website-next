import { Divider } from "antd";
import React from "react";

const DividerCenter: React.FC = () => {
  return (
    <Divider
      orientation="center"
      style={{
        borderColor: "black",
        borderWidth: 2,
        margin: "20px 0 20px 0",
      }}
    />
  );
};

export default DividerCenter;
