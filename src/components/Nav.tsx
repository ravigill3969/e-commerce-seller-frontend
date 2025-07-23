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
import { LogOut } from 'lucide-react';
import { useLogout } from '@/api/auth-client';

const Nav = () => {
  const { mutate } = useLogout();
  return (
    <nav className='bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl border-b border-white/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* Left side - Logo and main nav */}
          <div className='flex items-center flex-shrink-0'>
            <Link to='/' className='text-xl font-bold flex items-center group'>
              <span className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl mr-3 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 transform group-hover:scale-105'>
                SellerPro
              </span>
            </Link>
          </div>

          {/* Middle - Navigation links (desktop) */}
          {/* <div className='hidden md:flex items-center space-x-1'>
            <Link
              to='/'
              className='flex items-center px-4 py-2 rounded-xl hover:bg-white/10 hover:text-blue-200 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
              <Package className='w-5 h-5 mr-2' />
              Products
            </Link>
            <Link
              to='/orders'
              className='flex items-center px-4 py-2 rounded-xl hover:bg-white/10 hover:text-blue-200 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
              <ShoppingCart className='w-5 h-5 mr-2' />
              Orders
            </Link>
            <Link
              to='/customers'
              className='flex items-center px-4 py-2 rounded-xl hover:bg-white/10 hover:text-blue-200 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
              <Users className='w-5 h-5 mr-2' />
              Customers
            </Link>
          </div> */}

          {/* Right side - Profile and mobile menu */}
          <div className='flex items-center space-x-4'>
            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='rounded-xl hover:bg-white/10 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/30'>
                  <Avatar className='w-8 h-8 ring-2 ring-white/20'>
                    <AvatarImage src='/avatar-placeholder.png' />
                    <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold'>
                      SP
                    </AvatarFallback>
                  </Avatar>
                  <span className='ml-2 hidden md:block font-medium'>Seller Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56 mt-2 border-gray-200 shadow-xl backdrop-blur-sm bg-white/95'>
                <DropdownMenuLabel className='font-semibold text-gray-700'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/settings' className='cursor-pointer hover:bg-blue-50 transition-colors'>
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {/* <Link to='/subscription' className='cursor-pointer hover:bg-blue-50 transition-colors'>
                    Subscription
                  </Link> */}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => mutate}
                  className='text-red-600 hover:bg-red-50 cursor-pointer font-medium'>
                  <LogOut className='w-4 h-4 mr-2' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className='md:hidden bg-gradient-to-b from-blue-900/95 to-indigo-900/95 backdrop-blur-sm border-t border-white/10'>
        <div className='px-4 pt-4 pb-6 space-y-2'>
          {/* <Link
            to='/'
            className='flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
            <Package className='w-5 h-5 mr-3' />
            Products
          </Link>
          <Link
            to='/orders'
            className='flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
            <ShoppingCart className='w-5 h-5 mr-3' />
            Orders
          </Link>
          <Link
            to='/customers'
            className='flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20'>
            <Users className='w-5 h-5 mr-3' />
            Customers
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
