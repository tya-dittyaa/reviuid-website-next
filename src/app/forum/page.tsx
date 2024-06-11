"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import { Avatar, Row, Col, List, Layout, Input, Spin, Typography, Space, Flex, Button, Divider, Radio, Card} from "antd";
import { SearchProps } from "antd/es/input";
import { AudioOutlined, SettingOutlined, WechatWorkOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ViewType } from "@/types";
import type { ConfigProviderProps } from 'antd';
import { title } from "process";

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;
const { Search } = Input;
const { Title } = Typography;
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
type SizeType = ConfigProviderProps['componentSize'];

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const AddForum: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');
  return (
    <>
      <Flex gap="small" align="flex-start" vertical>
        <Flex gap="small" wrap>
          <Button type="primary" size={size} style={{
            margin: '10px',
            color: 'black',
            backgroundColor: '#E2B808',
            width: '320px',
            marginLeft: 'auto', 
          }}>
            <b>Add Forum</b>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

const Searchbar: React.FC = () => (
  <Space direction="vertical">
    <Search 
      placeholder="Search Forum Title" 
      onSearch={onSearch} 
      enterButton={<Button type="primary" style={{ backgroundColor: '#E2B808', color:'black', fontWeight: 'bold' }}>Search</Button>}
      style={{
        alignItems: 'left',
        margin: '10px',
        width: '420px',
      }}
    />
  </Space>
);

interface ForumProps {
  username: string;
  title: string;
  likes: number;
  comments: number;
}

const ForumCard: React.FC<ForumProps> = ({ username, title, likes, comments }) => {
  return(
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <img
          src={`https://robohash.org/${username}`}
          alt="user avatar"
          style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 16 }}
        />
        <Text strong>{username}</Text>
      </div>
      <Text>{title}</Text>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button icon={<LikeOutlined />} style={{ marginRight: 8 }}>{likes}</Button>
        <Button icon={<MessageOutlined />} style={{marginRight: 8}}>{comments}</Button>
        <Button icon={<ShareAltOutlined />}>Share</Button>
      </div>
    </Card>
  );  
};

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
          icon={<WechatWorkOutlined />}
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
          <b style={{ fontWeight: "bold" }}>Forum Diskusi</b>
        </Text>
      </Col>
    </Flex>
  );
}

const forumData = [
  {username: 'Paslon_01', title: 'Agak Laen kayaknya kurang seru deh.', likes: 5000, comments: 5000},
  {username: 'Paslon_02', title: 'Kuyang kurang horrornya ', likes: 1000, comments: 1000},
  {username: 'Paslon_03', title: 'Film Habibi & Ainun sangat bermakna', likes: 500, comments: 500},
];
 
function TemporaryContent() {
    return (
      // col 1: forum list, col 2: rules, add forum
      <Row style={{ height: '200vh' }}>
        <Col span={16} style={{ padding: '20px', paddingLeft: '80px',borderRight: 'none' }}>
          <Searchbar/>
          <Layout style={{ padding: '24px', borderRadius:'2%'}}>
            <Content style={{ backgroundColor: '#fff', padding: '24px', borderRadius:'2%'}}>
              <Title level={2}>Forum List</Title>
              <List
                dataSource={forumData}
                renderItem={forum => (
                  <List.Item>
                    <ForumCard
                      username={forum.username}
                      title={forum.title}
                      likes={forum.likes}
                      comments={forum.comments}
                    />
                  </List.Item>
                )}
              />
            </Content>
          </Layout>
        </Col>
        <Col span={8} style={{ padding: '70px', color: "white" , height: '10px'}}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', color: 'black'}}>
            <h2 style={{ color: "#E2B808"}}><b>Rules</b></h2>
            <TextArea
              value={`1. Gunakan bahasa yang baik\n2. Hindari ujaran kebencian berbau SARA, pornografi, dan aksi kekerasan\n3. Tidak ada promosi/berjualan di thread forum\n4. Fokus pada topik\n5. Jaga ketertiban`}
              style={{ width: '100%', height: 'calc(30vh - 10px)', textAlign: 'left', border: 'none', paddingLeft: '10px'}}
              readOnly
              autoSize={{ minRows: 5, maxRows: 10 }}
            />
          </div>
          <AddForum/>
        </Col>
      </Row>
    );
  }


export default function Forum() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={{ minHeight: "100dvh", backgroundColor: '#9E140F'}}>
      <HeaderLayout />
        <TemporaryContent/>
      <FooterLayout />
    </Layout>
  );
}
