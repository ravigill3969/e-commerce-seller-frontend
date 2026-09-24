import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useDeleteProduct, useGetCurrentSellerProducts } from '@/api/product.client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Edit,
  ExternalLink,
  Package,
  PlusCircle,
  Search,
  Tag,
  AlertCircle,
  Filter,
  Grid3x3,
  List,
  LucideDelete,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Nav from '@/components/Nav';

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

type ViewMode = 'grid' | 'list';

const ProductManagement = () => {
  const { data, isLoading, error } = useGetCurrentSellerProducts();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const { mutate } = useDeleteProduct();

  const deleteProduct = (id: string) => {
    mutate(id);
  };

  const formatPrice = (price: number): string => {
    return parseFloat(price.toString()).toFixed(2);
  };

  useEffect(() => {
    if (data?.products) {
      const categories = [...new Set(data.products.map((product: Product) => product.category))];
      setActiveCategories(categories);
    }
  }, [data]);

  const getFilteredProducts = () => {
    if (!data?.products) return [];
    let filtered = [...data.products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      if (filterStatus === 'active') filtered = filtered.filter((product) => product.isActive);
      else if (filterStatus === 'inactive') filtered = filtered.filter((product) => !product.isActive);
      else if (filterStatus === 'out-of-stock') filtered = filtered.filter((product) => product.stockQuantity <= 0);
      else if (filterStatus === 'low-stock')
        filtered = filtered.filter((product) => product.stockQuantity > 0 && product.stockQuantity < 10);
    }

    if (sortBy === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sortBy === 'oldest')
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'name-asc') filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    else if (sortBy === 'name-desc') filtered.sort((a, b) => b.productName.localeCompare(a.productName));

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const products = data?.products || [];

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <Package className='w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse' />
          <h3 className='text-lg font-medium text-gray-900'>Loading products...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Error loading products</h3>
          <p className='text-gray-600 mb-4'>Please try again later</p>
          <Button>Retry</Button>
        </div>
      </div>
    );
  }

  const renderEmptyState = () => (
    <Card className='p-12 text-center border border-gray-200'>
      <Package className='w-16 h-16 text-gray-400 mx-auto mb-4' />
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>No products found</h3>
      {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
        <>
          <p className='text-gray-600 mb-6'>Try adjusting your filters</p>
          <Button
            variant='outline'
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterStatus('all');
            }}>
            Clear filters
          </Button>
        </>
      ) : (
        <>
          <p className='text-gray-600 mb-6'>Start by adding your first product</p>
          <Link to='/upload-product'>
            <Button>
              <PlusCircle className='w-4 h-4 mr-2' />
              Add product
            </Button>
          </Link>
        </>
      )}
    </Card>
  );

  const renderGridView = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {filteredProducts.map((product: Product) => (
        <Card
          key={product._id}
          className='group overflow-hidden border border-gray-200 hover:shadow-md transition-shadow'>
          <div className='relative h-48 bg-gray-100 overflow-hidden'>
            <img
              src={product.photoURLs[0]}
              alt={product.productName}
              className='w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300'
            />
            {!product.isActive && (
              <Badge variant='destructive' className='absolute top-2 right-2'>
                Inactive
              </Badge>
            )}
          </div>
          <div className='p-4'>
            <div className='flex gap-2 mb-2'>
              <Badge variant='secondary' className='text-xs capitalize'>
                {product.category}
              </Badge>
              {product.stockQuantity <= 0 && (
                <Badge variant='destructive' className='text-xs'>
                  Out of stock
                </Badge>
              )}
              {product.stockQuantity > 0 && product.stockQuantity < 5 && (
                <Badge variant='secondary' className='text-xs'>
                  Low stock
                </Badge>
              )}
            </div>
            <h3 className='font-semibold text-gray-900 line-clamp-1 mb-1'>{product.productName}</h3>
            {product.brand && (
              <div className='flex items-center gap-1 text-gray-500 text-sm mb-2'>
                <Tag className='w-3 h-3' />
                <span>{product.brand}</span>
              </div>
            )}
            <p className='text-gray-600 text-sm line-clamp-2 mb-3'>{product.description || 'No description'}</p>
            <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
              <span className='text-lg font-semibold text-gray-900'>${formatPrice(product.price)}</span>
              <span className='text-sm text-gray-500'>{product.stockQuantity} in stock</span>
            </div>
            <div className='flex gap-2 mt-3'>
              <Link to={`/product/${product._id}`} className='flex-1'>
                <Button variant='outline' size='sm' className='w-full'>
                  <ExternalLink className='w-3 h-3 mr-1' />
                  View
                </Button>
              </Link>
              <Link to={`/edit-product/${product._id}`} className='flex-1'>
                <Button size='sm' className='w-full'>
                  <Edit className='w-3 h-3 mr-1' />
                  Edit
                </Button>
              </Link>
              <div>
                <Button onClick={() => deleteProduct(product._id)} size='sm' className='w-full'>
                  <LucideDelete className='w-3 h-3 mr-1' />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <Card className='overflow-hidden border border-gray-200'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Product</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Stock</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Status</th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredProducts.map((product: Product) => (
              <tr key={product._id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={product.photoURLs[0]}
                      alt={product.productName}
                      className='h-12 w-12 rounded object-cover bg-gray-100'
                    />
                    <div>
                      <div className='text-sm font-medium text-gray-900'>{product.productName}</div>
                      {product.brand && (
                        <div className='text-xs text-gray-500 flex items-center gap-1'>
                          <Tag className='w-3 h-3' />
                          {product.brand}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  ${formatPrice(product.price)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{product.stockQuantity}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Badge variant='secondary' className='capitalize'>
                    {product.category}
                  </Badge>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Badge variant={product.isActive ? 'outline' : 'destructive'}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm'>
                  <div className='flex justify-end gap-2'>
                    <Link to={`/product/${product._id}`}>
                      <Button variant='outline' size='sm'>
                        <ExternalLink className='w-3 h-3 mr-1' />
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-product/${product._id}`}>
                      <Button size='sm'>
                        <Edit className='w-3 h-3 mr-1' />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <>
      <Nav />
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto p-6 space-y-6 animate-fade-in'>
          {/* Header */}
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
              <p className='text-gray-600 mt-1'>{products.length} total products</p>
            </div>
            <Link to='/upload-product'>
              <Button>
                <PlusCircle className='w-4 h-4 mr-2' />
                Add product
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card className='p-4 border border-gray-200'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  type='text'
                  placeholder='Search products...'
                  className='pl-9'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className='flex gap-2'>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className='w-40'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='newest'>Newest</SelectItem>
                    <SelectItem value='oldest'>Oldest</SelectItem>
                    <SelectItem value='price-high'>Price: High</SelectItem>
                    <SelectItem value='price-low'>Price: Low</SelectItem>
                    <SelectItem value='name-asc'>Name: A-Z</SelectItem>
                    <SelectItem value='name-desc'>Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>
                      <Filter className='w-4 h-4 mr-2' />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterCategory('all')}>All</DropdownMenuItem>
                    {activeCategories.map((category) => (
                      <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                        {category}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus('all')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('active')}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('inactive')}>Inactive</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('low-stock')}>Low stock</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className='flex border border-gray-200 rounded-md'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className='rounded-r-none'>
                    <Grid3x3 className='w-4 h-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className='rounded-l-none'>
                    <List className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Products */}
          {filteredProducts.length === 0
            ? renderEmptyState()
            : viewMode === 'grid'
              ? renderGridView()
              : renderListView()}
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
