import { useState, useEffect, MouseEventHandler } from "react";
import ProgressBar from "./ProgressBar";

interface StoryPlayerProps {
  userStories: { id: number; stories: string[] };
  userData?: { userId: number; userName: string; profilePic: string };
  onClose: () => void;
  // onStoryChange: (index: number) => void;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({
  userStories,
  userData,
  onClose,
  // onStoryChange,
}) => {
  if (!userData) {
    return null; // Or handle this case as needed
  }
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalStories = userStories.stories.length;

  // Automatically change story after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 20); // Progress in 20% steps (5 seconds for full)
      } else {
        nextStory();
      }
    }, 1000); // Every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [progress]);

  const nextStory = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0); // Reset progress for new story
    } else {
      onClose(); // Close overlay when all stories are finished
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0); // Reset progress for previous story
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    // const handleClick = () => {
    const { clientX } = e;
    const { innerWidth } = window;
    if (clientX < innerWidth / 2) {
      prevStory(); // Left click - show previous story
    } else {
      nextStory(); // Right click - show next story
    }
  };

  return (
    <div className="story-player-overlay" onClick={handleClick}>
      <div className="action-box">
        <div className="progress-bars-container">
          {userStories.stories.map((_, index) => (
            <ProgressBar
              key={index}
              progress={index === currentStoryIndex ? progress : 0}
              active={index === currentStoryIndex}
            />
          ))}
        </div>
        <div className="dynamic-content-box">
          <div className="flex">
            <div className="profile-picture" onClick={onClose}>
              <img src={userData.profilePic} alt="User profile picture" />
            </div>
            <div className="details">
              <div className="row-1 flex col-gap-4">
                <span className="user-name">{userData.userName}</span>
                <span className="story-time">10m</span>
              </div>
              <div className="row-2">
                <img
                  src="/icons/camera.svg"
                  alt="camera icon"
                  className="source-icon"
                />
                <span className="story-text">At Coding Cafe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={userStories.stories[currentStoryIndex]}
        className="story-pic"
        alt="Story"
      />
      <button className="close-button" onClick={onClose}>
        <img src="/icons/close.svg" alt="close" />
      </button>
    </div>
  );
};

export default StoryPlayer;
