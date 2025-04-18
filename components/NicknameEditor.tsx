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
      setShowWarning(false); // 저장 성공 시 경고 제거
    } else {
      const err = await res.json();
      alert(err.error ?? "닉네임 저장 중 오류 발생");
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {showWarning && (
        <div className="text-red-500 text-sm">
          ⚠️ 닉네임을 먼저 설정해주세요!
        </div>
      )}
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
            닉네임: {nickname || "없음"} (클릭하여 수정)
          </span>
        )}
      </div>
    </div>
  );
}
