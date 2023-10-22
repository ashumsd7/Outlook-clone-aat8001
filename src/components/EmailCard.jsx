import React from "react";
import { formateTime } from "../utils/formatDate";

function EmailCard({ data, onClickMail }) {
  return (
    <div
      onClick={() => {
        onClickMail(data);
      }}
      className={`flex cursor-pointer hover:shadow-lg gap-4 my-4 bg-gray-300 rounded-lg px-4 text-[#636363] py-2 border border-[#CFD2DC] ${
        !data?.isMarked ? "bg-white" : ""
      }`}
    >
      {/* avatar */}
      <div className="h-10 w-10 bg-[#E54065]  flex justify-center capitalize items-center rounded-full text-white font-bolder">
        {data?.from?.name.split("")[0]}
      </div>
      {/* body */}

      <div className="flex flex-col gap-1 ">
        {/* from */}
        <div className="flex gap-2">
          <span>From:</span>{" "}
          <span className="font-medium"> &lt;{data?.from?.email}&gt;</span>
        </div>

        {/* subject */}
        <div className="flex gap-2">
          <span>Subject:</span>{" "}
          <span className="font-medium">{data?.subject}</span>
        </div>

        {/* text */}

        <p className="mt-2">{data?.short_description} </p>

        {/* time +favrt */}

        <div className="flex gap-6 mt-1 ">
          <span>{formateTime(data.date)}</span>

          <span>Favourite</span>
        </div>
      </div>
    </div>
  );
}

export default EmailCard;
