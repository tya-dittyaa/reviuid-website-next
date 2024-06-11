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

const developers = [
  { name: "Aditya Fajri", imgSrc: "https://anhede.se/wp-content/uploads/2015/02/portrait-photo-whiskey-salon-cigar-room-portrattfoto-salong-cigarr.jpg" },
  { name: "Karina Dwinovera Mulia", imgSrc: "https://anhede.se/wp-content/uploads/2015/02/portrait-photo-whiskey-salon-cigar-room-portrattfoto-salong-cigarr.jpg" },
  { name: "Timothy Paendong", imgSrc: "https://wallpaperaccess.com/full/6999296.jpg" },
  { name: "Pierre Adrian T.O.S.", imgSrc: "https://ih1.redbubble.net/image.3515875957.2248/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg" },
  { name: "Luke Mangala Soegianto", imgSrc: "https://anhede.se/wp-content/uploads/2015/02/portrait-photo-whiskey-salon-cigar-room-portrattfoto-salong-cigarr.jpg" },
];

export default function DevelopersPage() {
  return (
    <>
      <section style={{ padding: "2rem 0" }}>
        <h2 style={{ 
          maxWidth: "auto", 
          marginTop: "1px", 
          marginLeft: "30px", 
          marginRight: "30px", 
          fontSize: "50px", 
          fontWeight: 500, 
          borderBottom: "1px solid #e2b808", 
          color: "#e2b808" 
          }}>
            <b>Our Developers</b>
            </h2>
        <div style={{ 
          display: "grid", 
          gap: "10px", 
          maxWidth: "auto", 
          marginLeft: "20px", 
          marginRight: "20px", 
          marginTop: "30px", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, auto))" 
          }}>
          {developers.map((dev, index) => (
            <div key={index} 
            style={{ 
              textAlign: "center" 
              }}>
<div style={{ 
  width: "auto", 
  height: "auto", 
  cursor: "pointer" }}>
  <Image src={dev.imgSrc} alt={dev.name} width={200} height={300} />
</div>
              <h3 style={{ 
                fontSize: "0.9rem", 
                fontWeight: 500, 
                color: "white", 
                marginTop: "0.5rem" }}>{dev.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
