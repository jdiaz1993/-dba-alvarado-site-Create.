"use client";

import { createContext, useContext, useMemo, useState, ReactNode, useCallback, useEffect, useRef } from "react";

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
	isLoading: boolean;
	isSaving: boolean;
	syncError: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [syncError, setSyncError] = useState<string | null>(null);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Load cart from backend on mount
	useEffect(() => {
		loadCartFromBackend();
	}, []);

	const loadCartFromBackend = useCallback(async () => {
		try {
			setIsLoading(true);
			setSyncError(null);
			
			console.log('🛒 Loading cart from backend...');
			const response = await fetch('/api/cart');
			const data = await response.json();
			
			if (data.success && data.cart) {
				console.log('✅ Cart loaded successfully:', data.cart.items);
				setItems(data.cart.items || []);
			} else {
				console.log('📦 No existing cart found, starting with empty cart');
				setItems([]);
			}
		} catch (error) {
			console.error('❌ Failed to load cart from backend:', error);
			setSyncError('Failed to load cart');
		} finally {
			setIsLoading(false);
		}
	}, []);

	const saveCartToBackend = useCallback(async (cartItems: CartItem[]) => {
		try {
			setSyncError(null);
			setIsSaving(true);
			
			console.log('💾 Saving cart to backend:', cartItems);
			const response = await fetch('/api/cart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ items: cartItems }),
			});
			
			const data = await response.json();
			
			if (!data.success) {
				throw new Error(data.error || 'Failed to save cart');
			}
			
			console.log('✅ Cart saved successfully');
		} catch (error) {
			console.error('❌ Failed to save cart to backend:', error);
			setSyncError('Failed to save cart');
		} finally {
			setIsSaving(false);
		}
	}, []);

	// Save cart to backend whenever items change (with debounce)
	useEffect(() => {
		if (!isLoading && items.length >= 0) {
			// Clear existing timeout
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
			
			// Set new timeout to save after 500ms of no changes
			saveTimeoutRef.current = setTimeout(() => {
				saveCartToBackend(items);
			}, 500);
		}
		
		// Cleanup timeout on unmount
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, [items, isLoading, saveCartToBackend]);

	const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
		setItems(prev => {
			const existing = prev.find(i => i.id === item.id);
			const newItems = existing
				? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i)
				: [...prev, { ...item, quantity }];
			
			// Immediately save to backend
			setTimeout(() => saveCartToBackend(newItems), 0);
			
			return newItems;
		});
	}, [saveCartToBackend]);

	const removeItem = useCallback((id: string) => {
		setItems(prev => {
			const newItems = prev.filter(i => i.id !== id);
			// Immediately save to backend
			setTimeout(() => saveCartToBackend(newItems), 0);
			return newItems;
		});
	}, [saveCartToBackend]);

	const updateQuantity = useCallback((id: string, quantity: number) => {
		setItems(prev => {
			const newItems = prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i);
			// Immediately save to backend
			setTimeout(() => saveCartToBackend(newItems), 0);
			return newItems;
		});
	}, [saveCartToBackend]);

	const clear = useCallback(async () => {
		try {
			setSyncError(null);
			
			const response = await fetch('/api/cart', {
				method: 'DELETE',
			});
			
			const data = await response.json();
			
			if (!data.success) {
				throw new Error(data.error || 'Failed to clear cart');
			}
			
			setItems([]);
		} catch (error) {
			console.error('Failed to clear cart:', error);
			setSyncError('Failed to clear cart');
		}
	}, []);

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
		isLoading,
		isSaving,
		syncError,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}
