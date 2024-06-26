import { useUserProfile } from "@/context";
import { Avatar, Flex, Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Title, Paragraph } = Typography;

const UserHomeVertical: React.FC = () => {
  const user = useUserProfile()!;

  return (
    <>
      <Flex
        vertical
        justify="center"
        style={{
          backgroundColor: "#E2E0D8",
          borderRadius: 10,
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          padding: "2rem",
        }}
      >
        <Avatar
          size={100}
          icon={
            <Image
              priority
              src={user.avatar}
              width={2048}
              height={2048}
              alt={`Avatar ${user.username}`}
            />
          }
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
            marginBottom: "1rem",
          }}
        />

        <Title level={4}>{user.username}</Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
};

export default UserHomeVertical;
