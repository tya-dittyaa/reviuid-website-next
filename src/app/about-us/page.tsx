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
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
const { Text, Paragraph } = Typography;

function AboutUsPageText() {
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
        // padding: "1rem",
      }}
    >

    <AboutUsPageText />

    <Flex>
      <Image 
        src='/tagline.png' 
        preview={false}
        style={{
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0
        }}/>
    </Flex>
    
    <Flex vertical style={{ padding: "2rem", display: "start"}}>
      <div>
        <Paragraph style={{ 
          // marginTop: '20px', 
          marginLeft: '70px',
          marginRight: '70px',
          fontSize: '20px', 
          fontWeight: 200,
          color: 'white',
          textAlign: 'justify' 
        }}>

          <Paragraph style={{fontWeight: 'bold', color: '#E2B808', fontSize: '40px', paddingBottom: '10px', paddingTop: '0px', margin: 0}}>
            Siapa Kami?
          </Paragraph>

            Reviu.ID adalah sebuah aplikasi review film Indonesia. Seiring dengan pesatnya perkembangan teknologi internet, aplikasi web semakin membantu dalam pengiriman, penyampaian, dan penerimaan informasi. ReviuID memanfaatkan tren ini untuk memberikan platform bagi para penggemar film Indonesia untuk berbagi ulasan dan pandangan mereka tentang karya seni yang mereka nikmati.
        
          <Paragraph style={{fontWeight: 'bold', color: '#E2B808', fontSize: '40px', paddingBottom: '10px', paddingTop: '40px', margin: 0}}>
            Misi Kami
          </Paragraph>

          Misi kami adalah menjadi sumber terpercaya bagi ulasan film Indonesia dan mendukung industri perfilman lokal dengan memberikan platform yang transparan dan mudah diakses bagi semua orang. Kami berkomitmen untuk menghadirkan informasi yang akurat dan mendalam tentang film-film terbaru, serta memberikan kesempatan bagi pengguna kami untuk berkontribusi dengan ulasan mereka sendiri.        
        
          <Paragraph style={{fontWeight: 'bold', color: '#E2B808', fontSize: '40px', paddingBottom: '10px', paddingTop: '40px', margin: 0}}>
            Mengapa Reviu.ID?
          </Paragraph>

            Dengan pesatnya perkembangan teknologi internet, aplikasi web telah menjadi alat yang vital dalam pengiriman, penyampaian, dan penerimaan informasi. Reviu.ID memanfaatkan tren ini untuk menciptakan sebuah platform yang intuitif dan user-friendly. Berikut adalah beberapa alasan mengapa Anda harus memilih Reviu.ID:
            
            <ul style={{paddingTop: '10px'}}>
              <li>
                <Text strong={true} style={{fontSize: '18px', color: 'white'}}>Komunitas yang Aktif: </Text>
                <Text style={{fontSize: '18px', color: 'white'}}>Bergabunglah dengan ribuan pengguna lain yang memiliki minat yang sama dalam dunia perfilman Indonesia. Baca ulasan dari perspektif yang berbeda dan temukan film-film baru untuk ditonton.</Text>
              </li>
              <li>
                <Text strong={true} style={{fontSize: '18px', color: 'white'}}>Akses Mudah: </Text>
                <Text style={{fontSize: '18px', color: 'white'}}>Platform kami dirancang untuk memberikan kemudahan akses di berbagai perangkat, baik itu smartphone, tablet, maupun desktop.</Text>
              </li>
              <li>
                <Text strong={true} style={{fontSize: '18px', color: 'white'}}>Ulasan yang Jujur dan Terpercaya: </Text>
                <Text style={{fontSize: '18px', color: 'white'}}>Kami mengutamakan kejujuran dan transparansi dalam setiap ulasan yang dipublikasikan. Setiap pengguna memiliki kesempatan untuk memberikan penilaian mereka sendiri yang membantu orang lain dalam membuat keputusan tontonan.</Text>
              </li>
            </ul>
        </Paragraph>  
      </div>
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

