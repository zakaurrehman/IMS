'use client';

import { useState, useEffect, useCallback } from 'react';

// Using metals.live API - free, no key required
// Provides real LME prices for common metals
const API_URL = 'https://metals.live/api/v1/spot';

const METALS = {
    nickel: { name: 'Nickel', symbol: 'Ni', unit: 'USD/MT' },
    copper: { name: 'Copper', symbol: 'Cu', unit: 'USD/MT' }
};

export default function useMetalPrices(refreshInterval = 30 * 60 * 1000) {
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchPrices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch metal prices');
            }

            const data = await response.json();

            // Extract nickel and copper prices
            const metalPrices = {};

            data.forEach(item => {
                const metalName = item.name?.toLowerCase();
                if (metalName === 'nickel' || metalName === 'copper') {
                    metalPrices[metalName] = {
                        ...METALS[metalName],
                        price: item.price,
                        change: item.change || 0,
                        changePercent: item.change_percent || 0
                    };
                }
            });

            setPrices(metalPrices);
            setLastUpdated(new Date());
        } catch (err) {
            setError(err.message);
            console.error('Metal prices fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch and interval refresh
    useEffect(() => {
        fetchPrices();

        const interval = setInterval(fetchPrices, refreshInterval);
        return () => clearInterval(interval);
    }, [fetchPrices, refreshInterval]);

    // Format price for display
    const formatPrice = useCallback((price, decimals = 2) => {
        if (price === null || price === undefined) return '—';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(price);
    }, []);

    return {
        prices,
        loading,
        error,
        lastUpdated,
        refresh: fetchPrices,
        formatPrice,
        metals: METALS
    };
}
