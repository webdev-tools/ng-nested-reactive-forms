export function cloneDeep(target: any | any[]): any {
  if (!target || typeof target !== 'object') {
    return target;
  }

  if (target instanceof Date) {
    return new Date(target);
  }

  if (Array.isArray(target)) {
    return target.map(cloneDeep);
  }

  return Object.keys(target).reduce(
    (props, key) => {
      props[key] = cloneDeep(target[key]);
      return props;
    },
    {},
  );
}
