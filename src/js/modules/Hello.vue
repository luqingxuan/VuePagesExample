<template>
    <div class="user-area">
        hello</br>
        <router-link to="/about" path="/about">to about</router-link>
        </br>
        <router-link to="/" path="/">to index</router-link>
    </div>
</template>

<script>
    module.exports = {
        name : 'Hello',
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
