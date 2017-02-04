<script>
    module.exports = {
        name: 'ClickOutside',
        props: {
            preventDefault: {
                type: Boolean,
                default: true
            },
            stopPropagation: {
                type: Boolean,
                default: false
            }
        },
        mounted () {
            document.addEventListener('mousedown', this.onOutsideMousedown);
            document.addEventListener('touchstart', this.onOutsideMousedown);
        },
        render: function (createElement) {
            return createElement(
                'div',
                {
                    ref: 'container'
                },
                this.$slots.default
            );
        },
        methods : {
            onOutsideMousedown(e) {
                let el = this.$refs.container;

                if(!el)
                    return;

                if (!el.contains(e.target)) {
                    this.$emit('outside', e);
                    return;
                }

                // if(this.preventDefault)
                //     e.preventDefault();

                // if(this.stopPropagation)
                //     e.stopPropagation();

                this.$emit('inside', e);
            }
        },
        beforeDestroy() {
            document.removeEventListener('mousedown', this.onOutsideMousedown, true);
            document.removeEventListener('touchstart', this.onOutsideMousedown, true);
        }
    };
</script>

