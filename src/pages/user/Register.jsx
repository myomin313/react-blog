import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
 
  const navigate = useNavigate();

  const [form, setForm] = useState({
   name:"",
    age:"",
    email:"",
    password:""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
      console.log("hello");
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    const handleRegister = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:form.name,
            age:Number(form.age),
            email:form.email,
            password:form.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
           throw new Error(data.message || "Registration failed");
        }
        alert("Registration successful! Please log in.");
        navigate("/login");

      } catch (error) {
        setError(error.message || "Registration failed. Please try again.");
   
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
        <Card>
         
            <h1 className="text-2xl font-bold mb-5">
                Register
            </h1>
            <div className="space-y-4">
              {error && (
                 <div className="rounded-md bg-red-100 border border-red-400 text-red-700 px-4 py-2">
    {error}
  </div>
              )}
               <Input type="text" placeholder="Name" 
               name="name"  value={form.name} onChange={handleInputChange}/>
               <Input type="email" placeholder="Email"
               name="email" value={form.email} onChange={handleInputChange}  />         
               <Input type="password" type="password" placeholder="Password"
               name="password" value={form.password} onChange={handleInputChange}/>
               <Button className="text-center" onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register"}
               </Button>
            </div>
          
        </Card>
    </div>
  )
}

export default Register;