import Vue from 'vue';

Object.assign(Vue.prototype, {
    api: (url) => (process.env.API_SERVER + url)
});

Vue.mixin({
    computed: {

    },
    methods: {

    }
});
