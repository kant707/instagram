"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import StoryItem from "./components/StoryItem";
import StoryPlayer from "./components/StoryPlayer";
import { fetchStories } from "./utils/api";

const Home = () => {
  const [storiesData, setStoriesData] = useState<
    { id: number; profilePic: string; stories: string[] }[]
  >([]);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch stories on component mount
  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchStories();
        setStoriesData(data);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    getStories();
  }, []);

  const handleStorySelect = (id: number) => {
    setActiveUser(id);
  };

  const handleCloseOverlay = () => {
    setActiveUser(null); // Close the overlay
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <div>
      <div className="profile-pictures-container">
        {storiesData.map((user) => (
          <StoryItem
            key={user.id}
            profilePic={user.profilePic}
            onClick={() => handleStorySelect(user.id)}
          />
        ))}
      </div>

      {activeUser !== null && (
        <StoryPlayer
          stories={
            storiesData.find((user) => user.id === activeUser)?.stories || []
          }
          onClose={handleCloseOverlay}
          onStoryChange={(index) => console.log("Story changed to", index)}
        />
      )}
    </div>
  );
};

export default Home;
