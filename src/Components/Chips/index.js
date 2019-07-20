import React from "react";
import "./styles.css";

const Chips = ({ data, removeItem, style = {} }) => {
  return (
    <div className="chips" style={{ background: style.background }}>
      <img src={data.image} className="profile-image" />
      <span>{data.name}</span>
      <div className="close" onClick={() => removeItem(data.id)} />
    </div>
  );
};

export default Chips;
