import { useUserSession } from "@/context";
import { ForumCreateParentData } from "@/types";
import { CreateForumParent } from "@/utils";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ForumListCreateButton: React.FC = () => {
  const userSession = useUserSession();
  const route = useRouter();

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleAddForum = async (values: ForumCreateParentData) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Fetch the forum parent
          const response = await CreateForumParent(
            values.title,
            values.content
          );

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response === null) {
            reject("Terjadi kesalahan saat membuat forum!");
          } else {
            resolve("Forum berhasil dibuat!");
            hideModal();
          }

          setTimeout(() => {
            setConfirmLoading(false);
            hideModal();

            if (typeof response === "string") {
              route.push(`/forum/${response}`);
            } else {
              route.push("/forum");
            }
          }, 1500);
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Membuat forum...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const showModal = () => {
    if (!userSession) {
      toast.warning(
        "Anda harus masuk terlebih dahulu sebelum anda dapat membuat forum!"
      );
      return;
    }
    setOpenModal(true);
  };

  const hideModal = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const onOkModal = async () => {
    form
      .validateFields()
      .then((values: ForumCreateParentData) => {
        handleAddForum(values);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        style={{
          width: "auto",
          color: "black",
        }}
        onClick={showModal}
      >
        Buat Forum
      </Button>

      <Modal
        centered
        closable={false}
        maskClosable={false}
        title="Buat Forum"
        open={openModal}
        confirmLoading={confirmLoading}
        onOk={onOkModal}
        onCancel={hideModal}
        okText="Buat"
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading,
          icon: <SaveOutlined />,
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
          disabled: confirmLoading,
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Judul"
            rules={[
              { required: true, message: "Judul forum harus diisi!" },
              {
                max: 64,
                message: "Judul forum tidak boleh lebih dari 64 karakter!",
              },
            ]}
          >
            <Input count={{ show: true, max: 64 }} />
          </Form.Item>

          <Form.Item
            name="content"
            label="Konten"
            rules={[
              { required: true, message: "Konten forum harus diisi!" },
              {
                max: 2000,
                message: "Konten forum tidak boleh lebih dari 2000 karakter!",
              },
            ]}
          >
            <Input.TextArea count={{ show: true, max: 2000 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ForumListCreateButton;
