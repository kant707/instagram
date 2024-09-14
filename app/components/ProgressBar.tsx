interface ProgressBarProps {
  progress: number; // The current progress percentage (0 to 100)
  active: boolean; // Whether the progress bar is active or not
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, active }) => {
  return (
    <div
      className={`progress-bar ${active ? "active" : ""}`}
      style={{
        width: `${progress}%`,
        transition: "width 5s linear",
      }}
    >
      <div className="progress-bar-inner"></div>
    </div>
  );
};

export default ProgressBar;
