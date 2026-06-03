import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../Auth/PrivateRoutes";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useUser();
  const myId = String(userInfo?.user?._id || "");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [groupChat, setGroupChat] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/posts/${id}`
      );
      setPost(res.data?.post || null);
    } catch (e) {
      console.log(e);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const fetchGroupChat = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/posts/${id}/conversations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroupChat(res.data?.groupChat || null);
    } catch (e) {
      setGroupChat(null);
      const msg = e?.response?.data?.message;
      if (msg) toast.error(msg);
    }
  }, [id]);

  useEffect(() => {
    if (!post || !myId) return;
    fetchGroupChat();
    const t = setInterval(() => fetchGroupChat(), 4000);
    return () => clearInterval(t);
  }, [post, myId, fetchGroupChat]);

  const joinOrOpenChat = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again.");
      return;
    }

    if (groupChat?.isParticipant && groupChat?.conversationId) {
      navigate(`/community/chat/${groupChat.conversationId}`);
      return;
    }

    setJoining(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/conversations`,
        { postId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const conversationId = res.data?.conversationId;
      if (conversationId) {
        navigate(`/community/chat/${conversationId}`);
      }
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        "Could not join group chat. Please try again.";
      toast.error(msg);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-4">
        <Card className="rounded-xl">Loading...</Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full p-4">
        <Card className="rounded-xl">Post not found.</Card>
      </div>
    );
  }

  const inChat = groupChat?.isParticipant;
  const count = groupChat?.participantCount ?? 0;

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Community Post</h1>
        <Button onClick={() => navigate("/community")}>Back</Button>
      </div>

      <Card
        className="rounded-xl mb-4"
        title={<span className="font-semibold">{post.title}</span>}
      >
        <p className="whitespace-pre-wrap">{post.body}</p>
      </Card>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Button
          type="primary"
          style={{ background: "#8E5BA6" }}
          onClick={joinOrOpenChat}
          loading={joining}
        >
          {inChat ? "Open group chat" : "Join group chat"}
        </Button>
        {count > 0 && (
          <Tag color="purple">
            {count} {count === 1 ? "person" : "people"} in chat
          </Tag>
        )}
        <Button onClick={() => fetchGroupChat()}>Refresh</Button>
      </div>

      <p className="text-sm opacity-80 max-w-xl">
        Everyone on this post shares <strong>one group room</strong>. Any logged-in
        member can join and chat together (anonymous display names in the thread).
        {String(post?.createdBy || "") === myId
          ? " As the author, open the same room to reply to everyone."
          : null}
      </p>
    </div>
  );
}

export default PostDetail;
