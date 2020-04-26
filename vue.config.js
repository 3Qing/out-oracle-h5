const path = require('path')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1951a3',
                    'success-color': '#45BE87',
                    'danger-color': 'rgba(255, 77, 79, 0.8)'
                },
                javascriptEnabled: true,
            },
        },
    },
}