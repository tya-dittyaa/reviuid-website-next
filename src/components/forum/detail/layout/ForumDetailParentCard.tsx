import { useForumParentData, useUserSession, useViewLayout } from "@/context";
import { CreateForumChild } from "@/utils";
import { Avatar, Button, Card, Col, Flex, Form, Input, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ForumDetailParentCard: React.FC = () => {
  const layout = useViewLayout();
  const parent = useForumParentData()!;
  const userSession = useUserSession();

  const [form] = Form.useForm();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onFinish = async (values: { content: string }) => {
    setSubmitting(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          // Fetch the forum parent
          const response = await CreateForumChild(parent.id, values.content);

          // If the response is false, reject
          if (response === undefined || response === null) {
            reject("Terjadi kesalahan saat membuat komentar");
          } else if (response === false) {
            reject("Gagal membuat komentar");
          } else {
            resolve("Komentar berhasil dibuat");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        }, 1000);
      });

    toast.promise(promise(), {
      loading: "Membuat komentar...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        setSubmitting(false);
        return `${error}`;
      },
    });
  };

  const title: React.ReactNode = (
    <a
      href={`/user/${parent.user.username}
    `}
      style={{ textDecoration: "none" }}
    >
      <Flex vertical={false} justify="flex-start" align="center">
        <Col flex={layout === "horizontal" ? "90px" : "70px"}>
          <Avatar
            size={layout === "horizontal" ? 65 : 50}
            icon={
              <Image
                priority
                src={parent.user.avatar}
                width={2048}
                height={2048}
                alt={`Avatar ${parent.user.username}`}
              />
            }
            style={{
              borderColor: "black",
              borderWidth: 2,
              borderStyle: "solid",
            }}
          />
        </Col>
        <Col flex="auto">
          <Flex vertical gap={5} justify="center" align="flex-start">
            <Text
              strong
              style={{
                color: "black",
                fontSize: layout === "horizontal" ? 20 : 17,
              }}
            >
              <b style={{ fontWeight: "bold" }}>{parent.user.username}</b>
            </Text>
            <Flex gap={15} justify="center" align="center">
              <Text
                style={{
                  color: "black",
                  fontSize: 12,
                  fontWeight: "lighter",
                  margin: 0,
                }}
              >
                {formatDistanceToNow(new Date(parent.createdAt), {
                  addSuffix: true,
                  locale: id,
                })}
              </Text>
            </Flex>
          </Flex>
        </Col>
      </Flex>
    </a>
  );

  const content: React.ReactNode = (
    <Card
      bordered={false}
      style={{ width: "100%", backgroundColor: "white" }}
      styles={{
        body: {
          margin: 0,
          padding: "1rem",
          fontSize: 15,
        },
      }}
    >
      <Flex vertical gap={10}>
        <Title
          level={3}
          style={{
            color: "black",
            fontSize: layout === "horizontal" ? 20 : 17,
          }}
        >
          {parent.title}
        </Title>
        <Paragraph
          style={{
            color: "black",
            fontSize: layout === "horizontal" ? 16 : 13,
            margin: 0,
          }}
        >
          {parent.content}
        </Paragraph>
      </Flex>
    </Card>
  );

  const addChild: React.ReactNode = (
    <Card
      bordered={false}
      style={{ width: "100%", backgroundColor: "white" }}
      styles={{
        body: {
          margin: 0,
          padding: "1rem",
          fontSize: layout === "horizontal" ? 16 : 13,
        },
      }}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{
          margin: 0,
        }}
      >
        <Flex vertical gap={10}>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Kolom ini tidak boleh kosong",
              },
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
              placeholder="Tulis komentar..."
              style={{ fontSize: 14 }}
              autoSize={{ minRows: 3, maxRows: 5 }}
              count={{ show: true, max: 1000 }}
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            style={{
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="middle"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{
                color: "black",
                width: "100px",
              }}
            >
              Kirim
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Card>
  );

  return (
    <Card
      title={title}
      style={{ width: "100%", backgroundColor: "#E2E0D8" }}
      styles={{
        header: {
          margin: 0,
          padding: "1rem",
        },
        body: {
          margin: 0,
          padding: "0.5rem",
        },
      }}
    >
      <Flex vertical gap={10}>
        {content}
        {userSession && addChild}
      </Flex>
    </Card>
  );
};

export default ForumDetailParentCard;
