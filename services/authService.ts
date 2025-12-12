import { AuthMeResponse, ClientPrincipal } from '../types';

/**
 * Fetches the current user's information from the Azure App Service /.auth/me endpoint.
 * This endpoint is only available when hosted on Azure App Service with Authentication enabled.
 */
export const getUserInfo = async (): Promise<ClientPrincipal | null> => {
  try {
    const response = await fetch('/.auth/me');
    
    if (!response.ok) {
      // If we are running locally without a mock, this will likely 404.
      console.warn('Could not fetch auth info. Are you running locally or is Auth disabled?');
      return null;
    }

    const payload: AuthMeResponse = await response.json();

    // The endpoint returns an array of client principals. 
    // Usually, the first one is the active identity.
    if (payload && payload.length > 0) {
      return payload[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

/**
 * Helper to construct the login URL for a specific provider.
 * This directs the browser to the built-in Azure App Service login flow.
 */
export const getLoginUrl = (provider: string): string => {
  // redirect back to home after login
  return `/.auth/login/${provider}?post_login_redirect_url=/`;
};

/**
 * Helper to construct the logout URL.
 */
export const getLogoutUrl = (): string => {
  // redirect back to home after logout
  return `/.auth/logout?post_logout_redirect_url=/`;
};