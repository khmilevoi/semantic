export const orders = {
  DIV: 1,
  MULTI: 1,
  MOD: 1,
  PLUS: 2,
  MINUS: 2,
  EQUAL: 3,
  NOT_EQUAL: 3,
  AND: 4,
  OR: 4,
  STRICT_LESS_THAN: 5,
  LESS_THAN: 5,
  STRICT_GREATER_THAN: 5,
  GREATER_THAN: 5,
};

export const MAX_ORDER = Math.max(...Object.values(orders));
