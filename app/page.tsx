import NicknameEditor from "@/components/NicknameEditor";
import Image from "next/image";
import Link from "next/link";

const contentList = [
  {
    title: "게임 사이트",
    url: "https://game.example.com",
    thumbnail: "/thumbnails/game.png",
  },
  {
    title: "심리 테스트",
    url: "https://test.example.com",
    thumbnail: "/thumbnails/test.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">얼탱이 없는 사이트</h1>
        <NicknameEditor />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {contentList.map((c) => (
          <Link
            key={c.url}
            href={c.url}
            className="border border-black dark:border-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-200 bg-white dark:bg-black"
          >
            <Image
              src={c.thumbnail}
              alt={c.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover grayscale dark:invert"
            />
            <div className="p-4 font-semibold text-lg">{c.title}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
