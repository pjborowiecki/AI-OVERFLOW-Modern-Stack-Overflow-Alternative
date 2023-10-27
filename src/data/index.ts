export const hotQuestions = [
  {
    id: "1",
    title: "How do I use express as a custom server in NextJS?",
  },
  {
    id: "2",
    title: "Cascading deletes in SQLAlchemy",
  },
  {
    id: "3",
    title: "How to perfectly center a div with Tailwind CSS?",
  },
  {
    id: "4",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)",
  },
  {
    id: "5",
    title: "Redux Toolkit not updating state as expected",
  },
]

export const popularTags = [
  { id: "1", name: "javascript", totalQuestions: 5 },
  { id: "2", name: "react", totalQuestions: 56 },
  { id: "3", name: "python", totalQuestions: 23 },
  { id: "4", name: "nextjs", totalQuestions: 12 },
  { id: "5", name: "tailwindcss", totalQuestions: 34 },
  { id: "6", name: "typescript", totalQuestions: 45 },
]

export const sampleQuestions = [
  {
    id: "1",
    title: "Cascading Delete in SQLAlchemy?",
    explanation:
      "I am trying to delete a row in a table that has a foreign key relationship with another table. I want to delete the row in the first table and have the row in the second table that has the foreign key relationship with the row in the first table to also be deleted. How do I do this?",
    tags: [
      {
        id: "1",
        name: "python",
      },
      {
        id: "2",
        name: "sql",
      },
    ],
    upvotes: 10123,
    views: 1003401,
    answers: [
      {
        id: "1",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
      {
        id: "2",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
      {
        id: "3",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
      {
        id: "4",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
    ],
    createdAt: new Date("2023-09-25T12:00:00.000Z"),
    updatedAt: new Date("2023-09-25T12:00:00.000Z"),
    user: {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@gmail.com",
      image: "https://fadfasdf.com/asdfasdf.jpg",
      createdAt: new Date("2021-08-02T12:00:00.000Z"),
      updatedAt: new Date("2021-08-02T12:00:00.000Z"),
    },
  },
  {
    id: "2",
    title: "How do I use express as a custom server in NextJS?",
    explanation:
      "I am trying to use express as a custom server in NextJS. How do I do this? I have tried following the documentation but it is not working.",
    tags: [
      {
        id: "1",
        name: "react",
      },
      {
        id: "2",
        name: "nodejs",
      },
      {
        id: "3",
        name: "express",
      },
      {
        id: "4",
        name: "nextjs",
      },
    ],
    upvotes: 10032,
    views: 143,
    answers: [
      {
        id: "5",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
      {
        id: "6",
        createdAt: new Date("2021-08-02T12:00:00.000Z"),
        updatedAt: new Date("2021-08-02T12:00:00.000Z"),
      },
    ],
    createdAt: new Date("2021-08-02T12:00:00.000Z"),
    updatedAt: new Date("2021-08-02T12:00:00.000Z"),
    user: {
      id: "1",
      name: "Brad Traversy",
      username: "johndoe",
      email: "bradtraversy@gmail.com",
      image: "https://fadfasdf.com/asdfasdf.jpg",
      createdAt: new Date("2021-08-01T12:00:24.000Z"),
      updatedAt: new Date("2021-08-01T12:00:24.000Z"),
    },
  },
]
