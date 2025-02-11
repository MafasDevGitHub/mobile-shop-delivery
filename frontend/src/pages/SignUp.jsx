import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signupRoute } from "../utils/AccountRoutes";

const Signup = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "user"
    });

    const handleValidation = () => {
        const { username, email, password, confirmpassword } = values;

        if (password !== confirmpassword) {
            alert("Password and Confirm Password should be the same!");
            return false;
        }

        if (!email) {
            alert("Email is required");
            return false;
        }

        if (username.length < 3) {
            alert("Username should be greater than 3 characters");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const { username, email, password, role } = values;

            try {
                const { data } = await axios.post(signupRoute, {
                    username,
                    email,
                    password,
                    role
                });

                if (data.status === false) {
                    alert(data.msg);
                }

                if (data.status === true) {
                    localStorage.setItem('app-user', JSON.stringify(data.newUser));
                    localStorage.setItem("token", data.token);
                    navigate("/");
                }
            } catch (error) {
                console.error("Error during registration: ", error);
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
                <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
                <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
                <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
