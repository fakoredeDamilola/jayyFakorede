import React from "react";
import { Link } from "react-router-dom";
const Topics = (props) => {
  let { value } = props;
  let date, time
  if (value.createdAt) {
    let arr = value.createdAt.split("T")
    date = arr[0]
    let arr2 = arr[1].split(":")
    time = `${arr2[0]} : ${arr2[1]}`
  }

  return (
    <section className="category_section" style={{ wordWrap: "break-word" }}>
      <div className="category_img" style={{
        backgroundImage: ` linear-gradient(
          to bottom right,
          rgba(12, 23, 42, 0.356),
          rgba(68, 93, 136, 0.589)
        ) , url('${value.previewImage}')`,
        backgroundSize: "cover",
      }}>
      </div>
      <div className="category_name mt-4">
        <h4><b>{value.name}</b></h4>
        <h5>{value.shortDescription}</h5>

      </div>
      <div className="category_link">
        <Link to={`/article/${value.categoryId}/${value.slug}`}>&nbsp;→</Link>
      </div>
      <div className="category_info">
        <span>By {value.author}</span> | {date} | {time}
      </div>
    </section>
  );
};
export default Topics;
