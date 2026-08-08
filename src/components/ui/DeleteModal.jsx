import Button from "../ui/Button";

function DeleteModal({ open, post, onClose , onDeleted}) {
  if (!open) return null;

  const handleDelete = async () => {

    try {
      
    const response =await fetch(`http://localhost:5000/api/blogs/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

      console.log("Delete response:", data);


      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete post"
        );
      }
      onClose();
     onDeleted(post._id);
  } catch (error) {
    console.error("Error deleting post:", error);
  }finally{
    onClose();
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-96">

        <h2 className="text-xl font-bold">
          Delete Post
        </h2>

        <p className="mt-3">
          Are you sure you want to delete
          <strong> "{post.title}" </strong>?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <Button
            className="bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </Button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;