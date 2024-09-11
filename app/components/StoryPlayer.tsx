import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

interface StoryPlayerProps {
  stories: string[];
  onClose: () => void;
  onStoryChange: (index: number) => void;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({
  stories,
  onClose,
  onStoryChange,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalStories = stories.length;

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

  const handleClick = (e: MouseEvent) => {
    const { clientX, innerWidth } = window;
    if (clientX < innerWidth / 2) {
      prevStory(); // Left click - show previous story
    } else {
      nextStory(); // Right click - show next story
    }
  };

  return (
    <div className="story-player-overlay" onClick={handleClick}>
      <div className="progress-bars-container">
        {stories.map((_, index) => (
          <ProgressBar
            key={index}
            progress={index === currentStoryIndex ? progress : 0}
            active={index === currentStoryIndex}
          />
        ))}
      </div>
      <img src={stories[currentStoryIndex]} alt="Story" />
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default StoryPlayer;
