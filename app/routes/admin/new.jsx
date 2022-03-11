import quillCss from "quill/dist/quill.snow.css";
import { Form, json, redirect, useActionData } from "remix";
import { ClientOnly } from "remix-utils";
import invariant from "tiny-invariant";
import Quill from "~/components/quill.client";
import { createPost } from "~/services/post.server";

export const links = () => [{ rel: "stylesheet", href: quillCss }];

export const action = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const html = formData.get("html");

  const errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!html) errors.html = true;

  if (Object.keys(errors).length) {
    return json(errors);
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof html === "string");

  await createPost({ title, slug, html });
  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  return (
    <>
      <h2>New Post</h2>
      <Form
        method="post"
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label>
            Post Title: {errors?.title ? <em>Title is required</em> : null}
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Post Slug: {errors?.slug ? <em>Slug is required</em> : null}{" "}
            <input type="text" name="slug" />
          </label>
        </div>
        <div>
          <label htmlFor="html">Content:</label>{" "}
          {errors?.html ? <em>Content is required</em> : null}
          <br />
          <ClientOnly
            fallback={<div style={{ width: 500, height: 300 }}></div>}
          >
            {() => <Quill name="html" />}
          </ClientOnly>
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </Form>
    </>
  );
}
