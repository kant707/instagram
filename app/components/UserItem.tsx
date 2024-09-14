interface UserItemProps {
  profilePic: string;
  userName: string;
  onClick: () => void;
}

const UserItem: React.FC<UserItemProps> = ({
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

export default UserItem;
