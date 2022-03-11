# Remix Blog Example with Mongoose and Quill

This example updates the Remix Blog tutorial to use Mongoose for connecting to
the MongoDB database and Quill.js for a rich text editor.

## 🛠 Setup

Copy the `.env` file from `.env.example` and set the `MONGODB_URL` to the location
of your MongoDB database.

## 🦡 Mongoose

The mongoose connection is initialized in `app/services/db.server.js`. Since the
connection is a singleton, we connect in module scope and store the reference to
ensure we only connect once.

All access to posts are done throught the `app/services/post.server.js` file. This
file defines the schema and initializes the mongoose model for `Post`.

It also includes function to get all posts, find a post by slug, and create a new post
or update an existing one.

By defining these filenames with the `*.server.js` suffix, it ensures that Remix
will not include any of the code in the client bundle.

## 🖋 Quill

Quill is a client only component, so we export that from `app/components/quill.client.js`.
It has the `*.client.js` suffix so it will not be included in the server bundle.
We also use the `<ClientOnly/>` component to ensure this component does not render
on the server. Instead it displays the `fallback` component.

There are two props that should be passed in. One is the `name` of the input. This is
used to create the `<input type="hidden">` component used for the form POST.

It also includes `defaultValue` which is used to set the initial editor contents
which are used when editing the post.

There is a `'text-change'` handler that synchronizes the content of the editor
with the hidden input.
