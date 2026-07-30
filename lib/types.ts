export type UserRole = "student" | "lecturer" | "admin";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type StoredUser = SessionUser & {
  password: string;
};
