"use client";

import { FetchUserLogout } from "@/utils";
import { CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function WhiteLoading() {
  return (
    <>
      <CircularProgress sx={{ color: "whitesmoke" }} />
    </>
  );
}

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      await FetchUserLogout();
    }
    logout();

    setTimeout(() => {
      router.replace("/");
    }, 1000);
  }, [router]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <WhiteLoading />
    </Container>
  );
}
