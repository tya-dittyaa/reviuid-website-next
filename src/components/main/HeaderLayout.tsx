import { useUserSession } from "@/context";
import { useWindowSize } from "@/hooks";
import { LogoConfig } from "@/types";
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

interface ReviuIDLogoProps {
  logoConfig: LogoConfig;
}

const ReviuIDLogo: React.FC<ReviuIDLogoProps> = ({ logoConfig }) => {
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
            priority
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
};

const DrawerLayout: React.FC = () => {
  const userSession = useUserSession();
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
        title="Reviu.ID - Menu Cepat"
        footer="© 2024, oleh Reviu Film ID, Inc."
        placement="left"
        width={270}
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

        {!userSession ? (
          <>
            <Button
              type="text"
              size="large"
              href="/login"
              block
              style={{ marginBottom: "15px" }}
            >
              Masuk
            </Button>
            <Button
              type="text"
              size="large"
              href="/register"
              block
              style={{ marginBottom: "15px" }}
            >
              Daftar
            </Button>
          </>
        ) : (
          <>
            <Button
              type="text"
              size="large"
              href={`/user/${userSession.username}`}
              block
              style={{ marginBottom: "15px" }}
            >
              Profil
            </Button>
            <Button
              type="text"
              size="large"
              href={`/user/${userSession.username}/settings`}
              block
              style={{ marginBottom: "15px" }}
            >
              Pengaturan
            </Button>
            <Button
              type="text"
              size="large"
              href={`/logout`}
              block
              style={{ marginBottom: "15px" }}
            >
              Keluar
            </Button>
          </>
        )}
      </Drawer>
    </Col>
  );
};

const LogoLayout: React.FC = () => {
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
      <ReviuIDLogo logoConfig={{ AvatarSize: 40, FontSize: 30 }} />
    </Col>
  );
};

const UserNotLogin: React.FC = () => {
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
          color: "black",
        }}
      >
        Masuk
      </Button>
    </Col>
  );
};

const UserHasLogin: React.FC = () => {
  const size = useWindowSize();
  const userSession = useUserSession();

  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<"vertical" | "horizontal">("horizontal");

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("vertical");
    } else {
      setValue("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  if (isLoading) {
    return <Spin />;
  }

  if (!userSession) {
    return <UserNotLogin />;
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `Halo, ${userSession.username} !`,
      disabled: true,
      style: { color: "#E2B808", fontWeight: "bold" },
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <a href={`/user/${userSession.username}`}>Profil</a>,
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: <a href={`/user/${userSession.username}/settings`}>Pengaturan</a>,
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
            {userSession.username}
          </Text>
        )}

        <Avatar
          size={40}
          src={
            <Image
              priority
              src={userSession.avatar}
              alt={`Avatar ${userSession.username}`}
              width={40}
              height={40}
            />
          }
        />
      </a>
    </Dropdown>
  );
};

const HeaderLayout: React.FC = () => {
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
      <DrawerLayout />
      <LogoLayout />
      <UserHasLogin />
    </Header>
  );
};

export default HeaderLayout;
