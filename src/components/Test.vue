<template>
  <div class="test">{{d}}</div>
  <div class="time">{{time|fromNow}} ago</div>
  <div class="x">{{x}}</div>
</template>

<script>
import store from '../store/index'

var testResource = store.getResource('test');

module.exports = {
    name: 'Test',
    props: {
      x: String
    },
    data: function () {
        return {
            d: 'test',
            time: new Date() / 1000 - Math.floor(Math.random() * 500000)
        }
    },
    ready: function () {
        testResource.get({ id: 1 }).then((res) => {
            this.d = res.data.data;
        }, (res) => {
            this.d = 'error';
        });
    }
};
</script>

<style lang="less">
@fz: 20px;
.test {
  color: red;
  font-size: @fz;
}
body {
    background: url('../img/test.jpg') no-repeat;
    background-size: cover;
}
</style>