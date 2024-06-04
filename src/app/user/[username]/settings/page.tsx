"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import { UserProfile, UserSession, UserSettings, ViewType } from "@/types";
import {
  CheckAvailableEmail,
  CheckAvailableUsername,
  FetchChangeBiography,
  FetchChangeEmail,
  FetchChangePassword,
  FetchChangeUsername,
  FetchDeleteAccount,
  FetchDeleteAvatar,
  FetchUploadAvatar,
  GetUserProfile,
  GetUserSession,
} from "@/utils";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  KeyOutlined,
  MailOutlined,
  SaveOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  GetProp,
  Input,
  Layout,
  Modal,
  Spin,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;
const forceRefresh = () => window.location.reload();

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function EditAvatar() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileImage, setFileImage] = useState<UploadFile | null>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const formData = new FormData();
          formData.append("avatar", fileImage as FileType);

          const response = await FetchUploadAvatar(formData);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil mengunggah foto profil.");
          } else {
            reject("Gagal mengunggah foto profil!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setFileImage(null);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleDelete = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const formData = new FormData();
          formData.append("avatar", fileImage as FileType);

          const response = await FetchDeleteAvatar();

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus foto profil.");
          } else {
            reject("Gagal menghapus foto profil!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmDelete(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
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

    const isLowerSize = file.size / 1024 / 1024 < 10;
    if (!isLowerSize) {
      toast.error("Gambar harus lebih kecil dari 10MB.");
    }

    const isImage = isJpgOrPng && isLowerSize;
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
        title="Ubah Foto Profil"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: fileImage === null || confirmLoading || confirmDelete,
          icon: <CloudUploadOutlined />,
        }}
        cancelButtonProps={{
          disabled: confirmLoading || confirmDelete,
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              loading={confirmDelete}
              disabled={confirmLoading}
            >
              Hapus
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Klik untuk Mengunggah</Button>
        </Upload>
      </Modal>
    </>
  );
}

function EditUsername() {
  const router = useRouter();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  function hasSpace(input: any): boolean {
    if (typeof input !== "string") {
      return false;
    }
    return input.includes(" ");
  }

  const updateUsername = async (values: { username: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          let validResponse = false;
          const response = await FetchChangeUsername(values.username);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            validResponse = true;
            resolve("Berhasil memperbarui nama pengguna.");
          } else {
            reject("Gagal memperbarui nama pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            if (validResponse) {
              router.push(`/user/${values.username}/settings`);
            }
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateUsername(values);
      })
      .catch((error) => {
        console.log(error);
      });
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
        title="Ubah Nama Pengguna"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
          disabled: confirmLoading,
        }}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan nama pengguna baru Anda!",
              },
              {
                min: 3,
                message: "Nama pengguna minimal 3 karakter!",
              },
              {
                max: 16,
                message: "Nama pengguna maksimal 16 karakter!",
              },
              {
                validator: async (_, value) => {
                  if (hasSpace(value)) {
                    return Promise.reject(
                      "Nama pengguna tidak boleh mengandung spasi!"
                    );
                  }

                  const response = await CheckAvailableUsername(value);
                  if (response === true) {
                    return Promise.resolve();
                  }
                  if (response === false) {
                    return Promise.reject("Nama pengguna sudah digunakan!");
                  }
                  return Promise.reject("Terjadi kesalahan pada server!");
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Username Baru Anda"
              addonBefore={<UserOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function EditBiography() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const updateBiography = async (values: { biography: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangeBiography(values.biography);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui deskripsi pengguna.");
          } else {
            reject("Gagal memperbarui deskripsi pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const updateEmptyBiography = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(async () => {
          const response = await FetchChangeBiography(null);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus deskripsi pengguna.");
          } else {
            reject("Gagal menghapus deskripsi pengguna!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmDelete(false);
            forceRefresh();
          }, 1000);
        }, 1000)
      );

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateBiography(values);
      })
      .catch((error) => {
        console.log(error);
      });
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
        title="Ubah Biografi Pengguna"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading || confirmDelete,
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
          disabled: confirmLoading || confirmDelete,
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={updateEmptyBiography}
              loading={confirmDelete}
              disabled={confirmLoading}
            >
              Hapus
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="biography"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan deskripsi Anda!",
              },
              {
                max: 160,
                message: "Biografi maksimal 160 karakter!",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Deskripsi Pengguna"
              showCount
              maxLength={160}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function EditEmail() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const updateEmail = async (values: { email: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangeEmail(values.email);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui alamat email.");
          } else {
            reject("Gagal memperbarui alamat email!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updateEmail(values);
      })
      .catch((error) => {
        console.log(error);
      });
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
        title="Ubah Email"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
          disabled: confirmLoading,
        }}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan alamat email baru Anda!",
              },
              {
                type: "email",
                message: "Input tidak valid! Masukkan alamat email yang benar!",
              },
              {
                validator: async (_, value) => {
                  const response = await CheckAvailableEmail(value);
                  if (response === true) {
                    return Promise.resolve();
                  }
                  if (response === false) {
                    return Promise.reject("Alamat email sudah digunakan!");
                  }
                  return Promise.reject("Terjadi kesalahan pada server!");
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Email Baru Anda"
              addonBefore={<MailOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function EditPassword() {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const updatePassword = async (values: { password: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const response = await FetchChangePassword(values.password);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui kata sandi.");
          } else {
            reject("Gagal memperbarui kata sandi!");
          }

          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memproses perubahan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        updatePassword(values);
      })
      .catch((error) => {
        console.log(error);
      });
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
        title="Ubah Kata Sandi"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Simpan"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
        }}
        cancelButtonProps={{
          disabled: confirmLoading,
        }}
      >
        <Form
          form={form}
          autoComplete="off"
          autoCapitalize="off"
          autoSave="off"
          autoCorrect="off"
        >
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silakan masukkan kata sandi baru Anda!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\])[A-Za-z\d*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\]{8,32}$/,
                message: `Password harus memiliki 1 angka, huruf kecil, huruf kapital, karakter khusus, dan panjang 8-32 karakter!`,
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Kata Sandi Baru Anda"
              addonBefore={<KeyOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>

          <Form.Item
            name="repeatPassword"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Silakan masukkan ulang kata sandi baru Anda!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Kata sandi yang Anda masukkan tidak sama!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Ulangi Kata Sandi Baru Anda"
              addonBefore={<KeyOutlined style={{ color: "#969AB8" }} />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function DeleteAccount() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();

  const handleOk = async () => {
    const promise = () =>
      new Promise((resolve, reject) =>
        setTimeout(async () => {
          const response = await FetchDeleteAccount();

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus akun Anda.");
          } else {
            reject("Gagal menghapus akun Anda!");
          }

          setTimeout(() => {
            router.push(`/`);
          }, 1000);
        }, 1000)
      );

    toast.promise(promise, {
      loading: "Memproses penghapusan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const confirm = () => {
    modal.confirm({
      centered: true,
      title: "Konfirmasi Penghapusan Akun",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Apakah Anda yakin ingin menghapus akun Anda?</p>
          <br />
          <b>Perhatian:</b>
          <p>Tindakan ini tidak dapat dibatalkan!</p>
        </>
      ),
      okText: "Hapus Akun",
      cancelText: "Batal",
      okButtonProps: { icon: <DeleteOutlined />, danger: true },
      onOk: handleOk,
    });
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
        onClick={confirm}
      >
        Hapus Akun
      </Button>

      {contextHolder}
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
        backgroundColor: "#E2E0D8",
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
