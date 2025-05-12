import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UploadCloud, Package, DollarSign, Hash, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Nav from '@/components/Nav';
import { useAddProduct, useEditProduct, useGetProductWithId } from '@/api/product.client';
import { useParams } from 'react-router';

const UploadProduct = () => {
  const { id } = useParams();
  const edit = !!id;
  const [mediaUpload, setMediaUpload] = useState<File[]>([]);
  const [mediaReceived, setMediaReceived] = useState<string[]>([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      productName: '',
      brand: '',
      price: 1,
      stockQuantity: 1,
      category: 'electronics',
      description: '',
    },
  });

  const { data } = useGetProductWithId(id);
  const { mutate } = useAddProduct();
  const { mutate: editMutate } = useEditProduct(id);

  useEffect(() => {
    if (edit && data) {
      const use = data.product;

      reset({
        productName: use.productName || '',
        brand: use.brand || '',
        price: isNaN(Number(use.price)) ? 1 : Number(use.price),
        stockQuantity: isNaN(Number(use.stockQuantity)) ? 1 : Number(use.stockQuantity),
        category: use.category || 'electronics',
        description: use.description || '',
      });

      setMediaReceived(use.photoURLs || []);
    }
  }, [data, id, reset]);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMediaUpload((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number, type: 'upload' | 'received') => {
    if (type === 'upload') {
      setMediaUpload((prev) => prev.filter((_, i) => i !== index));
    } else {
      setMediaReceived((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (formData: any) => {
    const productInfo = {
      ...formData,
      mediaUpload,
    };
    mutate(productInfo);
  };

  const onUpdate = (formData: any) => {
    const productInfo = {
      ...formData,
      mediaUpload,
      mediaReceived,
    };
    editMutate(productInfo);
  };

  return (
    <>
      <Nav />
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8'>
        <div className='max-w-4xl mx-auto'>
          <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm'>
            <CardHeader className='border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <div className='bg-blue-100 p-3 rounded-xl'>
                  <Package className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <CardTitle className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    New Product Listing
                  </CardTitle>
                  <CardDescription className='text-gray-500 mt-1'>
                    Fill in the product details below to add to your catalog
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit(edit ? onUpdate : onSubmit)}>
              <CardContent className='space-y-8 pt-8'>
                {/* Product Information Section */}
                <div className='space-y-6'>
                  <h3 className='text-lg font-semibold flex items-center gap-2 text-gray-700'>
                    <Info className='w-5 h-5 text-blue-500' />
                    Basic Information
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-gray-700'>Product Name</Label>
                      <Controller
                        name='productName'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder='Premium Leather Jacket'
                            className='rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          />
                        )}
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-gray-700'>Brand</Label>
                      <Controller
                        name='brand'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder='Luxury Brands Inc.'
                            className='rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500'
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock Section */}
                <div className='space-y-6'>
                  <h3 className='text-lg font-semibold flex items-center gap-2 text-gray-700'>
                    <DollarSign className='w-5 h-5 text-green-500' />
                    Pricing & Inventory
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-gray-700'>Price</Label>
                      <div className='relative'>
                        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>$</span>
                        <Controller
                          name='price'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type='number'
                              placeholder='0.00'
                              className='pl-8 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-gray-700'>Stock Quantity</Label>
                      <div className='relative'>
                        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
                          <Hash className='w-4 h-4' />
                        </span>
                        <Controller
                          name='stockQuantity'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type='number'
                              placeholder='100'
                              className='pl-8 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-sm font-medium text-gray-700'>Category</Label>
                      <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500'>
                              <SelectValue placeholder='Select category' />
                            </SelectTrigger>
                            <SelectContent className='rounded-lg shadow-lg'>
                              <SelectItem value='electronics'>Electronics</SelectItem>
                              <SelectItem value='fashion'>Fashion</SelectItem>
                              <SelectItem value='home'>Home & Living</SelectItem>
                              <SelectItem value='beauty'>Beauty</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-6'>
                  <h3 className='text-lg font-semibold flex items-center gap-2 text-gray-700'>
                    <UploadCloud className='w-5 h-5 text-purple-500' />
                    Media Upload
                  </h3>
                  {mediaUpload.length > 0 && (
                    <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      {mediaUpload.map((file, index) => (
                        <div key={index} className='relative group'>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className='w-full h-32 object-cover rounded-xl border border-gray-300 shadow'
                          />

                          <Button
                            type='button'
                            onClick={() => removeImage(index, 'upload')}
                            className='absolute top-2 right-2 bg-white/80 text-gray-600 hover:text-red-500 hover:bg-white rounded-full p-1 shadow transition'>
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {mediaReceived.length > 0 && (
                    <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      {mediaReceived.map((file, index) => (
                        <div key={index} className='relative group'>
                          <img
                            src={file}
                            alt={`preview-${index}`}
                            className='w-full h-32 object-cover rounded-xl border border-gray-300 shadow'
                          />

                          <Button
                            type='button'
                            onClick={() => removeImage(index, 'received')}
                            className='absolute top-2 right-2 bg-white/80 text-gray-600 hover:text-red-500 hover:bg-white rounded-full p-1 shadow transition'>
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className='space-y-2'>
                    <Label className='text-sm font-medium text-gray-700'>Product Images</Label>
                    <div className='border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-colors hover:border-purple-500'>
                      <div className='max-w-xs mx-auto'>
                        <UploadCloud className='w-10 h-10 text-gray-400 mx-auto mb-4' />
                        <p className='text-gray-500 mb-1'>
                          <span className='text-purple-600 font-medium'>Click to upload</span> or drag and drop
                        </p>
                        <p className='text-xs text-gray-400'>SVG, PNG, JPG (max. 5MB each)</p>
                      </div>
                      <Input type='file' multiple accept='image/*' id='upload' onChange={onImageUpload} />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className='space-y-6'>
                  <h3 className='text-lg font-semibold flex items-center gap-2 text-gray-700'>
                    <span className='bg-blue-100 p-2 rounded-lg'>
                      <Package className='w-5 h-5 text-blue-500' />
                    </span>
                    Product Details
                  </h3>

                  <div className='space-y-2'>
                    <Label className='text-sm font-medium text-gray-700'>Description</Label>
                    <Controller
                      name='description'
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder='Describe your product in detail...'
                          rows={5}
                          className='rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500'
                        />
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className='flex justify-end gap-4 p-8 border-t border-gray-200'>
                <Button variant='outline' className='rounded-lg px-6 py-3' type='button'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all'>
                  {!edit ? 'Publish' : 'Update '}Product
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
