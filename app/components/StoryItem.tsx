interface StoryItemProps {
  profilePic: string;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ profilePic, onClick }) => {
  return (
    <div className="profile-picture" onClick={onClick}>
      <img src={profilePic} alt="User profile picture" />
    </div>
  );
};

export default StoryItem;
