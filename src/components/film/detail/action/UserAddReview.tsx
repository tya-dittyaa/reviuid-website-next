import {
  useFilmData,
  useUserFilmComment,
  useUserSession,
  useViewLayout,
} from "@/context";
import { FilmReviewValue } from "@/types";
import {
  CheckSafetyText,
  DeleteUserFilmReview,
  PatchUserFilmReview,
  PostUserFilmReview,
} from "@/utils";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Rate } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;
const forceRefresh = () => window.location.reload();

const AddReview: React.FC = () => {
  const layout = useViewLayout();
  const userSession = useUserSession();
  const filmData = useFilmData()!;
  const userComment = useUserFilmComment();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showModal = () => {
    if (!userSession) {
      toast.warning(
        "Anda harus masuk terlebih dahulu sebelum anda dapat menambahkan komentar!"
      );
      return;
    }
    setOpen(true);
  };

  const hideModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleAddReview = async (values: FilmReviewValue) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Check if the content is profane
          const isContentProfane = await CheckSafetyText(values.review);
          if (isContentProfane === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (isContentProfane === true) {
            reject("Komentar mengandung kata-kata yang tidak pantas!");
            return;
          }

          // Fetch the forum parent
          const response = await PostUserFilmReview(
            filmData.id,
            values.rating,
            values.review
          );
          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (response) {
            resolve("Berhasil menambahkan komentar!");
            setTimeout(() => {
              hideModal();
              forceRefresh();
            }, 1000);
            return;
          } else {
            reject("Gagal menambahkan komentar!");
            return;
          }
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menambahkan komentar...",
      success: (data) => {
        setConfirmLoading(false);
        return `${data}`;
      },
      error: (error) => {
        setConfirmLoading(false);
        return `${error}`;
      },
    });
  };

  const handleEditReview = async (values: FilmReviewValue) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Check if the content is profane
          const isContentProfane = await CheckSafetyText(values.review);
          if (isContentProfane === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (isContentProfane === true) {
            reject("Komentar mengandung kata-kata yang tidak pantas!");
            return;
          }

          // Fetch the forum parent
          const response = await PatchUserFilmReview(
            filmData.id,
            values.rating,
            values.review
          );
          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
            return;
          } else if (response) {
            resolve("Berhasil memperbarui komentar!");
            setTimeout(() => {
              hideModal();
              forceRefresh();
            }, 1000);
            return;
          } else {
            reject("Gagal memperbarui komentar!");
            return;
          }
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memperbarui komentar...",
      success: (data) => {
        setConfirmLoading(false);
        return `${data}`;
      },
      error: (error) => {
        setConfirmLoading(false);
        return `${error}`;
      },
    });
  };

  const handleDeleteReview = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await DeleteUserFilmReview(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus komentar!");
          } else {
            reject("Gagal menghapus komentar!");
          }

          setTimeout(() => {
            setConfirmDelete(false);
            hideModal();
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menghapus komentar...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleCommentAction = async () => {
    form
      .validateFields()
      .then((values: FilmReviewValue) => {
        if (userComment) {
          handleEditReview(values);
        } else {
          handleAddReview(values);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        block
        size="large"
        type="primary"
        onClick={showModal}
        icon={userComment ? <EditOutlined /> : <CommentOutlined />}
        style={{
          color: "black",
          fontSize: layout === "horizontal" ? "1.2vw" : "4vw",
          paddingTop: layout === "horizontal" ? "1vw" : "3vw",
          paddingBottom: layout === "horizontal" ? "1vw" : "3vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userComment ? "Perbarui Komentar" : "Tambahkan Komentar"}
      </Button>

      <Modal
        centered
        closable={false}
        maskClosable={false}
        title={userComment ? "Perbarui Komentar" : "Tambahkan Komentar"}
        open={open}
        onOk={handleCommentAction}
        confirmLoading={confirmLoading}
        onCancel={hideModal}
        okText={userComment ? "Perbarui" : "Tambahkan"}
        cancelText="Batal"
        okButtonProps={{
          disabled: confirmLoading || confirmDelete,
          icon: <SaveOutlined />,
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
          disabled: confirmLoading || confirmDelete,
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            {userComment && (
              <>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteReview}
                  loading={confirmDelete}
                  disabled={confirmLoading}
                >
                  Hapus
                </Button>
              </>
            )}
            <OkBtn />
          </>
        )}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Komentar"
            name="rating"
            initialValue={userComment?.rating}
            rules={[{ required: true, message: "Komentar harus diisi" }]}
          >
            <Rate allowClear={false} />
          </Form.Item>
          <Form.Item
            label="Review"
            name="review"
            initialValue={userComment?.review}
            rules={[{ required: true, message: "Review harus diisi" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddReview;
