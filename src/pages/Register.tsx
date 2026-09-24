import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import { useRegister } from '@/api/auth-client';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { mutate } = useRegister();

  const registerButton = () => {
    mutate({
      email,
      name,
      password,
      picture: 'loading',
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md px-6 py-12 animate-fade-in'>
        <Card className='w-full shadow-sm border border-gray-200'>
          <CardHeader className='space-y-1 pb-6'>
            <CardTitle className='text-2xl font-semibold text-center text-gray-900'>Welcome</CardTitle>
            <CardDescription className='text-center text-gray-600'>Sign up for your seller account</CardDescription>
          </CardHeader>

          <CardContent className='space-y-4 px-6'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
                Name
              </Label>
              <Input
                id='name'
                type='name'
                placeholder='name'
                className='h-10'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='name@company.com'
                className='h-10'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Password
                </Label>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                className='h-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={() => registerButton()}
              className='w-full h-10 bg-gray-900 hover:bg-gray-800 text-white'
              type='submit'>
              Sign up
            </Button>
          </CardContent>

          <CardFooter className='flex justify-center px-6 py-4 bg-gray-50 border-t'>
            <p className='text-sm text-gray-600'>
              Do you have an account?{' '}
              <Link to={'/login'}>
                <Button variant='link' className='p-0 h-auto text-gray-900 font-medium'>
                  Sign in
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
