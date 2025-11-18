if (!global.profiles) {
    global.profiles = [
        { id: 1, name: "Ava Lee",  major: "CS",  year: 2, gpa: 3.6 },
        { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
    ];
}
function list() { return global.profiles; }


    function isString(x) { return typeof x === "string" && x.trim().length > 0; }
    function isYear(x)   { var n = Number(x); return Number.isInteger(n) && n >= 1 && n <= 4; }
    function isGpa(x)    { var n = Number(x); return Number.isFinite(n) && n >= 0 && n <= 4; }
    function parseId(x)  { var n = Number(x); return Number.isInteger(n) && n > 0 ? n : null; }

function checkPart(b) {
    if (!b) return { ok:false, msg:"Missing" };
    if (b.name  !== undefined && !isString(b.name))   return { ok:false, msg:"Invalid name" };
    if (b.major !== undefined && !isString(b.major))  return { ok:false, msg:"Invalid major" };
    if (b.year  !== undefined && !isYear(b.year))     return { ok:false, msg:"Invalid year" };
    if (b.gpa   !== undefined && !isGpa(b.gpa))       return { ok:false, msg:"Invalid gpa" };
    return { ok:true };
}

function findIndexById(id) {
    var arr = list();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}

// GET
export async function GET(_req, ctx) {
    var id = parseId(ctx.params.id);
    if (id === null) return Response.json({ error:"Invalid id" }, { status:400 });

    var idx = findIndexById(id);
    if (idx === -1) return Response.json({ error:"Not found" }, { status:404 });

    return Response.json(list()[idx]);
}

// PUT
export async function PUT(req, ctx)  { return update(req, ctx); }
export async function PATCH(req, ctx){ return update(req, ctx); }

async function update(request, ctx) {
    var id = parseId(ctx.params.id);
    if (id === null) return Response.json({ error:"Invalid id" }, { status:400 });

    var idx = findIndexById(id);
    if (idx === -1) return Response.json({ error:"Not found" }, { status:404 });

    var body;
    try { body = await request.json(); }
    catch { return Response.json({ error:"Invalid" }, { status:400 }); }

    var v = checkPart(body);
    if (!v.ok) return Response.json({ error:v.msg }, { status:400 });

    var item = list()[idx];
    if (body.name  !== undefined) item.name  = body.name;
    if (body.major !== undefined) item.major = body.major;
    if (body.year  !== undefined) item.year  = Number(body.year);
    if (body.gpa   !== undefined) item.gpa   = Number(body.gpa);

    return Response.json(item); 
}

// DELETE
export async function DELETE(_req, ctx) {
    var id = parseId(ctx.params.id);
    if (id === null) return Response.json({ error:"Invalid id" }, { status:400 });

    var idx = findIndexById(id);
    if (idx === -1) return Response.json({ error:"Not found" }, { status:404 });

    list().splice(idx, 1);
    return Response.json({ success:true });
}
