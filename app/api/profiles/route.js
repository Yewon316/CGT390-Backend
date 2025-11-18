import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET(_req, { params }) {
    const id = Number(params.id);

if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

const row = await prisma.profiles.findUnique({
    where: { id },
    });

if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

return NextResponse.json(row);
}

export async function PUT(req, { params }) {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
}

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
}

export async function DELETE(_req, { params }) {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
}

await prisma.profiles.delete({
    where: { id },
    });

return NextResponse.json({ ok: true });
}
