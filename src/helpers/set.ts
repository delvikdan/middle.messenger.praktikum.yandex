type Indexed<T = unknown> = {
  [key in string]: T;
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

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

export default set;
