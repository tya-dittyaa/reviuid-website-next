"use client";

import { CustomButton } from "@/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import { FormEvent, MouseEvent, useState } from "react";
import styles from "./page.module.css";

function Red() {
  return (
    <div className={styles.red}>
      <a href="/" className={styles.link}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="Reviu.ID Logo"
          width={75}
          height={75}
        />
      </a>
      <a href="/" className={styles.link}>
        <h1 className={styles.title}>Reviu.ID</h1>
      </a>
    </div>
  );
}

function White() {
  // Form State Management for Submit Button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State Management and Submission Handler for Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Form State Management and Submission Handler for Username, Email, Password, and Confirm Password
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div className={styles.white}>
      <h2 className={styles.register}>Daftar</h2>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.input}>
          <FormControl fullWidth sx={{ width: "40ch" }}>
            <InputLabel htmlFor="input-username" size="small" required>
              Username
            </InputLabel>
            <OutlinedInput
              id="input-username"
              label="Username"
              required
              size="small"
              placeholder="username"
              value={formData.username}
              disabled={isSubmitting ? true : false}
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              startAdornment={
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.input}>
          <FormControl fullWidth sx={{ width: "40ch" }}>
            <InputLabel htmlFor="input-email" size="small" required>
              Email
            </InputLabel>
            <OutlinedInput
              id="input-email"
              label="Email"
              type="email"
              required
              size="small"
              placeholder="name@email.com"
              value={formData.email}
              disabled={isSubmitting ? true : false}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              startAdornment={
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.input}>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-password" size="small" required>
              Password
            </InputLabel>
            <OutlinedInput
              id="input-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              size="small"
              placeholder="********"
              value={formData.password}
              disabled={isSubmitting ? true : false}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              startAdornment={
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={isSubmitting ? true : false}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className={styles.input}>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-confirm-password" size="small" required>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="input-confirm-password"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              required
              size="small"
              placeholder="********"
              value={formData.confirmPassword}
              disabled={isSubmitting ? true : false}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  confirmPassword: event.target.value,
                })
              }
              startAdornment={
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disabled={isSubmitting ? true : false}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth>
            <FormControl fullWidth>
              <CustomButton
                variant="contained"
                type="submit"
                className={styles.button}
                disabled={isSubmitting ? true : false}
              >
                Daftar
              </CustomButton>
            </FormControl>
          </FormControl>
        </div>
      </form>

      {!isSubmitting && (
        <p className={styles.LoginRef}>
          Sudah punya akun?{" "}
          <a href="/login" className={styles.LoginText}>
            Masuk Sekarang!
          </a>
        </p>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <main className={styles.container}>
      <Red />
      <White />
    </main>
  );
}
