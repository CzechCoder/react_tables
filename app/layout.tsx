import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import SideNav from "./ui/dashboard/sidenav";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: { template: "%s | InvoSys Dashboard", default: "InvoSys Dashboard" },
  description: "The official InvoSys dashboard for invoice management.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(`antialiased ${roboto.variable}`)}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
