const glob = require('glob');

// ------------------------------------------------------------------------------

// polyfill
var polyfillEntries = [{
    id: 'polyfill',
    contains: ['./src/js/polyfill/index.js']
}];

// ------------------------------------------------------------------------------

// plugins
var pluginEntries = [{
    id: 'plugins',
    contains: ['./src/js/plugins/index.js']
}];

// ------------------------------------------------------------------------------

// pages
var pageEntries = [];

// E:\ --> E:/
var projectPath = __dirname.replace(/\\/g, '/'),
    pagePath = '/src/js/pages/';

glob.sync(projectPath + pagePath + '**/*.js').forEach(function(filePath) {
    // filePath = E:/ReactPagesExample/src/js/pages/index.jsx

    // E:/ReactPagesExample/src/js/pages/index.jsx -> /src/js/pages/index.jsx
    var entry = filePath.replace(projectPath, '');

    // E:/ReactPagesExample/src/js/pages/index.jsx --> index.jsx
    var id = filePath.replace(projectPath + pagePath, '');

    // 后缀 index.jsx --> index
    id = id.replace(/\.js$/, '');

    pageEntries.push({
        id: id,
        contains: ['.' + entry]
    });

});

// ------------------------------------------------------------------------------

// vue
var vueEntries = [];

vueEntries.push({
    id: 'vue',
    contains: ['vue']
});

vueEntries.push({
    id: 'vue-platform',
    contains: ['vuex', 'vue-router', 'vee-validate']
});

// ------------------------------------------------------------------------------

const entries = {};

const commonEntries = ['manifest'];

for (var it of polyfillEntries) {
    commonEntries.push(it.id);

    entries[it.id] = it.contains;
}

commonEntries.push('jquery');
entries['jquery'] = ['expose-loader?$!expose-loader?jQuery!jquery'];

commonEntries.push('moment');
entries['moment'] = ['expose-loader?moment!moment'];

for (var it of vueEntries) {
    commonEntries.push(it.id);

    entries[it.id] = it.contains;
}

for (var it of pluginEntries) {
    commonEntries.push(it.id);

    entries[it.id] = it.contains;
}

for (var it of pageEntries)
    entries[it.id] = it.contains;

module.exports = {
    entries: entries,
    pageEntries: pageEntries,
    commonEntries: commonEntries
}
