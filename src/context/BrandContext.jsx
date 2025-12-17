import React, { createContext, useContext } from 'react';
import { useBrandStore } from '../store/BrandStore';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
    const { currentBrand, brands, setBrand } = useBrandStore();
    const brand = brands[currentBrand];

    return (
        <BrandContext.Provider value={{ brand, setBrand, brands }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => useContext(BrandContext);
