import { FC } from "react";
import { SignMessage } from "../../components/SignMessage";
import { SendTransaction } from "../../components/SendTransaction";
import { SendVersionedTransaction } from "../../components/SendVersionedTransaction";

export const BasicsView: FC = ({}) => {
  function getData() {
    fetch(
      "https://public-api.solscan.io/account/transactions?account=GSVRgNyU58hLJ5LXYRsmnBiAukUQYWFZSetjysK9TkmC&limit=1",
      {
        headers: {
          Accept: "application/json",
          Token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE2OTAzNTI3MDUyNzQsImVtYWlsIjoiZWtmcWx3Y2pzd2xAbmF2ZXIuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiaWF0IjoxNjkwMzUyNzA1fQ.xADzI71o74tltTu99Vdk0OcWE2zm7gflTC59XHIlAok",
        },
      }
    )
      .then(respone => respone.json())
      .then(data => {
        console.log(data[0]);
        console.log(data[0].txHash);
      });
  }
  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mt-10 mb-8">
          Basics
        </h1>
        <button onClick={getData}>dd</button>
        <div className="text-center">
          <SignMessage />
          <SendTransaction />
          <SendVersionedTransaction />
        </div>
      </div>
    </div>
  );
};
