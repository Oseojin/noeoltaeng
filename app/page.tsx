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
    <main
      className="min-h-screen p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">NOEOLTAENG</h1>
        <NicknameEditor />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {contentList.map((c) => (
          <ContentCard
            key={c.url}
            title={c.title}
            url={c.url}
            thumbnail={c.thumbnail}
          />
        ))}
      </div>
    </main>
  );
}
