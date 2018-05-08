/**
 * @file 产出编译组件列表页面
 * @author xuexb <fe.xiaowu@gmail.com>
 */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const dist = path.join(__dirname, '../dist');
const glob = require('glob');

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
const files = fs.readdirSync(dist)
    .filter(name => fs.statSync(path.join(dist, name)).isDirectory())
    .map(name => {
        const version = fs.readdirSync(path.join(dist, name))[0];

        return {
            name,
            version,
            path: `${name}/${version}/${name}.js`
        };
    });
const versions = files
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
    <h1>MIP 组件列表 <a href="sample/">查看示例</a></h1>
    <ul>
        ${versions.join('')}
    </ul>
</body>
</html>`;

fs.writeFileSync(path.join(dist, 'index.html'), html);

// 拷贝 html
fs.copySync('sample', 'dist/sample');
// 替换组件 url
const sampleFiles = glob.sync('dist/sample/**/*.html');
for (const sampleFile of sampleFiles) {
    let sampleFileContent = fs.readFileSync(sampleFile).toString();
    for (const file of files) {
        const search = new RegExp(
            `(https:)?//(c.mipcdn.com|mipcache.bdstatic.com)/static/v1/${file.name}/${file.name}.js`,
            'ig'
        );
        sampleFileContent = sampleFileContent.replace(
            search,
            `/${file.path}`
        );
    }
    if (sampleFile === 'dist/sample/index.html') {
        sampleFileContent = sampleFileContent.replace(
            'MAGIC!DONT TOUCH ME',
            sampleFiles.map(s => {
                const filename = s.replace(/^dist\/sample\//, '');
                return `<li><a href="${filename}">${filename}</a></li>`;
            }).join('\n')
        );
    }
    fs.writeFileSync(sampleFile, sampleFileContent);
}
