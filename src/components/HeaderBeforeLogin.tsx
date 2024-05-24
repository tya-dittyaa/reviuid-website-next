"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "../styles/header.layout.css";
import CustomButton from "./CustomButton";

function HeaderLayout() {
  const router = useRouter();

  return (
    <header>
      <div className="layout-header">
        <div className="logo">
          <a href="/" className="image">
            <Image src="/logo.png" alt="Reviu.ID Logo" width={50} height={50} />
          </a>

          <a href="/" className="link">
            <h1 className="title">Reviu.ID</h1>
          </a>
        </div>

        <div className="button">
          <CustomButton
            variant="contained"
            type="button"
            className="button-login"
            fontColor="black"
            paddingLeft="6vh"
            paddingRight="6vh"
            borderRadius="1.5vh"
            onClick={() => router.push("/login")}
          >
            Masuk
          </CustomButton>
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;
