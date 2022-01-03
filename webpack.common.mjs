
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

import yaml from 'yaml';

const parseYAMLThenStringifySync = (filename) => {
    const data = fs.readFileSync(`./source/${filename}`, 'utf8');
    return JSON.stringify(yaml.parse(data));
}

const rev = fs.readFileSync('.git/HEAD').toString().trim();
const gitCommitHash = rev.indexOf(':') === -1 ? 'unknown' :
    fs.readFileSync('.git/' + rev.substring(5)).toString().trim();

const data = {
    revision: JSON.stringify(gitCommitHash),
    lectures: parseYAMLThenStringifySync('lectures.yml')
};


import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import md from 'markdown-it-texmath';
import mdVideo from 'markdown-it-video';
import mdEmoji from 'markdown-it-emoji';
import mdDeflist from 'markdown-it-deflist';
import mdAttrs from 'markdown-it-attrs';

import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';


export default function (env, __dirname) {

    const pugFiles = glob.sync(path.join(__dirname, 'source', '{/,/units/}*.pug'));
    console.log(`pug entries in "${__dirname}":`, pugFiles);

    const templates = [];
    pugFiles.forEach((template) => {
        const filename = path.relative(path.join(__dirname, 'source'), template);
        templates.push(new HtmlWebpackPlugin({
            filename: filename.replace('.pug', '.html'),
            template: filename,
            inject: false,
            minify: {
                conservativeCollapse: false
            }
        }));
    });

    return {

        context: path.resolve(__dirname, "./source"),
        entry: {
            'styles': ['./styles/main.scss'],
            'bootstrap': ['./scripts/bootstrap.mjs'],
            'scripts': ['./scripts/scripts.mjs'],
        },

        plugins: [
            ...templates,
            new CopyWebpackPlugin({
                patterns: [
                    //{ from: 'webp-generated/**/*.webp', to: '[path]/[name][ext]', force: false },
                    /* third party scripts */
                    { from: '../node_modules/jquery/dist/jquery.min.js', to: '[name][ext]' },
                ]
            }),
            new webpack.DefinePlugin({
                data: data,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],

        output: {
            path: path.resolve(__dirname, "./build"),
            library: undefined,
        },

        module: {
            rules: [
                {
                    test: /\.pug$/,
                    include: /source/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'pug-loader',
                    }],
                },
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { esModule: false }
                        },
                        {
                            loader: 'markdown-it-loader',
                            options: { 
                                use: [ md, mdVideo, mdEmoji, mdDeflist, mdAttrs ], 
                                html: true, 
                                breaks: false 
                            }
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'webp-generated/[name]_[hash:4][ext]' }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },

        optimization: {
            minimizer: [
                '...',
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: ['imagemin-mozjpeg', 'imagemin-pngquant' ]
                        }
                      },
                      generator: [
                            { // use `?as=webp`
                                preset: 'webp',
                                implementation: ImageMinimizerPlugin.imageminGenerate,
                                options: { 
                                    plugins: [ [ 'imagemin-webp', { quality: [ 88, 96 ] } ] ],
                                },
                        }]
                })
            ]
        }
    };
}
