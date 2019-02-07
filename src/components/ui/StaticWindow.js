import React from 'react';
import ___ from "./ui.scss";

export default function StaticWindow({title, children, windowStyle}) {
  return (
    <div className="W95__Window m-static">
      <div className="W95__WindowBG" />
      <div className="W95__WindowTitle">
        {title}
      </div>
      <div className="W95__WindowContents" style={windowStyle || {}}>
        {children}
      </div>
    </div>
  );
}