import React from "react";
import DoubleScrollbar from "react-double-scrollbar";

const ScrollableContainer = ({ children }) => {
    return (
        <DoubleScrollbar>
            <div style={{ overflowX: "auto" }}>{children}</div>
        </DoubleScrollbar>
    );
};

export default ScrollableContainer;
