import { useContext } from 'react';
import { StoresContext } from '../../stores/storesContext';

export const useStores = () => {
  const { stores } = useContext(StoresContext);

  return stores;
};
