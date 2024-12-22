import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type TokenValue = {
  value: string; // Represents the actual value of the token (e.g., a color code or measurement)
};

export type Tokens = {
  [tokenType: string]: {
    [key: string]: 
      | {
          [shade: string]: TokenValue; // Nested tokens (e.g., "olive-50")
        }
      | TokenValue; // Simple tokens (e.g., "forest-green")
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function flattenTokens(tokens: Tokens, prefix = '') {
	return Object.keys(tokens).reduce((acc, key) => {
	  const value = tokens[key];
	  const newPrefix = prefix ? `${prefix}-${key}` : key;
  
	  if (value.value) {
		acc[newPrefix] = value.value;
	  } else {
		Object.assign(acc, flattenTokens(value, newPrefix));
	  }
	  return acc;
	}, {});
}