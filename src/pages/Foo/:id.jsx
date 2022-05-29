import React from "react";
import { useParams } from "react-router";

const Id = () => {
  const f = useParams();
  console.log("params", f);
  return <div>params: {f.id}</div>;
};

export const getInitialState = ({ query, params }) => {
  console.log("当前id参数为:", params.id);
  console.log("当前query为", query);
};

export default Id;
