// if (!global.profiles) {
//     global.profiles = [
//         { id: 1, name: "Ava Lee",  major: "CS",  year: 2, gpa: 3.6 },
//         { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
//     ];
// }
// function list() { return global.profiles; }


//     function isString(x) { return typeof x === "string" && x.trim().length > 0; }
//     function isYear(x)   { var n = Number(x); return Number.isInteger(n) && n >= 1 && n <= 4; }
//     function isGpa(x)    { var n = Number(x); return Number.isFinite(n) && n >= 0 && n <= 4; }
//     function parseId(x)  { var n = Number(x); return Number.isInteger(n) && n > 0 ? n : null; }


// function checkNew(b) {
//     if (!b) return { ok:false, msg:"Missing" };
//     if (!isString(b.name))  return { ok:false, msg:"Invalid name"  };
//     if (!isString(b.major)) return { ok:false, msg:"Invalid major" };
//     if (!isYear(b.year))    return { ok:false, msg:"Invalid year" };
//     if (!isGpa(b.gpa))      return { ok:false, msg:"Invalid gpa" };
//     return { ok:true };
// }


// function findIndexById(id) {
//     var arr = list();
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].id === id) return i;
//     }
//     return -1;
// }

// // GET
// export async function GET(request) {
//     var sp = request.nextUrl.searchParams; 
//     var major = sp.get("major") || "";
//     var year  = sp.get("year")  || "";
//     var name  = sp.get("name")  || sp.get("q") || "";

//     var out = list().slice();

//     if (isYear(year)) {
//         var y = Number(year);
//         var tmp = [];
//         for (var i = 0; i < out.length; i++) {
//         if (out[i].year === y) tmp.push(out[i]);
//     }
//         out = tmp;
//     }

//     if (isString(major)) {
//         var tmp2 = [];
//         for (var j = 0; j < out.length; j++) {
//             if (out[j].major === major) tmp2.push(out[j]);
//     }
//         out = tmp2;
//     }

//     if (isString(name)) {
//         var kw = name.toLowerCase();
//         var tmp3 = [];
//         for (var k = 0; k < out.length; k++) {
//             var nm = String(out[k].name || "").toLowerCase();
//             if (nm.indexOf(kw) !== -1) tmp3.push(out[k]);
//     }
//         out = tmp3;
//     }

//     return Response.json(out);
// }

// // POST
// export async function POST(request) {
//     var body;
//     try { body = await request.json(); }
//     catch { return Response.json({ error:"Invalid" }, { status:400 }); }

//     var v = checkNew(body);
//     if (!v.ok) return Response.json({ error:v.msg }, { status:400 });

//     var item = {
//         id: Date.now(),
//         name: body.name,
//         major: body.major,
//         year: Number(body.year),
//         gpa: Number(body.gpa),
//     };
//     list().push(item);
//     return Response.json(item, { status:201 });
// }

// // DELETE
// export async function DELETE(request) {
//     var sp = request.nextUrl.searchParams;
//     var id = parseId(sp.get("id"));
//     if (id === null) return Response.json({ error:"invalid id" }, { status:400 });

//     var idx = findIndexById(id);
//     if (idx === -1) return Response.json({ error:"Not found" }, { status:404 });

//     list().splice(idx, 1);
//     return Response.json({ success:true });
// }
import prisma from "@/app/_lib/prisma";


function isString(x) {
    return typeof x === "string" && x.trim().length > 0;
}

function isEmail(x) {
    return isString(x) && x.indexOf("@") !== -1;
}


export async function GET() {
    const rows = await prisma.profiles.findMany({
        orderBy: { id: "desc" },
    });
    return Response.json(rows, { status: 200 });
}


export async function POST(request) {
    let body;

try {
    body = await request.json();
    } catch (e) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
}

if (!isString(body?.name)) {
    return Response.json({ error: "Invalid name" }, { status: 400 });
}
if (!isString(body?.title)) {
    return Response.json({ error: "Invalid title" }, { status: 400 });
}
if (!isEmail(body?.email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
}
if (!isString(body?.bio)) {
    return Response.json({ error: "Invalid bio" }, { status: 400 });
}
if (!isString(body?.image_url)) {
    return Response.json({ error: "Invalid image_url" }, { status: 400 });
}

try {
    const row = await prisma.profiles.create({
    data: {
        name: body.name,
        title: body.title,
        email: body.email,
        bio: body.bio,
        image_url: body.image_url,
    },
    });

    return Response.json(row, { status: 201 });
} catch (e) {
    return Response.json({ error: "DB error" }, { status: 400 });
    }
}
