"use client"
import { createContext } from "react";

export const MessageHistoryContext = createContext({
  message: [],
  replace: () => null,
  update: () => null,
  clear: () => null,
});
