module.exports = {
    devServer: {
        proxy: {
            '/dev': {
                target: "http://127.0.0.1:4000",
                // ws: true
                logLevel: 'debug'
            },
            '/socket': {
                target: "http://127.0.0.1:4000",
                ws: true,
                changeOrigin: true,
                secured: false,
                logLevel: 'debug'
            }
        }
    }
}