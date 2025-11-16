import Link from "next/link";
import { fetchTitles, fetchProfiles } from "./_lib/api";

export const metadata = { title: "Profiles" };

type Profile = {
  id: string;
  name: string;
  title: string;
  bio: string;
}

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sp = searchParams || {};
  const title = typeof sp.title === "string" ? sp.title : "";
  const search = typeof sp.search === "string" ? sp.search : "";

  const [titles, items] = await Promise.all([
    fetchTitles(),
    fetchProfiles(title, search),
  ]);

  return (
    <section className="container">
      <h1 className="page-title">Profiles</h1>

      <form className="filters" action="/">
        <select name="title" defaultValue={title}>
          <option value="">All titles</option>
          {titles.map((t: string) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          name="search"
          placeholder="Search name…"
          defaultValue={search}
        />
        <button type="submit">Enter</button>
        <a href="/" style={{ padding: "8px 10px" }}>
          Reset
        </a>
      </form>

      <ul className="grid">
        {items.map((p: Profile) => (
          <li key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>{p.title}</p>
            <p>{p.bio}</p>
            <Link href={`/profile/${p.id}`}>details</Link>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p>No results</p>}
    </section>
  );
}
