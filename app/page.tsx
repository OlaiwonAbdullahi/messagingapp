"use client";
import { useState } from "react";
import {
  Mic,
  Search,
  Phone,
  Video,
  Info,
  MessageCircle,
  ArrowLeft,
  Menu,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  text: string;
  time: string;
  avatar: string;
}

interface Message {
  text: string;
  sender: "user" | "contact";
  time: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Arlene McCoy",
    text: "It's really nice.",
    time: "Now",
    avatar: "https://tapback.co/api/avatar/arlene",
  },
  {
    id: 2,
    name: "Guy Hawkins",
    text: "Are you there?",
    time: "4:45pm",
    avatar: "https://tapback.co/api/avatar/john",
  },
  {
    id: 3,
    name: "Courtney Henry",
    text: "Hello?",
    time: "5:00pm",
    avatar: "https://tapback.co/api/avatar/joy",
  },
  {
    id: 4,
    name: "Jerome Bell",
    text: "Hello?",
    time: "Yesterday",
    avatar: "https://tapback.co/api/avatar/henry",
  },
  {
    id: 5,
    name: "Jane Cooper",
    text: "Okay...",
    time: "13 Mar",
    avatar: "https://tapback.co/api/avatar/cooper",
  },
  {
    id: 6,
    name: "Dianne Russell",
    text: "Hello? intereste...",
    time: "2 Jan",
    avatar: "https://tapback.co/api/avatar/russell",
  },
];

const sampleMessages: Record<number, Message[]> = {
  2: [
    {
      text: "Hey there! 😊 I've been feeling quite overwhelmed lately with work.",
      sender: "contact",
      time: "04:15 am",
    },
    {
      text: "When will the contract be sent?",
      sender: "contact",
      time: "06:15 am",
    },
    { text: "Paperless opt-in email sent", sender: "user", time: "08:20 pm" },
    {
      text: "Amante de cinema e viciado em pipoca! 🍿🎬",
      sender: "user",
      time: "08:20 pm",
    },
  ],
};

const Page = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messages, setMessages] =
    useState<Record<number, Message[]>>(sampleMessages);
  const [input, setInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSendMessage = () => {
    if (!input.trim() || selectedUser === null) return;

    const newMessage: Message = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMessage],
    }));

    setInput("");

    setTimeout(() => {
      const autoReply: Message = {
        text: "Thanks for your message! I'll get back to you soon.",
        sender: "contact",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), autoReply],
      }));
    }, 2000);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center font-montserrat"
      style={{ backgroundImage: 'url("./living.jpg")' }}
    >
      <div className="relative flex h-screen w-full max-w-[1400px] bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <div
          className={`absolute inset-y-0 left-0 z-20 w-full sm:static sm:w-80 sm:translate-x-0 transition-transform duration-300 ease-in-out
          ${selectedUser !== null ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="px-4 pt-4 sm:px-6 sm:pt-6 z-30 bg-black/10 h-full border-r border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl sm:text-2xl font-medium text-white">
                Messages
              </h1>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base"
              />
            </div>

            <div className="overflow-y-auto h-[calc(100%-180px)]">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user.id);
                  }}
                  className={`flex items-center p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 ${
                    selectedUser === user.id ? "bg-white/20" : ""
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-white truncate text-sm sm:text-base">
                        {user.name}
                      </h3>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs sm:text-sm text-white/70 truncate">
                        {user.text}
                      </p>
                      <span className="text-xs text-white/60 ml-2">
                        {user.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Message */}
            <div className="p-4 border-t border-white/10">
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-white font-medium text-sm sm:text-base">
                  New Message
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col bg-transparent">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="sm:hidden p-2 rounded-full bg-white/25"
                  >
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>
                  <img
                    src={users.find((u) => u.id === selectedUser)?.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h2 className="text-white text-sm sm:text-base font-semibold">
                      {users.find((u) => u.id === selectedUser)?.name}
                    </h2>
                    <p className="text-xs text-white/60">guy102</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/25 rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/25 rounded-full">
                    <Video className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/25 rounded-full">
                    <Info className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages[selectedUser] || []).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-end gap-2 max-w-[80%] sm:max-w-xs">
                      {msg.sender === "contact" && (
                        <img
                          src={users.find((u) => u.id === selectedUser)?.avatar}
                          className="w-6 h-6 rounded-full"
                          alt=""
                        />
                      )}
                      <div>
                        <div
                          className={`px-4 py-2 rounded-2xl text-white backdrop-blur-md ${
                            msg.sender === "user"
                              ? "bg-white/30 rounded-br-none"
                              : "bg-black/15 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <p className="text-xs text-white/50 mt-1 px-2">
                          {msg.time}
                        </p>
                      </div>
                      {msg.sender === "user" && (
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=24&h=24&fit=crop&crop=face"
                          className="w-6 h-6 rounded-full"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1 bg-white/20 rounded-xl px-4 py-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Write something..."
                      className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm"
                    />
                    <Mic className="w-5 h-5 text-white/60" />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center flex-col text-center px-4">
              <Menu className="sm:hidden mb-4 text-white w-8 h-8" />
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="text-white w-12 h-12" />
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">
                Select a chat to start messaging
              </h2>
              <p className="text-white/60 text-sm">
                Tap on a contact to begin the conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
