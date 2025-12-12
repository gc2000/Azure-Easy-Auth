export interface UserClaim {
  typ: string;
  val: string;
}

export interface ClientPrincipal {
  user_id: string;
  provider_name: string;
  user_claims: UserClaim[];
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