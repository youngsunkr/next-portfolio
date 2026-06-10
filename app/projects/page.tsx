import React from 'react';
// ⭕ 최상단에 표준 ESM import 구문을 사용합니다.
import { Client } from '@notionhq/client';

import { NOTION_DATABASE_ID, NOTION_API_KEY, NOTION_VERSION, NOTION_CONTENT_TYPE } from "../../config";

import ProjectItem from './project-item';

// posts will be populated at build time by getStaticProps()
export default async function Projects() {

  //console.log(projectNames);
  
  try {
    const projects = await getNotionProjects();
    console.log("projects: ",projects);

    if (!projects || projects.length === 0) {
        return (
          <div className="container mx-auto p-8 text-center text-gray-500">
            <p>조회된 프로젝트 데이터가 없거나 권한 연결이 올바르지 않습니다.</p>
          </div>
        );
      }

    return (
      <div className="p-5">
        <h1>총 프로젝트 : {projects.length}</h1>
        {/* 데이터 렌더링 로직 */}
        {
          projects?.map((aProject: any) => (
            <h2 key={aProject.id} className="text-lg font-medium border-b py-2">
              <ProjectItem key={aProject.id} data={aProject} />
            </h2>
        ))}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-5 text-red-500">
        <h3>데이터 조회 실패 (디버깅 정보):</h3>
        <p>전송된 ID: {NOTION_DATABASE_ID}</p>
        <p>에러 메시지: {error.message || JSON.stringify(error)}</p>
      </div>
    );
  }
}
 
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.getNotionProjects
export async function getNotionProjects() {

  const token = `${NOTION_API_KEY}`;
  const notion = new Client({ auth: token.trim() });
  console.log("token: ", `${token}`);
  // replace with your own database ID
  const databaseId = `${NOTION_DATABASE_ID}`;
  console.log("NOTION_DATABASE_ID: ", databaseId);
  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID 환경변수가 없습니다.");
  }
  // 공백이나 줄바꿈 문자, 혹시 모를 중괄호 기호({})가 섞여 들어가는 것을 방지
  const cleanCleanDatabaseId = databaseId.trim().replace(/[{}]/g, "");
  

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

const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': `${NOTION_VERSION}`,
      'Content-Type': `${NOTION_CONTENT_TYPE}`
    },
    // 실시간 지식을 가져와야 하므로 캐시를 끄거나 짧은 revalidate 설정을 권장합니다.
    cache: 'no-store', 
  };

const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': `${NOTION_VERSION}`,
      'Content-Type': `${NOTION_CONTENT_TYPE}`
    },
    // 실시간 지식을 가져와야 하므로 캐시를 끄거나 짧은 revalidate 설정을 권장합니다.
    cache: 'no-store', 
    body: JSON.stringify({ 
      sorts: [
        {
          property: "Name",
          //direction: "asending"
          direction: "descending"
        }
      ],
      page_size: 100, // 한 번에 최대 100개까지 조회 가능
    })
  });
  const projects = await res.json()
 
  
  const projectNames = projects?.results.map((project: any) => {
    //project?.id
    //console.log("id: ", project?.id);
    const title = project.properties?.Name?.title?.[0]?.plain_text || "제목 없음";
    //console.log("title: ", title);
    return title;
  });

  //console.log(`projectNames: ${projectNames[0]}`);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return projects?.results || [];
}


