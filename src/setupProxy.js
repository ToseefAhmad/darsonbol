const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'https://dev.darsonbol.online/',
            changeOrigin: true
        })
    );
};
