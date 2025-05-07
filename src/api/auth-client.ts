const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type DataT = {
  email: string;
  name: string;
  picture: string;
};

type GoogleOAuthResT = {
  success: boolean;
  message: string;
};

export const useGoogleRegister = () => {
  const register = async (data: DataT): Promise<GoogleOAuthResT> => {
    const response = await fetch(`${BASE_URL}/seller/auth/google-register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong!');
    }

    return res;
  };

  const mutate = useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess(data) {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutate;
};
