import React from "react";

function Recommendations() {
  return (
    <div className="recommendations">
      <h2 className="section-title">Recommended Videos</h2>
      <div className="video-grid">
        <div className="video-card">
          <div className="video-thumbnail">
            <div className="thumbnail-placeholder">
              Machine Learning Algorithms
            </div>
          </div>
          <div className="video-card-info">
            <h3 className="video-card-title">
              Advanced Machine Learning Algorithms: Deep Dive
            </h3>
            <div className="video-card-meta">
              <p>9,345 views • 1 week ago</p>
            </div>
          </div>
        </div>
        <div className="video-card">
          <div className="video-thumbnail">
            <div className="thumbnail-placeholder">Neural Networks</div>
          </div>
          <div className="video-card-info">
            <h3 className="video-card-title">
              Neural Networks Explained: From Perceptrons to Deep Learning
            </h3>
            <div className="video-card-meta">
              <p>15,789 views • 3 weeks ago</p>
            </div>
          </div>
        </div>
        <div className="video-card">
          <div className="video-thumbnail">
            <div className="thumbnail-placeholder">Data Preprocessing</div>
          </div>
          <div className="video-card-info">
            <h3 className="video-card-title">
              Data Preprocessing Techniques for Machine Learning
            </h3>
            <div className="video-card-meta">
              <p>7,621 views • 1 month ago</p>
            </div>
          </div>
        </div>
        <div className="video-card">
          <div className="video-thumbnail">
            <div className="thumbnail-placeholder">Feature Engineering</div>
          </div>
          <div className="video-card-info">
            <h3 className="video-card-title">
              Feature Engineering: Improving Model Performance
            </h3>
            <div className="video-card-meta">
              <p>6,254 views • 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
