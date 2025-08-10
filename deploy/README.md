# Deployment notes

This image supports runtime configuration via environment variables injected at container start.

- Any environment variable starting with `VITE_` will be emitted into `/usr/share/nginx/html/env.js` as `window._env_`.
- Example: set `VITE_API_URL`, `VITE_WS_URL`, `VITE_APP_ENV` in your Deployment manifest or Helm values.
- `env.js` is loaded by `index.html` before your app bundle.

## Kubernetes example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react18-codebase
spec:
  replicas: 2
  selector:
    matchLabels: { app: react18-codebase }
  template:
    metadata:
      labels: { app: react18-codebase }
    spec:
      containers:
        - name: web
          image: your-registry/react18-codebase:latest
          ports:
            - containerPort: 8080
          env:
            - name: VITE_APP_ENV
              value: production
            - name: VITE_API_URL
              value: https://api.example.com
            - name: VITE_WS_URL
              value: wss://ws.example.com
```

Expose via a `Service` (ClusterIP) and an ingress (e.g., NGINX Ingress) as usual.


