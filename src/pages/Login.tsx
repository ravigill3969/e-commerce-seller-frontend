import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleOAuth from '@/components/GoogleOAuth';

export default function LoginPage() {
  const clientId = 'YOUR_GOOGLE_CLIENT_ID';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100'>
      <div className='w-full max-w-md px-6 py-12'>
        <Card className='w-full border-0 shadow-lg rounded-xl overflow-hidden'>
          <CardHeader className='space-y-2 pb-6'>
            <div className='flex justify-center mb-2'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-6 h-6 text-white'>
                  <path d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'></path>
                  <path d='M12 16v-4'></path>
                  <path d='M12 8h.01'></path>
                </svg>
              </div>
            </div>
            <CardTitle className='text-2xl font-semibold text-center text-slate-800'>Welcome back</CardTitle>
            <CardDescription className='text-center text-slate-500'>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5 px-8'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-slate-700'>
                Email address
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='name@company.com'
                className='h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password' className='text-sm font-medium text-slate-700'>
                  Password
                </Label>
                <Button variant='link' className='px-0 text-sm font-medium text-blue-600 hover:text-blue-800'>
                  Forgot password?
                </Button>
              </div>
              <Input
                id='password'
                type='password'
                className='h-11 border-slate-200 focus:border-blue-600 focus:ring-blue-600'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className='w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium' type='submit'>
              Sign in
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full border-slate-200' />
              </div>
              <div className='relative flex justify-center'>
                <span className='bg-white px-3 text-xs text-slate-400 font-medium'>OR CONTINUE WITH</span>
              </div>
            </div>
            <GoogleOAuth />
          </CardContent>
          <CardFooter className='flex justify-center px-8 py-6 bg-slate-50 border-t border-slate-100'>
            <p className='text-sm text-slate-600'>
              Don't have an account?{' '}
              <Button variant='link' className='p-0 text-blue-600 font-medium hover:text-blue-800'>
                Create an account
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
