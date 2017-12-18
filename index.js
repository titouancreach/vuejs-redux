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
    state: {
      ...ctx.mapStateToProps(ctx.store.getState()),
    },
    actions: {
      ...ctx.mapDispatchToProps(ctx.store.dispatch),
    },
  }),

  created() {
    this.unsubscribe = this.store.subscribe(() => {
      this.state = this.mapStateToProps(this.store.getState());
    });
  },

  destroyed() {
    this.unsubscribe();
  },

  render() {
    return this.$scopedSlots.default({...this.actions, ...this.state})[0];
  }
};
