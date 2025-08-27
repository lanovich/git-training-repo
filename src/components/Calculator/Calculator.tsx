import { Badge, Button, Col, Input, Layout, Row, Typography } from "antd";
import { useState } from "react";
import { isEmpty } from "lodash";

export const Calculator = () => {
  const numberActions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const mathActions: string[] = ["+", "-", "*", "/", "%"];

  const [historyList, setHistoryList] = useState<string[]>([]);

  const doAction = (action: string) => {
    const lastIndex = historyList.length - 1;
    if (!isEmpty(currentNumber)) {
      setHistoryList([...historyList, currentNumber, action]);
      setCurrentNumber("");
    } else {
      const res = [...historyList];
      res[lastIndex] = action;
      setHistoryList(res);
    }
  };

  const onAddNumber = (newNumber: string | number) => {
    setCurrentNumber(`${currentNumber}${newNumber}`);
  };

  const onChange = (newNumber: string | number) => {
    setCurrentNumber(`${newNumber}`);
  };

  const calc = () => {
    const calcArr = [...historyList];
    calcArr.pop();
    return eval(calcArr.join(" ")) || 0;
  };

  return (
    <Layout
      style={{
        maxWidth: "550px",
        margin: "0 auto",
        backgroundColor: "#17161eff",
        border: "1px solid #3c3c3cff",
        borderRadius: "10px",
      }}
    >
      <Layout.Content>
        <Row
          style={{ paddingInline: "20px", borderBottom: "1px solid #3c3c3cff" }}
        >
          <Col span={24}>
            <h1 style={{ color: "white", fontWeight: "normal" }}>
              Калькулятор
            </h1>
          </Col>
          <Col>
            <Typography>
              <Badge.Ribbon
                style={{ zIndex: 100 }}
                color={"green"}
                text={`= ${calc()}`}
              />
            </Typography>
          </Col>
        </Row>
        <Row gutter={[0, 8]} style={{ padding: "10px 20px" }}>
          <Col span={24}>
            <Typography
              style={{ borderBottom: "1px solid white", marginBottom: "10px" }}
            >
              <p>{historyList.join(" ") || 0}</p>
            </Typography>
          </Col>
          <Col span={24}>
            <Input
              style={{ backgroundColor: "inherit" }}
              size={"large"}
              value={currentNumber}
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          </Col>
          <Col span={20}>
            <Row gutter={[8, 8]}>
              {numberActions.map((n) => (
                <Col span={7} key={n}>
                  <Button
                    onClick={() => onAddNumber(n)}
                    style={{ backgroundColor: "inherit" }}
                    shape={"circle"}
                    size={"large"}
                  >
                    {n}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={4}>
            <Row gutter={[8, 8]}>
              {mathActions.map((n) => (
                <Col span={24} key={n}>
                  <Button
                    onClick={() => doAction(n)}
                    style={{ backgroundColor: "inherit" }}
                    shape={"circle"}
                    size={"large"}
                  >
                    {n}
                  </Button>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};
