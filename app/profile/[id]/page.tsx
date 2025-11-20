import Link from "next/link";
import { fetchProfileById } from "@/lib/api";
import DeleteButton from "@/components/DeleteButton";
import prisma from "@/lib/prisma";


type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
    const { id } = await params;
    const profile = await fetchProfileById(id);

if (!profile) {
    return (
        <main className="container">
        <h1>not found</h1>
        <p>
            <Link href="/">Back</Link>
        </p>
        </main>
    );
}

return (
    <main className="container">
        <h1>{profile.name}</h1>
        <p>{profile.title}</p>
        <p>{profile.email}</p>
        <p>{profile.bio}</p>
        {profile.image && (
        <img
            src={profile.image}
            alt=""
            style={{ maxWidth: "240px", marginTop: "12px" }}
        />
    )}

    <div style={{ marginTop: "16px" }}>
        <Link href={`/profile/${profile.id}/edit`}>Edit</Link>
        <DeleteButton id={Number(profile.id)} />
    </div>

    <p style={{ marginTop: "8px" }}>
        <Link href="/">Back</Link>
    </p>
    </main>
    );
}
