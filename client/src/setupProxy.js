const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use("/profile", 
        createProxyMiddleware({
            target: "http://localhost:8000/"
        })
    );

    app.use("/auth",
        createProxyMiddleware({
            target: "http://localhost:8000/"
        })
    );
}