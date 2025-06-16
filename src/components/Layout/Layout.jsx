import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// the main layout wrapper for all pages
// keeps consistent header and footer while swapping page content
const Layout = ({ children }) => {
  return (
    // full height container with flex column layout
    <div className="min-h-screen flex flex-col">
      {/* header appears at the top of every page */}
      <Header />

      {/* main content area that grows to fill available space */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* outlet renders the current route's content */}
        <Outlet />
      </main>

      {/* footer appears at the bottom of every page */}
      <Footer />
    </div>
  );
};

export default Layout;
