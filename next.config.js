const path = require('path');
const webpack = require("webpack");
const withFonts = require('nextjs-fonts');
const withWorkers = require('@zeit/next-workers');
const withSass = require('@zeit/next-sass');

require("dotenv").config({path: './.env'});
let nextConfig = {
    cssModules: true,
    webpack(config, option) {
        config.node = {
            fs: 'empty'
        };
        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
            return acc;
        }, {});
        config.plugins.push(new webpack.DefinePlugin(env));
        config.resolve.alias['~'] = path.join(__dirname, '.');
        return config;
    },
    cssLoaderOptions: {
        url: false
    }
};

nextConfig = withFonts(nextConfig);
nextConfig = withWorkers(nextConfig);
module.exports = nextConfig;