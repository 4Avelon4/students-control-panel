// eslint-disable-next-line import/prefer-default-export
export const view = new Proxy(
  {
    selected: null,
  },
  {
    set(obj, prop, newval) {
      const oldval = obj[prop];

      if (prop === 'selected') {
        if (oldval) {
          oldval.classList.remove('row--active');
        }
        if (newval) {
          newval.classList.add('row--active');
        }
      }

      obj[prop] = newval;

      return true;
    },
  }
);
