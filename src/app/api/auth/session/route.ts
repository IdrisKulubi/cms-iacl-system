import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        status: "unauthenticated",
        session: null,
      }),
      { status: 401 }
    );
  }

  return NextResponse.json({
    status: "authenticated",
    session: {
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
        role: session.user?.role,
        image: session.user?.image,
      },
    },
  });
}
