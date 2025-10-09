// TRIM
export const trim = (string: string, chars?: string): string => {
  if (string && !chars) {
    return string.trim();
  }
  const reg = new RegExp(`[${chars}]`, "gi");
  return string.replace(reg, "");
};

type Indexed<T = unknown> = {
  [key in string]: T;
};

// ISOBJECT
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

// MERGE
export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    const rightVal = rhs[p];
    const leftVal = lhs[p];

    // Рекурсивное слияние только если оба значения - объекты
    if (isObject(rightVal) && isObject(leftVal)) {
      merge(leftVal as Indexed, rightVal as Indexed);
    } else {
      lhs[p] = rightVal;
    }
  }

  return lhs;
};

// SET
export const set = (object: Indexed, path: string, value: unknown): Indexed => {
  // Если object не объект или null, возвращаем как есть
  if (!isObject(object)) {
    return object;
  }

  // Разбиваем путь на части по точкам
  const keys = path.split(".");
  let current: Indexed = object;

  // Проходим по всем ключам, кроме последнего
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // Если текущего ключа нет или это не объект, создаем новый объект
    if (
      !current[key] ||
      typeof current[key] !== "object" ||
      current[key] === null
    ) {
      current[key] = {};
    }

    current = current[key] as Indexed;
  }

  // Устанавливаем значение на последнем ключе
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;

  return object;
};
