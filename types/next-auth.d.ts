import 'next-auth';
import '@auth/core/jwt';

export declare module "next-auth" {
  interface User {
    accessToken: string;
    authProvider: string;
    name: string;
    email: string
  }

  interface Session {
    user: {
      accessToken: string;
      authProvider: string;
    }
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    email: string | null;
    accessToken: string;
    authProvider: string;
  }
}