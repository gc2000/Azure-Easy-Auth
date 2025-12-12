import React, { useMemo } from 'react';
import { ClientPrincipal } from '../types';
import { getLogoutUrl } from '../services/authService';
import { UserCircleIcon } from './Icons';

interface UserProfileProps {
  user: ClientPrincipal;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Extract a display name from claims if possible
  const displayName = useMemo(() => {
    const nameClaim = user.claims.find(
      c => c.typ === 'name' || c.typ.includes('name') || c.typ.includes('emailaddress')
    );
    return nameClaim ? nameClaim.val : user.details || 'Authenticated User';
  }, [user]);

  // Group claims for better readability (shorten standard schemas)
  const formattedClaims = useMemo(() => {
    return user.claims.map(claim => ({
      ...claim,
      displayType: claim.typ.split('/').pop() || claim.typ
    }));
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <UserCircleIcon className="w-12 h-12 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{displayName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 border border-green-200 uppercase tracking-wide">
                {user.auth_typ}
              </span>
              <span className="text-sm text-slate-500">Logged in via Azure Easy Auth</span>
            </div>
          </div>
        </div>
        
        <a 
          href={getLogoutUrl()}
          className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-medium rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap"
        >
          Sign Out
        </a>
      </div>

      {/* Claims Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800">Identity Claims</h3>
          <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
            Count: {user.claims.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-8 py-3 w-1/3">Claim Type</th>
                <th className="px-8 py-3 w-2/3">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {formattedClaims.map((claim, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-3 font-mono text-slate-600 text-xs break-all" title={claim.typ}>
                    {claim.displayType}
                  </td>
                  <td className="px-8 py-3 text-slate-800 break-all">
                    {claim.val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};