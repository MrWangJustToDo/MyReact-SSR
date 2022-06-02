import React, { useState } from "react";
import { Calendar, Card, Carousel, Slider, Switch } from "antd";
import { useEffect } from "react";
import { useRef } from "react";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const AntDesignComponent = () => {
  const ref = useRef();
  const [disabled, setDisabled] = useState(false);

  console.log(ref)

  const onChange = (checked) => {
    console.log("run", checked);
    setDisabled(checked);
  };

  return (
    <>
      <h2>Ant Design</h2>
      <Card>123</Card>
      <Carousel>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      {/* <Slider defaultValue={30} /> */}
      {/* <Calendar /> */}
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      Disabled: <Switch ref={ref} size="small" checked={disabled} onChange={onChange} />
    </>
  );
};
export default AntDesignComponent;
