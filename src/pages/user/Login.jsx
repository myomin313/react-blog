import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
      console.log("login submit");
      setError("");
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            });
            const data = await response.json();
                 console.log("Login response:", data);
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
            localStorage.setItem("token", data.data.token);
            navigate("/posts");
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };
    return(
    <div className="flex justify-center items-center min-h-[70vh]">
        <Card>
            <h1 className="text-2xl font-bold mb-5">
              Login
            </h1>
             <form onSubmit={handleLogin}>
             <div className="space-y-4">
             {error && (
  <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-2">
    {error}
  </div>
)}
            <Input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" />
            <Input type="password" name="password" value={form.password} onChange={handleInputChange} placeholder="Password"/>
            <Button className="text-center" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
           
            </div>
             </form>
        </Card>
    </div>
  )
}

export default Login