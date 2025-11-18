"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  async function handleClicked() {
    const res = await fetch(`/api/profiles/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed", res.status);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClicked}
      style={{ marginLeft: 8, color: "red" }}
    >
        Delete
    </button>
  );
}
