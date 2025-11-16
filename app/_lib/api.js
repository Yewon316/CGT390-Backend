import prisma from "./prisma";


function normalize(row) {
  return {
    id: String(row.id),
    name: row.name || "Unknown",
    email: row.email || "",
    title: row.title || "",
    bio: row.bio || "",
    image: row.image_url || "", 
  };
}

export async function fetchTitles() {
  const rows = await prisma.profiles.findMany({
    select: { title: true },
    distinct: ["title"],
    orderBy: { title: "asc" },
  });

  return rows.map(function (row) {
    return row.title;
  });
}


export async function fetchProfiles(title, search) {
  var where = {};

  if (typeof title === "string" && title.trim() !== "") {
    where.title = title; 
  }

  if (typeof search === "string" && search.trim() !== "") {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const rows = await prisma.profiles.findMany({
    where: where,
    orderBy: { id: "desc" },
  });

  return rows.map(normalize);
}

export async function fetchProfileById(id) {
  const n = Number(id);
  if (!Number.isInteger(n)) return null;

  const row = await prisma.profiles.findUnique({
    where: { id: n },
  });

  if (!row) return null;
  return normalize(row);
}
