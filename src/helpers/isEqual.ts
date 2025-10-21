// Тип универсального объекта
export type PlainObject<T = unknown> = { [k: string]: T };

// Проверка на plain-object
export const isPlainObject = (value: unknown): value is PlainObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
};

// Проверка на массив
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

// Проверка: plain-object или массив
export const isArrayOrObject = (
  value: unknown
): value is PlainObject | unknown[] => {
  return isPlainObject(value) || isArray(value);
};

// === ГЛУБОКОЕ СРАВНЕНИЕ ===
export const isEqual = (lhs: unknown, rhs: unknown): boolean => {
  // Сравнение массивов
  if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) return false;
    for (let i = 0; i < lhs.length; i++) {
      if (!isEqual(lhs[i], rhs[i])) return false;
    }
    return true;
  }

  // Сравнение plain-object
  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);
    if (lhsKeys.length !== rhsKeys.length) return false;
    for (const key of lhsKeys) {
      if (!rhsKeys.includes(key)) return false;
      if (!isEqual(lhs[key], rhs[key])) return false;
    }
    return true;
  }

  // Иначе (примитивы, null/undefined, разные типы)
  return lhs === rhs;
};

export default isEqual;
