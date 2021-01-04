//this is client code , could not use babel
const path = require("path");
//import path from "path"; 와 같음

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname,"assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config ={
    entry : ["@babel/polyfill",ENTRY_FILE],
    devtool:"source-map",
    mode : MODE,
    module:{ //module을 발견할때마다 rules라는 조건을 따르도록한다
        rules: [ //test의 정규식에 해당하는 것을 찾으면 use를 사용한다
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,

                use :[
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader : "css-loader"
                    },
                    {
                        loader : "postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        'autoprefixer',{
                                            overrideBrowserslist: "cover 99.5%"
                                        },
                                    ]
                                ]
                            }
                         
                        }
                    },
                    {
                        loader : "sass-loader"
                    }
                ]
            }
            
        ]
    },
    output : {
        path : OUTPUT_DIR,
        filename : "[name].js"
    },
    plugins:[new MiniCssExtractPlugin({
        filename:'[name].css'
    }),
]
};

module.exports = config

//npm uninstall node-sass
//npm install node-sass@4.14.1 으로해줘야 정상적으로 작동
//웹팩 버전 4로 넘어오면서 
// mini-css-extract-plugin을 사용해야함