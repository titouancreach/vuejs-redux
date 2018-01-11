export default {

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

  data: (ctx) => ({
    state: ctx.store.getState(),
    
    actions: {
      ...ctx.mapDispatchToProps(ctx.store.dispatch),
    },
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
    const nodes = this.$scopedSlots.default({...this.actions, ...this.mapStateToProps(this.state)});
    if (Array.isArray(nodes)) {
      return nodes[0];
    } else {
      return nodes;
    }
  }
};
