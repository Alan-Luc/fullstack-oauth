const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use("/profile", 
        createProxyMiddleware({
            target: "http://localhost:8000/"
        })
    );
}