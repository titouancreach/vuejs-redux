
const defaultMapStateToProps = () => ({});
const defaultMapDispatchToProps = () => ({});

export function connect(store) {
  return (mapStateToProps, mapDispatchToProps) => children => {

    const validMapStateToProps = mapStateToProps || defaultMapStateToProps;
    const validDispatchToProps = mapDispatchToProps || defaultMapDispatchToProps;

    return {

      data: () => ({
        state: {
          ...validMapStateToProps(store.getState()),
        },
        actions: {
          ...validDispatchToProps(store.dispatch),
        },
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
        return h(
          children, {
            attrs: {
              ...this.actions,
              ...this.state,
              ...this.$attrs,
            },
            scopedSlots: {
            ...this.$scopedSlots,
            },
          }, Object.values(this.$slots),
        );
      },
    }
  };
}
