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
      className="cursor-pointer border rounded-xl shadow hover:shadow-lg transition duration-200 flex flex-col items-center bg-black w-[240px] h-[300px]"
    >
      {/* 이미지 영역 (고정 높이) */}
      <div className="flex items-center justify-center h-[200px] w-full bg-black">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      {/* 텍스트 영역 (하단 고정) */}
      <div className="p-3 font-semibold text-lg text-center w-full">
        {title}
      </div>
    </div>
  );
}
