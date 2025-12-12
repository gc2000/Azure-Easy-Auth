import React from 'react';
import { AuthProvider } from '../types';
import { getLoginUrl } from '../services/authService';
import { FacebookIcon, GoogleIcon, MicrosoftIcon, LockIcon } from './Icons';

export const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
            <LockIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-blue-100">Securely sign in to your Azure App Service</p>
        </div>
        
        <div className="p-8 space-y-4">
          <p className="text-center text-slate-500 mb-6 text-sm">
            Choose your preferred identity provider to continue
          </p>

          <a
            href={getLoginUrl(AuthProvider.AAD)}
            className="flex items-center justify-center w-full px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-1 bg-blue-500 transition-all duration-200 -translate-x-full group-hover:translate-x-0"></div>
            <MicrosoftIcon className="w-5 h-5 mr-3" />
            <span className="font-medium text-slate-700">Sign in with Microsoft (Entra ID)</span>
          </a>

          <a
            href={getLoginUrl(AuthProvider.GOOGLE)}
            className="flex items-center justify-center w-full px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-1 bg-red-500 transition-all duration-200 -translate-x-full group-hover:translate-x-0"></div>
            <GoogleIcon className="w-5 h-5 mr-3" />
            <span className="font-medium text-slate-700">Sign in with Google</span>
          </a>

          <a
            href={getLoginUrl(AuthProvider.FACEBOOK)}
            className="flex items-center justify-center w-full px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-1 bg-blue-600 transition-all duration-200 -translate-x-full group-hover:translate-x-0"></div>
            <FacebookIcon className="w-5 h-5 mr-3" />
            <span className="font-medium text-slate-700">Sign in with Facebook</span>
          </a>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Powered by Azure App Service Authentication
          </p>
        </div>
      </div>
      
      {/* Dev helper since this only works on Azure */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 max-w-md">
        <p className="font-semibold mb-1">Running Locally?</p>
        <p>
          These buttons will return 404s locally. Deploy to Azure App Service and enable Authentication in the "Settings" blade to see it work.
        </p>
      </div>
    </div>
  );
};