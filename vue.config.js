module.exports = {
    devServer: {
        proxy: {
            '/auth': {
                target: 'https://global-games.dev.altix.co/',
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': ''
                }
            },
            '/socket': {
                target: 'ws://global-games.dev.altix.co/',
                changeOrigin: true,
                pathRewrite: {
                    '^/socket': ''
                }
            }
        }
    }
}