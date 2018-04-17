/**
 * @file 产出编译组件列表页面
 * @author xuexb <fe.xiaowu@gmail.com>
 */

'use strict';

const path = require('path');
const fs = require('fs');
const dist = path.join(__dirname, '../dist');

/**
 * 版本号数据
 *
 * @type {Array}
 * @example
 *     [
 *         {
 *             name: 组件名,
 *             version: 版本号
 *         }
 *     ]
 */
const versions = fs.readdirSync(dist)
    .filter(name => fs.statSync(path.join(dist, name)).isDirectory())
    .map(name => {
        const version = fs.readdirSync(path.join(dist, name))[0];

        return {
            name,
            version,
            path: `${name}/${version}/${name}.js`
        };
    })
    .map(item => `<li><a href="${item.path}" target="_blank">${item.name}@${item.version}</a></li>`);

/**
 * 生成 HTML 代码
 *
 * @type {string}
 */
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>MIP 组件列表</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0">
</head>
<body>
    <h1>MIP 组件列表</h1>
    <ul>
        ${versions.join('')}
    </ul>
</body>
</html>`;

fs.writeFileSync(path.join(dist, 'index.html'), html);
