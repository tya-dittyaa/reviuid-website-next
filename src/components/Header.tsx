"use client";

import { UserSession } from "@/types";
import { GetUserSession } from "@/utils";
import { IconButton } from "@mui/material";
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

function Header() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const session = await GetUserSession();
      if (session) {
        setIsLogin(true);
        setUser(session);
      } else {
        setIsLogin(false);
        setUser(null);
      }
      return;
    }

    checkAuth();
    setIsLoading(false);
  }, []);

  return (
    <header>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ marginLeft: 3, marginRight: 3 }}>
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

            <IconButton sx={{ p: 0 }} onClick={() => router.push(`/`)}>
              <Avatar
                alt="Reviu.ID Logo"
                src="/logo.png"
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "flex", md: "none" },
                fontWeight: 775,
                fontSize: 30,
                color: "#E2B808",
                textDecoration: "none",
              }}
            >
              Reviu.ID
            </Typography>

            <Box sx={{ flexGrow: 1 }}></Box>

            {!isLoading &&
              (isLogin ? (
                <>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href={`/user/${user!.username}`}
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
                    {user!.username}
                  </Typography>
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => router.push(`/user/${user!.username}`)}
                  >
                    <Avatar>
                      <Image
                        src={user!.avatar}
                        alt={`Avatar ${user!.username}`}
                        width={40}
                        height={40}
                      />
                    </Avatar>
                  </IconButton>
                </>
              ) : (
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
              ))}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
export default Header;
