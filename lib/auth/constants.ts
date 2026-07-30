import type { SessionUser, StoredUser } from "@/lib/types";

export const SESSION_COOKIE = "gctu_session";

export const DEMO_USERS: StoredUser[] = [
  {
    id: "demo-student",
    name: "Joyce Amoah",
    email: "student@gctu.edu.gh",
    password: "student123",
    role: "student",
  },
  {
    id: "demo-lecturer",
    name: "Dr. Kwame Mensah",
    email: "lecturer@gctu.edu.gh",
    password: "lecturer123",
    role: "lecturer",
  },
  {
    id: "demo-admin",
    name: "GCTU Administrator",
    email: "admin@gctu.edu.gh",
    password: "admin123",
    role: "admin",
  },
];

export const USERS_STORAGE_KEY = "gctu_registered_users";

export function dashboardPathForRole(role: SessionUser["role"]): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "lecturer":
      return "/dashboard/lecturer";
    default:
      return "/dashboard/student";
  }
}
