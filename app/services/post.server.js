import { mongoose } from "~/services/db.server";

const postSchema = new mongoose.Schema({
  slug: String,
  title: String,
  html: String,
});

const Post = mongoose.model("Post", postSchema);

export async function getPosts() {
  const posts = await Post.find();
  return posts;
}

export async function getPost(slug) {
  const post = await Post.findOne({ slug }).exec();
  return post;
}

export async function createPost(post) {
  const newPost = await Post.create(post);
  return newPost;
}

export async function updatePost(post) {
  const updatedPost = await Post.findOneAndUpdate(
    { slug: post.slug },
    post
  ).exec();
  return updatedPost;
}
