<template>
    <div class="user-area">
        about</br>
        <router-link to="/hello" path="/hello">to hello</router-link>
        </br>
        <router-link to="/" path="/">to index</router-link>
    </div>
</template>

<script>
    module.exports = {
        name : 'About',
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
    .user-area {
        text-align: center;
    }
</style>
