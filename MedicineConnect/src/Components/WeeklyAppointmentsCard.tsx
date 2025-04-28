import { Card } from "antd";

const WeeklyAppointmentsCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <Card title={title} style={{ width: 500, height: "70vh" }}>
        <span className="text-base font-bold text-center">{content}</span>
      </Card>
    </>
  );
};

export default WeeklyAppointmentsCard;
