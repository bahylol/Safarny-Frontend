import React, {  useEffect, useState } from "react";
import ChatLogo from "../../Components/ChatLogo";
import axios from "axios";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePepole, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [ourUserId, setOuruserId] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  let wasO = false;

  useEffect(() => {
    axios
      .get("http://localhost:3000/myProfile", { withCredentials: true })
      .then((res) => {
        setOuruserId(res.data.id);
        setFname(res.data.fname);
        setLname(res.data.lname);
      })
      .catch((error) => {
        console.log("ERROR YASTA : ", error);
      });
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);
  function showOnlinePeople(peopleArray) {
    console.log("TT");
    const people = {};
    peopleArray.forEach(({ userId }) => {
      console.log(userId);
      console.log(fname);
      console.log(lname);
      people[userId] = fname + "Travler " + userId + lname;
    });

    console.log(people);
    setOnlinePeople(people);
  }
  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    console.log({ ev, messageData });
    console.log(messageData);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((perv) => [
        ...perv,
        { isOur: false, text: messageData.text },
      ]);
     
    }
  }
  function sendMessage(ev) {
    console.log("INSSEEEEEEEEEENDD");
    ev.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
      })
    );
    const data = {
      sender: ourUserId,
      receiver: selectedUserId,
      content: newMessageText,
    };
    console.log({ data });
    const messageDoc = axios
      .post("http://localhost:3000/message", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setNewMessageText("");
    setMessages((perv) => [...perv, { text: newMessageText, isOur: true }]);
    const messageWithoutdup = messages;
  }
  const onlinePeopleX = { ...onlinePepole };
  delete onlinePeopleX[ourUserId];
  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        <ChatLogo />
        {Object.keys(onlinePeopleX).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedUserId(userId)}
            className={
              "border-b border-gray-100 py-2  pl-4 flex items-center gap-2 cursor-pointer " +
              (selectedUserId === userId ? "bg-blue-100" : "")
            }
          >
            {onlinePeopleX[userId]}
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-300 w-2/3 mx-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full flex-grow items-center justify-center">
              <div className="text-gray-300">
                &larr; Select a person from the sidebar
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <div>
              {messages.map((messages) => (
                <div> {messages.text} </div>
              ))}
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2 " onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              placeholder="Type your message here"
              className="bg-white flex-gorw border p-2"
            ></input>
            <button type="submit" className="bg-blue-500 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Chat;
