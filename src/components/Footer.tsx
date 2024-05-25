import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "black",
        position: "fixed",
        bottom: 0,
        height: "30vmin",
        width: "100%",
        boxShadow: "0px 0px 5px 0px black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20%",
          width: "100%",
          gap: 5,
        }}
      >
        <InstagramIcon fontSize="large" />
        <XIcon fontSize="large" />
        <FacebookIcon fontSize="large" />
        <Image
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
          alt="Discord"
          height={35}
          width={35}
        />
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 2,
          gap: 5,
          listStyle: "none",
        }}
      >
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Bantuan
        </Typography>
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Tentang Kami
        </Typography>
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Kondisi Pengunaan
        </Typography>
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Kebijakan Privasi
        </Typography>
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Periklanan
        </Typography>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 1,
          gap: 5,
          listStyle: "none",
        }}
      >
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Developer Reviu.ID
        </Typography>
        <Typography
          component="a"
          href="#"
          sx={{ color: "white", textDecoration: "none" }}
        >
          Pilihan Privasi Iklan
        </Typography>
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 2,
          gap: 5,
          listStyle: "none",
        }}
      >
        <Typography>© 2024 Oleh Reviu Film ID, Inc.</Typography>
      </Container>
    </footer>
  );
}

export default Footer;
