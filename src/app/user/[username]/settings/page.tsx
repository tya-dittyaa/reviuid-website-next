"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession, UserSettings, ViewType } from "@/types";
import { FetchUploadAvatar, GetUserProfile, GetUserSession } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  GetProp,
  Layout,
  Modal,
  Spin,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;
const forceRefresh = () => window.location.reload();

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function EditAvatar() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileImage, setFileImage] = useState<UploadFile | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const formData = new FormData();
    formData.append("avatar", fileImage as FileType);

    // Upload the avatar
    const response = await FetchUploadAvatar(formData);

    if (response) {
      toast.success("Berhasil memperbarui foto profil.");
    } else {
      toast.error("Gagal memperbarui foto profil.");
    }

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setFileImage(null);
      forceRefresh();
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setFileImage(null);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("Foto profil harus berformat JPG atau PNG.");
    }

    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      toast.error("Gambar harus lebih kecil dari 10MB.");
    }

    const isImage = isJpgOrPng && isLt2M;
    if (isImage) {
      setFileImage(file);
    }

    return isImage || Upload.LIST_IGNORE;
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    listType: "picture",
    showUploadList: fileImage ? true : false,
    beforeUpload: beforeUpload,
    onRemove: () => {
      setFileImage(null);
    },
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Foto Profil
      </Button>

      <Modal
        centered
        title="Ganti Foto Profil"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: fileImage === null }}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Klik untuk Mengunggah</Button>
        </Upload>
      </Modal>
    </>
  );
}

function EditUsername() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Nama Pengguna
      </Button>

      <Modal
        centered
        title="Ganti Nama Pengguna"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

function EditBiography() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Biografi Pengguna
      </Button>

      <Modal
        centered
        title="Ganti Biografi Pengguna"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

function EditEmail() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Email
      </Button>

      <Modal
        centered
        title="Ganti Email"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

function EditPassword() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button
        block
        type="default"
        shape="round"
        icon={<EditOutlined />}
        size="large"
        onClick={showModal}
      >
        Kata Sandi
      </Button>

      <Modal
        centered
        title="Ganti Kata Sandi"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Button
        block
        danger
        type="default"
        shape="round"
        icon={<DeleteOutlined />}
        size="large"
        onClick={showModal}
      >
        Hapus Akun
      </Button>

      <Modal
        centered
        title="Hapus Akun"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

function DisplayUserVertical({ user }: { user: UserSettings }) {
  return (
    <>
      <Flex
        vertical
        justify="center"
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: 10,
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          padding: "2rem",
        }}
      >
        <Avatar
          size={100}
          icon={
            <Image
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

        <Title level={4} style={{ margin: "0 0 0 0" }}>
          {user.username}
        </Title>
        <Title level={5} style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
          {user.email}
        </Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
}

function DisplayUserHorizontal({ user }: { user: UserSettings }) {
  return (
    <Flex
      gap="30px"
      vertical={false}
      align="center"
      style={{
        backgroundColor: "whitesmoke",
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

      <div>
        <Title level={4} style={{ margin: "0 0 0 0" }}>
          {user.username}
        </Title>
        <Title level={5} style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
          {user.email}
        </Title>
        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </div>
    </Flex>
  );
}

function ButtonSetting({ layout }: { layout: ViewType }) {
  return (
    <Flex
      gap="10px"
      vertical={layout === "vertical" ? true : false}
      align="center"
      justify="center"
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
        padding: "1rem",
      }}
    >
      <Flex
        vertical
        gap="10px"
        style={{
          width: "100%",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <Title level={4} style={{ margin: "0 0 0 0" }}>
          Ubah Pengaturan Akun
        </Title>
      </Flex>

      <Flex vertical gap="10px" style={{ width: "100%" }}>
        <EditAvatar />
        <EditUsername />
        <EditBiography />
      </Flex>

      <Flex vertical gap="10px" style={{ width: "100%" }}>
        <EditEmail />
        <EditPassword />
        <DeleteAccount />
      </Flex>
    </Flex>
  );
}

function SettingText({ layout }: { layout: ViewType }) {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Avatar
          size={layout === "horizontal" ? "large" : "default"}
          icon={<SettingOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
          }}
        />

        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: 30,
          }}
        >
          <b style={{ fontWeight: "bold" }}>Pengaturan</b>
        </Text>
      </Col>
    </Flex>
  );
}

function UserFound({ layout, user }: { layout: ViewType; user: UserSettings }) {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        padding: layout === "horizontal" ? "2rem" : "1rem",
      }}
    >
      <SettingText layout={layout} />

      <Divider
        orientation="center"
        style={{
          borderColor: "black",
          borderWidth: 2,
          margin: "20px 0 20px 0",
        }}
      />

      {layout === "vertical" ? (
        <DisplayUserVertical user={user} />
      ) : (
        <DisplayUserHorizontal user={user} />
      )}

      <Divider
        orientation="center"
        style={{
          borderColor: "black",
          borderWidth: 2,
          margin: "20px 0 20px 0",
        }}
      />

      <ButtonSetting layout={layout} />
    </Content>
  );
}

export default function SettingsPage({
  params,
}: {
  params: { username: string };
}) {
  const size = useWindowSize();
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    if (size.width && size.width < 800) {
      setLayout("vertical");
    } else {
      setLayout("horizontal");
    }
  }, [size.width]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserProfile(params.username);
      if (typeof response !== "number") {
        setUserData(response);
      }
      return;
    };
    getUserData();
  }, [params.username]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserSession();
      setUserSession(response);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (userData && userSession && userSession.username === params.username) {
      setUserSettings({
        username: userData.username,
        email: userSession.email,
        avatar: userData.avatar,
        biography: userData.biography,
        role: userSession.role,
      });
    }
  }, [params.username, userData, userSession]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (userSettings === null) {
    return notFound();
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <UserFound layout={layout} user={userSettings} />
      <FooterLayout />
      <Toaster richColors position="bottom-right" />
    </Layout>
  );
}
