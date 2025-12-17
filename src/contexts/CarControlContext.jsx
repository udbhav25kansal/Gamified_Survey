import React, { createContext, useContext, useState } from 'react';

const CarControlContext = createContext(null);

export const CarControlProvider = ({ children }) => {
    const [carFrozen, setCarFrozen] = useState(false);

    const freezeCar = () => {
        console.log('Freezing car physics...');
        setCarFrozen(true);
    };

    const unfreezeCar = () => {
        console.log('Unfreezing car physics...');
        setCarFrozen(false);
    };

    return (
        <CarControlContext.Provider value={{ carFrozen, freezeCar, unfreezeCar }}>
            {children}
        </CarControlContext.Provider>
    );
};

export const useCarControl = () => {
    const context = useContext(CarControlContext);
    if (!context) {
        throw new Error('useCarControl must be used within CarControlProvider');
    }
    return context;
};
