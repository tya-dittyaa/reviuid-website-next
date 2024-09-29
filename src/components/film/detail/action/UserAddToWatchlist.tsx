import {
  useFilmData,
  useUserFilmWatchlist,
  useUserSession,
  useViewLayout,
} from "@/context";
import { DeleteUserFilmWatchlist, PostUserFilmWatchlist } from "@/utils";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const forceRefresh = () => window.location.reload();

const AddToWatchlist: React.FC = () => {
  const layout = useViewLayout();
  const userSession = useUserSession();
  const filmData = useFilmData()!;
  const userWatchlist = useUserFilmWatchlist();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hanlePostData = async () => {
    setIsLoading(true);

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          const response = await PostUserFilmWatchlist(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menambahkan ke daftar tontonan!");
          } else {
            reject("Gagal menambahkan ke daftar tontonan!");
          }

          setTimeout(() => {
            setIsLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menambahkan ke daftar tontonan...",
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
          const response = await DeleteUserFilmWatchlist(filmData.id);

          if (response === undefined) {
            reject("Terjadi kesalahan pada server!");
          } else if (response) {
            resolve("Berhasil menghapus dari daftar tontonan!");
          } else {
            reject("Gagal menghapus dari daftar tontonan!");
          }

          setTimeout(() => {
            setIsLoading(false);
            forceRefresh();
          }, 1000);
        }, 1000);
      });

    toast.promise(promise, {
      loading: "Menghapus dari daftar tontonan...",
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

    if (userWatchlist === null) {
      toast.warning("Terjadi kesalahan pada server!");
      return;
    }

    if (userWatchlist === false) {
      hanlePostData();
    }

    if (userWatchlist === true) {
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
      icon={userWatchlist ? <DeleteOutlined /> : <EyeOutlined />}
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
      {userWatchlist
        ? "Hapus dari Daftar Tontonan"
        : "Tambahkan ke Daftar Tontonan"}
    </Button>
  );
};

export default AddToWatchlist;
