<template>
    <div v-if="!inline" :class="cls">
        <input type="text" ref="text" @focus="onInputFocus" @blur="onInputBlur" @click="onInputClick" @keydown="onInputKeyDown" :tabIndex="tabIndex" :class="inputCls" :name="name" :value="formatted" :placeholder="placeholder" autocomplete="off" />
        <click-outside v-show="showDatePickerFlag" @outside="onOutsideClick" @inside="onInsideClick" ref="outside">
            <div class="dp-triangle"></div>
            <date-picker ref="datepicker" :cls="datePickerCls" :showOtherMonthDay="showOtherMonthDay" :maxDate="maxDate" :minDate="minDate" :disableDays="disableDays" :disableDates="disableDates" :firstDayOfWeek="firstDayOfWeek" :showWeekDay="showWeek" :showWeekNo="showWeekNo"></date-picker>
        </click-outside>
    </div>
    <div v-else>
        <input type="hidden" :name="name" :value="formatted"/>
        <date-picker ref="picker" :cls="datePickerCls" :showOtherMonthDay="showOtherMonthDay" :maxDate="maxDate" :minDate="minDate" :disableDays="disableDays" :disableDates="disableDates" :firstDayOfWeek="firstDayOfWeek" :showWeekDay="showWeek" :showWeekNo="showWeekNo"></date-picker>
    </div>
</template>

<script>
    import Tether from 'tether';
    import DatePicker from './DatePicker.vue';
    import ClickOutside from './ClickOutside.vue';

    module.exports = {
        name: 'DateField',
        replace : true,
        components: {
            'date-picker': DatePicker,
            'click-outside': ClickOutside
        },
        props : {
            inline: {
                type: Boolean,
                default: false
            },
            cls: {
                type: String,
                default: 'form-group'
            },
            inputCls: {
                type: String,
                default: 'form-control'
            },
            datePickerCls: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: 'dp_' + (+new Date())
            },
            tabIndex: {
                type: String,
                default: '0'
            },
            readOnly: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            displayFormat: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            valueFormat: {
                type: String,
                default: 'YYYY-MM-DD'
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
                showDatePickerFlag: false
            };
        },
        created() {
            this._state_ = {};
        },
        mounted () {
            !this.inline && this.$nextTick(() => {
                this.attachPicker();
            });
        },
        computed : {
            formatted() {
                return 'sb';
            }
        },
        methods : {
            getState(key, def) {
                if(!this._state_)
                    return def;
                let val = this._state_[key];
                return val === undefined ? def : val;
            },
            setState(key, val) {
                this._state_ = this._state_ || {};
                this._state_[key] = val;
            },
            attachPicker() {
                if(this.inline)
                    return;

                document.body.appendChild(this.$refs.outside.$el);

                this.tether = new Tether({
                    target: this.$el,
                    targetAttachment: 'bottom left',
                    targetOffset: '10px 0',
                    element: this.$refs.outside.$el, // 弹出层元素
                    attachment: 'top left', // 弹出层元素
                    constraints: [{
                        to: 'window',
                        attachment: 'together'
                    }],
                    classes: {
                        element: 'dp-box'
                    }
                });
            },
            onInputFocus(e) {
                this.showDatePicker();
            },
            onInputBlur(e) {
                if(!this.getState('open')){
                    this.hideDatePicker();
                    return;
                }

                let timerKey = 'focus_timer';
                let timer = this.getState(timerKey);
                timer && clearTimeout(timer);

                timer = setTimeout(() => {this.$refs.text.focus();}, 0);
                this.setState(timerKey, timer);
            },
            onInputClick(e) {
                this.showDatePicker();
            },
            onInputKeyDown(e) {
                let key = e.key;

                switch(key) {
                    case 'Tab': {
                        this.hideDatePicker();
                    }
                    case 'Enter': {
                        this.hideDatePicker();
                    }
                    case 'Escape': {
                        this.hideDatePicker();
                    }
                    case 'ArrowLeft': {
                        this.hideDatePicker();
                    }
                    case 'ArrowRight': {
                        this.hideDatePicker();
                    }
                    case 'ArrowUp': {
                        this.hideDatePicker();
                    }
                    case 'ArrowDown': {
                        this.hideDatePicker();
                    }
                    case 'PageUp': {
                        this.hideDatePicker();
                    }
                    case 'PageDown': {
                        this.hideDatePicker();
                    }
                    case 'Home': {
                        this.hideDatePicker();
                    }
                    case 'End': {
                        this.hideDatePicker();
                    }
                }
            },
            onInsideClick(e) {
                this.setState('open', true);
                console.log(this.tether)
                this.tether.disable();
                this.tether.enable();
                this.tether.position();
            },
            onOutsideClick(e) {
                if(this.$el.contains(e.target))
                    return;

                this.hideDatePicker();
            },
            showDatePicker() {
                this.setState('open', true);

                this.showDatePickerFlag = true;

                this.tether.position();
            },
            hideDatePicker() {
                this.setState('open', false);

                this.showDatePickerFlag = false;
            }
        },
        beforeDestroy() {
            this.tether && this.tether.destroy();

            if(!this.inline)
                this.$el.appendChild(this.$refs.outside.$el);
        }
    };
</script>

<style lang="less">

.dp-box {
    position: absolute;
    z-index: 1000;

    &.tether-element-attached-bottom {
        margin-top: -20px;
    }

    .dp-triangle {
        box-sizing: content-box;
        position: absolute;
        border: 8px solid transparent;
        height: 0;
        width: 1px;

        &:before {
            content: '';
            box-sizing: content-box;
            position: absolute;
            border: 8px solid transparent;
            height: 0;
            width: 1px;
            z-index: -1;
        }
    }

    /**vertical: bottom left corner**/
    &.tether-element-attached-bottom.tether-element-attached-left {
        .dp-triangle {
            border-top-color: #fff;
            top: 100%;
            left: 20px;
            margin-top: -1px;

            &:before {
                border-top-color: #aeaeae;
                left: -8px;
                top: -7px;
            }
        }
    }

    /**vertical: bottom right corner**/
    &.tether-element-attached-bottom.tether-element-attached-right {
        .dp-triangle {
            border-top-color: #fff;
            top: 100%;
            right: 20px;
            margin-top: -1px;

            &:before {
                border-top-color: #aeaeae;
                left: -8px;
                top: -7px;
            }
        }
    }

    /**vertical: top left corner**/
    &.tether-element-attached-top.tether-element-attached-left {
        .dp-triangle {
            border-bottom-color: #fff;
            top: -15px;
            left: 20px;

            &:before {
                border-bottom-color: #aeaeae;
                left: -8px;
                top: -9px;
            }
        }
    }

    /**vertical: top right corner**/
    &.tether-element-attached-top.tether-element-attached-right {
        .dp-triangle {
            border-bottom-color: #fff;
            top: -15px;
            right: 20px;

            &:before {
                border-bottom-color: #aeaeae;
                left: -8px;
                top: -9px;
            }
        }
    }
}

</style>
