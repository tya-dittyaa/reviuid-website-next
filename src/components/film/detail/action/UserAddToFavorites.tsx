import { useUserSession, useViewLayout } from "@/context";
import { Button, Form } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const AddToFavorites: React.FC = () => {
  const layout = useViewLayout();
  const userSession = useUserSession();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    if (!userSession) {
      toast.warning(
        "Anda harus masuk terlebih dahulu sebelum anda dapat menambahkan film ke favorit"
      );
      return;
    }

    toast.info("Fitur ini akan segera hadir");
  };

  return (
    <Button
      block
      size="large"
      type="primary"
      onClick={showModal}
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
      Tambah ke Daftar Favorit
    </Button>
  );
};

export default AddToFavorites;
