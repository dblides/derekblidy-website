export type Post = {
  slug: string;
  title: string;
  date: string; // ISO 8601, e.g. "2025-03-01"
  content: string; // plain text or simple HTML
};

export const posts: Post[] = [
  // Add posts here. Example:
  // {
  //   slug: "my-first-post",
  //   title: "My First Post",
  //   date: "2025-03-01",
  //   content: "Hello world.",
  // },
];
