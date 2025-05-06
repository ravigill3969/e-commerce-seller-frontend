import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function GoogleOAuth() {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleSuccess = (credentialResponse) => {
    const userInfo = jwtDecode(credentialResponse.credential);

    console.log('User Info:', userInfo);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
    </GoogleOAuthProvider>
  );
}

export default GoogleOAuth;
