import { storageTypes } from '@/constants';

export const getStorageItem = (name: string | string, storageType: storageTypes = storageTypes.LOCAL_STORAGE) => {
  const storage = typeof window !== 'undefined' && window[storageType];
  if (!storage) return null;
  const getStorageValue = storage.getItem(name);
  if (!getStorageValue) return null;

  return JSON.parse(getStorageValue);
};

export const setStorageItem = (storageName: string, value, storageType: storageTypes = storageTypes.LOCAL_STORAGE) => {
  const storage = typeof window !== 'undefined' && window[storageType];
  if (!storage) return null;
  storage.setItem(storageName, JSON.stringify(value));
};
