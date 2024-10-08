"use client"
import { createContext } from "react";

export const MessageHistoryContext = createContext({
  message: [],
  update: () => null,
  clear: () => null,
});
