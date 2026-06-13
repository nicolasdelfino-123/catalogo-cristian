import { storeConfig } from "../config/storeConfig.js";

export const formatPrice = (value) => {
    if (value == null || value === "") return "";

    const num = Number(value);
    if (!Number.isFinite(num)) return "";

    return num.toLocaleString("es-AR", {
        minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
        maximumFractionDigits: 2,
    });
};

export const getCurrencySymbol = () => storeConfig.currency?.symbol || "$";

export const formatCurrency = (value, { fallback = "" } = {}) => {
    const formatted = formatPrice(value);
    if (!formatted) return fallback;
    return `${getCurrencySymbol()} ${formatted}`;
};
