import {
    Mask
} from 'components/Modal';

Object.assign(Vue.prototype, {
    api: (url) => (process.env.API_SERVER + url),
    mask: (options) => Mask(options),
    unmask: () => Mask(false),
    formatDate: (value, formater) => {
        let m = moment(value);
        return m.isValid() ? m.format(formater || 'YYYY-MM-DD') : '';
    },
    formatNumber: (value, precision = 2) => {
        if (value === undefined || value === null || value === '')
            return '';

        let opts = precision;
        if (typeof opts == 'number')
            opts = {
                precision: precision
            };

        return Accounting.formatNumber(value, opts);
    },
    formatMoney: (value, precision = 2) => {
        if (value === undefined || value === null || value === '')
            return '';

        let opts = precision;
        if (typeof opts == 'number')
            opts = {
                precision: precision
            };

        return Accounting.formatMoney(value, opts);
    },
    formatCurrency: (value, precision = 2) => {
        return this.formatMoney(value, precision);
    }
});

Vue.mixin({
    computed: {
        lastActiveUrl: function() {
            return this.$store.state.lastActiveUrl;
        }
    },
    methods: {
        getState: function(key, def) {
            this._state_ = this._state_ || {};
            let val = this._state_[key];
            return val === undefined ? def : val;
        },
        setState: function(key, val) {
            this._state_ = this._state_ || {};
            this._state_[key] = val;
        },
        clearState: function() {
            this._state_ = null;
        },
        back: function(backup) {
            let path = this.lastActiveUrl;
            if (path === '/' && backup)
                path = backup;

            this.redirectTo(path);
        },
        redirectTo: function(path, query = {}) {
            this.$router.push({
                path: path,
                query: query
            })
        }
    }
});
