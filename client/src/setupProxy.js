const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/profile", {
            target: "http://localhost:8000",
            changeOrigin: false,
            headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}
        })
    );
};