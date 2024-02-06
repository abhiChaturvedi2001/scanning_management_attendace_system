import React from "react";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";

const QRCodeGenerator = ({ data }) => {
  return (
    <>
      {data.map((items, index) => {
        <Link
          key={index}
          to={`/display/${encodeURIComponent(JSON.stringify(items))}`}
        >
          <QRCode value={JSON.stringify(items)} />
        </Link>;
      })}
    </>
  );
};

export default QRCodeGenerator;
