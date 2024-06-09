import { useFilmData, useUserFilmComment, useUserSession } from "@/context";
import { FilmCommentValue } from "@/types";
import {
  DeleteFilmUserReview,
  PatchFilmUserReview,
  PostFilmUserReview,
} from "@/utils";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Rate } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { TextArea } = Input;
const forceRefresh = () => window.location.reload();

const AddReview: React.FC = () => {
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
        "Anda harus masuk terlebih dahulu sebelum anda dapat menambahkan review"
      );
      return;
    }
    setOpen(true);
  };

  const hideModal = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleAddReview = async (values: FilmCommentValue) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await PostFilmUserReview(
            filmData.id,
            values.rating,
            values.review
          );

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menambahkan penilaian!");
          } else {
            reject("Gagal menambahkan penilaian!");
          }

          setTimeout(() => {
            setConfirmLoading(false);
            hideModal();
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menambahkan penilaian...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleEditReview = async (values: FilmCommentValue) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await PatchFilmUserReview(
            filmData.id,
            values.rating,
            values.review
          );

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil memperbarui penilaian!");
          } else {
            reject("Gagal memperbarui penilaian!");
          }

          setTimeout(() => {
            setConfirmLoading(false);
            hideModal();
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Memperbarui penilaian...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleDeleteReview = async () => {
    setConfirmDelete(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await DeleteFilmUserReview(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus penilaian!");
          } else {
            reject("Gagal menghapus penilaian!");
          }

          setTimeout(() => {
            setConfirmDelete(false);
            hideModal();
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menghapus penilaian...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleReviewAction = async () => {
    form
      .validateFields()
      .then((values: FilmCommentValue) => {
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
        style={{ color: "black" }}
      >
        Penilaian
      </Button>

      <Modal
        centered
        title="Menambahkan Penilaian"
        open={open}
        onOk={handleReviewAction}
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
            label="Penilaian"
            name="rating"
            initialValue={userComment?.rating}
            rules={[{ required: true, message: "Penilaian harus diisi" }]}
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
