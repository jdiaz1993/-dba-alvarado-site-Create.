import "./globals.css";
import Navigation from "../components/Navigation";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "DBA Alvarado - Custom Shirt Printing",
  description: "Professional DTF (Direct to Film) custom shirt printing services. High-quality, vibrant prints on t-shirts, hoodies, and more.",
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