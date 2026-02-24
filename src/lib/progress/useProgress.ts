"use client";

import { useContext } from "react";
import { ProgressContext, type ProgressContextType } from "./ProgressProvider";

export function useProgress(): ProgressContextType {
  return useContext(ProgressContext);
}
