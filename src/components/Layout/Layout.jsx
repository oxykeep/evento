import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

/**
 * Main layout component that wraps all pages.
 * Maintains a consistent header and footer while swapping page content.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Optional children elements.
 * @returns JSX.Element
 */
const Layout = ({ children }) => {
  return (
    // Full height container with flex column layout
    <div className="min-h-screen flex flex-col">
      {/* Header appears at the top of every page */}
      <Header />

      {/* Main content area that grows to fill available space */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Outlet renders the current route's content */}
        <Outlet />
      </main>

      {/* Footer appears at the bottom of every page */}
      <Footer />
    </div>
  );
};

export default Layout;
