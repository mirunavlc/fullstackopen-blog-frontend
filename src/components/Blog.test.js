import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

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

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Titlu test",
    author: "Autor test",
    url: "Url test",
    id: "Id test",
    user: "User test",
    likes: 12,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("+1 like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<NewBlog /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<NewBlog createBlog={createBlog} />);

  const input = screen.getByLabelText("title");
  const sendButton = screen.getByText("create");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");
});
