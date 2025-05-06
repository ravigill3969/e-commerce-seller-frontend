const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type DataT = {
  email: string;
  name: string;
  picture: string;
};

export const useRegister = () => {
  const register = async (data: DataT) => {
    const response = await fetch(`${BASE_URL}/seller/auth/register`, {
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
    onSuccess: () => {
      toast.success('Registered successfully!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutate;
};
