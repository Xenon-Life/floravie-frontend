import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, Card, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Community() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [creating, setCreating] = useState(false);

  const canCreate = useMemo(
    () => title.trim().length > 3 && body.trim().length > 10,
    [title, body]
  );

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/posts`);
      setPosts(res.data?.posts || []);
    } catch (e) {
      console.log(e);
      toast.error("Could not load posts.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again.");
      return;
    }

    setCreating(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/posts`,
        { title: title.trim(), body: body.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOpen(false);
      setTitle("");
      setBody("");
      setLoading(true);
      await fetchPosts();
    } catch (e) {
      const msg = e?.response?.data?.message || "Could not create post.";
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Community</h1>
          <p className="text-sm opacity-80">
            Create a post and chat privately (anonymous) with others.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => { setLoading(true); fetchPosts(); }}>
            Refresh
          </Button>
          <Button type="primary" style={{ background: "#8E5BA6" }} onClick={() => setOpen(true)}>
          Create Post
          </Button>
        </div>
      </div>

      <Modal
        title="Create a community post"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={createPost}
        okButtonProps={{ disabled: !canCreate, loading: creating }}
        okText="Post"
      >
        <div className="flex flex-col gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g., period cramps advice?)"
            maxLength={120}
          />
          <Input.TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe your issue (no personal identifiers)."
            rows={5}
            maxLength={4000}
          />
        </div>
      </Modal>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {loading ? (
          <Card className="rounded-xl">Loading...</Card>
        ) : posts.length === 0 ? (
          <Card className="rounded-xl">
            No posts yet. Create the first one.
          </Card>
        ) : (
          posts.map((p) => (
            <Card
              key={p._id}
              className="rounded-xl"
              title={<span className="font-semibold">{p.title}</span>}
            >
              <p className="opacity-90 mb-4">
                {String(p.body || "").slice(0, 220)}
                {String(p.body || "").length > 220 ? "..." : ""}
              </p>
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/community/post/${p._id}`)}>
                  Open
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;

