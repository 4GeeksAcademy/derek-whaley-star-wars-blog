import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export const Layout = () => (
  <ScrollToTop>
    <Navbar />
    <Outlet />
    <Footer />
  </ScrollToTop>
);