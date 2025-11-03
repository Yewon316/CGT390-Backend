"use client";
import Link from "next/link";

export default function NavBar() {
    return (
    <nav style={{ padding: "12px", borderBottom: "1px solid" }}>
        <Link href="/">Home</Link>
        <span style={{ margin: "0 12px" }}>|</span>
        <Link href="/about">About</Link>
        <span style={{ margin: "0 12px" }}>|</span>
        <Link href="/contact">Contact</Link>
    </nav>
    );
}
