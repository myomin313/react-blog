import React from 'react'
import Card from '../../components/ui/Card'
import PostForm from '../../components/posts/PostForm'

function CreatePost() {
  return (
    <div className='max-w-xl mx-auto'>
        <Card>
            <h1 className='text-2xl font-bold'>
                Create Post
            </h1>
            <PostForm/>
        </Card>
    </div>
  )
}
export default CreatePost