import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  ChevronRight,
  Store,
  Plus,
  Minus,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { MOCK_PRODUCTS } from "../constants";
import { useStore } from "../store";
import { Product, Shop } from "../types";

export function Shopping() {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    [],
  );
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const state = useStore();

  const dummyShops: Shop[] = [
    { id: "sh1", name: "Gupta General Store", category: "Grocery", rating: 4.8, isOpen: true },
    { id: "sh2", name: "Suresh Pharmacy", category: "Medical", rating: 4.9, isOpen: true },
    { id: "sh3", name: "Sharma Sweets", category: "Other", rating: 4.7, isOpen: true },
    { id: "sh4", name: "Fresh Vegetables Shop", category: "Vegetables", rating: 4.5, isOpen: true }
  ];

  const currentShops = state.shops.length > 0 ? state.shops : dummyShops;

  const getDummyProducts = (shopId: string): Product[] => [
    { id: `p1-${shopId}`, shopId, name: "Atta 5kg", price: 200 },
    { id: `p2-${shopId}`, shopId, name: "Sugar 1kg", price: 45 },
    { id: `p3-${shopId}`, shopId, name: "Cold Drink", price: 40 },
    { id: `p4-${shopId}`, shopId, name: "Biscuits", price: 20 }
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full pb-16"
    >
      {!selectedShop ? (
        <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Market & Homemade
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Buy from local shops or directly from neighborhood makers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => shop.isOpen && setSelectedShop(shop)}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all flex items-center justify-between cursor-pointer ${
                  shop.isOpen
                    ? "hover:bg-white/10 hover:border-white/20"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${shop.isOpen ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-500"}`}
                  >
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                          shop.isOpen
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {shop.isOpen ? "Open Now" : "Closed"}
                      </span>
                      <span className="text-xs text-slate-400">
                        {shop.category}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-8">
            <button
              onClick={() => setSelectedShop(null)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 mb-2 inline-block transition-colors"
            >
              ← Back to shops
            </button>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {selectedShop.name}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {selectedShop.category} • Home Delivery Available
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {(state.products.length > 0 ? state.products : getDummyProducts(selectedShop.id))
                .filter((p) => p.shopId === selectedShop.id).map(
                (product) => {
                  const qty =
                    cart.find((item) => item.product.id === product.id)
                      ?.quantity || 0;
                  return (
                    <div
                      key={product.id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:items-center">
                          <h4 className="text-lg font-medium text-white">
                            {product.name}
                          </h4>
                          {product.isHomemade && (
                            <span className="w-fit inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 uppercase tracking-wider">
                              By {product.sellerName}
                            </span>
                          )}
                        </div>
                        <p className="text-blue-400 font-semibold mt-1">
                          ₹{product.price}
                        </p>
                        {product.description && (
                          <p className="text-slate-400 text-xs mt-1 leading-snug">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-white/10 hover:bg-blue-500/20 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-2 py-1">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-blue-400 hover:text-blue-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-white w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-1 text-blue-400 hover:text-blue-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>

            <div>
              <div className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Your Cart</h3>
                </div>

                {cart.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-6">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between text-sm"
                        >
                          <div>
                            <div className="text-slate-200">
                              {item.product.name}
                            </div>
                            <div className="text-slate-500">
                              ₹{item.product.price} x {item.quantity}
                            </div>
                          </div>
                          <div className="text-white font-medium">
                            ₹{item.product.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-slate-400">Delivery Fee</span>
                        <span className="text-white">₹20</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span className="text-white">Total</span>
                        <span className="text-blue-400">
                          ₹{totalAmount + 20}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCheckoutSuccess(true);
                        setTimeout(() => {
                          setCheckoutSuccess(false);
                          setCart([]);
                        }, 3000);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/40 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                    >
                      {checkoutSuccess ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                           <CheckCircle className="w-5 h-5 text-white" /> Order Placed!
                        </motion.div>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" /> Checkout
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
