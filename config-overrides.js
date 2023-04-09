const { override, fixBabelImports, addLessLoader  } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {  //配置上babel-plugin-import按需打包插件插件
        libraryName: 'antd',     //针对antd库进行打包
        libraryDirectory: 'es',  //这对源码文件夹中的es文件
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },  //配置主题颜色
    }),
);