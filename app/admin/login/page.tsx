import { Suspense } from "react";
import AdminLoginForm from "@/app/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><span className="loading loading-spinner loading-lg text-primary" /></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
