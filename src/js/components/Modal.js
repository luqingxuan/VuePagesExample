function fixOpts(content, title, options) {
    let dtd = $.Deferred();

    if (options.title === undefined)
        options.title = title;

    if (options.content === undefined)
        options.content = content;

    if (options.btn) {

        // btns= 我知道了
        if (typeof options.btn === 'string')
            options.btn = [options.btn];

        // NO
        if (options.btn.length > 1) {
            options['btn2'] = (index) => {
                dtd.resolve('NO');
            };
        }

        // Others
        for (let i = 2, l = options.btn.length; i < l; i++)
            options['btn' + (i + 2)] = (index) => {
                dtd.resolve(options.btn[i]);
            };
    }

    // YES
    options.yes = (index) => {
        layer.close(index);
        dtd.resolve('YES');
    };

    // Close Button Eq NO
    options.cancel = (index) => {
        dtd.resolve('NO');
    };

    options.success = (layerio, index) => {
        let activeElement = document.activeElement;
        activeElement && activeElement.tagName !== 'BODY' && activeElement.blur && activeElement.blur();
    };

    return dtd;
}

function Alert(content = '', title = '提示信息', options = {}) {
    if (typeof content === 'object')
        options = content;

    if (typeof content === 'object')
        options = content;

    if (options.icon === undefined)
        options.icon = 2;

    options.btn = options.btn || ['确认'];

    let dtd = fixOpts(content, title, options);

    layer.open(options);

    return dtd;
}

function Info(content = '', title = '通知', options = {
    icon: 1
}) {
    return Alert(content, title, options);
}

function Error(content = '', title = '错误信息', options = {}) {
    options.btn = options.btn || ['确认'];

    return Alert(content, title, options);
}

function BizError(errDes = '', errMsg = '', bizErrCode = '', moreDesc = '') {
    let content = `<font color="#FF0000">业务失败</font><br>${errDes}<br>${bizErrCode} ${errMsg}<br>${moreDesc}`;

    return Alert(content);
}

function AjaxError(jqXHR, errDesc = '', moreDesc = '') {
    let statusCode = jqXHR.status;
    let statusText = jqXHR.statusText;
    let responseText = jqXHR.responseText || '';
    let content = `<font color="#FF0000>系统故障</font><br>${statusCode} ${statusText}<br>${errDesc}<br>${responseText}<br>${moreDesc}`;

    return Alert(content);
}

function Confirm(content = '', title = '确认', options = {}) {
    if (typeof content === 'object')
        options = content;

    if (typeof title === 'object')
        options = title;

    options.btn = options.btn || ['确认', '取消'];

    let dtd = fixOpts(content, title, options);

    layer.confirm(options.content, options);

    return dtd;
}

function Notify(content, options = {}) {
    let dtd = $.Deferred();

    // icon
    if (typeof options == 'number')
        options = {
            icon: options
        };

    layer.msg(content, options, () => {
        dtd.resolve();
    });

    return dtd;
}

let MaskOptions = [];
let MaskInstance = null;

function Mask(option) {
    // 取消mask
    if (option === false) {
        if (MaskInstance === null)
            return;

        MaskOptions.pop();

        layer.close(MaskInstance);

        MaskInstance = null;

        if (MaskOptions.length)
            return Mask(MaskOptions.pop());

        return;
    }

    option = option || {};

    let icon = option.icon || 2;
    MaskInstance = layer.load(icon, option);
    MaskOptions.push(option);
}

export {
    Info,
    Alert,
    AjaxError,
    BizError,
    Confirm,
    Error,
    Mask,
    Notify
};
