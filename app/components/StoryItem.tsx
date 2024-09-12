interface StoryItemProps {
  profilePic: string;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ profilePic, onClick }) => {
  return (
    <div>
      <div className="profile-picture" onClick={onClick}>
        <img src={profilePic} alt="User profile picture" />
      </div>
      <div className="profile-user-name">Ram Krishna</div>
    </div>
  );
};

export default StoryItem;
