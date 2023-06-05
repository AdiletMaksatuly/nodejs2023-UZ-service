export const removeProperty = <
  Obj extends Record<Prop, unknown>,
  Prop extends keyof Obj,
>(
  obj: Obj,
  prop: Prop,
): Omit<Obj, Prop> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [prop]: omit, ...rest } = obj;

  return rest;
};
