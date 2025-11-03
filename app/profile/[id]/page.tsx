import Link from "next/link";
import { fetchProfileById } from "@/app/_lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await fetchProfileById(id);
  return { title: p ? `${p.name} | Profile` : "Profile not found" };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await fetchProfileById(id);

  if (!p) {
    return (
      <section className="container">
        <h1 className="page-title">not found</h1>
        <p><Link href="/">Back</Link></p>
      </section>
    );
  }

  return (
    <section className="container">
      <h1 className="page-title">{p.name}</h1>
      {p.image && <img src={p.image} alt={p.name} style={{ maxWidth: 320, borderRadius: 12 }} />}
      <p><strong>Title</strong> {p.title}</p>
      <p><strong>Email</strong> {p.email}</p>
      <p>{p.bio}</p>
      <p style={{ marginTop: 16 }}>
        <Link href="/">Back</Link>
      </p>
    </section>
  );
}
