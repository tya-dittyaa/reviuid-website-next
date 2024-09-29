import { CheckSafetyText, FetchChangeBiography } from "@/utils";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const UserEditBiography: React.FC = () => {
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
          const isProfanity = await CheckSafetyText(values.biography);

          if (isProfanity === undefined) {
            reject("Terjadi kesalahan pada server!");
            setConfirmLoading(false);
            return;
          } else if (isProfanity) {
            reject(
              "Deskripsi yang Anda masukkan mengandung kata-kata tidak pantas!"
            );
            setConfirmLoading(false);
            return;
          }

          const response = await FetchChangeBiography(values.biography);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
            setConfirmLoading(false);
            return;
          } else if (response) {
            resolve("Berhasil memperbarui deskripsi pengguna.");
            setTimeout(() => {
              setOpen(false);
              setConfirmLoading(false);
              forceRefresh();
            }, 1000);
            return;
          } else {
            reject("Gagal memperbarui deskripsi pengguna!");
            setConfirmLoading(false);
            return;
          }
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

  function hasInvisibleChars(str: string): boolean {
    // List of invisible characters
    const invisibleChars = [
      "\u0009", // tab
      "\u000A", // line feed
      "\u000B", // vertical tab
      "\u000C", // form feed
      "\u000D", // carriage return
      "\u0020", // space
      "\u0085", // next line
      "\u00A0", // no-break space
      "\u1680", // ogham space mark
      "\u180E", // mongolian vowel separator
      "\u2000", // en quad
      "\u2001", // em quad
      "\u2002", // en space
      "\u2003", // em space
      "\u2004", // three-per-em space
      "\u2005", // four-per-em space
      "\u2006", // six-per-em space
      "\u2007", // figure space
      "\u2008", // punctuation space
      "\u2009", // thin space
      "\u200A", // hair space
      "\u200B", // zero-width space
      "\u2028", // line separator
      "\u2029", // paragraph separator
      "\u202F", // narrow no-break space
      "\u205F", // medium mathematical space
      "\u3000", // ideographic space
      "\uFEFF", // zero-width no-break space
      "\u3164", // hangul filler
      "\uFFA0", // hangul half-width filler
      "ㅤ", // hangul filler (U+3164)
    ];

    // Check if the string contains any of the invisible characters
    for (const char of invisibleChars) {
      if (str.includes(char)) {
        return true;
      }
    }

    return false;
  }

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
        closable={false}
        maskClosable={false}
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
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
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
              {
                validator: async (_, value) => {
                  if (hasInvisibleChars(value)) {
                    return Promise.reject(
                      "Biografi yang Anda masukkan mengandung karakter tidak terlihat!"
                    );
                  }
                  return Promise.resolve();
                },
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
};

export default UserEditBiography;
