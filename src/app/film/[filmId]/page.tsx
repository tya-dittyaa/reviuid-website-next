"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import React from 'react';
import { 
  Layout, 
  Typography, 
  Rate, 
  Flex, 
  Button, 
  Modal, 
  Avatar, 
  Col, 
  Image,
  Input } from "antd";
import {
  VideoCameraOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useState } from 'react';
import { UserSettings } from "@/types/userProfile.type";
import Title from "antd/es/typography/Title";
const { Content } = Layout;
const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const StarRatingRead: React.FC = () => (
    <Rate 
      disabled defaultValue={5} 
      style={{
        backgroundColor: '#272626',
        fontSize: 40,
        padding: 20,
        borderRadius: '0 10px 10px 0px'
      }}/>
);

const desc = ['Buruk Sekali', 'Buruk', 'Normal', 'Bagus', 'Sangat Bagus'];

const StarRatingEdit: React.FC = () => {
  const [value, setValue] = useState(3);
  return (
    <Flex gap="middle" vertical style={{
      margin: 0,
      paddingBottom: '10px',
      paddingTop: '10px',
      gap: 0
    }}>
      <Rate tooltips={desc} onChange={setValue} value={value} style={{paddingBottom:'5px'}}/>
      {value ? <span>{desc[value - 1]}</span> : null}
    </Flex>
  );
};

const TextareaField: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <div style={{ margin: '0px 0' }} />
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tulis komentarmu disini..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </>
  );
};

const Sukses = () => {
  Modal.success({
    content: 'Rating sukses ditambahkan!',
    okButtonProps: {
      style: {
        backgroundColor: '#E2B808',
        color: 'black',
      },
    },
  });
};

const Error = () => {
  Modal.error({
    content: 'Gagal menambahkan rating!',
    
    style:{
      backgroundColor: '#E2B808',
      color: 'black',
    }
  });
};

const AddRating: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => { // handle submit/unggah
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);

  const isSuccess = true; // add logic

  if(isSuccess == true){
    Sukses();
  }
  else {
    Error();
  }
};

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{
          width: 75,
          height: 75,
          backgroundColor: '#E2B808',
          color: 'black',
          marginLeft: 20,
          fontWeight: 'lighter',
          borderRadius: 50,
          fontSize: 30,
          paddingTop: 0,
          paddingBottom: 10,
          paddingLeft: 15
        }}>
        <PlusOutlined />
      </Button>
      <Modal
        open={open}
        title="Berikan Rating"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk} style={{
            backgroundColor: '#E2B808',
            color: 'black'
          }}>
            Unggah
          </Button>
        ]}
      >
        <StarRatingEdit />
        <TextareaField />
      </Modal>
    </>
  );
};

function FilmPageText() {
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
          size= {40}
          icon={<VideoCameraOutlined />}
          style={{
            backgroundColor: "#E2B808",
            color: "black",
            marginRight: "1rem",
            marginLeft: "1rem"
          }}
        />

        <Text
          strong
          style={{
            color: "#E2B808",
            fontSize: 30,
          }}
        >
          <b style={{ fontWeight: "bold" }}>Halaman Film</b>
        </Text>
      </Col>
    </Flex>
  );
}

function DisplayUserVertical({ user }: { user: UserSettings }) {
  return (
    <>
      <Flex
        vertical
        justify="center"
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: 10,
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
          padding: "2rem",
        }}
      >
        <Avatar
          size={100}
          icon={
            <Image
              src={user.avatar}
              width={2048}
              height={2048}
              alt={`Avatar ${user.username}`}
            />
          }
          style={{
            borderColor: "black",
            borderWidth: 2,
            borderStyle: "solid",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
            marginBottom: "1rem",
          }}
        />

        <Title level={4} style={{ margin: "0 0 0 0" }}>
          {user.username}
        </Title>
        <Title level={5} style={{ margin: "0 0 20px 0", fontStyle: "italic" }}>
          {user.email}
        </Title>

        <Paragraph>
          {user.biography === null ? "Tidak ada deskripsi." : user.biography}
        </Paragraph>
      </Flex>
    </>
  );
}

function FilmPageContent() {
  return (
    <Content
      style={{
        flex: 1,
        backgroundColor: "#9E140F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >

  <FilmPageText />
    
    <Flex
      gap="middle"
      vertical={false}
      // align="center"
      style={{
        paddingLeft: "2.8rem",
        // paddingTop: "50px"
        // marginLeft: 20,
        // marginRight: 50,
      }}>

      <Flex 
        vertical
        // justify="flex-start"
        align="center"
        style={{
          // padding: 0,
          paddingTop: '25px',
          marginLeft: 30
        }}> 

          <Text style={{ fontSize: 25, color: "white", fontWeight:'bold', textAlign:'center', paddingTop: '15px'}}>
            JUDUL FILM DISINI
          </Text>
          <img src="/ex_poster.jpg"  style={{width:'1500px', borderRadius:10}}/> 
      </Flex>
      
      <Flex
        // gap="20px"
        vertical={true}
        // align="start"
        style={{
          paddingLeft: "3rem",
          paddingTop: "1rem",
          marginLeft: 0,
          // marginRight: 20,
          // margin: 30
        }}> 

        <Text style={{ fontSize: 25, color: "#E2B808", fontWeight:'bold', textAlign:"left", paddingBottom: 5}}>
          Cuplikan Film
        </Text>

        <video width="700" controls>
          <source src="" />
        </video>

        <Text style={{ fontSize: 25, color: "#E2B808", fontWeight:'bold', textAlign:"left", paddingBottom: 5, paddingTop: 30}}>
          Sinopsis
          
        </Text>

        <div style={{
          paddingRight: '5rem',
          textAlign: 'justify',
          paddingBottom: '2rem'
        }}>
          <Paragraph style={{ fontSize: 20, color: "#ffff", textAlign:"justify"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et enim sit amet sapien pulvinar sodales. Fusce volutpat tempus tellus, laoreet aliquam velit mollis eget. Mauris porttitor eros tortor, a auctor lacus tempor sit amet. Vestibulum a tortor at velit blandit mattis. Donec ultricies ultricies massa, a ullamcorper arcu facilisis nec. Suspendisse potenti. Sed accumsan vel  </Paragraph>
        </div>
        
        </Flex>     

      </Flex> 

      <Flex
        style={{
          justifyContent: 'center',
          marginTop: '1rem', 
        }}>

        <div
          style={{
            backgroundColor: '#E2B808',
            fontSize: 27,
            padding: 20,
            borderRadius: '10px 0 0 10px',
          }}>
          <h1 style={{fontWeight: 'bold'}}>3.0</h1>
        </div>

        <StarRatingRead />

        <div style={{
          paddingLeft: 10
        }}>
          <AddRating />
        </div>

      </Flex>
      
      {/* <Flex>
        <DisplayUserVertical user={user} />
      </Flex> */}
        

    </Content>
  );
}

export default function Home() {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <FilmPageContent />
      <FooterLayout />
    </Layout>
  );
}

