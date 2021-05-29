import * as React from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  message,
  Row,
  Typography,
} from "antd";
import { updateDogInfo } from "../../common/api";

const { Paragraph } = Typography;

const { useState } = React;

interface IProps {
  dog: any;
}

const labelValueMapping = [
  { value: "dog_name", label: "Name" },
  { value: "dog_gender", label: "Gender" },
  { value: "dog_age", label: "Age" },
  { value: "dog_characteristics", label: "Characteristics" },
];

const InfoTable: React.FC<IProps> = (props) => {
  const { dog } = props;
  const [editableDogInfo, setEditableDogInfo] = useState<any>(dog);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(false);

  const onUpdate = async () => {
    try {
      const response = await updateDogInfo(editableDogInfo);
      if (response) {
        message.success("Update successful");
      } else {
        message.error("Failed to update");
      }
    } catch {
      message.error("Failed to connect to server.");
    }
  };

  return (
    <>
      <Row>
        <Col span={24} lg={8}>
          <Card
            style={{ height: "300px", width: "100%", marginBottom: "20px" }}
          >
            <Empty />
          </Card>
        </Col>

        <Col span={24} lg={16}>
          <Descriptions
            style={{
              borderBlock: "2px solid",
              marginTop: "20px",
              marginLeft: "20px",
            }}
            labelStyle={{
              fontSize: "20px",
              textAlign: "center",
            }}
            contentStyle={{
              fontSize: "16px",
            }}
            bordered
          >
            {labelValueMapping.map((row) => {
              const field = row.value;

              return (
                <Descriptions.Item label={row.label} span={3}>
                  <Paragraph
                    editable={{
                      tooltip: "Click to edit text",
                      onChange: (text) => {
                        setShowUpdateButton(true);
                        const newDogObj = { ...editableDogInfo };
                        newDogObj[field] = text;
                        setEditableDogInfo(newDogObj);
                      },
                    }}
                  >
                    {editableDogInfo[field]}
                    {!editableDogInfo[field] && (
                      <span style={{ color: "gray" }}>No information</span>
                    )}
                  </Paragraph>
                </Descriptions.Item>
              );
            })}
          </Descriptions>

          <Row justify="center">
            {showUpdateButton && (
              <>
                <Button
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={() => {
                    setShowUpdateButton(false);
                    setEditableDogInfo(dog);
                  }}
                >
                  Cancel Changes
                </Button>

                <Button
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    onUpdate();
                    setShowUpdateButton(false);
                  }}
                  type="primary"
                >
                  Save Changes
                </Button>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default InfoTable;