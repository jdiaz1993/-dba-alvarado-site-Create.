"use client";

import { createContext, useContext, useMemo, useState, ReactNode, useCallback } from "react";

export type CartItem = {
	id: string;
	name: string;
	price: number; // in cents
	imageUrl?: string;
	quantity: number;
};

type CartContextValue = {
	items: CartItem[];
	addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clear: () => void;
	totalCents: number;
	totalQuantity: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
		setItems(prev => {
			const existing = prev.find(i => i.id === item.id);
			if (existing) {
				return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
			}
			return [...prev, { ...item, quantity }];
		});
	}, []);

	const removeItem = useCallback((id: string) => {
		setItems(prev => prev.filter(i => i.id !== id));
	}, []);

	const updateQuantity = useCallback((id: string, quantity: number) => {
		setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
	}, []);

	const clear = useCallback(() => setItems([]), []);

	const totalCents = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
	const totalQuantity = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

	const value: CartContextValue = {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clear,
		totalCents,
		totalQuantity,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}
