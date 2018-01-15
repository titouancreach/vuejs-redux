'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var index = {

  props: {
    mapDispatchToProps: {
      required: false,
      default: () => ({}),
      type: Function
    },

    mapStateToProps: {
      required: false,
      default: () => ({}),
      type: Function
    },

    store: {
      required: true,
      type: Object
    }
  },

  data: ctx => ({
    state: ctx.store.getState()
  }),

  created() {
    this.unsubscribe = this.store.subscribe(() => {
      this.state = this.store.getState();
    });
  },

  destroyed() {
    this.unsubscribe();
  },

  render() {
    const nodes = this.$scopedSlots.default(_extends({}, this.mapDispatchToProps(this.store.dispatch), this.mapStateToProps(this.state)));
    if (Array.isArray(nodes)) {
      return nodes[0];
    } else {
      return nodes;
    }
  }
};

module.exports = index;
