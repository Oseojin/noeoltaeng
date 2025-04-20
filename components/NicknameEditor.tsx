"use client";

import { useEffect, useState } from "react";

async function getOrCreateToken(): Promise<string> {
  if (typeof window === "undefined") return "";

  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  const res = await fetch("/api/device-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId }),
  });

  const data = await res.json();
  return data.token;
}

export default function NicknameEditor() {
  const [nickname, setNickname] = useState("");
  const [editing, setEditing] = useState(false);
  const [token, setToken] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    getOrCreateToken().then((t) => {
      setToken(t);
      fetch("/api/nickname/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: t }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNickname(data.nickname ?? "");
          if (data.found === false) {
            setShowWarning(true);
          }
        });
    });
  }, []);

  const handleSave = async () => {
    if (!token) return;

    const res = await fetch("/api/nickname/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, nickname }),
    });

    if (res.ok) {
      setEditing(false);
      setShowWarning(false);
    } else {
      const err = await res.json();
      if (res.status === 409) {
        alert("This nickname is already taken.");
      } else {
        alert(err.error ?? "Nickname Save Error");
      }
    }
  };

  return (
    <div className="mt-2 text-sm text-white flex flex-col items-start gap-1">
      {showWarning && (
        <div className="text-yellow-400 text-sm">
          ⚠️ Please set your nickname first!
        </div>
      )}
      {editing ? (
        <div className="flex gap-2 items-center">
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname"
            className="px-3 py-1 rounded border border-gray-500 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Save
          </button>
        </div>
      ) : (
        <span
          onClick={() => setEditing(true)}
          className="cursor-pointer hover:underline"
        >
          Nickname: {nickname || "None"} (Click to Change)
        </span>
      )}
    </div>
  );
}
