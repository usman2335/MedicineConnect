import { Card } from "antd";

const DataDisplayCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <Card title={title} style={{ width: 500 }}>
        <span className="text-2xl font-bold">{content}</span>
      </Card>
    </>
  );
};

export default DataDisplayCard;
