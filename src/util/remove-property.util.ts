export const removeProperty = <
  Obj extends Record<Prop, unknown>,
  Prop extends keyof Obj,
>(
  obj: Obj,
  prop: Prop,
): Omit<Obj, Prop> => {
  const { [prop]: omit, ...rest } = obj;

  return rest;
};
