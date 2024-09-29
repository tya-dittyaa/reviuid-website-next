import {
  CheckAvailableUsername,
  CheckSafetyText,
  FetchChangeUsername,
} from "@/utils";
import { EditOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UserEditUsername: React.FC = () => {
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

  const updateUsername = async (values: { username: string }) => {
    setConfirmLoading(true);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          const isProfanity = await CheckSafetyText(values.username);

          if (isProfanity === undefined) {
            reject("Terjadi kesalahan pada server!");
            setConfirmLoading(false);
            return;
          } else if (isProfanity) {
            reject(
              "Nama pengguna yang Anda masukkan mengandung kata-kata tidak pantas!"
            );
            setConfirmLoading(false);
            return;
          }

          const response = await FetchChangeUsername(values.username);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
            setConfirmLoading(false);
            return;
          } else if (response) {
            resolve("Berhasil memperbarui nama pengguna.");
            setTimeout(() => {
              setOpen(false);
              setConfirmLoading(false);
              router.push(`/user/${values.username}/settings`);
            }, 1000);
            return;
          } else {
            reject("Gagal memperbarui nama pengguna!");
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
        closable={false}
        maskClosable={false}
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
          style: { color: "black" },
        }}
        cancelButtonProps={{
          danger: true,
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
                  if (hasInvisibleChars(value)) {
                    return Promise.reject(
                      "Nama pengguna tidak boleh mengandung karakter tidak terlihat!"
                    );
                  }

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
};

export default UserEditUsername;
