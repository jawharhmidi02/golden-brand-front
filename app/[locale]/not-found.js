"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="flex min-h-screen items-center bg-[#171821]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-[#059669] lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-[#90adc6] md:text-4xl">
            Page Not Found
          </p>
          <p className="mb-4 text-lg font-light text-[#e9eaec]">
            Sorry, we can't find the page you're looking for. Feel free to go
            back to the home page.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="my-4 inline-flex rounded-lg bg-[#059669] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#064e3b] focus:outline-none focus:ring-4 focus:ring-[#064e3b]"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
