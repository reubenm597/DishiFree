// client/src/components/auth/GoogleAuth.js - Updated Version
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  return (
    <div className="google-auth">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('Login Success:', credentialResponse);
          // You will handle the successful login here.
          // The credentialResponse.credential is a JWT ID token.
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default GoogleAuth;