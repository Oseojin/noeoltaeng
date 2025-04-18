"use client";

import Image from "next/image";
import { useCallback } from "react";
import { getOrCreateDeviceId } from "@/utils/device";

type Props = {
  title: string;
  url: string;
  thumbnail: string;
};

export default function ContentCard({ title, url, thumbnail }: Props) {
  const handleClick = useCallback(async () => {
    const deviceId = getOrCreateDeviceId();

    // 1. 토큰 발급
    const tokenRes = await fetch("/api/device-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    });
    const { token } = await tokenRes.json();

    // 2. 닉네임 조회
    const nicknameRes = await fetch("/api/nickname/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await nicknameRes.json();

    if (!data.nickname) {
      alert("닉네임을 먼저 설정해주세요!");
      return;
    }

    // 3. URL에 token + nickname 추가해서 이동
    const redirectUrl = `${url}?token=${encodeURIComponent(
      token
    )}&nickname=${encodeURIComponent(data.nickname)}`;
    window.location.href = redirectUrl;
  }, [url]);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200"
    >
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 font-semibold text-lg">{title}</div>
    </div>
  );
}
