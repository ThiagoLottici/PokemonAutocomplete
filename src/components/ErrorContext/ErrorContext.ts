import React from 'react';

export const ErrorContext = React.createContext<{
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}>({ error: '', setError: () => {} });
