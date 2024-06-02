import { useWindowSize } from "@/hooks";
import { LogoConfig, UserSession, ViewType } from "@/types";
import { GetUserSession } from "@/utils";
import {
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Dropdown,
  Layout,
  MenuProps,
  Spin,
  Typography,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Text } = Typography;

function ReviuIDLogo(logoConfig: LogoConfig) {
  return (
    <a
      href="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Avatar
        size={logoConfig.AvatarSize}
        src={
          <Image
            src="/logo.png"
            alt="Reviu.ID Logo"
            width={logoConfig.AvatarSize}
            height={logoConfig.AvatarSize}
          />
        }
      />
      <Text
        strong
        style={{
          color: "#E2B808",
          fontSize: logoConfig.FontSize,
          marginLeft: 15,
        }}
      >
        <b style={{ fontWeight: "bold" }}>Reviu.ID</b>
      </Text>
    </a>
  );
}

function DrawerLayout({ view }: { view: ViewType }) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Col
      flex="45px"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={<MenuOutlined style={{ color: "#E2B808", fontSize: "25px" }} />}
        onClick={() => setOpen(!open)}
      />

      <Drawer
        title="Reviu.ID - Menu"
        footer="© 2024, oleh Reviu Film ID, Inc."
        placement="left"
        width={250}
        onClose={onClose}
        open={open}
        style={{
          color: "black",
        }}
      >
        <Button
          type="text"
          size="large"
          block
          href="/"
          style={{ marginBottom: "15px" }}
        >
          Beranda
        </Button>

        <Button
          type="text"
          size="large"
          href="/film"
          block
          style={{ marginBottom: "15px" }}
        >
          Film
        </Button>

        <Button
          type="text"
          size="large"
          href="/forum"
          block
          style={{ marginBottom: "15px" }}
        >
          Forum
        </Button>
      </Drawer>
    </Col>
  );
}

function LogoLayout() {
  return (
    <Col
      flex="auto"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
      }}
    >
      <ReviuIDLogo AvatarSize={40} FontSize={30} />
    </Col>
  );
}

function UserNotLogin() {
  return (
    <Col
      flex="auto"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "white",
      }}
    >
      <Button
        href="/login"
        size="large"
        type="primary"
        style={{
          fontWeight: "bolder",
          color: "black",
          backgroundColor: "#E2B808",
        }}
      >
        Masuk
      </Button>
    </Col>
  );
}

function UserHasLogin() {
  const size = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<"vertical" | "horizontal">("horizontal");
  const [userData, setUserData] = useState<UserSession | null>(null);

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("vertical");
    } else {
      setValue("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserSession();
      setUserData(response);
      setIsLoading(false);
    };
    getUserData();
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if (!userData) {
    return <UserNotLogin />;
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `Halo, ${userData.username} !`,
      disabled: true,
      style: { color: "#E2B808", fontWeight: "bold" },
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <a href={`/user/${userData.username}`}>Profil</a>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <a href={`/user/${userData.username}/settings`}>Pengaturan</a>,
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      label: <a href={`/logout`}>Keluar</a>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow autoAdjustOverflow>
      <a
        onClick={(e) => e.preventDefault()}
        style={{
          position: "sticky",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {value === "horizontal" && (
          <Text
            strong
            style={{
              color: "#E2B808",
              fontSize: 15,
              marginRight: 15,
            }}
          >
            {userData.username}
          </Text>
        )}

        <Avatar
          size={40}
          src={
            <Image
              src={userData.avatar}
              alt={`Avatar ${userData.username}`}
              width={40}
              height={40}
            />
          }
        />
      </a>
    </Dropdown>
  );
}

export default function HeaderLayout() {
  const size = useWindowSize();
  const [value, setValue] = useState<"vertical" | "horizontal">("horizontal");

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("vertical");
    } else {
      setValue("horizontal");
    }
  }, [size.width]);

  return (
    <Header
      style={{
        backgroundColor: "black",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: value === "horizontal" ? "0 25px" : "0 15px",
      }}
    >
      <DrawerLayout view={value} />
      <LogoLayout />
      <UserHasLogin />
    </Header>
  );
}
