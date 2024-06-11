import { useUserSession } from "@/context";
import { Button, Form } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const AddToWatchlist: React.FC = () => {
  const userSession = useUserSession();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    if (!userSession) {
      toast.warning(
        "Anda harus masuk terlebih dahulu sebelum anda dapat menambahkan ke daftar tontonan"
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
      style={{ color: "black" }}
    >
      Daftar Tontonan
    </Button>
  );
};

export default AddToWatchlist;
