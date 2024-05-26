"use client";

import { CustomButton } from "@/components";
import { UserLogin } from "@/types";
import { FetchRefreshToken, FetchUserLogin } from "@/utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
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

function WhiteLoading() {
  return (
    <div className={styles.white}>
      <CircularProgress sx={{ color: "#E2B808" }} />
    </div>
  );
}

function White() {
  // Next.js Router
  const router = useRouter();

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
        if (data === 500)
          return "Terjadi kesalahan pada server! Silakan coba lagi nanti!";
        else return "Email atau password salah! Silakan coba lagi!";
      },
    });

    // Redirect to Home Page after 2 seconds
    toastPromise()
      .then(() => {
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      })
      .catch(() => {
        setIsSubmitting(false);
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
              {isSubmitting ? "Memproses..." : "Masuk"}
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const refresh = await FetchRefreshToken();
      if (refresh) router.replace("/");
      else setIsLoading(false);
    }
    checkLogin();
  }, [router]);

  return (
    <div className={styles.container}>
      {isLoading ? <WhiteLoading /> : <White />}
      <Red />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
