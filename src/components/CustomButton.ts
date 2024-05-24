"use client";

import { Button, ButtonProps, styled } from "@mui/material";

const CustomButton = styled(Button)<ButtonProps>(() => ({
  textTransform: "none",
  backgroundColor: "#E2B808",
  fontWeight: "bold",
  fontSize: "1rem",
  "&:active": {
    backgroundColor: "#E2B808",
  },
  "&:hover": {
    backgroundColor: "#caa308",
  },
}));

export default CustomButton;
