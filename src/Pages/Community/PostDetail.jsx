import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "antd";
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
  const [starting, setStarting] = useState(false);
  const [authorChats, setAuthorChats] = useState([]);

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/posts/${id}`);
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

  const fetchAuthorChats = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/posts/${id}/conversations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAuthorChats(res.data?.conversations || []);
    } catch (e) {
      setAuthorChats([]);
      const msg = e?.response?.data?.message;
      if (msg) toast.error(msg);
    }
  }, [id]);

  useEffect(() => {
    if (!post || !myId) return;
    if (String(post.createdBy || "") === myId) {
      fetchAuthorChats();
    } else {
      setAuthorChats([]);
    }
  }, [post, myId, fetchAuthorChats]);

  // So the post author sees new chats as soon as someone taps “Chat Privately” (no manual refresh).
  useEffect(() => {
    if (!post || !myId) return;
    if (String(post.createdBy || "") !== myId) return;
    const t = setInterval(() => fetchAuthorChats(), 4000);
    return () => clearInterval(t);
  }, [post, myId, fetchAuthorChats]);

  const startChat = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again.");
      return;
    }
    setStarting(true);
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
        "Could not start private chat. Please try again.";
      toast.error(msg);
    } finally {
      setStarting(false);
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

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Community Post</h1>
        <Button onClick={() => navigate("/community")}>Back</Button>
      </div>

      <Card className="rounded-xl mb-4" title={<span className="font-semibold">{post.title}</span>}>
        <p className="whitespace-pre-wrap">{post.body}</p>
      </Card>

      <Button
        type="primary"
        style={{ background: "#8E5BA6" }}
        onClick={startChat}
        loading={starting}
        disabled={String(post?.createdBy || "") === myId}
      >
        Chat Privately
      </Button>
      {String(post?.createdBy || "") === myId ? (
        <div className="mt-4">
          <p className="text-sm opacity-80 mb-2">
            <strong>You published this post.</strong> You can&apos;t use &quot;Chat Privately&quot; on your
            own thread (that would mean chatting with yourself). Another logged-in user must open this
            same post and tap <strong>Chat Privately</strong> first. Then use <strong>Open chat</strong>
            below — it updates every few seconds, or tap Refresh.
          </p>
          <Button className="mb-3" onClick={() => fetchAuthorChats()}>
            Refresh chat list
          </Button>
          {authorChats.length === 0 ? (
            <p className="text-sm opacity-70">
              No private chats on this post yet. Waiting for someone else to start one from this post.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Private chats on this post</p>
              {authorChats.map((c) => (
                <Button
                  key={c.conversationId}
                  onClick={() => navigate(`/community/chat/${c.conversationId}`)}
                >
                  Open chat (anonymous guest)
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default PostDetail;

