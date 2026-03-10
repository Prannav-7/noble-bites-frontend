import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { calculateCustomPrice } from '../utils/weightUtils';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Helper function to get product ID (handles both _id and id)
    const getProductId = (product) => product._id || product.id;

    // Load cart and wishlist from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        const savedWishlist = localStorage.getItem('wishlist');

        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product, quantity = 1, customWeight = null) => {
        const productId = getProductId(product);
        const weightString = customWeight ? `${customWeight.value}${customWeight.unit}` : product.weight;
        
        // Find existing item with SAME product ID AND SAME weight
        const existingItemIndex = cartItems.findIndex(item => 
            getProductId(item) === productId && item.customWeight === weightString
        );

        if (existingItemIndex > -1) {
            setCartItems(prevItems =>
                prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
            toast.success('Cart updated!');
        } else {
            // Calculate price for this specific weight if it's different from base
            let price = product.price;
            if (customWeight) {
                price = calculateCustomPrice(product.price, product.weight, customWeight.value, customWeight.unit);
            }

            setCartItems(prevItems => [...prevItems, { 
                ...product, 
                quantity, 
                price, // This is the price per unit of this weight
                customWeight: weightString,
                originalWeight: product.weight // keep track of base reference
            }]);
            toast.success('Added to cart!');
        }
    };

    const removeFromCart = (productId, weightString) => {
        setCartItems(prevItems => prevItems.filter(item => 
            !(getProductId(item) === productId && item.customWeight === weightString)
        ));
        toast.success('Removed from cart');
    };

    const updateQuantity = (productId, weightString, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId, weightString);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                (getProductId(item) === productId && item.customWeight === weightString) 
                    ? { ...item, quantity } 
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    // Wishlist Functions
    const addToWishlist = (product) => {
        const productId = getProductId(product);
        setWishlist(prevWishlist => {
            const exists = prevWishlist.find(item => getProductId(item) === productId);
            if (exists) {
                toast.error('Already in wishlist');
                return prevWishlist;
            }
            toast.success('Added to wishlist!');
            return [...prevWishlist, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => getProductId(item) !== productId));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => getProductId(item) === productId);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                getWishlistCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
