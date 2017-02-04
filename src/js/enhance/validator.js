import VueValidate from 'vee-validate';
import VueValidateLanguage from 'babel!vee-validate/dist/locale/zh_CN.js';

Vue.use(VueValidate, {
    locale: 'cn',
    dictionary: {
        cn: {
            messages: VueValidateLanguage
        },
        attributes: {}
    }
});

// fix validate
let _oldGetLocalizedParams = VueValidate.Validator.prototype._getLocalizedParams;
VueValidate.Validator.prototype._getLocalizedParams = function(rule) {
    var result = _oldGetLocalizedParams.apply(this, arguments);
    if (~['after', 'before', 'confirmed'].indexOf(rule.name) && rule.params && rule.params[0]) {
        return result[0] === rule.params[0] ? [this.$fields[rule.params[0]].name] : result;
    }

    return result;
};

VueValidate.Validator.prototype.clearScopeErrors = function(scope) {
    this.errorBag.clear(scope);
};

VueValidate.Validator.prototype.clearErrors = function(fields) {
    // clear all
    if (!fields)
        return this.errorBag.clear();

    if (typeof fields == 'string')
        fields = fields.split(',');

    for (let i = 0, l = fields.length; i < l; i++)
        this.errorBag.remove(fields[i])
};

const GT = {
    messages: {
        en: (field, args) => {
            return ` ${field} must greater than {args}.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须大于${args}.`;
        }
    },
    validate(value, args) {
        return !isNaN(value) && value > +args[0];
    }
};

const GTE = {
    messages: {
        en: (field, args) => {
            return ` ${field} must greater than or equal to ${args}.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须不能小于 ${args}.`;
        }
    },
    validate(value, args) {
        return !isNaN(value) && value >= +args[0];
    }
};

const LT = {
    messages: {
        en: (field, args) => {
            return ` ${field} must less than ${args}.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须小于 ${args}.`;
        }
    },
    validate(value, args) {
        return !isNaN(value) && value < +args[0];
    }
};

const LTE = {
    messages: {
        en: (field, args) => {
            return ` ${field} must less than or equal to ${args}.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须不能大于 ${args}.`;
        }
    },
    validate(value, args) {
        return !isNaN(value) && value <= +args[0];
    }
};

// 名称
const Name = {
    messages: {
        en: (field, args) => {
            return ` The ${field} may contain alpha-numeric characters as well as dashes and underscores.`;
        },
        cn: (field, args) => {
            return ` ${field} 能够包含字母数字字符，包括破折号、下划线`;
        }
    },
    validate(value, args) {
        return /^[a-zA-Z0-9_-]*$/.test(value);
    }
};

// 用户名称
const User = {
    messages: {
        en: (field, args) => {
            return ` The ${field} may contain alpha-numeric characters as well as dashes and underscores.`;
        },
        cn: (field, args) => {
            return ` ${field} 能够包含字母数字字符，包括破折号、下划线`;
        }
    },
    validate(value, args) {
        return /^[a-zA-Z0-9_-]*$/.test(value);
    }
};

// 数据库用户名称
const DBUser = {
    messages: {
        en: (field, args) => {
            return ` ${field} must not equal to root and test.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须不能为root、test`;
        }
    },
    validate(value, args) {
        return ['root', 'test'].indexOf(value) != -1 ? false : true;
    }
};

// 数据库表名称
const DBName = {
    messages: {
        en: (field, args) => {
            return ` ${field} must not equal to Database keep word such as root and mysql.`;
        },
        cn: (field, args) => {
            return ` ${field} 必须不能为数据库保留字，如root、mysql等`;
        }
    },
    validate(value, args) {
        return ['root', 'mysql', 'information_schema', 'performance_schema'].indexOf(value) != -1 ? false : true;
    }
};

VueValidate.Validator.extend('gt', GT);
VueValidate.Validator.extend('gte', GTE);
VueValidate.Validator.extend('lt', LT);
VueValidate.Validator.extend('lte', LTE);

VueValidate.Validator.extend('name', Name);
VueValidate.Validator.extend('user', User);
VueValidate.Validator.extend('dbuser', DBUser);
VueValidate.Validator.extend('dbname', DBName);
