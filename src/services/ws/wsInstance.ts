import { createWebSocketService } from "@/services/ws/WebSocketService";

let wsInstance: ReturnType<typeof createWebSocketService> | null = null;

/**
 * Initialize a singleton WebSocket service and connect immediately.
 */
export function initWebSocket(token: string) {
  if (!wsInstance) {
    wsInstance = createWebSocketService(token);
    wsInstance.connect();
  }
}

/**
 * Retrieve the initialized WebSocket service instance or throw if not initialized.
 */
export function getWebSocketInstance() {
  if (!wsInstance) {
    throw new Error("WebSocket not initialized. Call initWebSocket(token) first.");
  }
  return wsInstance;
}

/**
 * Disconnect and clear the WebSocket singleton.
 */
export function disconnectWebSocket() {
  wsInstance?.disconnect();
  wsInstance = null;
}
