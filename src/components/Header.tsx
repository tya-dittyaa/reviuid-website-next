"use client";

import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Skeleton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

function LoadingSkeleton() {
  return (
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      variant="rounded"
      width={250}
      height={40}
    />
  );
}

function MainLogo() {
  const router = useRouter();

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={() => router.push(`/`)}>
        <Avatar
          alt="Reviu.ID Logo"
          src="/logo.png"
          sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
        />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          display: { xs: "none", md: "flex" },
          fontWeight: 775,
          fontSize: 30,
          color: "#E2B808",
          textDecoration: "none",
        }}
      >
        Reviu.ID
      </Typography>
    </>
  );
}

function LoginButton() {
  const router = useRouter();

  return (
    <>
      <CustomButton
        variant="contained"
        type="button"
        onClick={() => router.push("/login")}
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 1.5,
          color: "black",
        }}
      >
        Masuk
      </CustomButton>
    </>
  );
}

function UserProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserSession | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await GetUserSession();
      setUserData(response);
      setIsLoading(false);
    };
    getUserData();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!userData) {
    return <LoginButton />;
  }

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href={`/user/${userData.username}`}
        sx={{
          display: { xs: "none", md: "flex" },
          fontWeight: 775,
          fontSize: 20,
          color: "#E2B808",
          textDecoration: "none",
          alignItems: "center",
          marginRight: 2,
        }}
      >
        {userData!.username}
      </Typography>
      <IconButton
        sx={{ p: 0 }}
        onClick={() => router.push(`/user/${userData.username}`)}
      >
        <Avatar>
          <Image
            src={userData.avatar}
            alt={`Avatar ${userData.username}`}
            width={40}
            height={40}
          />
        </Avatar>
      </IconButton>
      <ExitToAppIcon
        sx={{
          marginLeft: 2,
          color: "#E2B808",
          fontSize: 30,
        }}
      />
    </>
  );
}

function Header() {
  return (
    <header>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ marginLeft: 3, marginRight: 3 }}>
            <MainLogo />
            <Box sx={{ flexGrow: 1 }}></Box>
            <UserProfile />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
export default Header;
