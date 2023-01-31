export interface IPortalUser {
  userId: string;
  userName: string;
  roles: string[];
  idToken: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
