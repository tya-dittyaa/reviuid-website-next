import { useForumParentData, useUserSession } from "@/context";
import { CheckSafetyText, DeleteForumParent, UpdateForumParent } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Dropdown, Form, Input, MenuProps, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;

const ForumParentDropdown: React.FC = () => {
  const userSession = useUserSession();
  const parent = useForumParentData()!;

  const [form] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [confirmEditModal, setConfirmEditModal] = useState<boolean>(false);
  const [modalDelete, contextHolderDelete] = Modal.useModal();

  const handleEditModal = async (values: {
    title: string;
    content: string;
  }) => {
    setConfirmEditModal(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Check if the title is profane
          const isTitleProfane = await CheckSafetyText(values.title);
          if (isTitleProfane === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (isTitleProfane === true) {
            reject("Judul forum mengandung kata-kata yang tidak pantas!");
            return;
          }

          // Check if the content is profane
          const isContentProfane = await CheckSafetyText(values.content);
          if (isContentProfane === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (isContentProfane === true) {
            reject("Konten forum mengandung kata-kata yang tidak pantas!");
            return;
          }

          // Fetch the forum parent
          const response = await UpdateForumParent(
            values.title,
            values.content,
            parent.id
          );

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (response === false) {
            reject("Terjadi kesalahan saat mengubah forum!");
            return;
          } else {
            resolve("Forum berhasil diubah!");
            setTimeout(() => {
              window.location.reload();
              hideEditModal();
            }, 1500);
            return;
          }
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Mengubah forum...",
      success: (data) => {
        setConfirmEditModal(false);
        return `${data}`;
      },
      error: (error) => {
        setConfirmEditModal(false);
        return `${error}`;
      },
    });
  };

  const hideEditModal = () => {
    setShowEditModal(false);
    form.resetFields();
  };

  const onOkEditModal = async () => {
    form
      .validateFields()
      .then(async (values) => {
        handleEditModal(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editModal: React.ReactNode = (
    <Modal
      centered
      closable={false}
      maskClosable={false}
      title="Ubah Forum"
      open={showEditModal}
      confirmLoading={confirmEditModal}
      onOk={onOkEditModal}
      onCancel={hideEditModal}
      okText="Ubah"
      cancelText="Batal"
      okButtonProps={{
        disabled: confirmEditModal,
        icon: <EditOutlined />,
        style: { color: "black" },
      }}
      cancelButtonProps={{
        danger: true,
        disabled: confirmEditModal,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: parent.title, content: parent.content }}
      >
        <Form.Item
          name="title"
          label="Judul"
          rules={[
            { required: true, message: "Judul tidak boleh kosong" },
            {
              min: 5,
              message: "Judul forum minimal 5 karakter!",
            },
            {
              max: 100,
              message: "Judul forum tidak boleh lebih dari 100 karakter!",
            },
          ]}
        >
          <Input defaultValue={parent.title} count={{ show: true, max: 64 }} />
        </Form.Item>

        <Form.Item
          name="content"
          label="Konten"
          rules={[
            { required: true, message: "Konten tidak boleh kosong" },
            {
              min: 5,
              message: "Konten forum minimal 5 karakter!",
            },
            {
              max: 1000,
              message: "Konten forum tidak boleh lebih dari 1000 karakter!",
            },
          ]}
        >
          <TextArea
            defaultValue={parent.content}
            count={{ show: true, max: 1000 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  const handleDeleteModal = async () => {
    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Fetch the forum parent
          const response = await DeleteForumParent(parent.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response === false) {
            reject("Terjadi kesalahan saat menghapus forum!");
          } else {
            resolve("Forum berhasil dihapus!");
          }

          setTimeout(() => {
            window.location.href = "/forum";
          }, 1500);
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Menghapus forum...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const deleteModal = () => {
    modalDelete.confirm({
      centered: true,
      title: "Konfirmasi Penghapusan Forum",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      content: (
        <>
          <p>Apakah Anda yakin ingin menghapus forum ini?</p>
          <br />
          <b>Perhatian:</b>
          <p>Tindakan ini tidak dapat dibatalkan!</p>
        </>
      ),
      okText: "Hapus Forum",
      cancelText: "Batal",
      okButtonProps: { icon: <DeleteOutlined />, danger: true },
      cancelButtonProps: { danger: true },
      onOk: handleDeleteModal,
    });
  };

  const itemsForUser: MenuProps["items"] = [
    {
      key: "update",
      danger: false,
      label: "Ubah Forum",
      icon: <EditOutlined />,
      onClick: () => {
        setShowEditModal(true);
      },
    },
    {
      key: "delete",
      danger: true,
      label: "Hapus Forum",
      icon: <DeleteOutlined />,
      onClick: () => {
        deleteModal();
      },
    },
  ];

  const itemsForAll: MenuProps["items"] = [
    {
      key: "share",
      danger: false,
      label: "Bagikan Forum",
      icon: <SendOutlined />,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Tautan forum berhasil disalin");
      },
    },
    {
      key: "report",
      danger: true,
      label: "Laporkan Forum",
      icon: <DeleteOutlined />,
      onClick: () => {
        toast.info("Fitur ini akan segera hadir!");
      },
    },
  ];

  const items =
    userSession && userSession.id === parent.user.id
      ? [...itemsForUser, ...itemsForAll]
      : itemsForAll;

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <MoreOutlined
            key="ellipsis"
            style={{ fontSize: 20, color: "black" }}
          />
        </a>
      </Dropdown>

      {editModal}
      {contextHolderDelete}
    </>
  );
};

export default ForumParentDropdown;
