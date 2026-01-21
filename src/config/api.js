// API Configuration
// This file centralizes all API endpoint configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,

    // Products
    PRODUCTS: `${API_BASE_URL}/api/products`,
    PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,

    // Orders
    ORDERS: `${API_BASE_URL}/api/orders`,
    MY_ORDERS: `${API_BASE_URL}/api/orders/my-orders`,
    ORDER_BY_ID: (id) => `${API_BASE_URL}/api/orders/${id}`,

    // Reviews
    REVIEWS: `${API_BASE_URL}/api/reviews`,
    PRODUCT_REVIEWS: (productId) => `${API_BASE_URL}/api/reviews/product/${productId}`,
    CAN_REVIEW: (productId) => `${API_BASE_URL}/api/reviews/can-review/${productId}`,

    // Admin
    ADMIN_DASHBOARD_STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,
    ADMIN_PRODUCTS: `${API_BASE_URL}/api/admin/products`,
    ADMIN_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/admin/products/${id}`,
    ADMIN_RECENT_ORDERS: (limit = 20) => `${API_BASE_URL}/api/admin/orders/recent?limit=${limit}`,
    ADMIN_ORDER_STATUS: (orderId) => `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
    ADMIN_USER_ORDERS: (userId) => `${API_BASE_URL}/api/admin/orders/user/${userId}`,
    ADMIN_MONTHLY_SALES: `${API_BASE_URL}/api/admin/analytics/monthly-sales`,
    ADMIN_WEEKLY_SALES: `${API_BASE_URL}/api/admin/analytics/weekly-sales`,
    ADMIN_SALES_BY_CATEGORY: `${API_BASE_URL}/api/admin/analytics/sales-by-category`,
    ADMIN_SALES_BY_PAYMENT: `${API_BASE_URL}/api/admin/analytics/sales-by-payment`,
    ADMIN_ORDER_STATUS_ANALYTICS: `${API_BASE_URL}/api/admin/analytics/order-status`,
    ADMIN_TOP_PRODUCTS: (limit = 10) => `${API_BASE_URL}/api/admin/analytics/top-products?limit=${limit}`,

    // Upload
    UPLOAD_IMAGE: `${API_BASE_URL}/api/upload-image`,
};

// Helper function to get image URL
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    return `${API_BASE_URL}${path}`;
};

export default API_BASE_URL;
