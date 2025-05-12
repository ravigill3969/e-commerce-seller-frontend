import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useGetCurrentSellerProducts } from '@/api/product.client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Edit,
  ExternalLink,
  ListFilter,
  Package,
  PlusCircle,
  Search,
  Tag,
  AlertCircle,
  ChevronDown,
  Filter,
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

// Define types for product data
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
type StockStatus = 'destructive' | 'outline' | 'secondary';

const ProductManagement = () => {
  const { data, isLoading, error } = useGetCurrentSellerProducts();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [animateIn, setAnimateIn] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const formatPrice = (price: number): string => {
    return parseFloat(price.toString()).toFixed(2);
  };

  const getStockStatusColor = (quantity: number): StockStatus => {
    if (quantity <= 0) return 'destructive';
    if (quantity < 5) return 'secondary';
    if (quantity < 10) return 'outline';
    return 'outline';
  };

  const getStockStatusText = (quantity: number): string => {
    if (quantity <= 0) return 'Out of stock';
    if (quantity < 5) return 'Low stock';
    if (quantity < 10) return 'Limited stock';
    return 'In stock';
  };

  useEffect(() => {
    setAnimateIn(true);

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

    // Apply status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'active') {
        filtered = filtered.filter((product) => product.isActive);
      } else if (filterStatus === 'inactive') {
        filtered = filtered.filter((product) => !product.isActive);
      } else if (filterStatus === 'out-of-stock') {
        filtered = filtered.filter((product) => product.stockQuantity <= 0);
      } else if (filterStatus === 'low-stock') {
        filtered = filtered.filter((product) => product.stockQuantity > 0 && product.stockQuantity < 10);
      }
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'name-asc') {
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (sortBy === 'name-desc') {
      filtered.sort((a, b) => b.productName.localeCompare(a.productName));
    } else if (sortBy === 'stock-high') {
      filtered.sort((a, b) => b.stockQuantity - a.stockQuantity);
    } else if (sortBy === 'stock-low') {
      filtered.sort((a, b) => a.stockQuantity - b.stockQuantity);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='text-center p-8 bg-white rounded-xl shadow-lg max-w-md'>
          <div className='relative mx-auto w-20 h-20 mb-6'>
            <div className='absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-l-4 border-primary animate-spin'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <Package className='w-8 h-8 text-primary/70' />
            </div>
          </div>
          <h3 className='text-xl font-medium text-gray-800 mb-2'>Loading your inventory</h3>
          <p className='text-gray-500'>Please wait while we prepare your product dashboard</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <div className='text-center p-8 bg-white rounded-xl shadow-lg max-w-md'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6'>
            <AlertCircle className='w-8 h-8 text-red-500' />
          </div>
          <h3 className='text-xl font-bold text-gray-900 mb-3'>Error Loading Products</h3>
          <p className='text-gray-600 mb-6'>We couldn't fetch your product listings. Please try again later.</p>
          <Button className='px-6'>Retry</Button>
        </div>
      </div>
    );
  }

  const products = data?.products || [];

  const renderEmptyState = () => (
    <div className='bg-white rounded-xl shadow-md p-12 text-center border border-gray-100'>
      <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6'>
        <Package className='w-10 h-10 text-gray-400' />
      </div>
      <h3 className='text-2xl font-semibold text-gray-800 mb-3'>No Products Found</h3>
      {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
        <>
          <p className='text-gray-500 mb-8 max-w-md mx-auto'>
            No products match your current filters. Try adjusting your search criteria or clear filters to see all
            products.
          </p>
          <Button
            className='px-6 shadow-md hover:shadow-lg transition-all'
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
              setFilterStatus('all');
              setSortBy('newest');
            }}>
            Clear Filters
          </Button>
        </>
      ) : (
        <>
          <p className='text-gray-500 mb-8 max-w-md mx-auto'>
            You haven't added any products to your store yet. Start selling by adding your first product.
          </p>
          <Button className='px-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5'>
            <Link to='/upload-product' className='flex items-center gap-2'>
              <PlusCircle className='w-4 h-4' />
              Add Your First Product
            </Link>
          </Button>
        </>
      )}
    </div>
  );

  const renderGridView = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {filteredProducts.map((product: Product, index: number) => (
        <Card
          key={product._id}
          className={`group overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 rounded-xl transform hover:-translate-y-1 bg-white ${
            animateIn ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}>
          <div className='relative h-60 overflow-hidden bg-gray-100'>
            <img
              src={product.photoURLs[0]}
              alt={product.productName}
              className='w-full h-full p-4 object-cover transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute top-0 right-0 p-3'>
              {!product.isActive && (
                <Badge variant='destructive' className='shadow-sm'>
                  Inactive
                </Badge>
              )}
            </div>
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
              <Button size='sm' variant='secondary' className='bg-white/90 hover:bg-white'>
                <Link to={`/product/${product._id}`} className='flex items-center gap-1.5'>
                  <ExternalLink className='w-4 h-4' />
                  View
                </Link>
              </Button>
              <Button size='sm' variant='default' className='bg-primary/90 hover:bg-primary'>
                <Link to={`/edit-product/${product._id}`} className='flex items-center gap-1.5'>
                  <Edit className='w-4 h-4' />
                  Edit
                </Link>
              </Button>
            </div>
          </div>
          <div className='p-5'>
            <div className='flex gap-2 mb-2'>
              <Badge className='capitalize text-xs font-normal px-2 py-0.5 shadow-sm' variant='secondary'>
                {product.category}
              </Badge>
              <Badge
                variant={getStockStatusColor(product.stockQuantity)}
                className='text-xs font-normal px-2 py-0.5 shadow-sm'>
                {getStockStatusText(product.stockQuantity)}
              </Badge>
            </div>

            <h3 className='text-lg font-semibold text-gray-900 line-clamp-1 mb-1'>{product.productName}</h3>

            {product.brand && (
              <div className='flex items-center gap-1 text-gray-500 text-sm mb-2'>
                <Tag className='w-3 h-3' />
                <span>{product.brand}</span>
              </div>
            )}

            <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
              {product.description || 'No description available'}
            </p>

            <div className='mt-auto flex items-end justify-between'>
              <div className='text-xl font-bold text-primary'>${formatPrice(product.price)}</div>
              <div className='text-sm text-gray-500'>{product.stockQuantity} in stock</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Product
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
              <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Inventory
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredProducts.map((product: Product, index: number) => (
              <tr
                key={product._id}
                className={`hover:bg-gray-50 transition-colors ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 30}ms` }}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-3'>
                    <div className='h-14 w-14 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden shadow-sm'>
                      <img
                        // src={getProductImage(product)}
                        alt={product.productName}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div>
                      <div className='text-sm font-medium text-gray-900 line-clamp-1 max-w-xs mb-0.5'>
                        {product.productName}
                      </div>
                      {product.brand && (
                        <div className='text-xs text-gray-500 flex items-center gap-1'>
                          <Tag className='w-3 h-3' />
                          {product.brand}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-primary'>${formatPrice(product.price)}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex flex-col gap-1'>
                    <Badge variant={getStockStatusColor(product.stockQuantity)} className='font-normal shadow-sm w-fit'>
                      {getStockStatusText(product.stockQuantity)}
                    </Badge>
                    <span className='text-xs text-gray-500'>{product.stockQuantity} units</span>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-md inline-block'>
                    {product.category}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Badge variant={product.isActive ? 'outline' : 'destructive'} className='shadow-sm'>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <div className='flex justify-end gap-2'>
                    <Button variant='outline' size='sm' className='border-gray-200 hover:bg-gray-50'>
                      <Link to={`/product/${product._id}`} className='flex items-center gap-1.5'>
                        <ExternalLink className='w-3.5 h-3.5' />
                        View
                      </Link>
                    </Button>
                    <Button size='sm' className='shadow-sm hover:shadow-md transition-shadow'>
                      <Link to={`/edit-product/${product._id}`} className='flex items-center gap-1.5'>
                        <Edit className='w-3.5 h-3.5' />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8'>
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out transform ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Dashboard Header */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2'>
                Product Inventory
                <span className='bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-normal'>
                  {products.length} total
                </span>
              </h1>
              <p className='text-gray-500 mt-1'>Manage your store's product listings in one place</p>
            </div>

            <Button
              size='lg'
              className='shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 px-5 py-2.5 bg-primary hover:bg-primary/90'>
              <Link to='/upload-product' className='flex items-center gap-2'>
                <PlusCircle className='w-4 h-4' />
                Add New Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className='bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-grow'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                type='text'
                placeholder='Search products by name, description or brand...'
                className='pl-10 bg-gray-50 border-gray-200 focus:bg-white'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex flex-wrap gap-3'>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className='w-40 bg-gray-50 border-gray-200'>
                  <div className='flex items-center gap-2'>
                    <ChevronDown className='w-4 h-4 text-gray-500' />
                    <SelectValue placeholder='Sort by' />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='newest'>Newest first</SelectItem>
                  <SelectItem value='oldest'>Oldest first</SelectItem>
                  <SelectItem value='price-high'>Price: High to Low</SelectItem>
                  <SelectItem value='price-low'>Price: Low to High</SelectItem>
                  <SelectItem value='name-asc'>Name: A to Z</SelectItem>
                  <SelectItem value='name-desc'>Name: Z to A</SelectItem>
                  <SelectItem value='stock-high'>Stock: High to Low</SelectItem>
                  <SelectItem value='stock-low'>Stock: Low to High</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='gap-2 bg-gray-50 border-gray-200'>
                    <Filter className='w-4 h-4' />
                    Filters
                    {(filterCategory !== 'all' || filterStatus !== 'all') && (
                      <Badge className='h-5 w-5 p-0 flex items-center justify-center text-xs ml-1 bg-primary text-white'>
                        {(filterCategory !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuLabel className='text-xs text-gray-500 pt-2'>Category</DropdownMenuLabel>
                  <DropdownMenuItem
                    className={filterCategory === 'all' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterCategory('all')}>
                    All Categories
                  </DropdownMenuItem>
                  {activeCategories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className={filterCategory === category ? 'bg-gray-100' : ''}
                      onClick={() => setFilterCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-xs text-gray-500 pt-2'>Status</DropdownMenuLabel>
                  <DropdownMenuItem
                    className={filterStatus === 'all' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterStatus('all')}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={filterStatus === 'active' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterStatus('active')}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={filterStatus === 'inactive' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterStatus('inactive')}>
                    Inactive Only
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={filterStatus === 'out-of-stock' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterStatus('out-of-stock')}>
                    Out of Stock
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={filterStatus === 'low-stock' ? 'bg-gray-100' : ''}
                    onClick={() => setFilterStatus('low-stock')}>
                    Low Stock
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterCategory('all');
                      setFilterStatus('all');
                    }}
                    className='text-primary focus:text-primary'>
                    Clear Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className='flex bg-gray-100 rounded-lg p-0.5 shadow-inner h-10'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  {/* <Grid3 className="w-4 h-4" /> */}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  <ListFilter className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters display */}
          {(filterCategory !== 'all' || filterStatus !== 'all' || searchTerm) && (
            <div className='flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100'>
              {searchTerm && (
                <Badge variant='secondary' className='gap-1 px-2 py-1'>
                  Search: "{searchTerm}"
                  <button className='ml-1 hover:bg-gray-200 rounded-full p-0.5' onClick={() => setSearchTerm('')}>
                    ×
                  </button>
                </Badge>
              )}

              {filterCategory !== 'all' && (
                <Badge variant='secondary' className='gap-1 px-2 py-1'>
                  Category: {filterCategory}
                  <button
                    className='ml-1 hover:bg-gray-200 rounded-full p-0.5'
                    onClick={() => setFilterCategory('all')}>
                    ×
                  </button>
                </Badge>
              )}

              {filterStatus !== 'all' && (
                <Badge variant='secondary' className='gap-1 px-2 py-1'>
                  Status: {filterStatus.replace('-', ' ')}
                  <button className='ml-1 hover:bg-gray-200 rounded-full p-0.5' onClick={() => setFilterStatus('all')}>
                    ×
                  </button>
                </Badge>
              )}

              <button
                className='text-xs text-primary hover:text-primary/80 font-medium'
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterStatus('all');
                }}>
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Stats */}
        {filteredProducts.length > 0 && (
          <div className='flex justify-between items-center mb-4 px-1'>
            <p className='text-sm text-gray-500'>
              Showing <span className='font-medium'>{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
              {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all') && ` matching your filters`}
            </p>

            {filteredProducts.length !== products.length && (
              <p className='text-sm text-gray-500'>
                {products.length - filteredProducts.length}{' '}
                {products.length - filteredProducts.length === 1 ? 'product is' : 'products are'} hidden by current
                filters
              </p>
            )}
          </div>
        )}

        {filteredProducts.length === 0 ? renderEmptyState() : viewMode === 'grid' ? renderGridView() : renderListView()}
      </div>
    </div>
  );
};

export default ProductManagement;
