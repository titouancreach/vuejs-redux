'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function connect(store) {
  return (mapStateToProps, mapDispatchToProps) => children => ({

    data: () => ({
      state: _extends({}, mapStateToProps(store.getState())),

      actions: _extends({}, mapDispatchToProps(store.dispatch))
    }),

    created() {
      this.unsubscribe = store.subscribe(() => {
        this.state = mapStateToProps(store.getState());
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
  });
}

exports.connect = connect;
