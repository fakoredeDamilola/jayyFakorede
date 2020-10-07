import React from "react";

const Instruction = (props) => {
  const comment = "<!-- This won't show up in the content! -->";
  const fig = "<figcaption>this is a caption</figcaption>";
  const link = '<a name="chapter-1"></a>';

  return (
    <div className="instructions_layout">
      <div className="instruction_header">
        <h1>Markdown</h1>
      </div>
      <p>
        Below are some examples of commonly used markdown syntax. If you want to
        dive deeper, check out this cheat sheet.
      </p>
      <div>
        <h2>Bold & Italic</h2>
        <p>
          <span>Italics</span> : *asterisks* or _underscores_
        </p>
        <p>
          <span>Bold</span>: **double asterisks** or __double underscores__
        </p>
      </div>
      <div>
        <h2>Links</h2>
        <p>
          <span>I'm an inline link</span>
        </p>
        <div className="codeDiv">
          <code>[I'm an inline link](put-link-here)</code>
        </div>
        <p>
          <span>Anchored links</span> (For things like a Table of Contents)
        </p>
        <div className="codeDiv">
          <code>
            <p>## Table Of Contents </p>
            <ul style={{ listStyle: "none", marginLeft: "20px" }}>
              <li>* [Chapter 1](#chapter-1) </li>
              <li>* [Chapter 2](#chapter-2) </li>
            </ul>
            <p>### Chapter 1</p>
            {link}
          </code>
        </div>
      </div>
      <div>
        <h2>Inline Images</h2>
        <div className="codeDiv">
          <code>![Alt text of image](put-link-to-image-here)</code>
        </div>

        <p>
          You can even add a caption using the html figcaption tag below the
          link
        </p>
        <div className="codeDiv">
          <code>{fig}</code>
        </div>
      </div>
      <div>
        <h2>Headers</h2>

        <p>Add a header to your post with this syntax:</p>

        <div className="codeDiv">
          <code>
            <p># One '#' for a h1 header</p>
            <p>## Two '#'s for a h2 header</p>
            <p>...</p>
            <p>###### Six '#'s for a h6 header</p>
          </code>
        </div>
        <div>
          <p>One '#' for a h1 header</p> <p>Two '#'s for a h2 header</p>
          <p>Three '#'s for a h2 header</p>
          <p>Four '#'s for a h4 header</p>
          <p>Five '#'s for a h5 header</p>
          <p>Six '#'s for a h6 header</p>
        </div>
      </div>
      <div>
        <h2>Author Notes/Comments</h2>

        <p>Add some hidden notes/comments to your article with this syntax:</p>

        <div className="codeDiv">
          <code>{comment}</code>
        </div>
      </div>
      <div>
        <h2>Common Gotchas</h2>

        <p>
          Lists are written just like any other Markdown editor. If you're
          adding an image in between numbered list, though, be sure to tab the
          image, otherwise it'll restart the number of the list.{" "}
        </p>
        <p>
          Here's the{" "}
          <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet"
            target="_blank"
          >
            Markdown cheatsheet
          </a>{" "}
          again for reference.
        </p>
      </div>
    </div>
  );
};
export default Instruction;
