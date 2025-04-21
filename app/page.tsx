import ContentCard from "@/components/ContentCard";
import NicknameEditor from "@/components/NicknameEditor";

const contentList = [
  {
    title: "OIIA",
    url: "https://oiiaoiia.net",
    thumbnail: "/thumbnails/oiiacat.png",
  },
  {
    title: "EAT CHEESE",
    url: "https://eat-cheese.vercel.app",
    thumbnail: "/thumbnails/eat_cheese.png",
  },
  {
    title: "Confirm Speed Test",
    url: "https://confirm-speed-test.vercel.app/",
    thumbnail: "/thumbnails/confirm_speed_test.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 헤더 (타이틀 + 닉네임) */}
      <div className="p-6 h-[20vh]">
        <h1 className="text-3xl font-bold text-white">NOEOLTAENG</h1>
        <div className="mt-2">
          <NicknameEditor />
        </div>
      </div>

      {/* 앨범 영역 */}
      <div className="flex-1 px-4 pb-8 h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
          {contentList.map((c) => (
            <ContentCard
              key={c.url}
              thumbnail={c.thumbnail}
              title={c.title}
              url={c.url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
