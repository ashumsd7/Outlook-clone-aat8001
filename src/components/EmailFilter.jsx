import React from "react";
import { FILTER_KEYWORDS } from "../utils/constants";

function EmailFilter({ setFilter, filter }) {


  return (
    <div className="flex gap-10 items-center mb-5">
      <span className="font-medium">Filter By: </span>
      <div className="flex gap-6">
        {FILTER_KEYWORDS.map((data, idx) => {
          return (
            <button
              key={data?.id}
              onClick={() => {

                setFilter(data);
              }}
              className={`px-2 py-1 font-semibold  border rounded-2xl ${
                data.name == filter.name ? "bg-[#E1E4EA]" : "bg-white"
              }`}
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EmailFilter;
