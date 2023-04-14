import React from "react";


const Track = ({ track, handleToggle }) => {

  const handleClick = (e) => {
    e.preventDefault()
    handleToggle(e.currentTarget.id)
  }
  return (
    <div
      id={track.id}
      name="track"
      value={track.id}
      onClick={handleClick}
      className={track.complete ? "track" : "track strike"}
    >
      {track.title}
    </div>
  );
};

export default Track;
