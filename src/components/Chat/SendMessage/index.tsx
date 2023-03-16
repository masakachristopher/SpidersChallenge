import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SetStateAction, useState } from "react"
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../utils/firebase";
import { Strings } from "../../../constants";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = UserAuth();
  const character = "@"
  
  const handleSendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if(message.trim() === "") {
      // alert("Enter valid message!");
      return;
    }

    try {
      const { uid, email } = currentUser; 
      await addDoc(collection(db, "messages"), {
        text: message,
        name: email.substring(0, email.indexOf(character)),
        createdAt: serverTimestamp(),
        uid
      })
    } catch(error) {
      console.log(error);
    }
    setMessage("");
  }

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(e.target.value)
  }

  return (
    <div className="bg-black fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 flex">
        <input value={message} placeholder={Strings.message} onChange={handleChange} className="input w-full h-10 text-white p-1 focus:outline-none bg-slate-700 rounded-r-none" type="text" />
        <button type="submit" className="w-auto bg-gray text-white rounded-r-lg px-5 text-sm">{Strings.send}</button>
      </form>
    </div>
  )
}

export default SendMessage