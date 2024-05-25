"use client";

import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CustomButton from "./CustomButton";

function Header() {
  const router = useRouter();
  const [auth, setAuth] = React.useState(false);

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

            {auth ? (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
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
                  Aditiyongg6969
                </Typography>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => router.push(`/profile`)}
                >
                  <Avatar>
                    <Image
                      src="https://drive.google.com/uc?export=view&id=1yhM-tDrQwh166RGAqTGzLKPvVri7jAKD"
                      alt="User Avatar"
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
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
export default Header;
