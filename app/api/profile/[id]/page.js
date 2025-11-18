import prisma from "@/app/_lib/prisma";

function isString(x) {
    return typeof x === "string" && x.trim().length > 0;
}
function isEmail(x) {
    return isString(x) && x.indexOf("@") !== -1;
}

function parseId(x) {
    const n = Number(x);
    if (!Number.isInteger(n) || n <= 0) return null;
    return n;
}


export async function GET(_request, { params }) {
    const id = parseId(params.id);
    if (id === null) return Response.json({ error: "Invalid" }, { status: 400 });

const row = await prisma.profiles.findUnique({
    where: { id: id },
    });

if (!row) return Response.json({ error: "Not found" }, { status: 404 });

return Response.json(row, { status: 200 });
}


export async function PUT(request, { params }) {
    const id = parseId(params.id);
    if (id === null) return Response.json({ error: "Invalid" }, { status: 400 });

let body;
try {
    body = await request.json();
} catch (e) {
    return Response.json({ error: "Invalid" }, { status: 400 });
}

    if (!isString(body?.name))      return Response.json({ error: "Invalid" }, { status: 400 });
    if (!isString(body?.title))     return Response.json({ error: "Invalid" }, { status: 400 });
    if (!isEmail(body?.email))      return Response.json({ error: "Invalid" }, { status: 400 });
    if (!isString(body?.bio))       return Response.json({ error: "Invalid" }, { status: 400 });
    if (!isString(body?.image_url)) return Response.json({ error: "Invalid" }, { status: 400 });

    try {
        const row = await prisma.profiles.update({
        where: { id: id },
        data: {
            name: body.name,
            title: body.title,
            email: body.email,
            bio: body.bio,
            image_url: body.image_url,
        },
    });

    return Response.json(row, { status: 200 });
    } catch (e) {
        return Response.json({ error: "error" }, { status: 400 });
    }
}

export async function DELETE(_request, { params }) {
    const id = parseId(params.id);
    if (id === null) return Response.json({ error: "Invalid id" }, { status: 400 });

try {
    await prisma.profiles.delete({
        where: { id: id },
    });
    return Response.json({ success: true }, { status: 200 });
    } catch (e) {
    return Response.json({ error: "Not found" }, { status: 404 });
}
}
