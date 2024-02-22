import React from "react";
import QRCode from "qrcode.react";

const QRCod = ({ data }) => {
  if (data.length === 0) return;
  return (
    <>
      <QRCode className="w-[300vh]" width={200} value={data[0].StudentName} />
    </>
  );
};

export default QRCod;
