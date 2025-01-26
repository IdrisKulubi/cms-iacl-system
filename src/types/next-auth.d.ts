import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    image?: string | null;
    department?: string | null;
    position?: string | null;
    employeeId?: string | null;
  }

  interface Session {
    user: User;
  }
}
