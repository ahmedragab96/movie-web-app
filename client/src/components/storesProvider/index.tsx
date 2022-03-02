import React from 'react';
import { Stores } from '../../stores';
import { StoresContext } from '../../stores/storesContext';

interface StoresProviderData {
    stores: Stores;
    children: any;
}
export const StoresProvider = (providerData: StoresProviderData) => {
    const { stores, children } = providerData;
    return (
       <StoresContext.Provider
            value={{stores}}
       >
           {children}
       </StoresContext.Provider> 
    );
}