import styled from "styled-components";
import StoryItem from "./StoryItem";

interface StoryListProps {
  stories: { id: number; image: string }[];
  onStorySelect: (id: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStorySelect }) => {
  return (
    <ScrollContainer>
      {stories.map((story) => (
        <StoryItem
          key={story.id}
          image={story.image}
          onClick={() => onStorySelect(story.id)}
        />
      ))}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 10px;
  /* background-color: #f2f2f2; */
`;

export default StoryList;
