<template>
    <div :class="['dp', cls ? cls : '']">
        <div class="dp-nav-cnt">
            <nav v-if="showYear" class="dp-nav">
                <span class="fa fa-hand-o-left dp-nav-left" @click="onNavYearClick($event, -1);"></span>
                <div class="dp-nav-text" @click="onNavYearTitleClick($event);">{{navYear}}</div>
                <span class="fa fa-hand-o-right dp-nav-right" @click="onNavYearClick($event, 1);"></span>
            </nav>

            <nav v-if="showMonth" class="dp-nav">
                <span class="fa fa-hand-o-left dp-nav-left" @click="onNavMonthClick($event, -1);"></span>
                <div class="dp-nav-text" @click="onNavMonthTitleClick($event);">{{navMonth}}</div>
                <span class="fa fa-hand-o-right dp-nav-right" @click="onNavMonthClick($event, 1);"></span>
            </nav>

            <nav v-if="showDay" class="dp-nav">
                <span class="fa fa-hand-o-left dp-nav-left" @click="onNavDayClick($event, -1);"></span>
                <div class="dp-nav-text" @click="onNavDayTitleClick($event);">{{navDay}}</div>
                <span class="fa fa-hand-o-right dp-nav-right" @click="onNavDayClick($event, 1);"></span>
            </nav>
        </div>
        <div class="dp-view-cnt">
            <table v-if="showYear" cellspacing="0" cellpadding="0" width="100%" class="dp-year">
                <tbody>
                    <template v-for="i in 3">
                        <tr v-if="i !== 1" class="dp-row-space">
                            <td colspan="4"></td>
                        </tr>

                        <tr :class="[i === 1 ? 'row-first' : (i === 3 ? 'row-last' : '')]">
                            <td v-for="j in 4" @click="onYearClick($event, (i -1 )*4 + (j-1));" :class="yearMeta[(i -1 )*4 + (j-1)].cls">
                                <span class="dp-cell-text">{{yearMeta[(i -1 )*4 + (j-1)].text}}</span>
                            </td>
                        </tr>
                    </template>
                    <tr class="dp-row-space">
                        <td colspan="4"></td>
                    </tr>
                    <tr class="dp-row-space">
                        <td colspan="4"></td>
                    </tr>
                </tbody>
            </table>

            <table v-if="showMonth" cellspacing="0" cellpadding="0" width="100%" class="dp-month">
                <tbody>
                    <template v-for="i in 3">
                        <tr v-if="i !== 1" class="dp-row-space">
                            <td colspan="4"></td>
                        </tr>

                        <tr :class="[i === 1 ? 'row-first' : (i === 3 ? 'row-last' : '')]">
                            <td v-for="j in 4" @click="onMonthClick($event, (i -1 )*4 + (j-1));" :class="monthMeta[(i -1 )*4 + (j-1)].cls">
                                <span class="dp-cell-text">{{monthMeta[(i -1 )*4 + (j-1)].text}}</span>
                            </td>
                        </tr>
                    </template>
                    <tr class="dp-row-space">
                        <td colspan="4"></td>
                    </tr>
                    <tr class="dp-row-space">
                        <td colspan="4"></td>
                    </tr>
                </tbody>
            </table>

           <table v-if="showDay" cellspacing="0" cellpadding="0" width="100%" class="dp-day">
                <tbody>
                    <tr v-if="showWeekDay" class="dp-row-weekDay">
                        <td v-if="showWeekNo" class="dp-cell-weekNo">周</td>
                        <td v-for="i in 7" class="dp-cell-weekDay">{{['日', '一', '二', '三', '四', '五', '六'][(firstDayOfWeek + i - 1)%7]}}</td>
                    </tr>
                    <tr v-if="showWeekDay" class="dp-row-space">
                        <td :colspan="showWeekNo ? 8 : 7"></td>
                    </tr>
                    <template v-for="i in 6">
                        <tr v-if="i !== 1" class="dp-row-space">
                            <td :colspan="showWeekNo ? 8 : 7"></td>
                        </tr>

                        <tr :class="[i === 1 ? 'row-first' : (i === 6 ? 'row-last' : '')]">
                            <td v-if="showWeekNo" class="dp-cell-weekNo">{{getWeekNo(dayMeta[(i - 1)*7].date)}}</td>
                            <td v-for="j in 7" @click="onDayClick($event, (i -1 )*7 + (j-1));" :class="dayMeta[(i -1 )*7 + (j-1)].cls">
                                <span class="dp-cell-text">{{dayMeta[(i -1 )*7 + (j-1)].text}}</span>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    module.exports = {
        name: 'DatePicker',
        replace : true,
        props : {
            cls: {
                type: String,
                default: ''
            },
            showOtherMonthDay: {
                type: Boolean,
                default: true
            },
            minDate: {
                type: String,
                default: ''
            },
            maxDate: {
                type: String,
                default: ''
            },
            disableDays: {
                type: Array,
                default: () => []
            },
            disableDates: {
                type: Array,
                default: () => []
            },
            firstDayOfWeek: {
                type: Number,
                default: 0
            },
            showWeekDay: {
                type: Boolean,
                default: true
            },
            showWeekNo: {
                type: Boolean,
                default: true
            }
        },
        data : function() {
            return {
                sYear: 0,
                sMonth: 0,
                sDay: 0,
                cYear: 0,
                cMonth: 0,
                cDay: 0,
                showYear: false,
                showMonth: false,
                showDay: true
            };
        },
        created() {
            let date = new Date();

            this.sYear = date.getFullYear();
            this.sMonth = date.getMonth();
            this.sDay = date.getDate();

            this.cYear = this.sYear;
            this.cMonth = this.sMonth;
            this.cDay = this.sDay;
        },
        computed : {
            dayMeta() {
                let days = [];

                let firstDay = this.firstDayOfWeek;

                let current = new Date();
                let currentYearMonth = +('' + current.getFullYear() + this.rpad(current.getMonth() + 1));

                let totalMonthDays = new Date(this.sYear, this.sMonth + 1, 0).getDate();
                let firstMonthDay = new Date(this.sYear, this.sMonth, 1).getDay();
                let lastMonthDay = new Date(this.sYear, this.sMonth, totalMonthDays).getDay();

                let daysFromPevMonth = firstMonthDay - firstDay;
                let daysFromNextMonth = 6 - lastMonthDay + firstDay;
                daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
                daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

                // 一定要渲染42个日期
                let delta = 42 - (totalMonthDays + daysFromNextMonth + daysFromPevMonth);

                // 计算日期
                for (let i = -daysFromPevMonth + 1, max = totalMonthDays + daysFromNextMonth + delta; i <= max; i++) {
                    let cell = new Date(this.sYear, this.sMonth, i);

                    let meta = {
                        date: cell,
                        weekNo: 0,
                        text: cell.getDate(),
                        cls: 'dp-cell dp-cell-day',
                        isPrevious: false,
                        isNext: false,
                        isSelected: false,
                        isCurrent: false,
                        isDisabled: false,
                        isVisible: true
                    };

                    let cellYearMonth = +('' + cell.getFullYear() + this.rpad(cell.getMonth() + 1));
                    let targetYearMonth = +('' + this.sYear + this.rpad(this.sMonth + 1));

                    if(targetYearMonth > cellYearMonth)
                        meta.isPrevious = true;
                    else if(targetYearMonth < cellYearMonth)
                        meta.isNext = true;
                    else if(cell.getDate() === this.sDay)
                        meta.isSelected = true;

                    if(cellYearMonth === currentYearMonth && cell.getDate() === current.getDate())
                        meta.isCurrent =  true;

                    // previous month
                    if(meta.isPrevious)
                        meta.cls += ' previous';

                    // next month
                    if(meta.isNext)
                        meta.cls += ' next';

                    // current day
                    if(meta.isCurrent)
                        meta.cls += ' current';

                    // selected day
                    if(meta.isSelected)
                        meta.cls += ' selected';

                    // disabled day
                    if(meta.isDisabled)
                        meta.cls += ' disabled';

                    if(!this.showOtherMonthDay && (meta.isNext || meta.isPrevious)) {
                        meta.isVisible = false;
                        meta.cls += ' dp-cell-unvisible';
                    }

                    days.push(meta);
                }

                return days;
            },
            monthMeta() {
                let year = this.cYear || this.sYear;

                let months = [];

                let current = new Date();
                let currentYearMonth = +('' + current.getFullYear() + this.rpad(current.getMonth() + 1));

                let lang = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'];
                for(let i =0; i < 12; i++) {
                    let cell = new Date(year, i, 1);

                    let meta = {
                        date: cell,
                        text: lang[i],
                        cls: 'dp-cell dp-cell-month',
                        isDisabled: false,
                        isSelected: false,
                        isCurrent: false
                    };

                    let cellYearMonth = +('' + cell.getFullYear() + this.rpad(cell.getMonth() + 1));
                    let targetYearMonth = +('' + year + this.rpad(this.sMonth + 1));

                    if(cellYearMonth === targetYearMonth)
                        meta.isSelected =  true;

                    if(cellYearMonth === currentYearMonth)
                        meta.isCurrent =  true;

                    // current month
                    if(meta.isCurrent)
                        meta.cls += ' current';

                    // selected month
                    if(meta.isSelected)
                        meta.cls += ' selected';

                    // disabled month
                    if(meta.isDisabled)
                        meta.cls += ' disabled';

                    months.push(meta);
                }

                return  months;
            },
            yearMeta() {
                let years = [];

                let current = new Date();
                let currentYear = current.getFullYear();

                for(let i =0; i < 12; i++) {
                    let year = this.cYear + (i - 6);
                    let cell = new Date(year, 0, 1);

                    let meta = {
                        date: cell,
                        text: year,
                        cls: 'dp-cell dp-cell-year',
                        isDisabled: false,
                        isSelected: false,
                        isCurrent: false
                    };

                    let cellYear = cell.getFullYear();
                    let targetYear = this.sYear;

                    if(cellYear === targetYear)
                        meta.isSelected =  true;

                    if(cellYear === currentYear)
                        meta.isCurrent =  true;

                    // current month
                    if(meta.isCurrent)
                        meta.cls += ' current';

                    // selected month
                    if(meta.isSelected)
                        meta.cls += ' selected';

                    // disabled month
                    if(meta.isDisabled)
                        meta.cls += ' disabled';

                    years.push(meta);
                }

                return  years;
            },
            navYear() {
                let year = this.cYear || this.sYear;
                return (year - 6) + ' - ' + (year + 5);
            },
            navMonth() {
                return this.cYear || this.sYear;
            },
            navDay() {
                let monthMeta = this.monthMeta;
                for(let i = 0, l = monthMeta.length; i < l; i++)
                    if(monthMeta[i].isSelected)
                        return this.monthMeta[i].text + '，' + this.sYear;

                return this.sYear;
            }
        },
        methods : {
            rpad(v) {
                return v > 9 ? v : '0' + v;
            },
            getWeekNo(date) {
                return moment(date).week();
            },
            onDayClick($event, index) {
                let meta = this.dayMeta[index];
                let date = meta.date;

                if(meta.disabled || !meta.isVisible)
                    return;

                if(meta.isPrevious || meta.isNext) {
                    this.sYear = date.getFullYear();
                    this.sMonth = date.getMonth();
                }

                this.sDay = date.getDate();
            },
            onMonthClick($event, index) {
                let meta = this.monthMeta[index];
                let date = meta.date;

                if(meta.disabled)
                    return;

                this.sMonth = date.getMonth();

                this.showYear = false;
                this.showMonth = false;
                this.showDay = true;
            },
            onYearClick($event, index) {
                let meta = this.yearMeta[index];
                let date = meta.date;

                if(meta.disabled)
                    return;

                this.sYear = this.cYear = date.getFullYear();

                this.showYear = false;
                this.showMonth = true;
                this.showDay = false;
            },
            onNavYearTitleClick($event) {
                this.cYear = this.sYear;

                this.showYear = false;
                this.showMonth = false;
                this.showDay = true;
            },
            onNavMonthTitleClick($event) {
                this.showYear = true;
                this.showDay = false;
                this.showMonth = false;
            },
            onNavDayTitleClick($event) {
                this.showYear = false;
                this.showMonth = true;
                this.showDay = false;
            },
            onNavYearClick($event, delta) {
                this.cYear += delta * 12;
            },
            onNavMonthClick($event, delta) {
                let year = this.cYear || this.sYear;
                year += delta;

                this.cYear = year;
            },
            onNavDayClick($event, delta) {
                let date = new Date(this.sYear, this.sMonth + 1*delta, this.sDay);

                this.sYear = date.getFullYear();
                this.sMonth = date.getMonth();
                this.sDay = date.getDate();
            }
        }
    };
</script>

<style lang="less">
.dp {
    background-color: white;
    border: 1px solid #aeaeae;
    padding: 5px 0;
    width: 250px;

    .dp-nav {
        font-size: 16px;
        padding-bottom: 5px;
        position: relative;
    }

    .dp-nav-text {
        margin: 0 30px;
        cursor: pointer;
        text-align: center;
    }

    .dp-nav-left {
        position: absolute;
        left: 10px;
        top: 2px;
        color: blue;
        cursor: pointer;
    }

    .dp-nav-right {
        position: absolute;
        right: 10px;
        top: 2px;
        color: blue;
        cursor: pointer;
    }

    .dp-row-space td {
        padding: 0.3em 0;
    }

    .dp-cell-weekDay {
        text-align: center;
    }

    .dp-cell-weekNo {
        font-weight: bold;
        text-align: center;
    }

    .dp-cell-text {
        text-align: center;
        width: 1.5em;
        height: 1.5em;
        line-height: 1.5em;
        display: inline-block;
    }

    .dp-day {
        .previous, .next {
            color: #999;
        }
    }

    .dp-month {
        .dp-row-space td {
            padding: 0.45em 0;
        }

        .dp-cell-text {
            width: 3em;
            height: 3em;
            line-height: 3em;
        }

    }

    .dp-year {
        .dp-row-space td {
            padding: 0.45em 0;
        }

        .dp-cell-text {
            width: 3em;
            height: 3em;
            line-height: 3em;
        }

    }

    .dp-cell-day, .dp-cell-month, .dp-cell-year{
        cursor: pointer;
        text-align: center;

        &.current {
            color: blue;
        }

        &.selected {
            cursor: default;
            color: white;

            .dp-cell-text {
                border-radius: 50%;
                background: blue;
            }
        }

    }

    .dp-cell-unvisible {
        cursor: default;

        .dp-cell-text {
            color: transparent;
            background-color: transparent;
        }
    }

    .disabled {
        cursor: default;
    }
}
</style>
