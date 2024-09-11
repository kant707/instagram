import styled from "styled-components";

interface StoryItemProps {
  image: string;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ image, onClick }) => {
  return (
    <div className="profile-wrap" onClick={onClick}>
      <img src={image} alt="story thumbnail" />
    </div>
  );
};

const StoryThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin: 0 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default StoryItem;
