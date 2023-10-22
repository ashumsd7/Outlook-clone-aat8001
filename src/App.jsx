import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmailCard from "./components/EmailCard";
import EmailFilter from "./components/EmailFilter";
import axios from "axios";
import { FILTER_KEYWORDS } from "./utils/constants";
import { formateTime } from "./utils/formatDate";
import { useSelector } from "react-redux";
import {
  markAsFavorite,
  removeAsFavorite,
  markAsRead,
  setAllMails,
} from "./store/emailSlice";
import { useDispatch } from "react-redux";
import store from "./store/store";
import { data } from "autoprefixer";

function App() {
  const BASE_URL = "https://flipkart-email-mock.now.sh/";
  const [allMails, setAllMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_KEYWORDS[0]);
  const cartItems = useSelector((store) => store.email?.emails);
  const dispatch = useDispatch(store);
  console.log("cartItems", cartItems);

  const [filteredMails, setFilteredMails] = useState(allMails);

  useEffect(() => {
    getAllMails();
  }, []);

  useEffect(() => {
  console.log('selectedFilter',selectedFilter)
    setSelectedMail(null)
    let emails = [...allMails];
    if(selectedFilter.value=='unread'){
      setFilteredMails(allMails);
    }else if(selectedFilter.value=='read'){
      emails = emails.filter((data) => data.isRead);
      setFilteredMails(emails);
    }else if(selectedFilter.value=='favorites'){
      emails = emails.filter((data) => data.isFavorite);
      setFilteredMails(emails);
    }else{
      setFilteredMails(allMails);
    }
   
 
  }, [selectedFilter]);

  const getAllMails = () => {
    axios.get(BASE_URL).then((res) => {
      console.log("red Intent", res.data?.list);
      const allEmails = { ...res.data?.list };
      console.log("allEmails", allEmails);
      setAllMails(res.data?.list);
      setFilteredMails(res.data?.list);
      if (allEmails.length > 0) {
        dispatch(setAllMails("ASHu"));
      } else {
        console.log(">>>>>>", res.data.list);
      }
    });
  };

  const fetchMailDetails = async (data, idx) => {
    const mailDetails = await axios.get(BASE_URL + "?id=" + data?.id);
    console.log("mailDetails1", { ...mailDetails.data, ...data });

    const allEmails = [...allMails];
    allEmails.splice(idx, 1, { ...data, isRead: true });
    setAllMails(allEmails)
    setFilteredMails(allMails);
    console.log("{...data,isRead:true}", { ...data, isRead: true });
    setSelectedMail({ ...mailDetails.data, ...data });
  };

  const markAsFavorite = (data) => {
    const allEmails = [...allMails];
    const selectedMailIndex = allEmails.findIndex((mail) => mail.id == data.id);
    allEmails.splice(selectedMailIndex, 1, {
      ...data,
      isRead: true,
      isFavorite: true,
    });
    setSelectedMail({ ...data, isRead: true, isFavorite: true });
    setAllMails(allEmails);
    console.log("{...data,isRead:true}", {
      ...data,
      isRead: true,
      isFavorite: true,
    });
  };

  return (
    <div>
      <div className="p-6">
        <EmailFilter filter={selectedFilter} setFilter={setSelectedFilter} />
      </div>
      <div className={`p-4 ${selectedMail ? "flex   " : ""}`}>
        <div
          className={`flex flex-col ${
            selectedMail ? " h-[80vh] overflow-y-auto min-w-[30%]" : ""
          }`}
        >
          {filteredMails.length == 0 && "No Mails Available"}
          {filteredMails.length > 0 &&
            filteredMails.map((data, idx) => {
              return (
                <EmailCard
                  key={idx}
                  data={data}
                  onClickMail={fetchMailDetails}
                  idx={idx}
                  selectedMail={selectedMail}
                />
              );
            })}
        </div>

        {selectedMail && (
          <div>
            <div className="flex justify-end">
              {" "}
              <button
                onClick={() => {
                  setSelectedMail(null);
                }}
                className="  w-4 h-4 flex justify-center items-center mb-4 p-2 cursor-pointer text-red-400 font-extrabold  bg-gray-200 rounded-lg"
              >
                {" "}
                X
              </button>
            </div>
            <div className=" bg-white border shadow-lg ml-6 rounded-lg pb-10">
              <div className="flex  justify-between items-center px-3">
                <div className="flex gap-1 mt-6">
                  <div className="flex justify-between p-6">
                    <div className="h-10 w-10 bg-[#E54065]  flex justify-center capitalize items-center rounded-full text-white font-bolder">
                      {selectedMail?.from?.name.split("")[0]}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-4xl font-semibold">
                      {selectedMail?.from?.name}
                    </h3>
                    <span>{formateTime(selectedMail.date)}</span>
                  </div>
                </div>
                {
                  <button
                    disabled={selectedMail?.isFavorite}
                    onClick={() => {
                      markAsFavorite(selectedMail);
                    }}
                    className="bg-[#E54065]  px-2 py-1 text-white rounded-xl"
                  >
                    {selectedMail?.isFavorite
                      ? "✅Added to Favorites "
                      : "Mark as Favorites"}
                  </button>
                }
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
