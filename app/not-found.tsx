import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 px-5 py-20">
      <div className="card max-w-lg border border-base-300/70 bg-base-100 p-10 text-center shadow-lg">
        <p className="text-6xl font-bold text-primary/20">404</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-base-content/70">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary mt-8 rounded-2xl">
          Back to home
        </Link>
      </div>
    </div>
  );
}
