import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, LayoutDashboard, Package, Upload, Menu } from 'lucide-react';
import { useLogout } from '@/api/auth-client';
import { useState } from 'react';

const Nav = () => {
  const { mutate } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center'>
            <span className='text-xl font-semibold text-gray-900'>SellerPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            <Link to='/'>
              <Button variant='ghost' className='text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
                <Package className='w-4 h-4 mr-2' />
                Products
              </Button>
            </Link>
            <Link to='/upload-product'>
              <Button variant='ghost' className='text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
                <Upload className='w-4 h-4 mr-2' />
                Upload
              </Button>
            </Link>
            <Link to='/dashboard'>
              <Button variant='ghost' className='text-gray-600 hover:text-gray-900 hover:bg-gray-50'>
                <LayoutDashboard className='w-4 h-4 mr-2' />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src='/avatar-placeholder.png' />
                    <AvatarFallback className='bg-gray-100 text-gray-700'>SP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/settings' className='cursor-pointer'>
                    <Settings className='w-4 h-4 mr-2' />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/dashboard' className='cursor-pointer'>
                    <LayoutDashboard className='w-4 h-4 mr-2' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => mutate()} className='text-red-600 cursor-pointer'>
                  <LogOut className='w-4 h-4 mr-2' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='md:hidden'>
              <Menu className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='md:hidden border-t border-gray-200 bg-white'>
          <div className='px-4 py-3 space-y-1'>
            <Link
              to='/'
              className='flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md'>
              <Package className='w-4 h-4 mr-3' />
              Products
            </Link>
            <Link
              to='/upload-product'
              className='flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md'>
              <Upload className='w-4 h-4 mr-3' />
              Upload Product
            </Link>
            <Link
              to='/dashboard'
              className='flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md'>
              <LayoutDashboard className='w-4 h-4 mr-3' />
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
