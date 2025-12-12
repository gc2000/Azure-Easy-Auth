export interface UserClaim {
  typ: string;
  val: string;
}

export interface ClientPrincipal {
  auth_typ: string; // The identity provider (e.g., "aad", "google", "facebook")
  name_typ: string;
  role_typ: string;
  claims: UserClaim[];
}

// Response format from /.auth/me
export type AuthMeResponse = ClientPrincipal[];

export enum AuthProvider {
  AAD = 'aad',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  GITHUB = 'github'
}