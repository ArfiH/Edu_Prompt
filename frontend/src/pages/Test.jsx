import React from "react";
import SplitPane, {Pane} from "react-split-pane";
import "./splitPaneStyles.css";

function Test() {
  return (
    <div>
      <SplitPane style={{position: "static", marginBottom: "-2.96rem"}} split="vertical" defaultSize="50%">
        <div className="bg-red-200 h-[120px]">
            Left div
        </div>
        <div className="bg-red-600 h-[120px]">
            Right div
        </div>
      </SplitPane>
    </div>
  );
}

export default Test;
