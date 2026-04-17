import { Spin } from "antd";

export function ButtonLoader() {
  return <Spin />;
}

export function ScreenLoader() {
  
  return (
    <>
      <Spin size="large" fullscreen />
    </>
  );
}
