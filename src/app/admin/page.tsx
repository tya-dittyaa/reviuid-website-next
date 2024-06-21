"use client";

import "@fontsource/poppins";
import React, { ReactNode, useState } from 'react';
import { 
  Layout, 
  Typography, 
  Menu, 
  theme, 
  MenuProps, 
  Flex, 
  Space, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Tag, 
  Input,
  TableProps,
  ConfigProvider,
  DatePicker,
  Image,
  Select,
} from "antd";
import { UserOutlined, VideoCameraOutlined, DashboardOutlined, BgColorsOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import { ColorFactory } from "antd/es/color-picker/color";
import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

// USER

interface DataTypeUser {
  key: string;
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  biography: string;
}

type RequiredMark = boolean | 'optional' | 'customize';

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);

const onSearchUser: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const AddUserButton: React.FC = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Flex vertical={false}>
        <Search placeholder="Search User..." onSearch={onSearchUser} style={{ width: 200, marginRight: '30px' }} />

        <Button type="primary" onClick={showModal} 
          style={{
          backgroundColor: '#E2B808', 
          color: 'black',
          marginBottom: '20px', 
          width: 150}}>
          Tambahkan User
        </Button>
      </Flex>
      
      <Modal
        open={open}
        title="Tambah User"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk} 
            style={{backgroundColor: '#E2B808', color: 'black'}}>
            Submit
          </Button>,
        ]}
      >
      
      <Form form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
        style={{paddingTop: '20px'}}>

        <Form.Item label="Username" required tooltip="This is a required field">
          <Input placeholder="Masukkan Username" />
        </Form.Item>
        <Form.Item label="Email" required tooltip="This is a required field">
          <Input placeholder="Masukkan Email" />
        </Form.Item>
        <Form.Item label="Password" required tooltip="This is a required field">
          <Input placeholder="Masukkan Password" />
        </Form.Item>
        <Form.Item label="Role" required tooltip="This is a required field">
          <Input placeholder="Masukkan Role" />
        </Form.Item>
        <Form.Item label="Avatar">
          <Input placeholder="Masukkan link Avatar" />
        </Form.Item>
        <Form.Item label="Biography">
          <Input placeholder="Masukkan Biography" />
        </Form.Item>
      </Form>
      
       </Modal>
    </>
  );
};

const ColumnsUser: TableProps<DataTypeUser>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Avatar',
    key: 'avatar',
    dataIndex: 'avatar',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const dataUser: DataTypeUser[] = [
  {
    key: '1',
    id: 'USER123',
    username: 'test1',
    email: 'test1@gmail.com',
    password: '!&(@&@)!18127',
    role: 'User',
    avatar: 'test1',
    biography: 'test1',
  },  
];

const TablesUser: React.FC = () => <Table columns={ColumnsUser} dataSource={dataUser} />;

// FILM

interface DataTypeFilm {
  key: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  synopsis: string;
  genre: string[];
  poster: string;
  trailer: string;
  rating: GLfloat;
  totalReviews: Number;
  totalFavorite: Number;
  releaseDate: Date;
  finishDate: Date;
}

const onSearchFilm: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const AddFilmButton: React.FC = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <Flex vertical={false}>
        <Search placeholder="Search Film..." onSearch={onSearchFilm} style={{ width: 200, marginRight: '30px' }} />

        <Button type="primary" onClick={showModal} 
          style={{
          backgroundColor: '#E2B808', 
          color: 'black',
          marginBottom: '20px', 
          width: 150}}>
          Tambahkan Film
        </Button>
      </Flex>
      
      <Modal
        open={open}
        title="Tambah User"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk} 
            style={{backgroundColor: '#E2B808', color: 'black'}}>
            Submit
          </Button>,
        ]}
      >
      
      <Form form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: requiredMark }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
        style={{paddingTop: '20px'}}>

        <Form.Item label="CreatedAt" name="disabled" required tooltip="This is a required field">
          <DatePicker defaultValue={moment()} disabled/>
        </Form.Item>
        <Form.Item label="Title" required tooltip="This is a required field">
          <Input placeholder="Masukkan judul" />
        </Form.Item>
        <Form.Item label="Synopsis" required tooltip="This is a required field">
          <Input placeholder="Masukkan synopsis" />
        </Form.Item>
        <Form.Item label="Genre" required tooltip="This is a required field">
          <Select
            mode="multiple"
            placeholder="Pilih Genre"
            style={{ width: '100%' }}
          >
            <Option value="action">Aksi</Option>
            <Option value="drama">Drama</Option>
            <Option value="comedy">Komedi</Option>
            <Option value="horror">Horor</Option>
            <Option value="sci-fi">Petualangan</Option>
            <Option value="sci-fi">Romansa</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Poster">
          <Input placeholder="Masukkan link poster" />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input placeholder="Masukkan link trailer" />
        </Form.Item>
        <Form.Item label="Release & Finish Date" required tooltip="This is a required field">
          <RangePicker />
        </Form.Item>
      </Form>
      
       </Modal>
    </>
  );
};

const ColumnsFilm: TableProps<DataTypeFilm>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Synopsis',
    dataIndex: 'synopsis',
    key: 'synopsis',
  },
  {
    title: 'Genre',
    dataIndex: 'Genre',
    key: 'genre',
  },
  {
    title: 'Poster',
    key: 'poster',
    dataIndex: 'poster',
  },
  {
    title: 'Trailer',
    key: 'trailer',
    dataIndex: 'trailer',
  },
  {
    title: 'Rating',
    key: 'rating',
    dataIndex: 'rating',
  },
  {
    title: 'ReleaseDate',
    key: 'releaseDate',
    dataIndex: 'releaseDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const dataFilm: DataTypeFilm[] = [
  {
    key: '1',
    id: 'FL123',
    createdAt: new Date(2024, 0, 12),
    updatedAt: new Date(0, 0, 0), // PERLU DIEDIT LAGI
    title: 'string',
    synopsis: 'string',
    genre: ['Action', 'Drama'],
    poster: 'string',
    trailer: 'string',
    rating: 0,
    totalReviews: 0,
    totalFavorite: 0,
    releaseDate: new Date(2022, 0, 13),
    finishDate: new Date(0, 0, 0), // PERLU DIEDIT LAGI
  },  
];

const TablesFilm: React.FC = () => <Table columns={ColumnsFilm} dataSource={dataFilm} />;

function MsUser() {
  return (
    <Flex vertical>
      <Text strong={true} 
        style={{
          fontSize: '24px',
          textAlign: 'left',
          color: '#9E140F',
          paddingBottom: '10px'
      }}>
        Master User
      </Text>

      <AddUserButton />
      <TablesUser />
    </Flex>
  )
}

function MsFilm() {
  return (
    <Flex vertical>
      <Text strong={true} 
        style={{
          fontSize: '24px',
          textAlign: 'left',
          color: '#9E140F',
          paddingBottom: '10px'
      }}>
        Master Film
      </Text>

      <AddFilmButton />
      <TablesFilm />
    </Flex>
  )
}

interface TokenProviderProps {
  children: ReactNode;
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const customTheme = {
    token: {
      colorPrimary: '#E2B808', // Custom primary color
      colorBgContainer: '#9E140F', // Custom background color for containers
      colorText: 'white', // Custom text color
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      {children}
    </ConfigProvider>
  );
};


const items = [
  { label: 'Dashboard', icon: DashboardOutlined, key: '1' },
  { label: 'User', icon: UserOutlined, key: '2' },
  { label: 'Film', icon: VideoCameraOutlined, key: '3' },
].map(({ label, icon, key}) => ({
  key,
  icon: React.createElement(icon),
  label,
}));

const SiderComponent = () => {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key]);
  };

  const renderContent = () => {
    switch (selectedKeys[0]) {
      case '1':
        return <Text style={{fontSize: '16px'}}>Selamat datang di Halaman Admin!</Text>;
      case '2':
        return <MsUser />;
      case '3':
        return <MsFilm />;
    }
  };

  return (
    <Layout hasSider>
      <TokenProvider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}

          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#9E140F',
            // color: 'red'
          }}
        >
          <div className="logo" style={{ color: '#E2B808', textAlign: 'center', padding: '16px', fontSize: '24px', fontWeight: 'bold' }}>
            Reviu.ID
          </div>

          <Menu
          theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={selectedKeys}
            items={items}
            onClick={handleMenuClick}  
            style={{
              color: colorText, // Text color
              backgroundColor: '#9E140F', // Background color
            }}
          />
        </Sider>
      </TokenProvider>
      
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header style={{
            padding: 20,
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'right',
            paddingRight: '20px',
            boxShadow: '50px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
          }}> 
            <Text strong={true} style={{
              paddingRight: '10px', 
              display: 'flex', 
              alignItems: 'center',}}>Username</Text> 
            
            <Image width={'10vh'} preview={false}
            src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
            style={{
              borderRadius: '100%',
              display: 'flex',
              alignItems: 'center',}} />
        </Header>

        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            // color: 'red'
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: 'white',
              borderRadius: 5,
            }}
          >
            {renderContent()} 
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          © 2024, oleh Reviu Film ID, Inc.
        </Footer>
      </Layout>
    </Layout>
  );
};

function AdminPage() {
  return <SiderComponent />;
}

export default function Home() {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      {/* <TokenProvider> */}
       <AdminPage />
      {/* </TokenProvider> */}
    </Layout>
  );
}
