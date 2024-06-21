import { useUserSession } from "@/context";
import { ForumChildData } from "@/types";
import { DeleteForumChild, UpdateForumChild } from "@/utils";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Form, Input, MenuProps, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;

const ForumChildDropdown: React.FC<{
  childData: ForumChildData;
}> = ({ childData }) => {
  const userSession = useUserSession();

  const [formEdit] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [confirmEditModal, setConfirmEditModal] = useState<boolean>(false);
  const [modalDelete, contextHolderDelete] = Modal.useModal();

  const handleEditModal = async (values: { content: string }) => {
    setConfirmEditModal(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Fetch the forum child
          const response = await UpdateForumChild(values.content, childData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response === false) {
            reject("Terjadi kesalahan saat mengubah balasan!");
          } else {
            resolve("Balasan berhasil diubah!");
            hideEditModal();
          }

          setTimeout(() => {
            window.location.reload();
            setConfirmEditModal(false);
            hideEditModal();
          }, 1500);
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Mengubah balasan...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const hideEditModal = () => {
    setShowEditModal(false);
    formEdit.resetFields();
  };

  const onOkEditModal = () => {
    formEdit
      .validateFields()
      .then((values) => {
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
        form={formEdit}
        layout="vertical"
        initialValues={{ content: childData.content }}
      >
        <Form.Item
          name="content"
          label="Konten"
          rules={[
            { required: true, message: "Konten tidak boleh kosong" },
            {
              min: 5,
              message: "Komentar minimal 5 karakter",
            },
            {
              max: 1000,
              message: "Komentar maksimal 1000 karakter",
            },
          ]}
        >
          <TextArea
            defaultValue={childData.content}
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
          // Fetch the forum child
          const response = await DeleteForumChild(childData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response === false) {
            reject("Terjadi kesalahan saat menghapus balasan!");
          } else {
            resolve("Balasan berhasil dihapus!");
          }

          setTimeout(() => {
            window.location.reload();
            deleteModal();
          }, 1500);
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Menghapus balasan...",
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
      title: "Hapus Balasan",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      content: (
        <>
          <p>Apakah Anda yakin ingin menghapus balasan ini?</p>
          <br />
          <b>Perhatian:</b>
          <p>Tindakan ini tidak dapat dibatalkan!</p>
        </>
      ),
      okText: "Hapus",
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
      label: "Ubah",
      icon: <EditOutlined />,
      onClick: () => {
        setShowEditModal(true);
      },
    },
    {
      key: "delete",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Hapus",
      onClick: () => {
        deleteModal();
      },
    },
  ];

  const itemsForAll: MenuProps["items"] = [
    {
      key: "report",
      danger: true,
      icon: <DeleteOutlined />,
      label: "Laporkan",
      onClick: () => {
        toast.info("Fitur ini akan segera hadir!");
      },
    },
  ];

  const items =
    userSession && userSession.id === childData.user.id
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

export default ForumChildDropdown;
