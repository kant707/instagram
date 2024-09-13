interface StoryItemProps {
  profilePic: string;
  userName: string;
  onClick: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({
  profilePic,
  userName,
  onClick,
}) => {
  return (
    <div>
      <div className="profile-picture" onClick={onClick}>
        <img src={profilePic} alt="User profile picture" />
      </div>
      <div className="profile-user-name">{userName}</div>
    </div>
  );
};

export default StoryItem;
