import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Button, Card, Input, Tag } from "antd";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../Auth/PrivateRoutes";
import { ToastContainer, toast } from "react-toastify";

function PrivateChat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser() || {};
  const myId = String(user?._id || "");

  const token = useMemo(() => localStorage.getItem("token"), []);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const [participantCount, setParticipantCount] = useState(0);
  const [chatType, setChatType] = useState("group");

  const senderLabel = useCallback(
    (senderId) => {
      const sid = String(senderId || "");
      if (sid === myId) return "You";
      const short = sid.slice(-4);
      return `Guest •••${short}`;
    },
    [myId]
  );

  const fetchMeta = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/conversations/${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const convo = res.data?.conversation;
      setParticipantCount(convo?.participantCount ?? 0);
      setChatType(convo?.type || "group");
    } catch (e) {
      console.log(e);
    }
  }, [conversationId, token]);

  const fetchHistory = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/messages/${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data?.messages || []);
    } catch (e) {
      console.log(e);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMeta();
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    if (!token) return;

    const base = import.meta.env.VITE_BACKEND_URL || "/api";
    const backendOrigin = base.startsWith("http")
      ? String(base).replace(/\/api\/?$/, "")
      : typeof window !== "undefined"
        ? window.location.origin
        : "";

    const socket = io(backendOrigin, {
      auth: { token },
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketStatus("connected");
      socket.emit("join_room", conversationId);
    });

    socket.on("joined_room", () => {
      setSocketStatus("joined");
      fetchMeta();
    });

    socket.on("connect_error", (err) => {
      setSocketStatus("disconnected");
      toast.error(err?.message || "Socket connection failed.");
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [conversationId, token, fetchMeta]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    if (socketStatus !== "joined") {
      toast.error("Chat is not connected yet. Please wait a second.");
      return;
    }
    setInput("");
    socketRef.current?.emit("send_message", { conversationId, body: text });
  };

  const isGroup = chatType === "group" || String(conversationId).startsWith("group_");

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">
            {isGroup ? "Group Chat" : "Private Chat"}
          </h1>
          <p className="text-sm opacity-80">
            {participantCount > 0
              ? `${participantCount} participant${participantCount !== 1 ? "s" : ""}`
              : "Loading participants…"}{" "}
            • Status: {socketStatus}
          </p>
        </div>
        <Button onClick={() => navigate("/community")}>Back</Button>
      </div>

      {isGroup && (
        <Tag color="purple" className="mb-3">
          Multiple people can chat in this room
        </Tag>
      )}

      <Card className="rounded-xl mb-3" style={{ height: 420, overflowY: "auto" }}>
        {loading ? (
          <div>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div>No messages yet. Say hello to the group.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((m) => {
              const isMe = String(m.sender || "") === myId;
              return (
                <div
                  key={m._id || `${m.sender}-${m.createdAt}-${m.body}`}
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    isMe ? "self-end bg-[#F7EFFB]" : "self-start bg-[#FCEDEC]"
                  }`}
                >
                  <div className="text-xs opacity-60 mb-1">
                    {senderLabel(m.sender)}
                  </div>
                  <div className="whitespace-pre-wrap">{m.body}</div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </Card>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onPressEnter={send}
        />
        <Button type="primary" style={{ background: "#8E5BA6" }} onClick={send}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default PrivateChat;
