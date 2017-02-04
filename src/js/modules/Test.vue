<template>
    <div class="row">
        <router-link to="/hello" path="/hello">to hello</router-link>
        </br>
        <router-link to="/about" path="/about">to about</router-link>

        <h3 style="margin-top:300px;">it is test page</h3>
        <date-field></date-field>
    </div>
</template>

<script>
    import DateField from 'components/DateField.vue';

    module.exports = {
        name: 'Test',
        components: {
            'date-field': DateField
        },
        data: function(){
            return {
            };
        },
        mounted: function() {
        }
    }
</script>
