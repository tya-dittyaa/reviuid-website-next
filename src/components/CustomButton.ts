"use client";

import { Button, ButtonProps, styled } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  fontColor?: string;
  paddingLeft?: string;
  paddingRight?: string;
  borderRadius?: string;
}

const CustomButton: React.FC<CustomButtonProps> = styled(
  Button
)<CustomButtonProps>((custom: CustomButtonProps) => ({
  textTransform: "none",
  backgroundColor: "#E2B808",
  color: custom.fontColor || "white",
  fontWeight: "bold",
  fontSize: "1rem",
  paddingLeft: custom.paddingLeft,
  paddingRight: custom.paddingRight,
  borderRadius: custom.borderRadius,
  "&:active": {
    backgroundColor: "#E2B808",
  },
  "&:hover": {
    backgroundColor: "#caa308",
  },
}));

export default CustomButton;
