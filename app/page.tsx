"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import StoryList from "./components/StoryList";
import StoryPlayer from "./components/StoryPlayer";

const storiesData = [
  { id: 1, image: "/profiles/pic1.jpg" },
  { id: 2, image: "/profiles/pic2.jpg" },
  { id: 3, image: "/profiles/pic3.jpg" },
  { id: 4, image: "/profiles/pic4.jpg" },
  { id: 5, image: "/profiles/pic5.jpg" },
];

const Home = () => {
  const [activeStoryId, setActiveStoryId] = useState<number | null>(null);

  const handleStorySelect = (id: number) => {
    setActiveStoryId(id);
  };

  const handleNextStory = () => {
    if (activeStoryId !== null) {
      const nextStoryId = (activeStoryId % storiesData.length) + 1;
      setActiveStoryId(nextStoryId);
    }
  };

  const handlePreviousStory = () => {
    if (activeStoryId !== null) {
      const prevStoryId =
        activeStoryId === 1 ? storiesData.length : activeStoryId - 1;
      setActiveStoryId(prevStoryId);
    }
  };
  return (
    <div className="main-wrapper">
      <header className="main-header flex flex-col gap-4">
        <Image
          src="/icons/instagram_logo.svg"
          width={102}
          height={28}
          alt="Instagram logo"
        />
      </header>
      {activeStoryId === null ? (
        <StoryList stories={storiesData} onStorySelect={handleStorySelect} />
      ) : (
        <StoryPlayer
          stories={storiesData}
          activeStoryId={activeStoryId}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </div>
  );
};

export default Home;
