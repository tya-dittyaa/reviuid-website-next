"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import "@fontsource/poppins";
import React from 'react';
import { 
  Layout, 
  Typography,
  Image,
  Flex,
  Col,
  Avatar} from "antd";
import {
  TeamOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
const { Text } = Typography;

const DevsPhoto: React.FC = () => (
  <Flex vertical={true}
  gap={'3rem'}
  style={{
    marginTop: '40px',
    marginBottom: 0,
    alignItems: 'center'
  }}>
    <Flex vertical={false} gap={'8rem'}>
      <Flex vertical style={{
        alignItems: 'center'
      }}>
        <Image
        width={250}
        src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
        style={{borderRadius: '5%'}}
        />

        <Text strong={true} style={{fontSize: '20px', color: 'white', paddingTop: '10px'}}>Nama</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>NIM</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>Role</Text>

      </Flex>

      <Flex vertical style={{
        alignItems: 'center'
      }}>
        <Image
        width={250}
        src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
        style={{borderRadius: '5%'}}
        />

        <Text strong={true} style={{fontSize: '20px', color: 'white', paddingTop: '10px'}}>Nama</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>NIM</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>Role</Text>

      </Flex>

      <Flex vertical style={{
        alignItems: 'center'
      }}>
        <Image
        width={250}
        src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
        style={{borderRadius: '5%'}}
        />

        <Text strong={true} style={{fontSize: '20px', color: 'white', paddingTop: '10px'}}>Nama</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>NIM</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>Role</Text>

      </Flex>
    </Flex>

    <Flex vertical={false} gap={'8rem'} style={{marginTop: 0}}>
      <Flex vertical style={{
        alignItems: 'center'
      }}>
        <Image
        width={250}
        src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
        style={{borderRadius: '5%'}}
        />

        <Text strong={true} style={{fontSize: '20px', color: 'white', paddingTop: '10px'}}>Nama</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>NIM</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>Role</Text>

      </Flex>

      <Flex vertical style={{
        alignItems: 'center'
      }}>
        <Image
        width={250}
        src="https://i.pinimg.com/564x/dc/46/40/dc46403064ec076a128234ffdcd916c9.jpg"
        style={{borderRadius: '5%'}}
        />

        <Text strong={true} style={{fontSize: '20px', color: 'white', paddingTop: '10px'}}>Nama</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>NIM</Text>
        <Text strong={false} style={{fontSize: '20px', color: 'white'}}>Role</Text>

      </Flex>
    </Flex>
  </Flex>
);

function DeveloperPageText() {
  return (
    <Flex vertical style={{ padding: '20px', paddingLeft: '30px', paddingBottom: '20px', width: "100%" }}>
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
          icon={<TeamOutlined />}
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
          <b style={{ fontWeight: "bold" }}>Halaman Developer</b>
        </Text>
      </Col>
    </Flex>
  );
}

function DeveloperPageContent() {
  return (
    <Content
    style={{
      flex: 1,
      backgroundColor: "#9E140F",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
    >
      <DeveloperPageText />

      <Text strong style={{
        maxWidth: "auto", 
        marginTop: "1px", 
        marginLeft: "100px", 
        marginRight: "100px",
        textAlign: 'left',
        fontSize: 30, 
        borderBottom: "1px solid #e2b808",
        color: "#e2b808"}}>
         Tim Kami
      </Text>

      <DevsPhoto />

       <div style={{ 
         display: "grid", 
         gap: "10px", 
         maxWidth: "auto", 
         marginLeft: "20px", 
         marginRight: "20px", 
         marginTop: "30px", 
         gridTemplateColumns: "repeat(auto-fit, minmax(200px, auto))" 
         }}>
       </div>
     </Content>
 );
}

export default function Home() {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <DeveloperPageContent />
      <FooterLayout />
    </Layout>
  );
}
