import { useUserProfile } from "@/context";
import { Avatar, Flex, Typography } from "antd";
import Image from "next/image";
import React from "react";
import UserProfileDropdown from "../layout/UserProfileDropdown";

const { Title, Paragraph } = Typography;

const UserHomeHorizontal: React.FC = () => {
  const user = useUserProfile()!;

  return (
    <Flex
      gap="30px"
      vertical={false}
      align="center"
      style={{
        backgroundColor: "#E2E0D8",
        borderRadius: 10,
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
        padding: "2rem",
      }}
    >
      <div>
        <Avatar
          size={125}
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
          }}
        />
      </div>

      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={4}>{user.username}</Title>
        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </div>

      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <UserProfileDropdown userData={user} />
      </div>
    </Flex>
  );
};

export default UserHomeHorizontal;
