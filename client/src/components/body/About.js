import React, { Component } from "react";
class About extends Component {
  render() {
    return (
      <div>
        <div className="about">
          <div className="about-name">
            <p style={{ marginBottom: "40px" }}>ABOUT ME</p>
            <div className="about-info">
              <h1>Hi, I'm Jibola Fakorede</h1>
              <h1>I'm a writer</h1>
            </div>
          </div>
          <div className="about-picture">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {/* <img src={img2} alt="" className="about-picture-image" /> */}
          </div>
          <div className="about-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et unde
              iusto praesentium corrupti natus. Sunt aperiam perferendis
              dignissimos, sapiente et placeat quaerat nesciunt deserunt ex
              molestiae eos nisi perspiciatis error nemo optio similique quam
              officia distinctio corporis, alias sint voluptas. Amet molestiae
              eveniet repudiandae architecto ipsam sapiente quas distinctio
              iste.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et unde
              iusto praesentium corrupti natus. Sunt aperiam perferendis
              dignissimos, sapiente et placeat quaerat nesciunt deserunt ex
              molestiae eos nisi perspiciatis error nemo optio similique quam
              officia distinctio corporis, alias sint voluptas. Amet molestiae
              eveniet repudiandae architecto ipsam sapiente quas distinctio
              iste.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et unde
              iusto praesentium corrupti natus. Sunt aperiam perferendis
              dignissimos, sapiente et placeat quaerat nesciunt deserunt ex
              molestiae eos nisi perspiciatis error nemo optio similique quam
              officia distinctio corporis, alias sint voluptas. Amet molestiae
              eveniet repudiandae architecto ipsam sapiente quas distinctio
              iste.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
