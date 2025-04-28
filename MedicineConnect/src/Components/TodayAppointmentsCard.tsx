import { Card } from "antd";

const TodayAppointmentsCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <Card title={title} style={{ width: 1000 }}>
        <span className="text-base font-bold">{content}</span>
      </Card>
    </>
  );
};

export default TodayAppointmentsCard;
