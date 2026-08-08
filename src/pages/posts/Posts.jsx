import React, { useState,useEffect } from 'react'
import PostCard from '../../components/posts/PostCard'
import DeleteModal from '../../components/ui/DeleteModal'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'


function Posts() {

   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const token = localStorage.getItem("token");

   useEffect(() => {
      fetchPosts();
   }, []);


   const fetchPosts = async () => {
      try {
         setLoading(true);
         const response = await fetch( token ? `http://localhost:5000/api/blogs/user/user-blogs` : "http://localhost:5000/api/blogs",{
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })

          console.log("Status:", response.status);
         if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }

          const data = await response.json();
          console.log("Fetched posts:", data);
          setPosts(data.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      }
   
    const [seletedPost,setSeletedPost] = useState(null)
    const [showModal,setShowModal]=useState(false)

    const handleEdit=(post)=>{
       console.log("Edit",post)
    }
    const handleDelete=(post)=>{
       setSeletedPost(post);
       setShowModal(true);
    }
    const handleDeleteSuccess = (deletedId) => {
  setPosts((prevPosts) =>
    prevPosts.filter((post) => post._id !== deletedId)
  );
};

  return (
    <div className='space-y-4'>
        <div className='flex'>
        {token && (
          <Link to="/posts/create">
            <Button>
              + New Post
            </Button>
          </Link>
        )}
        </div>
     <div className='
     grid
     grid-cols-1
     md:grid-cols-2
     lg:grid-cols-3
     gap-6'>
        {
             posts.map(post=>(
               <PostCard
                key={post._id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
               />
             ))
        }

        <DeleteModal
        open={showModal}
        post={seletedPost}
        onClose={()=>setShowModal(false)}
        onDeleted={handleDeleteSuccess}
        >

        </DeleteModal>

     </div>
     </div>
  )
}

export default Posts