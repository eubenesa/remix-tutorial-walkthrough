import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { Joke } from ".prisma/client";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Pick<Joke, "content" | "name"> };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
    select: { name: true, content: true },
  });
  if (!joke) throw new Error("Joke not found");
  const data: LoaderData = {
    joke,
  };
  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
