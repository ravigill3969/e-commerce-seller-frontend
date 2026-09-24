import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UploadCloud, X } from 'lucide-react';
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
    const productInfo = { ...formData, mediaUpload };
    mutate(productInfo);
  };

  const onUpdate = (formData: any) => {
    const productInfo = { ...formData, mediaUpload, mediaReceived };
    editMutate(productInfo);
  };

  return (
    <>
      <Nav />
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-5xl mx-auto p-6 space-y-6 animate-fade-in'>
          {/* Header */}
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>{edit ? 'Edit Product' : 'Add Product'}</h1>
            <p className='text-gray-600 mt-1'>Fill in the product details below</p>
          </div>

          <form onSubmit={handleSubmit(edit ? onUpdate : onSubmit)} className='space-y-6'>
            {/* Basic Info */}
            <Card className='border border-gray-200'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>Product Information</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='productName'>Product Name</Label>
                    <Controller
                      name='productName'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id='productName' placeholder='Enter product name' />
                      )}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='brand'>Brand</Label>
                    <Controller
                      name='brand'
                      control={control}
                      render={({ field }) => <Input {...field} id='brand' placeholder='Enter brand' />}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id='description'
                        rows={4}
                        placeholder='Describe your product...'
                      />
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='price'>Price ($)</Label>
                    <Controller
                      name='price'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id='price' type='number' placeholder='0.00' />
                      )}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='stockQuantity'>Stock</Label>
                    <Controller
                      name='stockQuantity'
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id='stockQuantity' type='number' placeholder='0' />
                      )}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='category'>Category</Label>
                    <Controller
                      name='category'
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id='category'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
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
              </CardContent>
            </Card>

            {/* Images */}
            <Card className='border border-gray-200'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>Product Images</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Preview Grid */}
                {(mediaUpload.length > 0 || mediaReceived.length > 0) && (
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                    {mediaUpload.map((file, index) => (
                      <div key={`upload-${index}`} className='relative group'>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className='w-full aspect-square object-cover rounded-lg border border-gray-200'
                        />
                        <button
                          type='button'
                          onClick={() => removeImage(index, 'upload')}
                          className='absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <X className='w-4 h-4 text-gray-600' />
                        </button>
                      </div>
                    ))}
                    {mediaReceived.map((file, index) => (
                      <div key={`received-${index}`} className='relative group'>
                        <img
                          src={file}
                          alt={`preview-${index}`}
                          className='w-full aspect-square object-cover rounded-lg border border-gray-200'
                        />
                        <button
                          type='button'
                          onClick={() => removeImage(index, 'received')}
                          className='absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <X className='w-4 h-4 text-gray-600' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Zone */}
                <div className='relative group'>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={onImageUpload}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                  />
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors'>
                    <UploadCloud className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-sm text-gray-600 mb-1'>Click to upload or drag and drop</p>
                    <p className='text-xs text-gray-500'>PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className='flex gap-3 justify-end'>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
              <Button type='submit'>{edit ? 'Update Product' : 'Create Product'}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
