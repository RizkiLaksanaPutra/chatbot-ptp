import { Poppins } from "next/font/google";
import { MessageHistoryProvider } from "@/contexts/MessageHistory";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Chatbot PTP",
  description: "Chatbot PTP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <MessageHistoryProvider>{children}</MessageHistoryProvider>
      </body>
    </html>
  );
}
