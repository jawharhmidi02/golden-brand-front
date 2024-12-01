import "/app/[lng]/globals.css";
import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Dashboard: Reset Password",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
