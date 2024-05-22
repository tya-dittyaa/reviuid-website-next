import { Button, ButtonProps, styled } from "@mui/material";

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "#E2B808",
  "&:hover": {
    backgroundColor: "#caa308",
  },
}));

export default CustomButton;
