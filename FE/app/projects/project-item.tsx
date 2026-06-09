import Image from "next/image";

export default function ProjectItem({ data }: { data: any }) {

    const title = data.properties?.Name?.title?.[0]?.plain_text || "제목 없음";
    const role = data.properties?.Role?.rich_text?.[0].plain_text || "역할 없음";
    const desc = data.properties?.Description?.rich_text?.[0]?.plain_text || "설명 없음";
    const imgSrc = data.cover?.external?.url || "/default-project-image.jpg"; // 기본 이미지 경로

  return (
    <div className="flex flex-col p-6 m-3 bg-slate-700 rounded-md">
        
        <Image 
            src={imgSrc}
            alt="Project Image"
            width={400}
            height={600}
            className="mb-4 rounded-md object-cover"
        />
        
        <h1>{title}</h1>
        <h6>{role}</h6>
        <h6>{desc}</h6>
    </div>
  );
}