import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function getId(params) {
  if (!params || typeof params.id === "undefined") {
    return null;
  }

  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return null;
  }

  return id;
}

export async function GET(_req, { params }) {
    const id = getId(params);

if (id === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const row = await prisma.profiles.findUnique({
      where: { id },
    });

    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(row);
  } catch (err) {
    console.error("GET /api/profiles/[id] error:", err);
    return NextResponse.json(
        { error: "Failed to load profile" },
        { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
    const id = getId(params);

if (id === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
}

try {
    const body = await req.json();

    const updated = await prisma.profiles.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        title: body.title,
        bio: body.bio,
      },
    });

    return NextResponse.json(updated);
} catch (err) {
    console.error("PUT /api/profiles/[id] error:", err);
    return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
    );
}
}
export async function DELETE(_req, { params }) {
    try {
        console.log("DELETE /api/profiles/[id] params =", params);

    const id = Number(params.id);
    const deleted = await prisma.profiles.deleteMany({
        where: { id },
    });

    return NextResponse.json({ ok: true, deleted });
    } catch (err) {
        console.error("DELETE /api/profiles/[id] error:", err);
        return NextResponse.json(
        { error: "Failed to delete profile" },
        { status: 500 }
    );
    }
}
