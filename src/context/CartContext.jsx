"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from "react";

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [syncError, setSyncError] = useState(null);
	const saveTimeoutRef = useRef(null);

	// Load cart from backend on mount
	useEffect(() => {
		loadCartFromBackend();
	}, []);

	const loadCartFromBackend = useCallback(async () => {
		try {
			setIsLoading(true);
			setSyncError(null);
			
			// First, try to load from localStorage (client-side persistence)
			if (typeof window !== 'undefined') {
				const savedCart = localStorage.getItem('cart');
				if (savedCart) {
					try {
						const parsedCart = JSON.parse(savedCart);
						if (Array.isArray(parsedCart)) {
							console.log('✅ Cart loaded from localStorage:', parsedCart);
							setItems(parsedCart);
							setIsLoading(false);
							return;
						}
					} catch (e) {
						console.error('Error parsing cart from localStorage:', e);
					}
				}
			}
			
			// Fallback: Try to load from backend API
			console.log('🛒 Loading cart from backend...');
			const response = await fetch('/api/cart');
			const data = await response.json();
			
			if (data.success && data.cart && data.cart.items && data.cart.items.length > 0) {
				console.log('✅ Cart loaded successfully from backend:', data.cart.items);
				setItems(data.cart.items);
				// Also save to localStorage for future use
				if (typeof window !== 'undefined') {
					localStorage.setItem('cart', JSON.stringify(data.cart.items));
				}
			} else {
				console.log('📦 No existing cart found, starting with empty cart');
				setItems([]);
			}
		} catch (error) {
			console.error('❌ Failed to load cart:', error);
			setSyncError('Failed to load cart');
			// On error, try localStorage as fallback
			if (typeof window !== 'undefined') {
				const savedCart = localStorage.getItem('cart');
				if (savedCart) {
					try {
						const parsedCart = JSON.parse(savedCart);
						if (Array.isArray(parsedCart)) {
							console.log('✅ Cart loaded from localStorage (fallback):', parsedCart);
							setItems(parsedCart);
						}
					} catch (e) {
						console.error('Error parsing cart from localStorage:', e);
					}
				}
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const saveCartToBackend = useCallback(async (cartItems) => {
		try {
			setSyncError(null);
			setIsSaving(true);
			
			// Save to localStorage first (immediate persistence)
			if (typeof window !== 'undefined') {
				try {
					localStorage.setItem('cart', JSON.stringify(cartItems));
					console.log('✅ Cart saved to localStorage:', cartItems);
				} catch (e) {
					console.error('Error saving to localStorage:', e);
				}
			}
			
			// Also try to save to backend (for future use or sync)
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
			
			console.log('✅ Cart saved successfully to backend');
		} catch (error) {
			console.error('❌ Failed to save cart to backend:', error);
			// Don't set error if localStorage save succeeded
			if (typeof window === 'undefined' || !localStorage.getItem('cart')) {
				setSyncError('Failed to save cart');
			}
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

	const addItem = useCallback((item, quantity = 1) => {
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

	const removeItem = useCallback((id) => {
		setItems(prev => {
			const newItems = prev.filter(i => i.id !== id);
			// Immediately save to backend
			setTimeout(() => saveCartToBackend(newItems), 0);
			return newItems;
		});
	}, [saveCartToBackend]);

	const updateQuantity = useCallback((id, quantity) => {
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
			
			// Clear localStorage
			if (typeof window !== 'undefined') {
				localStorage.removeItem('cart');
				console.log('✅ Cart cleared from localStorage');
			}
			
			// Also try to clear from backend
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
			// Still clear items even if backend call fails
			setItems([]);
		}
	}, []);

	const totalCents = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
	const totalQuantity = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

	const value = {
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
