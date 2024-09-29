import { Card, Typography } from "antd";
import React from "react";

const { Title } = Typography;
const { Meta } = Card;

const FilmCardNull: React.FC = () => {
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
        <Meta
          title={
            <Title level={5} style={{ color: "gray" }}>
              Belum ada film
            </Title>
          }
        />
      </Card>
    </div>
  );
};

export default FilmCardNull;
