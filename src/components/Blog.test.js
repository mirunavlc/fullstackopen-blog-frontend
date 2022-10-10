import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Titlu test",
    author: "Autor test",
    url: "Url test",
    id: "Id test",
    user: "User test",
    likes: 12,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Titlu test by Autor test");
});
