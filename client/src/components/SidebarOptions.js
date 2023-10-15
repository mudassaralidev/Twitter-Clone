import React from "react";
import "./SidebarOptions.css";

export default function SidebarOptions(props) {
  return (
    <div>
      <div className="side_options">
        <span className={props.stylee ? props.stylee : "side-icon"}>
          {props.icon}
        </span>
        <span className="side-text d-none d-lg-inline">{props.text}</span>
      </div>
    </div>
  );
}