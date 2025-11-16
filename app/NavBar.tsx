"use client";
import Link from "next/link";

export default function NavBar() {
    return (
    <nav style={{ padding: "8px 16px", borderBottom: "1px solid" }}>
        <Link href="/">Home</Link> {" | "}
        <Link href="/about">About</Link> {" | "}
        <Link href="/contact">Contact</Link> {" | "}
        <Link href="/add-profile">Add profile</Link>
    </nav>
);
}

