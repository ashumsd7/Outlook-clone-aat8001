import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EmailCard from "./components/EmailCard";
import EmailFilter from "./components/EmailFilter";
import axios from "axios";
import { FILTER_KEYWORDS } from "./utils/constants";

function App() {
  const [allMails, setAllMails] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState(FILTER_KEYWORDS[0])

  useEffect(() => {
    getAllMails();
  }, []);

  const getAllMails = async () => {
    const res = await axios.get("https://flipkart-email-mock.now.sh/");

    console.log("red Intent", res);
    setAllMails(res.data?.list);
  };

  return (
    <div className="p-6 ">
      <EmailFilter filter={selectedFilter}  setFilter={setSelectedFilter}/>
      {allMails.length == 0 && "No Mails Available"}
      {allMails.length > 0 &&
        allMails.map((data,idx) => {
          return <EmailCard key={idx} data={data} />;
        })}
    </div>
  );
}

export default App;
