import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await auth.api.signOut({
      headers: req.headers,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}