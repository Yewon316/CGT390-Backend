"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProfilePage() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [msg, setMsg] = useState("");

const router = useRouter();

async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    const body = {
        name: name,
        title: title,
        email: email,
        bio: bio,
        image_url: imageUrl,
    };

    const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (res.status === 201) {
        setMsg("Saved!");
        router.push("/");
    } else {
        const data = await res.json();
        setMsg(data.error || "Error");
    }
}

return (
    <main style={{ maxWidth: "600px", margin: "24px auto" }}>
        <h1>Add Profile</h1>

    <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>
            <br />
            <input
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="Yewon"
            />
        </div>

        <div>
            <label>Title</label>
            <br />
            <input
            value={title}
            onChange={function (e) { setTitle(e.target.value); }}
            placeholder="Developer"
            />
        </div>

        <div>
            <label>Email</label>
            <br />
            <input
            value={email}
            onChange={function (e) { setEmail(e.target.value); }}
            placeholder="@google.com"
            />
        </div>

        <div>
            <label>Bio</label>
            <br />
            <textarea
            rows={4}
            value={bio}
            onChange={function (e) { setBio(e.target.value); }}
            placeholder="bio"
            />
        </div>

        <div>
            <label>Image</label>
            <br />
            <input
            value={imageUrl}
            onChange={function (e) { setImageUrl(e.target.value); }}
            />
        </div>

        <button type="submit" style={{ marginTop: "12px" }}>
            Save
        </button>
        </form>

        {msg && <p style={{ marginTop: "12px" }}>{msg}</p>}
    </main>
);
}
