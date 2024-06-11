"use client";

import { useWindowSize } from "@/hooks";
import { LogoConfig, UserLogin } from "@/types";
import { FetchRefreshToken, FetchUserLogin } from "@/utils";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";

import {
  Alert,
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Spin,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const { Text } = Typography;


export default function AboutUsPage() {
  return (
    <>
      <section style={{ padding: "2rem 0", display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "30px" }}>
        </div>
        <div>
          <h2 style={{ 
            fontSize: "50px", 
            fontWeight: 500, 
            borderBottom: "1px solid #e2b808", 
            color: "#e2b808", 
            marginRight: "30px",
          }}>
            <b>Tentang Kami</b>
          </h2>
          <Image 
            src="/logo.png" 
            alt="Image Description" 
            width={300} 
            height={300} 
            style={{ 
              marginTop: "30px",
              marginLeft: "475px", 
              justifyContent: "center",
              display: "inline-flex",
              alignItems: "center"
            }}
          />
          <p style={{ 
            marginTop: "50px", 
            marginRight:"10px",
            fontSize: "20px", 
            fontWeight: 200,
            color: "white" 
          }}>
            <b>
              Reviu.ID adalah sebuah aplikasi review film Indonesia. Seiring dengan pesatnya perkembangan teknologi internet, aplikasi web semakin membantu dalam pengiriman, penyampaian, dan penerimaan informasi. ReviuID memanfaatkan tren ini untuk memberikan platform bagi para penggemar film Indonesia untuk berbagi ulasan dan pandangan mereka tentang karya seni yang mereka nikmati.
            </b>
          </p>
          
        </div>
      </section>
    </>
  );
}