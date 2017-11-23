
export default function connect(store) {
  return (mapStateToProps, mapDispatchToProps) => children => ({

    data: () => ({
      state: {
        ...mapStateToProps(store.getState()),
      },

      actions: {
        ...mapDispatchToProps(store.dispatch),
      },
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
      return h(
        children, {
          attrs: {
            ...this.actions,
            ...this.state,
            ...this.$attrs,
          },
        },
      );
    },
  });
}
