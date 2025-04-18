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
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 상단 헤더 */}
      <div className="p-4 flex justify-between items-center h-[20vh]">
        <h1 className="text-3xl font-bold">NOEOLTAENG</h1>
        <NicknameEditor />
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
