<template>
    <div class="user-area">
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

        },
        methods: {
        }
    }

</script>

<style lang="less">

</style>
