import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QRCodeGenerator = () => {
  const [scanresult, setscanresult] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 450,
        height: 450,
      },
      fps: 5,
    });

    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setscanresult(result);
    }
    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="font-poppins font-bold capitalize">
          Scan your ID CARD{" "}
        </h1>
        <div className="mt-5 w-[40rem] h-[50vh] ">
          {scanresult ? (
            <div>
              success: <a href={"http://" + scanresult}>{scanresult}</a>
            </div>
          ) : (
            <div id="reader"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRCodeGenerator;
