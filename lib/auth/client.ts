"use client";

import type { StoredUser } from "@/lib/types";
import { DEMO_USERS, USERS_STORAGE_KEY } from "./constants";

export function getRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

export function saveRegisteredUser(user: StoredUser): void {
  const existing = getRegisteredUsers();
  const filtered = existing.filter((item) => item.email !== user.email);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...filtered, user]));
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const normalized = email.trim().toLowerCase();
  const allUsers = [...DEMO_USERS, ...getRegisteredUsers()];
  return allUsers.find((user) => user.email.toLowerCase() === normalized);
}

export function findUserByCredentials(
  email: string,
  password: string,
): StoredUser | undefined {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return undefined;
  return user;
}
