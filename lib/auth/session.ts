import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "./constants";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  try {
    const user = JSON.parse(raw) as SessionUser;
    if (!user?.email || !user?.role) return null;
    return user;
  } catch {
    return null;
  }
}
