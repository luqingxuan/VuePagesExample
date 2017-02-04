const language = {
    sDecimal: '',
    sEmptyTable: '<p class="empty-icon"><span class="wi wi-night-sleet-storm"></span></p><p class="empty-text">对不起，暂无数据，您可以稍后刷新试试！</p>',
    sInfo: '当前显示第 _START_ - _END_ 条，共 _TOTAL_ 条',
    sInfoEmpty: '当前显示0条',
    sInfoFiltered: '（总共 _MAX_ 条）',
    sInfoPostFix: '',
    sLengthMenu: '每页显示 _MENU_ 条',
    sLoadingRecords: '正在就玩命加载中，请稍后...',
    sProcessing: '正在玩命处理中，请稍后...',
    sSearch: '搜索：',
    sSearchPlaceholder: '请输入过滤条件',
    sThousands: ',',
    sUrl: '',
    sZeroRecords: '<p class="empty-icon"><span class="wi wi-night-sleet-storm"></span></p><p class="empty-text">对不起，没有数据，换个条件再试试吧！</p>',
    oPaginate: {
        sFirst: '首页',
        sLast: '尾页',
        sNext: '下一页',
        sPrevious: '上一页'
    },
    oAria: {
        sSortAscending: ': 升序排序',
        sSortDescending: ': 降序排序'
    }
};

function isCopyable(obj) {
    if (obj === null || obj === undefined)
        return false;

    return true;
}

function copyLanguage(target,
    defultVal) {
    if (!isCopyable(target) || !isCopyable(defultVal))
        return;

    for (let key in defultVal) {
        if (!defultVal.hasOwnProperty(key))
            continue;

        if (typeof defultVal[key] === 'object') {
            target[key] = target[key] || {};
            copyLanguage(target[key], defultVal[key]);
            continue;
        }

        target[key] = defultVal[key];
    }
}

copyLanguage($.fn.DataTable.defaults.oLanguage, language);
