import { Alert } from "@/components/Alert";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({ id, title, description, action, typeMessage, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid w-full gap-1">
              <ToastDescription typeMessage={typeMessage}>
                <Alert
                  isDefaultAlert={true}
                  message={description}
                  titleText={title}
                  hasTitle={!!title}
                  variant={typeMessage}
                />
              </ToastDescription>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
