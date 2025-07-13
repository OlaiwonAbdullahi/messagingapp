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
} from "lucide-react";

const users = [
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

const sampleMessages = {
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    const newMessage = {
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

    // Auto-reply after 2 seconds
    setTimeout(() => {
      const autoReply = {
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
      className="flex items-center justify-center min-h-screen  p-4 bg-cover bg-no-repeat
    "
      style={{ background: 'url("./living.jpg")', backgroundSize: "contain" }}
    >
      <div className="flex h-[600px] w-full max-w-5xl bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-black/10 backdrop-blur-md border-r border-white/10">
          {/* Header */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">Messages</h1>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Mic className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-full pt-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 ${
                  selectedUser === user.id ? "bg-white/20" : ""
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white truncate">
                      {user.name}
                    </h3>
                  </div>
                  <div className=" flex-row flex justify-between">
                    <p className="text-sm text-white/70 truncate">
                      {user.text}
                    </p>
                    <span className="text-xs text-white/60 ml-2">
                      {user.time}
                    </span>
                  </div>
                </div>
                <button className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-white/60" />
                </button>
              </div>
            ))}
          </div>

          {/* New Message Button */}
          <div className="p-4 border-t border-white/10">
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">New Message</span>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4  border-b border-white/50">
                <div className="flex items-center gap-3">
                  <div
                    className="bg-white/25 p-2 rounded-full cursor-pointer"
                    onClick={() => setSelectedUser(null)}
                  >
                    <ArrowLeft className=" text-white h-4 w-4 " />
                  </div>
                  <img
                    src={users.find((u) => u.id === selectedUser)?.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-white">
                      {users.find((u) => u.id === selectedUser)?.name}
                    </h2>
                    <p className="text-sm text-white/60">guy102</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/25 rounded-full ">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/25 rounded-full ">
                    <Video className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/25 rounded-full ">
                    <Info className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Date Header */}
                <div className="flex justify-center">
                  <span className="text-xs text-white/80  px-3 py-1 rounded-full">
                    April 28, 2024
                  </span>
                </div>

                {(messages[selectedUser] || []).map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-end gap-2 max-w-xs">
                      {msg.sender === "contact" && (
                        <img
                          src={users.find((u) => u.id === selectedUser)?.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div
                          className={`px-4 py-2 rounded-2xl backdrop-blur-md ${
                            msg.sender === "user"
                              ? "bg-white/30 text-white rounded-br-none"
                              : "bg-black/15 text-white rounded-bl-none"
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
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-black/30 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                    <input
                      type="text"
                      placeholder="Write something"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none rounded-xl"
                    />
                    <button className="p-1 hover:bg-white/10 rounded-xl transition-colors">
                      <Mic className="w-5 h-5 text-white/60" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-white text-black rounded-xl hover:bg-white/90 transition-colors font-medium"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <MessageCircle className="w-16 h-16 text-white/60" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Select a chat to start messaging
              </h2>
              <p className="text-white/60 max-w-md">
                Click on a user from the left panel to begin chatting and stay
                connected with your contacts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
