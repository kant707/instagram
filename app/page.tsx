"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import UserItem from "./components/UserItem";
import StoryPlayer from "./components/StoryPlayer";
import Header from "./components/Header";
// import { BASE_API_URL } from "./utils/constant";

export interface Story {
  storySrc: string;
  storyTime: string;
  storyPlace: string;
}
export interface UserStory {
  userId: number;
  userName: string;
  profilePic: string;
  stories: Story[];
}

const Home = () => {
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [selectedUserStory, setSelectedUserStory] = useState<UserStory | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      // const apiUrl =
      //   `${BASE_API_URL}/api/stories` || "http://localhost:3000/api/stories";
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api/stories";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/stories`
        : "/api/stories";
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserStories(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleCloseOverlay = () => {
    setSelectedUserStory(null);
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
    );
  }

  return (
    <div className="relative mx-auto flex max-w-sm flex-col pb-6">
      <Header />
      <div className="profile-pictures-container">
        {userStories.map((userStory) => (
          <UserItem
            key={userStory.userId}
            profilePic={userStory.profilePic}
            userName={userStory.userName}
            onClick={() => setSelectedUserStory(userStory)}
          />
        ))}
      </div>

      {selectedUserStory !== null && (
        <StoryPlayer
          stories={selectedUserStory?.stories}
          userData={{
            userId: selectedUserStory.userId,
            userName: selectedUserStory.userName,
            profilePic: selectedUserStory.profilePic,
          }}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default Home;
