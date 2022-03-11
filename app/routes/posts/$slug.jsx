import { json, useLoaderData } from "remix";
import { getPost } from "~/services/post.server";

export const loader = async ({ params }) => {
  const post = await getPost(params.slug);
  return json(post);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
