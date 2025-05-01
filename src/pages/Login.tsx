import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-6 py-12">
        <Card className="w-full border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-center text-slate-800">Welcome back</CardTitle>
            <CardDescription className="text-center text-slate-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com"
                className="h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <Button variant="link" className="px-0 text-sm font-medium text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password"
                className="h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium" type="submit">
              Sign in
            </Button>
            
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400 font-medium">OR CONTINUE WITH</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full h-11 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium" type="button">
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center px-8 py-6 bg-slate-50 border-t border-slate-100">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Button variant="link" className="p-0 text-blue-600 font-medium hover:text-blue-800">
                Create an account
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}