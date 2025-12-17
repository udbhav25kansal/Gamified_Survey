import { create } from 'zustand';

export const useBrandStore = create((set) => ({
    currentBrand: 'rival',
    brands: {
        rival: {
            name: 'Rival',
            colors: { primary: '#E6007E', ground: '#1a1a1a' },
            physics: { gravity: [0, -9.81, 0] }
        },
        deca: {
            name: 'Deca',
            colors: { primary: '#FFA500', ground: '#34495e' },
            physics: { gravity: [0, -5, 0] } // Floaty
        },
        rino: {
            name: 'Rino',
            colors: { primary: '#2ECC71', ground: '#2d2d2d' },
            physics: { gravity: [0, -9.81, 0] }
        }
    },
    setBrand: (brandId) => set({ currentBrand: brandId })
}));
