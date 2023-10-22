import { useEffect, useState } from "react";
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


function App() {
  // Todo: Can be set as env variable
  const BASE_URL = "https://flipkart-email-mock.now.sh/";
  const [allMails, setAllMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_KEYWORDS[0]);
  const emails = useSelector((store) => store.email?.emails);
  const dispatch = useDispatch(store);


  const [filteredMails, setFilteredMails] = useState(allMails);


  //getting all emails
  useEffect(() => {
    getAllMails();
  }, []);

  // when filter changes
  useEffect(() => {
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


  // get all mails using api
  const getAllMails = () => {
    axios.get(BASE_URL).then((res) => {
 
      const allEmails = { ...res.data?.list };
   
      setAllMails(res.data?.list);
      setFilteredMails(res.data?.list);
      if (allEmails.length > 0) {
        dispatch(setAllMails("ASHu"));
      }
    });
  };


  // fetch mail details by ID
  const fetchMailDetails = async (data, idx) => {
    const mailDetails = await axios.get(BASE_URL + "?id=" + data?.id);
 
    const allEmails = [...allMails];
    allEmails.splice(idx, 1, { ...data, isRead: true });
    setAllMails(allEmails)
    setFilteredMails(allMails);
 
    setSelectedMail({ ...mailDetails.data, ...data });
  };

  // when marked as favrt
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

  };


  // JSx

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
