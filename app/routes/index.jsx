import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <h1>Remix Blog Example</h1>
      <ul>
        <li>
          <Link to="/posts">View Posts</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
}
