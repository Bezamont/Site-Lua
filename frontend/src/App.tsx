import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { AppRouter } from '@/router';

// ============================================================
// App — Root da aplicação
// Ordem dos providers:
//   AuthProvider (global) → CartProvider → AppRouter
// ============================================================
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
}
