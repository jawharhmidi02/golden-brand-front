import { Toaster } from "@/components/ui/toaster";
import "/app/[lng]/globals.css";

export const metadata = {
  title: "Dashboard: Sign In",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--dash-theme)]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
