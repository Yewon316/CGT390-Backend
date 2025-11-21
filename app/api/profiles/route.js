import { NextResponse } from "next/server";
import prisma from "@/lib/prisma.js";


export async function GET() {
    try {
    const rows = await prisma.profiles.findMany({
        orderBy: { id: "asc" },
    });
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { name, title, email, bio } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "name and email are required" },
        { status: 400 }
      );
    }

    const row = await prisma.profiles.create({
      data: {
        name,
        title: title || "",
        email,
        bio: bio || "",
      },
    });

    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    console.error("POST", err);
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}
