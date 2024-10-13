"use client";
import { useState, useEffect, useRef } from "react";

function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: { isSerializable?: boolean }
) {
  const { isSerializable = true } = options || {};

  // Use a ref to hold the initial mount state
  const isInitialMount = useRef(true);

  // Use a state to hold the value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getStoredItem = () => {
      try {
        const item = window.sessionStorage.getItem(key);
        if (item) {
          return isSerializable ? JSON.parse(item) : (item as unknown as T);
        }
        return initialValue;
      } catch (error) {
        console.error("Error reading from sessionStorage", error);
        return initialValue;
      }
    };

    if (isInitialMount.current) {
      const storedItem = getStoredItem();
      if (storedItem !== initialValue) {
        setStoredValue(storedItem);
      }
      isInitialMount.current = false;
    } else {
      // Update sessionStorage when storedValue changes
      try {
        window.sessionStorage.setItem(
          key,
          isSerializable
            ? JSON.stringify(storedValue)
            : (storedValue as unknown as string)
        );
      } catch (error) {
        console.error("Error setting sessionStorage key", key, error);
      }
    }
  }, [key, storedValue, initialValue, isSerializable]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error("Error setting value", error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useSessionStorage;
