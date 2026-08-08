import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useState, useEffect } from "react";

function Home() {

  const [latestPosts, setLatestPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [published, setPublished] = useState(0);

  useEffect(()=>{
    getLatestPosts();
  },[])
  const getLatestPosts = async () => {
      try {
            const response = await fetch("http://localhost:5000/api/blogs/home/get-latest-blogs");
            if(!response.ok){
              throw new Error("Failed to fetch latest posts");
            }
            const data = await response.json();
            console.log("Latest posts:", data);
            setLatestPosts(data.data);
            setTotalPosts(data.stats.total);
            setDrafts(data.stats.totalDraft);
            setPublished(data.stats.totalPublished);
          }catch(error){
            console.error("Error fetching latest posts:", error);
          }
        }

  return (
    <div className="space-y-12">

      {/* Hero Section */}
      <section className="text-center py-16 bg-white rounded-xl shadow">

        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to MyBlog
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
           CRUD application
        </p>

      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <h3 className="text-gray-500">Total Posts</h3>
          <p className="text-4xl font-bold mt-2">{totalPosts}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Drafts</h3>
          <p className="text-4xl font-bold mt-2">{drafts}</p>
        </Card>

        <Card>
          <h3 className="text-gray-500">Published</h3>
          <p className="text-4xl font-bold mt-2">{published}</p>
        </Card>

      </section>
      <section>

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Latest Posts
          </h2>

          <Link
            to="/posts"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {latestPosts.map((item) => (
            <Card key={item._id}>
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">
                {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
              </p>
              <Link
                to={`/posts/${item._id}`}
                className="text-blue-600 mt-4 inline-block"
              >
                Read More →
              </Link>
            </Card>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;