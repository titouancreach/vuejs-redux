'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var index = {
  props: {
    mapDispatchToProps: {
      required: false,
      default: function _default() {
        return {};
      },
      type: Function
    },
    mapStateToProps: {
      required: false,
      default: function _default() {
        return {};
      },
      type: Function
    },
    store: {
      required: true,
      type: Object
    }
  },
  data: function data(ctx) {
    return {
      state: ctx.store.getState()
    };
  },
  created: function created() {
    var _this = this;

    this.unsubscribe = this.store.subscribe(function () {
      _this.state = _this.store.getState();
    });
  },
  destroyed: function destroyed() {
    this.unsubscribe();
  },
  render: function render() {
    var nodes = this.$scopedSlots.default(_objectSpread({}, this.mapDispatchToProps(this.store.dispatch), this.mapStateToProps(this.state)));

    if (Array.isArray(nodes)) {
      return nodes[0];
    } else {
      return nodes;
    }
  }
};

module.exports = index;
