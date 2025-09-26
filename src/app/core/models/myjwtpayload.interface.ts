import { JwtPayload } from 'jwt-decode';
export interface MyJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
