import Button from "../ui/Button"
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function PostCard({post,onEdit,onDelete}){
    const token = localStorage.getItem("token");
    return (
         <div
         className="
            bg-white
            rounded-xl
            shadow-md
            p-5
            space-y-3
        ">
            
            <h2 className="
                text-xl
                font-bold
            ">
                 <Link
                to={`/posts/${post._id}`}
                className="text-blue-600 mt-4 inline-block"
              >
                {post.title}
                 </Link>
            </h2>
             <h2 className="
               text-gray-600
            ">
                {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
            </h2>
            <div>
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${
              post.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >
          {post.status}
        </span>
      </div>
        <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag, index) => (
          <span
            key={index}
            className="
              bg-blue-100
              text-blue-700
              px-2
              py-1
              rounded-md
              text-sm
            "
          >
            #{tag}
          </span>
        ))}
      </div>
      {token && (
            <div className="flex gap-3 pt-3">
                 {/* <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => onEdit(post)}
                >
                    Edit
                </Button> */}

                 <Link
            to={`/posts/${post._id}/edit`}
            className="
              p-2
              rounded-lg
              text-blue-600
              hover:bg-blue-100
              transition
            "
          >
            <Pencil size={18} />
          </Link>


                <button
                     className="
              p-2
              rounded-lg
              text-red-600
              hover:bg-red-100
              transition
            "
                    onClick={() => onDelete(post)}
                >
                   
                     <Trash2 size={18} />
                </button>
            </div>
            )}

         </div>
    )
}
export default PostCard