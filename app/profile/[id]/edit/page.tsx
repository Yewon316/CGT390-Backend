"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";

type FormState = {
    name: string;
    email: string;
    title: string;
    bio: string;
};

export default function EditProfilePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        title: "",
        bio: "",
    });
const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/profiles/${id}`);
        if (!res.ok) {
            console.error("Failed to load profile", res.status);
            return;
        }
        const data = await res.json();
        setForm({
            name: data.name ?? "",
            email: data.email ?? "",
            title: data.title ?? "",
            bio: data.bio ?? "",
        });
    } finally {
        setLoading(false);
    }
    }

    load();
}, [id]);

async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;

    const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        console.error("Failed", res.status);
        return;
    }
    router.push(`/profile/${id}`);
    router.refresh();
}

if (loading) {
    return <main className="container">Loading…</main>;
}

return (
    <main className="container">
        <h1>Edit profile #{id}</h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
            <label>
            Name
            <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
        </label>

        <label>
        Email
        <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        </label>

        <label>
        Title
        <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        </label>

        <label>
            Bio
            <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        </label>

        <button type="submit">Save</button>
    </form>
    </main>
);
}
