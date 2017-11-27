/**
 * The Vue documentation says that the only way to pass a scope down a child component
 * is to use the property "scopedSlot" in the render function.
 * In the High Order component, we receive:
 *   - $slots That is an object where the keys are the name and the value are a VNode | Array<VNode>
 *   - $scopedSlots That is an object where the keys are the name and the value are a function that returns
 *     a VNode | Array<VNode>
 *  The solution to pass slot down to the child component is to convert $slots into $scopedSlots
 *  Here we simply bind an object like:
 *  {
 *    default: [VNode]
 *  }
 *  to
 *  {
 *    default: () => [VNode]
 *  }
 */
function convertSlotsToScopedSlots(slots) {
  return Object.assign({},
    ...Object.keys(slots).map(k => ({ [k]: () => slots[k] })));
}

export function connect(store) {
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
          scopedSlots: {
            ...this.$scopedSlots,
            ...convertSlotsToScopedSlots(this.$slots)
          },
        },
      );
    },
  });
}
