import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
} from "lucide-react";

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-xl font-bold flex items-center">
              <span className="bg-white text-blue-900 px-3 py-1 rounded-lg mr-2">
                SellerPro
              </span>
              <span className="hidden md:block">Dashboard</span>
            </Link>
          </div>

          {/* Middle - Navigation links (desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/seller-dashboard"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/products"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Package className="w-5 h-5 mr-2" />
              Products
            </Link>
            <Link
              to="/orders"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Orders
            </Link>
            <Link
              to="/customers"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Customers
            </Link>
          </div>

          {/* Right side - Profile and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full hover:bg-white/10 focus:ring-2 focus:ring-white/30"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden md:block">Seller Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2 border-gray-200">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/subscription" className="cursor-pointer">
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:bg-red-50 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => {/* Add mobile menu toggle logic here */}}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden bg-blue-900/95">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/seller-dashboard"
            className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/products"
            className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Products
          </Link>
          <Link
            to="/orders"
            className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            to="/customers"
            className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-md"
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;