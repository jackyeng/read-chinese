import React from "react";
import SelectionTable from "./../components/SelectionTable";
import axios from "axios";

export default function Test() {
  const [chinese, setChinese] = React.useState({ chinese: [] });

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/chinese/")
      .then((response) => {
        setChinese([response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {}, [chinese]);
  return <div></div>;
}
