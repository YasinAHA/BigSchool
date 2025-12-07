import { useState } from "react";
import { useCart } from "@/context/useCart";
import { useToast } from "@/context/useToast";
import { ProductCatalog } from "./features/product-catalog/ProductCatalog";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";
import { LoginDemo } from "./features/auth/LoginDemo";
import type { Product } from "@/shared/types";

function AppContent() {
  const { addItem, itemCount } = useCart();
  const { showToast } = useToast();
  const [showLogin, setShowLogin] = useState(false);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Simple Product Shop
          </h1>
          <div className="flex items-center gap-4">
            {import.meta.env.DEV && (
              <button
                onClick={() => {
                  throw new Error('Test error from React')
                }}
                className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
              >
                Test Error
              </button>
            )}
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {showLogin ? "Close" : "Login Demo"}
            </button>
            <div
              className="relative"
              role="status"
              aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            >
              <span className="text-2xl" aria-hidden="true">
                🛒
              </span>
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  aria-hidden="true"
                >
                  {itemCount}
                </span>
              )}
            </div>
          </div>
        </div>
        {showLogin && (
          <div className="border-t bg-gray-50 py-4">
            <div className="max-w-7xl mx-auto px-4">
              <LoginDemo />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductCatalog onAddToCart={handleAddToCart} />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ShoppingCart />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
