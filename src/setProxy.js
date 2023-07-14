import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://3.35.206.244:8080',
      changeOrigin: true,
    }),
  );
}
