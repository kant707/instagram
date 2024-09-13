"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import StoryItem from "./components/StoryItem";
import StoryPlayer from "./components/StoryPlayer";
import { fetchStories, fetchUsers } from "./utils/api";
import Header from "./components/Header";

const Home = () => {
  const [storiesData, setStoriesData] = useState<{
    id: number;
    stories: string[];
  }>({ id: 0, stories: [] });
  const [usersData, setUsersData] = useState<
    { userId: number; userName: string; profilePic: string }[]
  >([]);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch stories on component mount
  const getStories = async (id: number) => {
    try {
      const data = await fetchStories();
      const userStoryData = data?.find((user) => user.id === id) || {
        id: 0,
        stories: [],
      };
      console.log({ userStoryData });
      setStoriesData(userStoryData);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };
  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsersData(data);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };
  useEffect(() => {
    getUsers();
    // getStories();
  }, []);

  const handleStorySelect = (id: number) => {
    setActiveUser(id);
    getStories(id);
  };

  const handleCloseOverlay = () => {
    setActiveUser(null); // Close the overlay
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-inner">
          <Image
            src="/icons/loader.svg"
            height={64}
            width={64}
            alt="loader"
            priority
          />
        </div>
      </div>
    ); // Optionally handle loading state
  }

  return (
    <div className="relative mx-auto flex max-w-sm flex-col pb-6">
      <Header />
      <div className="profile-pictures-container">
        {usersData.map((user) => (
          <StoryItem
            key={user.userId}
            profilePic={user.profilePic}
            userName={user.userName}
            onClick={() => handleStorySelect(user.userId)}
          />
        ))}
      </div>

      {activeUser !== null && (
        <StoryPlayer
          userStories={storiesData}
          userData={
            usersData.find((user) => user.userId === activeUser) ?? {
              userId: 0,
              userName: "",
              profilePic: "",
            }
          } // Default value to prevent undefined
          onClose={handleCloseOverlay}
          // onStoryChange={(index) => console.log("Story changed to", index)}
        />
      )}
    </div>
  );
};

export default Home;
