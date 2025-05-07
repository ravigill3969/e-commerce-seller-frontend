import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

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

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isLoading, isError, data, isSuccess } = useQuery<VerifyUserResT>({
    queryKey: ['verifyUser'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/seller/auth/verify-user`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        const refreshRes = await fetch(`${BASE_URL}/seller/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshRes.ok) {
          throw new Error('Session expired, please log in again');
        }

        return fetch(`${BASE_URL}/seller/auth/verify-user`, {
          credentials: 'include',
        }).then((res) => res.json());
      }

      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data?.success) {
      setUserId(data.userId);
      setIsLoggedIn(true);
    } else if (isError || !data?.success) {
      setUserId(undefined);
      setIsLoggedIn(false);
    }
  }, [isSuccess, isError, data]);

  return <UserContext.Provider value={{ userId, isLoading, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
