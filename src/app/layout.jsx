import "./globals.css";
import Navigation from "../components/Navigation";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "DBA Alvarado - Custom Shirt Prints & Engravings",
  description: "Professional custom shirt printing and engraving services. Water bottles, wood, and more. Quality products with personalized designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}