// import fs from "fs";
// import path from "path";

// export default async function handler(req, res) {
//   const storiesPath = path.join(process.cwd(), "public", "stories.json");
//   const storiesData = await fs.promises.readFile(storiesPath, "utf8");
//   const stories = JSON.parse(storiesData);

//   res.status(200).json(stories);
// }

export default async function handler(req, res) {
  const storiesUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/stories.json`;

  try {
    const response = await fetch(storiesUrl);
    const stories = await response.json();

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: "Failed to load stories" });
  }
}
