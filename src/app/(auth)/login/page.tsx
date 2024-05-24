"use client";

import { CustomButton } from "@/components";
import { UserLogin } from "@/types";
import { FetchUserLogin } from "@/utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import { FormEvent, MouseEvent, useState } from "react";
import { Toaster, toast } from "sonner";
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

  // Form State Management and Submission Handler for Email and Password
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Fetch User Login Data
    const login = await FetchUserLogin(formData);

    // Promise for Toast Notification
    const toastPromise = (): Promise<void> =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (login === 201) resolve();
          else reject(login);
        }, 2000)
      );

    // Toast Notification
    toast.promise(toastPromise, {
      loading: "Sedang memproses...",
      success: () => {
        return `Selamat datang! Anda berhasil masuk! Sedang mengalihkan ke halaman utama...`;
      },
      error: (data: number) => {
        setIsSubmitting(false);
        if (data === 500)
          return "Terjadi kesalahan pada server! Silakan coba lagi nanti!";
        else return "Email atau password salah! Silakan coba lagi!";
      },
    });

    // Redirect to Home Page after 2 seconds
    toastPromise().then(() => {
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    });
  };

  return (
    <div className={styles.white}>
      <h2 className={styles.login}>Masuk</h2>

      <form onSubmit={handleFormSubmit}>
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
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
            <CustomButton
              variant="contained"
              type="submit"
              className={styles.button}
              disabled={isSubmitting ? true : false}
            >
              MASUK
            </CustomButton>
          </FormControl>
        </div>
      </form>

      {!isSubmitting && (
        <p className={styles.RegisterRef}>
          Belum punya akun?{" "}
          <a href="/register" className={styles.RegisterText}>
            Daftar Sekarang!
          </a>
        </p>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <div className={styles.container}>
      <White />
      <Red />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
