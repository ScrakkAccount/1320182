import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ShoppingCart, HelpCircle, Server, Settings, Package, Menu, X } from 'lucide-react';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import SupportPage from '@/pages/SupportPage';
import OrderReviewPage from '@/pages/OrderReviewPage';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import AdminProductsPage from './pages/AdminProductsPage';
import { TooltipProvider } from "@/components/ui/tooltip";
import ConnectionStatus from './components/ConnectionStatus';

// Método alternativo para evitar el error con el import directo
// Coloca tu logo en la carpeta public/images/ y usa esta ruta
const LOGO_PATH = "/images/logo.png";

// NOTA: Si prefieres usar import, descomenta esta línea cuando tengas el archivo logo.png en src/assets
// import logoImage from './assets/logo.png';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out
    ${isActive
      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
      : 'text-muted-foreground hover:bg-secondary/80 hover:text-secondary-foreground hover:scale-105'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center w-full px-4 py-4 text-base font-medium rounded-lg mb-2 transition-all duration-300
    ${isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-secondary/80 hover:text-secondary-foreground'
    }`;

  const iconProps = {
    size: 20,
    className: "mr-3"
  };

  return (
    <Router>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-[#0c0404] text-foreground">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
              <Link to="/" className="flex items-center">
                {/* Contenedor rectangular para logo con ratio aproximado de 4.5:1 */}
                <div className="overflow-hidden rounded-md h-8 w-36 md:h-10 md:w-44 flex items-center justify-center bg-transparent">
                  <img 
                    src={LOGO_PATH} 
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-2">
                <NavLink to="/" className={navLinkClasses}><Home {...iconProps} /> Inicio</NavLink>
                <NavLink to="/shop" className={navLinkClasses}><ShoppingCart {...iconProps} /> Comprar</NavLink>
                <NavLink to="/support" className={navLinkClasses}><HelpCircle {...iconProps} /> Soporte</NavLink>
                <NavLink to="/admin/products" className={navLinkClasses}><Package {...iconProps} /> Administrar Productos</NavLink>
                <NavLink to="/admin/orders" className={navLinkClasses}><Server {...iconProps} /> Revisar Pedidos</NavLink>
              </nav>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={toggleMobileMenu}
                  aria-label="Menú"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </header>

          {/* Menú móvil */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="fixed inset-0 z-40 bg-background/95 md:hidden pt-16 px-4 backdrop-blur-md overflow-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="py-6 px-2">
                  <nav className="flex flex-col">
                    <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                      <Home {...iconProps} /> Inicio
                    </NavLink>
                    <NavLink to="/shop" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                      <ShoppingCart {...iconProps} /> Comprar
                    </NavLink>
                    <NavLink to="/support" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                      <HelpCircle {...iconProps} /> Soporte
                    </NavLink>
                    <NavLink to="/admin/products" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                      <Package {...iconProps} /> Administrar Productos
                    </NavLink>
                    <NavLink to="/admin/orders" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                      <Server {...iconProps} /> Revisar Pedidos
                    </NavLink>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pb-8"
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/admin/orders" element={<OrderReviewPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
              </Routes>
            </motion.div>
          </main>

          <footer className="py-6 sm:py-8 text-center text-sm text-muted-foreground border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4">
              <p>&copy; {new Date().getFullYear()} RyVen. Todos los derechos reservados.</p>
              <p className="mt-1">Diseñado con <span className="text-primary">&hearts;</span> por RyVen</p>
            </div>
          </footer>
          <Toaster />
          <ConnectionStatus />
        </div>
      </TooltipProvider>
    </Router>
  );
};

export default App;
  