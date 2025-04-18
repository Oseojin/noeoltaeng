"use client";

import { useEffect, useState } from "react";

export default function NicknameEditor() {
  const [nickname, setNickname] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetch("/api/nickname/get")
      .then((res) => res.json())
      .then((data) => setNickname(data.nickname));
  }, []);

  const handleSave = async () => {
    await fetch("/api/nickname/set", {
      method: "POST",
      body: JSON.stringify({ nickname }),
      headers: { "Content-Type": "application/json" },
    });
    setEditing(false);
  };

  return (
    <div className="flex gap-2 items-center">
      {editing ? (
        <>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            저장
          </button>
        </>
      ) : (
        <span onClick={() => setEditing(true)} className="cursor-pointer">
          🧑‍💻 닉네임: {nickname || "없음"} (클릭하여 수정)
        </span>
      )}
    </div>
  );
}
