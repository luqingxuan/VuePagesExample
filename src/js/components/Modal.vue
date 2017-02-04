<template>
    <div class="hidden">
        <slot name="head"></slot>
        <slot name="body"></slot>
    </div>
</template>

<script>
    module.exports = {
        name : 'Modal',
        replace: false,
        props: {
            show: {
                required: true,
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: undefined
            },
            width: {
                type: String,
                default: 'auto'
            },
            height: {
                type: String,
                default: 'auto'
            },
            maxmin: {
                type: String,
                default: 'false'
            },
            shade: {
                type: String,
                default: '0.3'
            },
            shadeClose: {
                type: String,
                default: 'true'
            }
        },
        data: function(){
            return {
            };
        },
        watch: {
            show: function(val,oldVal) {
                val ? this.showModal() : this.hideModal();
            }
        },
        mounted: function() {
            this._built_ = false;

            this.show && this.showModal();
        },
        methods: {
            showModal: function() {
                this.createModal();
            },
            hideModal: function() {
                this.closeModal();
            },
            closeModal: function() {
                this.destroyModal();
            },
            createModal: function() {
                if(this._built_ !== false)
                    return;

                if(Device.mobile()) {
                    let bd = document.body;
                    this.setState('scrollTop', bd.scrollTop);
                    $(bd).addClass('modal-mobile');
                }

                let options = {
                    content: '~',
                    type: 1,
                    maxmin: Boolean(this.maxmin),
                    shade: +this.shade,
                    shadeClose: Boolean(this.shadeClose),
                    area: [this.width, this.height],
                };

                options.cancel = () => {this.destroyModal();};

                this._built_ = layer.open(options);

                //点遮罩关闭
                let $shade = $('#layui-layer-shade'+ this._built_).off('click');
                options.shadeClose === false && $shade.on('click', () => {this.destroyModal();});

                this.$nextTick(() => {
                    this.transDomToModal();

                    this.$emit('show');
                });
            },
            destroyModal: function() {
                if(this._built_ === false)
                    return;

                if(Device.mobile()) {
                    let bd = document.body;
                    $(bd).removeClass('modal-mobile');
                    bd.scrollTop = this.getState('scrollTop');
                }

                this.transDomFromModal();

                layer.close(this._built_);

                this._built_ = false;

                this.$emit('hide');
            },
            transDomToModal: function() {
                let $el = $(this.$el);

                let layerId = this._built_;
                let $layer = $(`#layui-layer${layerId}`).addClass('vue-modal');

                let head = this.$slots.head;
                head && $(head[0].elm).appendTo($layer.find('.layui-layer-title').html(''));

                let body = this.$slots.body;
                body && $(body[0].elm).appendTo($layer.find('.layui-layer-content').html(''));
            },
            transDomFromModal: function() {
                let $el = $(this.$el);

                let layerId = this._built_;
                let $layer = $(`#layui-layer${layerId}`).removeClass('vue-modal');

                let $head = $layer.find('.layui-layer-title').children();
                $head.length && $head.appendTo($el);

                let $body = $layer.find('.layui-layer-content').children();
                $body.length && $body.appendTo($el);
            }
        },
        beforeDestroy() {
            this.destroyModal();
        }
    }

</script>
