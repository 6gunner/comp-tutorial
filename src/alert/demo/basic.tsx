import React from 'react';
import { Alert } from '@easy/comp-tutorial';
// import "@easy/comp-tutorial/esm/alert/style";

function BasicDemo() {
  return (
    <>
      <Alert type="info">我是info信息</Alert>
      <Alert type="success">我是success信息</Alert>
      <Alert type="warning">我是warning信息</Alert>
    </>
  );
}
export default BasicDemo;
