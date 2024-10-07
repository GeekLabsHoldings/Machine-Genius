import { useState } from "react";

function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: { isSerializable?: boolean }
) {
  const { isSerializable = true } = options || {};

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);

      if (!item) {
        return initialValue;
      }

      if (isSerializable) {
        return JSON.parse(item);
      } else {
        return item as unknown as T;
      }
    } catch (error) {
      console.error("Error reading sessionStorage key", key, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        if (isSerializable) {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } else {
          window.sessionStorage.setItem(key, valueToStore as unknown as string);
        }
      }
    } catch (error) {
      console.error("Error setting sessionStorage key", key, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useSessionStorage;
