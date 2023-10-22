import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmailCard from "./components/EmailCard";
import EmailFilter from "./components/EmailFilter";
import axios from "axios";
import { FILTER_KEYWORDS } from "./utils/constants";
import { formateTime } from "./utils/formatDate";

function App() {
  const BASE_URL = "https://flipkart-email-mock.now.sh/";
  const [allMails, setAllMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_KEYWORDS[0]);

  useEffect(() => {
    getAllMails();
  }, []);

  const getAllMails = async () => {
    const res = await axios.get(BASE_URL);

    console.log("red Intent", res);
    setAllMails(res.data?.list);
  };

  const fetchMailDetails = async (data) => {
    const mailDetails = await axios.get(BASE_URL + "?id=" + data?.id);
    console.log("mailDetails1", { ...mailDetails.data, ...data });
    setSelectedMail({ ...mailDetails.data, ...data });
  };

  return (
    <div>
      <div className="p-6">
        <EmailFilter filter={selectedFilter} setFilter={setSelectedFilter} />
      </div>
      <div className={`p-4 ${selectedMail ? "flex   " : ""}`}>
        <div className={`flex flex-col ${selectedMail ? "" : ""}`}>
          {allMails.length == 0 && "No Mails Available"}
          {allMails.length > 0 &&
            allMails.map((data, idx) => {
              return (
                <EmailCard
                  key={idx}
                  data={data}
                  onClickMail={fetchMailDetails}
                />
              );
            })}
        </div>

        {selectedMail && (
          <div>
          <div className="flex justify-end"> <button onClick={()=>{
            setSelectedMail(null)
          }} className="  w-4 h-4 flex justify-center items-center mb-4 p-2 cursor-pointer text-red-400 font-extrabold  bg-gray-200 rounded-lg"> X</button></div>
          <div className=" bg-white border shadow-lg ml-6 rounded-lg pb-10">
            <div className="flex  justify-between items-center px-3">
              <div className="flex gap-6 mt-6">
                <div className="flex justify-between p-6">
                  <div className="h-10 w-10 bg-[#E54065]  flex justify-center capitalize items-center rounded-full text-white font-bolder">
                    {selectedMail?.from?.name.split("")[0]}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-4xl font-semibold">
                    {selectedMail?.from?.name}
                  </h3>
                  <span>{formateTime(selectedMail.date)}</span>
                </div>
              </div>
              <button className="bg-[#E54065]  px-2 py-1 text-white rounded-xl">
                Mark as Favorites
              </button>
            </div>

            <p
              className="pl-14 mt-10 pr-6"
              dangerouslySetInnerHTML={{ __html: selectedMail.body }}
            ></p>
          </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default App;
