import { Card, Spin } from "antd";
import React from "react";

const { Meta } = Card;

const FilmCardLoading: React.FC = () => {
  return (
    <div
      style={{
        padding: "3px 3px",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          background: "#E2E0D8",
        }}
      >
        <Meta title={<Spin />} />
      </Card>
    </div>
  );
};

export default FilmCardLoading;
