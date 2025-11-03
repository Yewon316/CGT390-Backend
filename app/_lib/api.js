function normalize(raw) {
    return {
      id: String(raw.id),
      name: raw.name || "Unknown",
      email: raw.email || "",
      title: raw.title || "",
      bio: raw.bio || "",
      image: raw.image_url || "",
    };
  }
  
  export async function fetchTitles() {
    const res = await fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php", { cache: "force-cache" });
    const data = await res.json();
    return Array.isArray(data?.titles) ? data.titles : [];
  }
  
  export async function fetchProfiles(title, search) {
    const url =
      title === "" && search.trim() === ""
        ? "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php"
        : "https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php"
          + `?title=${encodeURIComponent(title)}&name=${encodeURIComponent(search)}&page=1&limit=10`;
  
    const res = await fetch(url, { cache: "force-cache" });
    const data = await res.json();
    const raw = Array.isArray(data) ? data : (data && data.profiles) || [];
    if (!Array.isArray(raw)) return [];
    return raw.map(normalize);
  }
  
  export async function fetchProfileById(id) {
    const all = await fetchProfiles("", "");
    return all.find(p => p.id === String(id)) || null;
  }
  