// ES6 Object.assign fix
require('core-js/es6/object');

// ES6 Fetch Object fix
require('fetch-polyfill');

// ES6 Promise Object fix
require('es6-promise').polyfill();

/** ******************************************************************* */
/** **************************$$$$$$$********************************** */
/** ******************************************************************* */

// 修正jQuery插件样式
require('css/polyfill/jquery.css');

// 修正jQuery插件样式
require('css/polyfill/bootstrap.css');

// 修正jQuery插件样式
require('css/polyfill/layer.css');

/** ******************************************************************* */
/** **************************$$$$$$$********************************** */
/** ******************************************************************* */

window.$ = $;

// 国际化支持
moment.locale('zh-CN');
// 解决严格模式下，没有声明就使用的报错
window.moment = moment;
