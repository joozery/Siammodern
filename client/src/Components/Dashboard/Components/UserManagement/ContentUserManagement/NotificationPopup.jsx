import React from "react";
import "./NotificationPopup.css";

const NotificationPopup = ({ type, message, onClose }) => {
    return (
        <div className={`notification-popup ${type}`}>
            <div className="icon">{type === "success" ? "✔️" : "✔️"}</div>
            <h3>{type === "success" ? "Success!" : "Sorry :("}</h3>
            <p>{message}</p>
            <button onClick={onClose}>
                {type === "success" ? "Okay" : "Try Again"}
            </button>
        </div>
    );
};

export default NotificationPopup;
