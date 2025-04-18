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
      alert("Please set your nickname first!");
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
      className="cursor-pointer border rounded-xl shadow hover:shadow-lg transition duration-200 bg-black aspect-[3/4] flex flex-col justify-between items-center w-full"
    >
      {/* 이미지 */}
      <div className="flex items-center justify-center flex-1 px-2 pt-3">
        <Image
          src={thumbnail}
          alt={title}
          width={160}
          height={160}
          className="object-contain w-full h-full"
        />
      </div>

      {/* 텍스트 */}
      <div className="p-2 font-semibold text-sm text-center w-full">
        {title}
      </div>
    </div>
  );
}
