import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import ChatWrapper from "../components/ChatWrapper";

interface pageprops {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

const Page = async ({ params }: pageprops) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  const isAlreadyIndexed = await redis.sismember(
    "indexed_urls",
    reconstructedUrl
  );

  console.log(params);

  const session = "mock-session";


  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed_urls", reconstructedUrl);
  }

  return <ChatWrapper sessionid={session}/>
};

export default Page;
