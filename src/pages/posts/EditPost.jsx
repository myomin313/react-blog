import React from 'react'
import Card from '../../components/ui/Card'
import { useParams } from 'react-router-dom'
import PostForm from '../../components/posts/PostForm';
import { useEffect, useState } from 'react';

function EditPost() {
    const {id} = useParams();
    //console.log("EditPost ID:", id);
    const [post, setPost] = useState(null);
    useEffect(() => {
    fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
          console.log("Fetching post with ID:", id);
            const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
            console.log("Fetch post response status:", response.status);
            if (!response.ok) {
                throw new Error("Failed to fetch post");
            }
            const data = await response.json();
            console.log("Fetched post:", data);
            setPost(data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };
   if (!post) return <p>Loading...</p>;
  return (
    <div className="max-w-2xl mx-auto">
        <Card>
         <h1 className='text-2xl font-bold mb-6'>
           Edit Post 
         </h1>
         <PostForm post={post} />
        </Card>
    </div>

  )
}

export default EditPost