'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const defaultMapStateToProps = () => ({});
const defaultMapDispatchToProps = () => ({});

function connect(store) {
  return (mapStateToProps, mapDispatchToProps) => children => {

    const validMapStateToProps = mapStateToProps || defaultMapStateToProps;
    const validDispatchToProps = mapDispatchToProps || defaultMapDispatchToProps;

    return {

      data: () => ({
        state: _extends({}, validMapStateToProps(store.getState())),
        actions: _extends({}, validDispatchToProps(store.dispatch))
      }),

      created() {
        this.unsubscribe = store.subscribe(() => {
          this.state = validMapStateToProps(store.getState());
        });
      },

      destroyed() {
        this.unsubscribe();
      },

      render(h) {
        return h(children, {
          attrs: _extends({}, this.actions, this.state, this.$attrs),
          scopedSlots: _extends({}, this.$scopedSlots)
        }, Object.values(this.$slots));
      }
    };
  };
}

exports.connect = connect;
