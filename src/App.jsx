import { useState } from "react";
import "./App.css";
import React from "react";

const chat = [
  { id: 0, name: "Nonye", text: "" },
  { id: 1, name: "Meghan", text: "" },
  { id: 2, name: "Bob", text: "" },
  { id: 3, name: "Tina", text: "" },
  { id: 4, name: "Harry", text: "" },
  { id: 5, name: "Daniel", text: "" },
];

let nextid = 6;

export default function NameTabs() {
  const [fullupdate, setfullupdate] = useState(chat);
  const [id, setid] = useState(null);

  function storemessage(messagetext) {
    fullupdate.forEach((chatperson) => {
      if (chatperson.id === id) {
        setfullupdate([
          ...fullupdate,
          { name: chatperson.name, id: nextid++, text: messagetext },
        ]);
      }
    });
  }

  function sendtext(message) {
    storemessage(message);
  }

  return (
    <>
      <TypeMessage submitmessage={sendtext} />
      <div className="outercontainer">
        <div className="tabcontainer">
          {chat.map((person) => (
            <div
              key={person.id}
              onClick={() => setid(person.id)}
              className="namebutton"
            >
              {id === person.id ? <b>{person.name}</b> : person.name}
            </div>
          ))}
        </div>

        <Transcript fullmessage={fullupdate} />
      </div>

      <Reset chatreset={setfullupdate} idreset={setid} />
    </>
  );
}

export function Reset({ chatreset, idreset }) {
  return (
    <button
      onClick={() => {
        chatreset(chat);
        idreset(null);
      }}
      className="reset"
    >
      {" "}
      Reset Chat{" "}
    </button>
  );
}

export function Transcript({ fullmessage }) {
  let transcript = fullmessage.filter((content) => content.text != "");
  if (transcript) {
    return (
      <div className="transcript">
        <ul>
          {transcript.map((item) => (
            <li key={item.id}> {`${item.name}: ${item.text}`}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div className="transcript"></div>;
  }
}

export function TypeMessage({ submitmessage }) {
  const [text, settext] = useState("");

  return (
    <div className="message">
      <input
        onChange={(e) => settext(e.target.value)}
        value={text}
        type="text"
        placeholder="type message..."
      />
      <button
        onClick={() => {
          submitmessage(text);
          settext("");
        }}
        type="button"
      >
        SEND
      </button>
    </div>
  );
}
