import React from 'react';
// ⭕ 최상단에 표준 ESM import 구문을 사용합니다.
import { Client } from '@notionhq/client';
import { DATABASE_ID, TOKEN } from "../../config";

// posts will be populated at build time by getStaticProps()
export default async function Projects() {

  const projects = await getNotionProjects();
  console.log(projects);

  return (
    <h1>Projects</h1>
  )
}
 
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.getNotionProjects
export async function getNotionProjects() {

  const notion = new Client({ auth: `${TOKEN}` });
  console.log("TOKEN: ", `${TOKEN}`);
  // replace with your own database ID
  const databaseId = `${DATABASE_ID}`;
  console.log("databaseId: ", databaseId);
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID 환경변수가 없습니다.");
  }

  // const filteredRows = async () => {
  //   const response = await notion.databases.query({
  //     database_id: databaseId,
  //     filter: {
  //       property: "Task completed",
  //       checkbox: {
  //         equals: true
  //       }
  //     },
  //   });
  //   return response;
  // }

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  });
  const results = await res.json()
 
  console.log("results: ", results);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      results,
    },
  }
}


