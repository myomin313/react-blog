import React from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PostForm({ post = null}) {
   const navigate = useNavigate();

   //const token = localStorage.getItem("token");
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
         title: '',
   content: '',
   status: 'draft',
   tags: []
   })
   useEffect(() => {
      if (post) {
         setFormData({
            title: post.data.title,
            content: post.data.content,
            status: post.data.status,
            tags: post.data.tags
         });
      }
   }
, [post]);
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(post ? `http://localhost:5000/api/blogs/${post.data._id}` : `http://localhost:5000/api/blogs`, {
            method: post ? 'PUT' : 'POST',
            headers: {
               'Content-Type': 'application/json',
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData)
         });
         const data = await response.json();

         if (!response.ok) {
                 throw new Error(data.message || "Failed to save post");
        }
         navigate('/posts');
      } catch (error) {
         console.error("Error saving post:", error);
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

  return (
     <div className='space-y-4'>
        <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Post Title" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <textarea placeholder="Content" name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32">
           
        </textarea>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>
        </select>
        <Input
          placeholder="Tags (comma separated)"
          value={formData.tags.join(", ")}
          onChange={(e) => setFormData({...formData, tags: e.target.value.split(",").map(tag => tag.trim())})}
        />
        <Button type="submit" disabled={loading}>
           {loading ? "Saving..." : "Save Post"}
        </Button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
     </div>
  )
}

export default PostForm