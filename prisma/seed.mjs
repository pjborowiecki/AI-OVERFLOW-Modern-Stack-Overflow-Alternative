import { prisma } from "../src/db"

async function main() {
  // TAGS
  const tagNextJS = await prisma.tag.create({
    data: {
      name: "Next.js",
    },
  })

  const tagReact = await prisma.tag.create({
    data: {
      name: "React",
    },
  })

  const tagCpp = await prisma.tag.create({
    data: {
      name: "C++",
    },
  })

  const tagJavaScript = await prisma.tag.create({
    data: {
      name: "JavaScript",
    },
  })

  const tagServerless = await prisma.tag.create({
    data: {
      name: "Serverless",
    },
  })

  const tagSQL = await prisma.tag.create({
    data: {
      name: "SQL",
    },
  })

  const tagServerSideRendering = await prisma.tag.create({
    data: {
      name: "Server Side Rendering",
    },
  })

  const tagPrisma = await prisma.tag.create({
    data: {
      name: "Prisma",
    },
  })

  // USERS
  const user1 = await prisma.user.create({
    data: {
      email: "alice.pearson@example.com",
      image: "https://randomuser.me/api/portraits/women/90.jpg",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: "douglas.johnston@example.com",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: "carmen.parker@example.com",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  })

  const user4 = await prisma.user.create({
    data: {
      email: "emma.riley@example.com",
      image: "https://randomuser.me/api/portraits/women/78.jpg",
    },
  })

  const user5 = await prisma.user.create({
    data: {
      email: "franklin.kelley@example.com",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
    },
  })

  const user6 = await prisma.user.create({
    data: {
      email: "steven.horton@example.com",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
    },
  })

  const user7 = await prisma.user.create({
    data: {
      email: "annie.henry@example.com",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
    },
  })

  const user8 = await prisma.user.create({
    data: {
      email: "stacy.wright@example.com",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  })

  const user9 = await prisma.user.create({
    data: {
      email: "alvin.kuhn@example.com",
      image: "https://randomuser.me/api/portraits/men/72.jpg",
    },
  })

  // QUESTIONS
  const question1 = await prisma.question.create({
    data: {
      title: "Next js - disable server side rendering on some page?",
      explanation:
        "Is it possible to disable ssr on some pages using Next js? For example, I have a page with a product description on which I use ssr for SEO but I also have a page with a list of items or products which I can filter and for that page, I don't want to use ssr because this page generates dynamically every time, how can I disable ssr on this page?",
      views: 37,
      downvotes: 3,
      upvotes: 15,
      createdAt: "2021-10-29T17:50:07.365Z",
      userId: user1.id,
    },
  })

  await prisma.question.update({
    where: { id: question1.id },
    data: {
      tags: {
        connect: [
          { id: tagNextJS.id },
          { id: tagReact.id },
          { id: tagServerSideRendering.id },
        ],
      },
      user: {
        connect: { id: user1.id },
      },
    },
  })

  const question2 = await prisma.question.create({
    data: {
      title: "React helmet or next/head for Next Js project?",
      explanation:
        "I am making a next js application (React SSR), and now I am into implementing the meta tags in head.",
      views: 16,
      downvotes: 2,
      upvotes: 7,
      createdAt: "2023-10-29T13:53:02.365Z",
      userId: user1.id,
    },
  })

  await prisma.question.update({
    where: { id: question2.id },
    data: {
      tags: {
        connect: [{ id: tagReact.id }, { id: tagNextJS.id }],
      },
      user: {
        connect: { id: user1.id },
      },
    },
  })

  const question3 = await prisma.question.create({
    data: {
      title:
        "Importing one app's next js bundle files into another next js app",
      explanation:
        "I have two different next js applications which serves different sets of routes. I have another custom next js server which is responsible for sourcing the desired page based on the page requested. I would like to serve the pages through the custom server as a platform. can i import the next js bundles from the two applications and serve them through the custom server? How can i achieve this use case using next js?",
      views: 1789,
      downvotes: 16,
      upvotes: 49,
      createdAt: "2023-02-20T14:24:09.365Z",
      userId: user1.id,
    },
  })

  await prisma.question.update({
    where: { id: question3.id },
    data: {
      tags: {
        connect: [{ id: tagJavaScript.id }, { id: tagNextJS.id }],
      },
      user: {
        connect: { id: user1.id },
      },
    },
  })

  const question4 = await prisma.question.create({
    data: {
      title:
        "How to Embed HTML/JS Frontend Files into a C++ Web Server Executable?",
      explanation:
        "I have a C++ application that uses httplib to serve an HTML/JS frontend from a folder. Currently, I require both the compiled C++ program and this folder for the application to work. Is there a way to embed the frontend folder into the C++ executable to create a single-file application?",
      views: 40,
      downvotes: 0,
      upvotes: 2,
      createdAt: "2023-07-21T12:04:09.365Z",
      userId: user2.id,
    },
  })

  await prisma.question.update({
    where: { id: question4.id },
    data: {
      tags: {
        connect: [{ id: tagCpp.id }],
      },
      user: {
        connect: { id: user2.id },
      },
    },
  })

  const question5 = await prisma.question.create({
    data: {
      title: "Difference between prisma db push and prisma migrate dev",
      explanation:
        "what is the difference between prisma db push and prisma migrate dev ? When should I use one over the other. Docs say that prisma db push is about schema prototyping only and I don't understand what does that mean.",
      views: 4902,
      downvotes: 60,
      upvotes: 279,
      createdAt: "2023-08-22T12:54:01.365Z",
      userId: user4.id,
    },
  })

  await prisma.question.update({
    where: { id: question5.id },
    data: {
      tags: {
        connect: [{ id: tagPrisma.id }, { id: tagSQL.id }],
      },
      user: {
        connect: { id: user4.id },
      },
    },
  })

  const question6 = await prisma.question.create({
    data: {
      title: "Prisma model is not accessible using Prisma Client?",
      explanation:
        "I'm trying to query a property of a Prisma model with Prisma Client. The model is a restaurant model which has a reviews property. The reviews property is also related to a Review model.",
      views: 433902,
      downvotes: 9810,
      upvotes: 2792,
      createdAt: "2020-01-03T13:54:01.365Z",
      userId: user5.id,
    },
  })

  await prisma.question.update({
    where: { id: question6.id },
    data: {
      tags: {
        connect: [{ id: tagPrisma.id }, { id: tagSQL.id }],
      },
      user: {
        connect: { id: user5.id },
      },
    },
  })

  const question7 = await prisma.question.create({
    data: {
      title: "Native Serverless vs Serverless Express",
      explanation:
        "Right now, I am following a guide prepared from Serverless Stack Team. They are using React and lots of AWS features like lambda and API getaway. In order to practice it, I am re-writing one of my old Express example with the Serverless stack. I also saw a library or tool called aws-serverless-express. This library or tool allows you to run your express app in a way that serverless form. It will be a weird question, but I was wondering the difference between native serverless build and serverless express. Cold start already disadvantages. I am aware of it. Other than this, what will be the negative or positive sides of serverless express? what will be the negative or positive sides of native serverless?",
      views: 1549542,
      downvotes: 79320,
      upvotes: 87922,
      createdAt: "2019-05-08T13:57:08.365Z",
      userId: user6.id,
    },
  })

  await prisma.question.update({
    where: { id: question7.id },
    data: {
      tags: {
        connect: [{ id: tagServerless.id }, { id: tagReact.id }],
      },
      user: {
        connect: { id: user6.id },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
