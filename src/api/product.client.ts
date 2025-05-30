import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type AddProductT = {
  productName: string;
  brand: string;
  price: number;
  stockQuantity: number;
  category: string;
  mediaUpload: File[];
  description: string;
  mediaReceived: string[];
};

type AddProductResT = {
  success: boolean;
  message: string;
};

export const useAddProduct = () => {
  const addProduct = async (data: AddProductT): Promise<AddProductResT> => {
    const formData = new FormData();

    formData.append('productName', data.productName);
    formData.append('brand', data.brand);
    formData.append('price', data.price.toString());
    formData.append('stockQuantity', data.stockQuantity.toString());
    formData.append('category', data.category);
    formData.append('description', data.description);

    data.mediaUpload.map((img) => {
      formData.append('image', img);
    });

    const response = await fetch(`${BASE_URL}/seller/product/add-product`, {
      method: 'POST',
      credentials: 'include',

      body: formData,
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong!');
    }

    return res;
  };

  const mutation = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutation;
};

interface ProductResponse {
  message: string;
  success: boolean;
  products: Product[];
}

interface Product {
  _id: string;
  productName: string;
  sellerID: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  description: string;
  photoURLs: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const useGetCurrentSellerProducts = () => {
  const addProduct = async (): Promise<ProductResponse> => {
    const response = await fetch(`${BASE_URL}/seller/product/get-active-user-products`, {
      credentials: 'include',
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong!');
    }

    console.log(res);

    return res;
  };

  const query = useQuery({
    queryKey: ['getProducts'],
    queryFn: addProduct,
  });

  return query;
};

interface SingleProductResponseT {
  message: string;
  success: boolean;
  product: Product;
}

export const useGetProductWithId = (id?: string) => {
  const getProduct = async (): Promise<SingleProductResponseT> => {
    const response = await fetch(`${BASE_URL}/seller/product/get-product-with-id/${id}`, {
      credentials: 'include',
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong!');
    }

    return res;
  };

  const query = useQuery({
    queryKey: ['getProduct', id],
    queryFn: getProduct,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return query;
};

export const useEditProduct = (id?: string) => {
  const addProduct = async (data: AddProductT): Promise<AddProductResT> => {
    const formData = new FormData();

    formData.append('productName', data.productName);
    formData.append('brand', data.brand);
    formData.append('price', data.price.toString());
    formData.append('stockQuantity', data.stockQuantity.toString());
    formData.append('category', data.category);
    formData.append('description', data.description);

    data.mediaUpload.map((img) => {
      formData.append('image', img);
    });

    data.mediaReceived.map((img) => {
      formData.append('mediaReceived', img);
    });

    const response = await fetch(`${BASE_URL}/seller/product/edit-product/${id}`, {
      method: 'PUT',
      credentials: 'include',

      body: formData,
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong!');
    }

    return res;
  };

  const mutation = useMutation({
    mutationKey: ['editProduct'],
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutation;
};
