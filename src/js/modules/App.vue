<template>
    <router-view v-if="login" keep-alive></router-view>
    <div v-else class="user-area">
        <router-view keep-alive></router-view>
    </div>
</template>

<script>
    module.exports = {
        name : 'App',
        replace: false,
        data: function(){
            return {
            };
        },
        mounted: function() {
        },
        watch: {
        },
        computed: {
            login: function(){
                return /\/login/.test(this.$route.path);
            }
        },
        methods: {
        }
    }

</script>

<style lang="less">

</style>
