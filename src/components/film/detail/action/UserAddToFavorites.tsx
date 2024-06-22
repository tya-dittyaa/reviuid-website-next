import {
  useFilmData,
  useUserFilmFavorite,
  useUserSession,
  useViewLayout,
} from "@/context";
import { DeleteUserFilmFavorite, PostUserFilmFavorite } from "@/utils";
import { DeleteOutlined, SmileOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const AddToFavorites: React.FC = () => {
  const layout = useViewLayout();
  const userSession = useUserSession();
  const filmData = useFilmData()!;
  const userFavorite = useUserFilmFavorite();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hanlePostData = async () => {
    setIsLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await PostUserFilmFavorite(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menambahkan ke daftar favorit!");
          } else {
            reject("Gagal menambahkan ke daftar favorit!");
          }

          setTimeout(() => {
            setIsLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menambahkan ke daftar favorit...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const handleDeleteData = async () => {
    setIsLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await DeleteUserFilmFavorite(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus dari daftar favorit!");
          } else {
            reject("Gagal menghapus dari daftar favorit!");
          }

          setTimeout(() => {
            setIsLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menghapus dari daftar favorit...",
      success: (data) => {
        return `${data}`;
      },
      error: (error) => {
        return `${error}`;
      },
    });
  };

  const clickButton = () => {
    if (!userSession) {
      toast.warning(
        "Anda harus masuk terlebih dahulu sebelum anda dapat menambahkan film ke favorit"
      );
      return;
    }

    if (userFavorite === null) {
      toast.warning("Terjadi kesalahan pada server!");
      return;
    }

    if (userFavorite === false) {
      hanlePostData();
    }

    if (userFavorite === true) {
      handleDeleteData();
    }
  };

  return (
    <Button
      block
      size="large"
      type="primary"
      onClick={clickButton}
      loading={isLoading}
      icon={userFavorite ? <DeleteOutlined /> : <SmileOutlined />}
      style={{
        color: "black",
        fontSize: layout === "horizontal" ? "1.2vw" : "4vw",
        paddingTop: layout === "horizontal" ? "1vw" : "3vw",
        paddingBottom: layout === "horizontal" ? "1vw" : "3vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userFavorite
        ? "Hapus dari Daftar Favorit"
        : "Tambahkan ke Daftar Favorit"}
    </Button>
  );
};

export default AddToFavorites;
