import Image from "next/image";

export default function ProjectItem({ data }: { data: any }) {

    const title = data.properties?.Name?.title?.[0]?.plain_text || "제목 없음";
    const role = data.properties?.Role?.rich_text?.[0].plain_text || "역할 없음";
    const description = data.properties?.Description?.rich_text?.[0]?.plain_text || "설명 없음";
    const imgSrc = data.cover?.file?.url || data.cover?.external?.url || "/default-project-image.jpg"; // 기본 이미지 경로
    const techs  = data.properties?.Tech?.multi_select;
    const start = data.properties?.StartDate?.date?.start;
    const end = data.properties?.EndDate?.date?.start;

    const calculatedPeriod = (startDate: string, endDate: string) => {
        const startDateStringArray = startDate.split('-');
        const endDateStringArray = endDate.split('-');

        const startDateObj = new Date(
            Number(startDateStringArray[0]),
            Number(startDateStringArray[1]) - 1,
            Number(startDateStringArray[2])
        );
        const endDateObj = new Date(
            Number(endDateStringArray[0]),
            Number(endDateStringArray[1]) - 1,
            Number(endDateStringArray[2])
        );

        const diffInMs = Math.abs(endDateObj.getTime() - startDateObj.getTime());
        const result = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        return result;
    };

    const periodInDays = start && end ? calculatedPeriod(start, end) : null;

    // 차이나는 월 계산
    const calcuatedMonths = (startDate: string, endDate: string) => {
        const startDateStringArray = startDate.split('-');
        const endDateStringArray = endDate.split('-');

        const startDateObj = new Date(
            Number(startDateStringArray[0]),
            Number(startDateStringArray[1]) - 1,
            Number(startDateStringArray[2])
        );
        const endDateObj = new Date(
            Number(endDateStringArray[0]),
            Number(endDateStringArray[1]) - 1,
            Number(endDateStringArray[2])
        );

        // 기본적인 월 차이 계산
        let months =
          (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
          (endDateObj.getMonth() - startDateObj.getMonth());

        // 날짜(day) 보정: 종료일의 일이 시작일의 일보다 작은 경우 미완성된 달로 판단
        if (startDateObj.getDate() < startDateObj.getDate()) {
          months -= 1;
        }

        return months;
    };

    const periodInMonths = start && end ? calcuatedMonths(start, end) : null;

  return (
    <div className="project-card">
      <Image 
          src={imgSrc}
          alt="Project Image"
          width={400}
          height={600}
          priority
          className="w-full h-auto"
      />
      
      <div className="p-4 flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h3 className="mt-4 text-xl">{description}</h3>
          <h6>{role}</h6>
          <p className="my-1 ">
              작업기간 : {start} ~ {end} ({periodInMonths}개월)
          </p>
      </div>
    </div>
  );
}