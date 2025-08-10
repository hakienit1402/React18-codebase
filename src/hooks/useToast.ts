import { useRef, useState } from "react";

type ToastType = {
  id: string | number;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  typeMessage?: "default" | "destructive" | "success" | "warning" | "info";
  open?: boolean;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const counterRef = useRef(0);

  const dismiss = (id: ToastType["id"]) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = (next: Omit<ToastType, "id">) => {
    const id = ++counterRef.current;
    const item: ToastType = { id, ...next, open: true };
    setToasts((prev) => [item, ...prev].slice(0, 5));
    return id;
  };

  return { toasts, toast, dismiss };
}

export type { ToastType };
