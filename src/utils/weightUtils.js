/**
 * Parses a weight string like "250g", "1kg", "500 ml" into value and unit
 * @param {string} weightStr 
 * @returns {{value: number, unit: string}}
 */
export const parseWeight = (weightStr) => {
    if (!weightStr) return { value: 0, unit: 'g' };
    
    const normalized = weightStr.toLowerCase().replace(/\s+/g, '');
    const match = normalized.match(/^(\d+(?:\.\d+)?)(g|kg|ml|l)$/);
    
    if (match) {
        return {
            value: parseFloat(match[1]),
            unit: match[2]
        };
    }
    
    // Fallback if it doesn't match perfectly
    const valueMatch = normalized.match(/^[\d.]+/);
    const unitMatch = normalized.match(/[a-z]+$/);
    
    return {
        value: valueMatch ? parseFloat(valueMatch[0]) : 0,
        unit: unitMatch ? unitMatch[0] : ''
    };
};

/**
 * Checks if a weight string is customizable (weight or volume based)
 * @param {string} weightStr 
 * @returns {boolean}
 */
export const isCustomizableWeight = (weightStr) => {
    if (!weightStr) return false;
    const normalized = weightStr.toLowerCase().replace(/\s+/g, '');
    return !!normalized.match(/^(\d+(?:\.\d+)?)(g|kg|ml|l)$/);
};

/**
 * Converts any weight to grams (or base unit) for calculations
 * @param {number} value 
 * @param {string} unit 
 * @returns {number}
 */
export const toBaseUnit = (value, unit) => {
    const u = unit.toLowerCase();
    if (u === 'kg' || u === 'l') return value * 1000;
    return value;
};

/**
 * Calculates price for a custom weight based on a reference price and weight
 * @param {number} basePrice 
 * @param {string} baseWeightStr 
 * @param {number} targetValue 
 * @param {string} targetUnit 
 * @returns {number}
 */
export const calculateCustomPrice = (basePrice, baseWeightStr, targetValue, targetUnit) => {
    const base = parseWeight(baseWeightStr);
    const baseInGrams = toBaseUnit(base.value, base.unit);
    const targetInGrams = toBaseUnit(targetValue, targetUnit);
    
    if (baseInGrams === 0) return basePrice;
    
    const pricePerGram = basePrice / baseInGrams;
    return Math.round(pricePerGram * targetInGrams * 100) / 100;
};
