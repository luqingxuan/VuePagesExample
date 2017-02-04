<template>
    <div class="grid">
        <div v-if="showSearch && !searchBtns.length" class="row grid-search">

            <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-4 col-md-offset-5 col-lg-3 col-lg-offset-7 text-right">
                <div class="input-group search-item">
                    <span class="input-group-addon align-left">搜索：</span>
                    <input class="form-control input-sm" type="text" :placeholder="searchPlaceholder" v-model="sKeyword" @keyup="onKeywordChange();"/>
                </div>
            </div>

            <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-0 col-lg-2 col-lg-offset-0">
                <div class="input-group search-item">
                    <span class="input-group-addon align-left">每页显示</span>
                    <select class="form-control input-sm" @change="onPageSizeChange();" v-model="sPageSize">
                        <option v-for="op in pageSizeList" :value="op">{{op}}</option>
                    </select>
                    <span class="input-group-addon align-right">条</span>
                </div>
            </div>

        </div>

        <div v-if="showSearch && searchBtns.length" class="row grid-search">
            <div class="col-xs-10 col-xs-offset-1 col-sm-12 col-sm-offset-0 col-md-4 col-lg-4">
                <div class="search-item">
                    <button type="button" v-for="btn in searchBtns" :class="['btn', btn.cls ? btn.cls : 'btn-default', 'btn-sm']" :data-action="btn.action" v-html="btn.text"></button>
                </div>
            </div>

            <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-4 col-md-offset-1 col-lg-3 col-lg-offset-3 text-right">
                <div class="input-group search-item">
                    <span class="input-group-addon align-left">搜索：</span>
                    <input class="form-control input-sm" type="text" placeholder="请输入过滤条件" v-model="sKeyword" @keyup="onKeywordChange();"/>
                </div>
            </div>

            <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-0 col-lg-2 col-lg-offset-0">
                <div class="input-group search-item">
                    <span class="input-group-addon align-left">每页显示</span>
                    <select class="form-control input-sm" @change="onPageSizeChange();" v-model="sPageSize" >
                        <option v-for="op in pageSizeList" :value="op">{{op}}</option>
                    </select>
                    <span class="input-group-addon align-right">条</span>
                </div>
            </div>

        </div>

        <table class="table table-striped dataTable" ref="table" cellspacing="0" cellpadding="0">
            <thead v-if="showHead">
                <tr>
                    <th v-for="(col, index) in columns" :class="{'gd-col':true, ['gd-col-'+ col.name]: true, [col.hcls]: col.hcls ? col.hcls : ''}" v-html="col.title"></th>
                </tr>
            </thead>
            <tfoot v-if="showFoot">
                <tr>
                    <th v-for="(col, index) in columns" :class="{'gd-col':true, ['gd-col-'+ col.name]: true, [col.hcls]: col.hcls ? col.hcls : ''}" v-html="col.title"></th>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    module.exports = {
        name: 'Grid',
        replace : true,
        props : {
            showHead: {
                type: Boolean,
                default: true
            },
            showFoot: {
                type: Boolean,
                default: false
            },
            showPager: {
                type: Boolean,
                default: true
            },
            showSearch: {
                type: Boolean,
                default: true
            },
            searchPlaceholder: {
                type: String,
                default: '请输入过滤条件'
            },
            searchBtns: {
                type: Array,
                default: () => [] // text: '', cls: '', action: ''
            },
            url: {
                type: String,
                default: ''
            },
            method: {
                type: String,
                default: 'GET'
            },
            columns:{
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
            },
            responsive: {
                type: Boolean,
                default: true
            },
            urlParams: {
                type: Object,
                default: () => {}
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizeList: {
                type: Array,
                default: () => [10, 20, 50, 100]
            },
            pageNo: {
                type: Number,
                default: 1
            },
            onBeforeLoad: {
                type: Function,
                default: $.noop
            }
        },
        data() {
            return {
                sKeyword: '',
                sPageSize: this.pageSize
            };
        },
        mounted() {
            if(this.url)
                this.load();
            else if(this.data)
                this.afterRecordsReady($.extned(true, [], this.data));

            this.$nextTick( () => {
                // 搜索栏按钮
                $(this.$el).on('click', '.grid-search .btn', (e) => this.handleSearchActionClick(e));
            });
        },
        methods : {
            load(params = {}) {
                this.params = this.params || {};

                let data = $.extend(true, {}, this.params, params);

                let beforeData = $.extend(true, {}, this.urlParams, data);
                let returnValue = this.onBeforeLoad(beforeData);
                if(returnValue === false)
                    return;

                this.mask();

                data = $.extend(true, {}, this.urlParams, data, returnValue || {});

                return $.ajax({
                    url: this.api(this.url),
                    data: data,
                    dataType: "json",
                    method: this.method,
                    contentType: 'application/json;chartset=UTF-8'
                }).then((resp) => {
                    let isRightStatus = resp.status === 200;

                    let records = resp.data || [];

                    let isRightData = isRightStatus && records.length;

                    records = isRightData ? records : [];

                    // 获得了正确的数据
                    isRightData && this.$emit('load', records);

                    // 后台查询，没有数据
                    !isRightData && this.$emit('empty');

                    // 后台发生异常
                    !isRightStatus && this.$emit('failure', resp);

                    this.afterRecordsReady(records);

                    this.unmask();

                    return  records;
                }, (resp) => {
                    let records = [];

                    // AJAX异常，超时，网络掉线等
                    this.$emit('empty');

                    // AJAX异常，超时，网络掉线等
                    this.$emit('error', resp);

                    this.afterRecordsReady(records);

                    this.unmask();

                    return [];
                });
            },
            afterRecordsReady(records) {
                if(this.dataTable)
                    return this.dataTable.clear().rows.add(records).draw();

                this.createPlugin(records);
            },
            createPlugin(records) {
                this.$dataTable = $(this.$refs.table).dataTable({
                    autoWidth: false,
                    processing: false,
                    responsive: this.responsive,
                    searching: true,
                    paging: this.showPager,
                    columns: this.calColumns(),
                    data: records
                });

                this.dataTable = this.$dataTable.api();

                // change: select/checkbox/radio input
                // click: a button
                let selector = ['td select', 'td input[type=checkbox]', 'td input[type=radio]'];

                let clickSelector = '[data-action]:not(' + selector.join(',') + ')';
                let changeSelector = selector.join('[data-action],') + '[data-action]';

                this.$dataTable.on('click', clickSelector, (e) => this.handleRowActionClick(e));
                this.$dataTable.on('change', changeSelector, (e) => this.handleRowActionClick(e));
            },
            destroyPlugin() {
                if(!this.dataTable)
                    return;

                // change: select/checkbox/radio
                // click: a button span i
                let selector = ['td select', 'td input[type=checkbox]', 'td input[type=radio]'];

                let clickSelector = '[data-action]:not(' + selector.join(',') + ')';
                let changeSelector = selector.join('[data-action],') + '[data-action]';

                this.$dataTable.off('click', clickSelector);
                this.$dataTable.off('change', changeSelector);

                this.dataTable.destroy();
                this.dataTable = undefined;
                this.$dataTable = undefined;
            },
            redraw() {
                if(!this.dataTable)
                    return;

                this.dataTable.draw('page');
            },
            redrawRow($tr, record) {
                if(!this.dataTable)
                    return;

                if($tr[0].tagName !== 'TR')
                    $tr = $tr.closest('tr');

                if($tr.hasClass('child'))
                    $tr = $tr.prev();

                this.dataTable.row($tr).data(record).draw('page');
            },
            updateRow(key, value, data) {
                if(!this.dataTable)
                    return;

                let rows = this.dataTable.rows((idx, rec, node) => {
                    return rec[key] == value ? true : false;
                });

                for(let i = 0, l = rows.length; i < l; i++) {
                    let record = rows.data()[i];
                    $.extend(true, record, data);
                    this.dataTable.row(rows.nodes()[i]).data(record).draw('page');
                }
            },
            removeRow($tr) {
                if(!this.dataTable)
                    return;

                if($tr[0].tagName !== 'TR')
                    $tr = $tr.closest('tr');

                if($tr.hasClass('child'))
                    $tr = $tr.prev();

                this.dataTable.row($tr).remove();

                this.redraw();
            },
            getRowData(key, value) {
                if(!this.dataTable)
                    return null;

                let records = this.dataTable.rows().data();
                for(let i = 0, l = records.length; i < l; i++)
                    if(records[i][key] == value)
                        return records[i];

                return null;
            },
            removeRowChild($tr) {
                if($tr[0].tagName !== 'TR')
                    $tr = $tr.closest('tr');

                if($tr.hasClass('child'))
                    $tr = $tr.prev();

                this.dataTable.row($tr).child.remove();
            },
            hideChildRow: function($tr) {
                if($tr[0].tagName !== 'TR')
                    $tr = $tr.closest('tr');

                if($tr.hasClass('child'))
                    $tr = $tr.prev();

                this.dataTable.row($tr).child.hide();
            },
            showChildRow: function($tr, html) {
                if($tr[0].tagName !== 'TR')
                    $tr = $tr.closest('tr');

                if($tr.hasClass('child'))
                    $tr = $tr.prev();

                this.dataTable.row($tr).child(html).show();
            },
            isCollapsed: function() {
                if(!this.dataTable)
                    return false;

                return this.$dataTable.hasClass('collapsed');
            },
            onPageSizeChange() {
                if(!this.dataTable)
                    return;

                this.dataTable.page.len(this.sPageSize).draw();
            },
            onKeywordChange() {
                if(!this.dataTable)
                    return;

                this._keyword_timer_ && clearTimeout(this._keyword_timer_);
                this._keyword_timer = setTimeout(() => {
                    this.dataTable.search(this.sKeyword).draw();
                }, 100);
            },
            handleRowActionClick(event) {
                if(!this.dataTable)
                    return;

                let $parent = this.$parent;
                if(!$parent)
                    return;

                let $action = $(event.currentTarget);
                let action = $action.data('action');

                let $tr = $action.closest('tr');
                if($tr.hasClass('child'))
                    $tr= $tr.prev();

                let index = $tr.data('index');
                let data = this.dataTable.row($tr[0]).data();

                this.$emit(action, event, data, this);
            },
            handleSearchActionClick(event) {
                let $parent = this.$parent;
                if(!$parent)
                    return;

                let $action = $(event.currentTarget);
                let action = $action.data('action');

                this.$emit(action, event, this);

                if(!$parent[action])
                    return;

                $parent[action].call($parent, event, this);
            },
            //  统一单元格渲染接口规格，进行适配
            calRender(col) {
                let render = col.render || (value => value);

                let newRender = (value, type, record, meta) => render(value, record, meta.row);

                return newRender;
            },
            // 统一猎模型规格，进行适配
            calColumn(column) {
                const defaults = {
                    title: '',
                    default: '',// default content, support html
                    width: '',
                    type: 'string',// [date, num, num-fmt, html-num, html-num-fmt, html, string]
                    visible: true,
                    searchable: true,
                    orderable: true
                };

                let col = column;

                if(typeof column === 'string')
                    col = {
                        name: col
                    };

                col = $.extend(true, {}, col)

                function isCopyable(obj) {
                    if (obj === null || obj === undefined)
                        return false;
                    return true;
                }

                function copyIfNotExits(target, defultVal) {
                    if (!isCopyable(target) || !isCopyable(defultVal))
                        return;

                    for (let key in defultVal) {
                        if (!defultVal.hasOwnProperty(key))
                            continue;

                        if (typeof defultVal[key] === 'object') {
                            target[key] = target[key] || {};
                            copyIfNotExits(target[key], defultVal[key]);
                            continue;
                        }

                        if(target[key] === undefined)
                            target[key] = defultVal[key];
                    }
                }

                copyIfNotExits(col, defaults);

                if(col.default !== undefined)
                    col.defaultContent = col.default;
                delete col.default;

                if(col.title === undefined)
                    col.title = col.name;


                if(col.cls !==undefined)
                    col.className = col.cls;
                delete col.cls;

                col.data = col.name;

                col.render = this.calRender(col);

                // 操作列
                if(col.type === 'action') {
                    col.type = 'string';
                    col.searchable = false;
                    col.orderable = false;
                }

                return col;
            },
            // 处理列模型，进行适配
            calColumns() {
                let columns = [];

                for(let column of this.columns)
                    columns.push(this.calColumn(column))

                return columns;
            }
        },
        beforeDestroy: function() {
            // 搜索栏按钮
            this.$dataTable.off('click', '.grid-search .btn');

            this.destroyPlugin();
        }
    };
</script>

<style lang="less">
.grid {
    .grid-search {
        .search-item {
            margin-bottom: 15px;

            .form-control {
                border-radius: 3px;
            }
        }

        .input-group-addon {
            border: none 0;
            padding-left: 10px;
            padding-right: 10px;
        }

        .align-left {
            padding-left: 0;
        }

        .align-right {
            padding-right: 0;
        }
    }

    div.dataTables_wrapper {
        div.dataTables_filter {
            display: none;

            input {
                min-width: 200px;
                margin-top: -3px;
                border-radius: 3px;
            }
        }

        div.dataTables_length {
            display: none;

            select {
                min-width: 100px;
                margin-top: -3px;
                border-radius: 3px;
            }
        }

        div.dataTables_info, div.dataTables_paginate {
            margin-top: 10px;
        }

    }

    table.dataTable {
        > thead, > tfoot {
            > tr > th {
                color: white;
                border: none 0;
                font-weight: normal;
                vertical-align: middle;
                background-color: #3c8dbc;

                &.sorting, &.sorting_asc, &.sorting_desc {
                    &:after {
                        color: white;
                        opacity: 0.85;
                        font-size: 12px;
                    }
                }

                &.text-left {
                    text-align: left;
                }

                &.text-right {
                    text-align: right;
                }

                &.text-center {
                    text-align: center;
                }

                &.text-number {
                    text-align: center;
                }
            }
        }

        > tbody > tr {
            > td {
                border: none 0;
                vertical-align: middle;

                &.dataTables_empty {

                    .empty-icon {
                        margin: 20px 0 0;
                        font-size: 80px;
                        color: #e4e4e4;
                    }

                    .empty-text {
                        margin: 20px 0;
                    }
                }

                &.text-left {
                    text-align: left;
                }

                &.text-right {
                    text-align: right;
                }

                &.text-center {
                    text-align: center;
                }

                &.text-number {
                    text-align: right;
                }
            }
        }

        &.table-striped {
            > tbody > tr {

                &.child {
                    td {
                        background-color: white;
                    }
                }

                &.odd td {
                    background-color: white;
                }

                &.even td {
                    background-color: #f1f5f9;
                }
            }
        }

        > tbody > tr {
            &.child {
                > td > ul {
                    display: block;
                }

                span.dtr-title {
                    min-width: 160px;
                    float:left;
                    text-align: left;
                }

                span.dtr-data {
                    display: block;
                    margin-left: 160px;
                    text-align: left;
                }

                .btn-block {
                    max-width: 300px;
                    margin: 5px 0;
                }
            }
        }
    }

    table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {
        bottom: calc(~'50% - 8px');
    }

    table.dataTable.dtr-inline.collapsed > tbody > tr > td:first-child:before, table.dataTable.dtr-inline.collapsed > tbody > tr > th:first-child:before {
        top: calc(~'50% - 7px');
    }

    /** 以下限定宽度摘抄自bootstrap **/

    /**
      Medium screen / desktop
    **/
    @media screen and (max-width: 992px) {
        table.dataTable > tbody > tr.child {

        }
    }


    /**
      Small screen / tablet
    **/
    @media screen and (max-width: 768px) {
        table.dataTable > tbody > tr.child {

        }
    }

    /**
      Extra small screen / phone
    **/
    @media screen and (max-width: 480px) {
        table.dataTable > tbody > tr.child {
            span.dtr-title {
                display: block;
                float: none;
                min-width: 0;
                text-align: left;
                margin-bottom: 3px;
            }

            span.dtr-data {
                display: block;
                margin-left: 0;
                text-align: center;
            }

            .btn-block {
                max-width: 400px;
                margin: 5px auto;
            }
        }
    }
}

</style>
