import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { db } from '../../../utils/firebase'

const ChatArea = () => {
    const user = UserAuth()
    const messagesEndRef = useRef<any>(null);
    const [messages, setMessages] = useState<any>([]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(scrollToBottom, [messages])

    useEffect(() => {

        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: any[] = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

    }, []);

    return (
        <div className="pb-44 pt-5">
            {messages.map((message: any) => (
                message.uid === user?.currentUser.uid ?
                    
                        <div key={message?.id} className="chat-message">
                            <div className="flex items-end justify-end py-1">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                    <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-black ">{message?.text}</span></div>
                                </div>
                            </div>
                        </div>
                    :
                        <div key={message?.id} className="chat-message">
                            <div className="flex items-end py-1">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div>
                                        <p>{message?.name}</p>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-slate-700 text-white">{message?.text}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
            ))}

            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default ChatArea;
