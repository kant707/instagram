import stories from "../../app/utils/data";
// import fs from "fs";
// import path from "path";

// export default async function handler(req, res) {
//   const storiesPath = path.join(process.cwd(), "public", "stories.json");
//   const storiesData = await fs.promises.readFile(storiesPath, "utf8");
//   const stories = JSON.parse(storiesData);

//   res.status(200).json(stories);
// }

export default async function handler(req, res) {
  try {
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      error: "Failed to load stories",
    });
  }
}
