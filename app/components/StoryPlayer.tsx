import { useEffect, useState } from "react";
import styled from "styled-components";

interface StoryPlayerProps {
  stories: { id: number; image: string }[];
  activeStoryId: number;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({
  stories,
  activeStoryId,
  onNext,
  onPrevious,
}) => {
  const [currentStory, setCurrentStory] = useState<{
    id: number;
    image: string;
  } | null>(null);

  useEffect(() => {
    const story = stories.find((s) => s.id === activeStoryId);
    setCurrentStory(story || null);

    const timer = setTimeout(() => {
      onNext();
    }, 5000); // Automatically go to the next story after 5 seconds

    return () => clearTimeout(timer);
  }, [activeStoryId, stories, onNext]);

  if (!currentStory) return null;

  return (
    <PlayerContainer>
      <img src={currentStory.image} alt="Current story" />
      <Navigation>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </Navigation>
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Navigation = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;

  button {
    background: none;
    border: none;
    width: 50%;
    height: 100%;
    cursor: pointer;
  }
`;

export default StoryPlayer;
