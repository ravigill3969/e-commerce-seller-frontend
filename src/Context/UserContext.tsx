import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, ReactNode } from 'react';

type UserContextT = {
  userId: string | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
};

type VerifyUserResT = {
  success: boolean;
  message: string;
  userId: string;
};

const UserContext = createContext<UserContextT | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const { isLoading, isError, data } = useQuery<VerifyUserResT>({
    queryKey: ['verifyUser'],
    queryFn: async () => {
      let response = await fetch(`${BASE_URL}/seller/auth/verify-user`, {
        credentials: 'include',
        signal: AbortSignal.timeout(10000),
      });

      if (response.status === 401) {
        const refreshRes = await fetch(`${BASE_URL}/seller/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          signal: AbortSignal.timeout(10000),
        });

        if (!refreshRes.ok) {
          throw new Error('Session expired, please log in again');
        }

        response = await fetch(`${BASE_URL}/seller/auth/verify-user`, {
          credentials: 'include',
          signal: AbortSignal.timeout(10000),
        });
      }

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isLoggedIn = !isError && Boolean(data?.success);

  return (
    <UserContext.Provider
      value={{ userId: isLoggedIn ? data?.userId : undefined, isLoading, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
