import { useGoogleRegister } from '@/api/auth-client';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

type DecodedCredential = {
  email: string;
  name: string;
  picture: string;
  sub: string;
  exp: number;
  iat: number;
};

function GoogleOAuth() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const { mutate } = useGoogleRegister();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error('No credentials received');
      return;
    }

    const userInfo = jwtDecode<DecodedCredential>(credentialResponse.credential);

    mutate({
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={() => toast.error('Login failed')} />
    </GoogleOAuthProvider>
  );
}

export default GoogleOAuth;
