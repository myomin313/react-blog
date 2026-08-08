import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      const data = await response.json();
      setPost(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="space-y-12 max-w-lg mx-auto">
      <Card>

        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>

        <div className="flex gap-3 mt-3">

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              post.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {post.status}
          </span>

          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 whitespace-pre-wrap text-gray-700">
          {post.content}
        </div>

        <div className="mt-8">
          <Link to="/posts">
            <Button>← Back</Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}

export default PostDetail;