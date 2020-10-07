import React from "react";
import { Link } from "react-router-dom";
const CategoriesGrid = (props) => {
  const { category } = props;
  return (
    <div className="section-2-grid-container">

      <div
        style={{
          backgroundImage: ` linear-gradient(
            to bottom right,
            rgba(12, 23, 42, 0.356),
            rgba(68, 93, 136, 0.289)
          ) , url('${category.previewImage}')`,
          backgroundSize: "cover",
        }}
        className="section-2-grid-item"
        data-aos={`${category.aos}`}
      >
        <div className="section-2-grid-text">
          <h6 style={{ color: "rgb(202, 199, 199)" }}>
            <b>Number of Articles: <span>{category.number}</span></b>
          </h6>
          <p>{category.name}</p>
          <h5 className="link">
            <Link to={`/articles/${category._id}`}>Show More&nbsp;→</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
