"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex min-h-screen items-center bg-[#171821]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-[#73cabe] lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-[#a9dfd8] md:text-4xl">
            Page Not Found
          </p>
          <p className="mb-4 text-lg font-light text-[#4f5056]">
            Sorry, we can't find the page you're looking for. Feel free to go
            back to the dashboard.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="my-4 inline-flex rounded-lg bg-[#73cabe] px-5 py-2.5 text-center text-sm font-medium text-[#1c1d27] transition-colors hover:bg-[#a9dfd8] focus:outline-none focus:ring-4 focus:ring-[#a9dfd8]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
