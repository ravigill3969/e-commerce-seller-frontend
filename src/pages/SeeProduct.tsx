import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, PlusCircle } from "lucide-react";

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: 299.99,
    stock: 15,
    category: "Fashion",
    image: "/images/jacket.jpg"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 159.99,
    stock: 25,
    category: "Electronics",
    image: "/images/headphones.jpg"
  }
];

const SeeProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Products</h1>
          <Button asChild>
            <Link to="/upload-product" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Add New Product
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stock:</span>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      {product.stock} in stock
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/edit-product/${product.id}`} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeProduct;