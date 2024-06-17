"use client";

import { FooterLayout, HeaderLayout } from "@/components";
import { useWindowSize } from "@/hooks";
import "@fontsource/poppins";
import React from 'react';
import { useEffect, useState } from "react";
import { 
  Layout, 
  Typography,
  Image,
  Flex,
  Col,
  Avatar} from "antd";
import {
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
const { Text, Paragraph } = Typography;

function AboutUsPageText() {
  return (
    <Flex vertical style={{ paddingBottom: '20px', width: "100%" }}>
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
          <b style={{ fontWeight: "bold" }}>Halaman Tentang Kami</b>
        </Text>
      </Col>
    </Flex>
  );
}

function BannerSizeMob() {
  return(
    <>
      <img src='/Reviu.ID.png' style={{ width: '100%', height: '15vh' , padding: 0, margin: 0 }} /> 
      
      <div style={{
        position: 'absolute',
        top: '0', 
        left: '0', 
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', 
      }}>
        <Text style={{ 
          margin: '0 20px',
          fontSize: '2.5vw',
          fontWeight: 200,
          textAlign: 'center',
          color: 'white',
        }}>
          Reviu.ID - Berbagi Cerita, Menikmati Karya Film Indonesia
        </Text>

      </div>
    </>
  )
}

function BannerSizeWeb() {
  return(
    <>
      <img src='/Reviu.ID.png' style={{ width: '100%', height: '30vh' , padding: 0, margin: 0 }} /> 
      
      <div style={{
        position: 'absolute',
        top: '0', 
        left: '0', 
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', 
      }}>
        <Text style={{ 
          margin: '0 20px',
          fontSize: '1.5vw',
          fontWeight: 200,
          textAlign: 'center',
          color: 'white',
        }}>
          Reviu.ID - Berbagi Cerita, Menikmati Karya Film Indonesia
        </Text>

      </div>
    </>
  )
}

function BannerSizeOption() {
  const size = useWindowSize();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<"web" | "mob">("mob");

  useEffect(() => {
    if (size.width && size.width < 800) {
      setValue("mob");
    } else {
      setValue("web");
    }
  }, [size.width]);

  if (value === "mob") {
    return (
      <>
        <BannerSizeMob />
      </>
    );
  }

  return (
    <>
      <BannerSizeWeb />
    </>
  );
}

function AboutUsPageContent() {
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
      <Flex vertical style={{ padding: "2rem", alignItems: "start" }}>
        <AboutUsPageText />

        <div style={{
          position: 'relative',
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto',
        }}>
          <BannerSizeOption />
        </div>

        <Flex vertical> 
          <Paragraph style={{fontWeight: 'bold', color: '#E2B808', fontSize: '40px', paddingBottom: '10px', paddingTop: '0px', margin: 0}}>
            Siapa Kami?
          </Paragraph>

            Reviu.ID adalah sebuah aplikasi review film Indonesia. Seiring dengan pesatnya perkembangan teknologi internet, aplikasi web semakin membantu dalam pengiriman, penyampaian, dan penerimaan informasi. ReviuID memanfaatkan tren ini untuk memberikan platform bagi para penggemar film Indonesia untuk berbagi ulasan dan pandangan mereka tentang karya seni yang mereka nikmati.
        
          <Paragraph style={{fontWeight: 'bold', color: '#E2B808', fontSize: '40px', paddingBottom: '10px', paddingTop: '40px', margin: 0}}>
            Misi Kami
          </Paragraph>

          Misi kami adalah menjadi sumber terpercaya bagi ulasan film Indonesia dan mendukung industri perfilman lokal dengan memberikan platform yang transparan dan mudah diakses bagi semua orang. Kami berkomitmen untuk menghadirkan informasi yang akurat dan mendalam tentang film-film terbaru, serta memberikan kesempatan bagi pengguna kami untuk berkontribusi dengan ulasan mereka sendiri.        

          </Flex>
      </Flex>
    </Content>
  );
}

export default function Home() {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <HeaderLayout />
      <AboutUsPageContent />
      <FooterLayout />
    </Layout>
  );
}

