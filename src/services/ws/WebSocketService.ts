import { Client, IMessage } from "@stomp/stompjs";

type MessageHandler = (msg: IMessage) => void;
let connectPromise: Promise<void> | null = null;

/**
 * Factory for a STOMP-over-WebSocket service.
 *
 * Features:
 * - Auth via Bearer token header
 * - Auto-reconnect (5 minutes)
 * - Heartbeats (10s)
 * - Topic subscription management with idempotency
 */
export function createWebSocketService(token: string) {
  const wsUrl = (window as any)._env_?.VITE_WS_URL || "ws://localhost:8080/ws";
  const client = new Client({
    brokerURL: wsUrl,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: () => {}, // Disable debug logs in production
    reconnectDelay: 300000, // 5 minutes (5 * 60 * 1000 = 300000ms)
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  let connectedResolver: () => void;
  const connectedPromise = new Promise<void>((resolve) => {
    connectedResolver = resolve;
  });

  client.onConnect = () => {
    connectedResolver();
  };
  connectPromise = connectedPromise;

  const subscriptions = new Map<string, () => void>();

  /**
   * Activate underlying STOMP client.
   */
  const connect = () => {
    if (!client.active) client.activate();
  };

  /**
   * Deactivate client and remove all active subscriptions.
   */
  const disconnect = () => {
    client.deactivate();
    subscriptions.forEach((unsubscribe) => unsubscribe());
    subscriptions.clear();
  };

  /**
   * Subscribe to a topic. Idempotent per topic key.
   */
  const subscribeToTopic = async (topic: string, handler: MessageHandler) => {
    await connectPromise; // Wait for the connection to be established
    if (subscriptions.has(topic)) return;
    const sub = client.subscribe(topic, handler);
    subscriptions.set(topic, () => sub.unsubscribe());
  };

  /**
   * Unsubscribe from a topic if currently subscribed.
   */
  const unsubscribeFromTopic = (topic: string) => {
    subscriptions.get(topic)?.();
    subscriptions.delete(topic);
  };

  return {
    client,
    connect,
    disconnect,
    subscribeToTopic,
    unsubscribeFromTopic,
    connectedPromise,
  };
}
