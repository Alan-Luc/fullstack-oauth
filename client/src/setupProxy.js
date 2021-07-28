const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/profile", {
            target: "http://localhost:8000",
            changeOrigin: true
        })
    );
};