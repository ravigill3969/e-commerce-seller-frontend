import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { UploadCloud, Package, DollarSign, Hash, Info, Sparkles, Image, Tag, FileText, X, Plus } from 'lucide-react';
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
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 p-4 sm:p-8'>
        {/* Floating background elements */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl'></div>
        </div>

        <div className='max-w-6xl mx-auto relative'>
          {/* Header Section */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg'>
              <Sparkles className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2'>
              {edit ? 'Update Product' : 'Create New Product'}
            </h1>
            <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
              Transform your ideas into stunning product listings that capture attention and drive sales
            </p>
          </div>

          <form onSubmit={handleSubmit(edit ? onUpdate : onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Left Column - Main Info */}
              <div className='lg:col-span-2 space-y-8'>
                {/* Basic Information Card */}
                <Card className='border-0 shadow-xl bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden'>
                  <CardHeader className='bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-100'>
                    <div className='flex items-center gap-3'>
                      <div className='p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg'>
                        <Package className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <CardTitle className='text-xl font-bold text-slate-800'>Product Identity</CardTitle>
                        <CardDescription className='text-slate-600'>
                          Define the core identity of your product
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-8 space-y-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='space-y-3'>
                        <Label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                          <Tag className='w-4 h-4 text-purple-500' />
                          Product Name
                        </Label>
                        <Controller
                          name='productName'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder='Enter product name...'
                              className='h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                            />
                          )}
                        />
                      </div>
                      <div className='space-y-3'>
                        <Label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                          <Sparkles className='w-4 h-4 text-pink-500' />
                          Brand
                        </Label>
                        <Controller
                          name='brand'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder='Brand name...'
                              className='h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <Label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                        <FileText className='w-4 h-4 text-cyan-500' />
                        Product Description
                      </Label>
                      <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            placeholder='Tell the story of your product... What makes it special?'
                            rows={5}
                            className='rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none'
                          />
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Media Upload Card */}
                <Card className='border-0 shadow-xl bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden'>
                  <CardHeader className='bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-100'>
                    <div className='flex items-center gap-3'>
                      <div className='p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg'>
                        <Image className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <CardTitle className='text-xl font-bold text-slate-800'>Visual Showcase</CardTitle>
                        <CardDescription className='text-slate-600'>
                          Upload stunning images that showcase your product
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-8'>
                    {/* Image Previews */}
                    {(mediaUpload.length > 0 || mediaReceived.length > 0) && (
                      <div className='mb-8'>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                          {mediaUpload.map((file, index) => (
                            <div key={`upload-${index}`} className='group relative'>
                              <div className='aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg'>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`preview-${index}`}
                                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                              </div>
                              <Button
                                type='button'
                                onClick={() => removeImage(index, 'upload')}
                                className='absolute -top-2 -right-2 w-8 h-8 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200'>
                                <X className='w-4 h-4' />
                              </Button>
                            </div>
                          ))}
                          {mediaReceived.map((file, index) => (
                            <div key={`received-${index}`} className='group relative'>
                              <div className='aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg'>
                                <img
                                  src={file}
                                  alt={`preview-${index}`}
                                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                />
                              </div>
                              <Button
                                type='button'
                                onClick={() => removeImage(index, 'received')}
                                className='absolute -top-2 -right-2 w-8 h-8 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200'>
                                <X className='w-4 h-4' />
                              </Button>
                            </div>
                          ))}
                        </div>
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
                      <div className='border-2 border-dashed border-slate-300 group-hover:border-cyan-400 rounded-3xl p-12 text-center transition-all duration-300 bg-gradient-to-br from-white/50 to-slate-50/50 group-hover:from-cyan-50/50 group-hover:to-blue-50/50'>
                        <div className='flex flex-col items-center'>
                          <div className='w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                            <UploadCloud className='w-10 h-10 text-cyan-600' />
                          </div>
                          <h3 className='text-xl font-semibold text-slate-700 mb-2'>Drop your images here</h3>
                          <p className='text-slate-500 mb-4'>or click to browse from your device</p>
                          <p className='text-sm text-slate-400'>SVG, PNG, JPG (max. 5MB each)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Pricing & Details */}
              <div className='space-y-8'>
                {/* Pricing Card */}
                <Card className='border-0 shadow-xl bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden'>
                  <CardHeader className='bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-b border-emerald-100'>
                    <div className='flex items-center gap-3'>
                      <div className='p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg'>
                        <DollarSign className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <CardTitle className='text-xl font-bold text-slate-800'>Pricing</CardTitle>
                        <CardDescription className='text-slate-600'>Set your pricing strategy</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-6 space-y-6'>
                    <div className='space-y-3'>
                      <Label className='text-sm font-semibold text-slate-700'>Price</Label>
                      <div className='relative'>
                        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-semibold text-lg'>
                          $
                        </span>
                        <Controller
                          name='price'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type='number'
                              placeholder='0.00'
                              className='h-14 pl-8 text-lg font-semibold rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <Label className='text-sm font-semibold text-slate-700'>Stock Quantity</Label>
                      <div className='relative'>
                        <Hash className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                        <Controller
                          name='stockQuantity'
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type='number'
                              placeholder='100'
                              className='h-12 pl-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <Label className='text-sm font-semibold text-slate-700'>Category</Label>
                      <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500'>
                              <SelectValue placeholder='Select category' />
                            </SelectTrigger>
                            <SelectContent className='rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-xl'>
                              <SelectItem value='electronics' className='rounded-xl m-1'>
                                Electronics
                              </SelectItem>
                              <SelectItem value='fashion' className='rounded-xl m-1'>
                                Fashion
                              </SelectItem>
                              <SelectItem value='home' className='rounded-xl m-1'>
                                Home & Living
                              </SelectItem>
                              <SelectItem value='beauty' className='rounded-xl m-1'>
                                Beauty
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className='border-0 shadow-xl bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden'>
                  <CardContent className='p-6'>
                    <div className='space-y-4'>
                      <Button
                        type='submit'
                        className='w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                        <Plus className='w-5 h-5 mr-2' />
                        {edit ? 'Update Product' : 'Create Product'}
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        className='w-full h-12 rounded-2xl border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-50 transition-all'>
                        Save as Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
