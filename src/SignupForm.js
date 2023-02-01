import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import camelCase from "lodash/camelCase";
import { useNavigate } from 'react-router-dom';



const defaultInitialFormData = {
    username: "",
    password: "",
    email: "",
    location: "",
    image: null,
};

/**
 *Allows user to be created and recieve a JWT
*
* Prop: signup - a function passed down that allows the user state to be set and
for a post to be made creating a User
*
* State: formData allows the component to be controlled.
 */
function SignupForm({ signup }) {

    const [formData, setFormData] = useState(defaultInitialFormData);
    // const [toast, setToast] = useState({ open: false, msg: null, style: null });

    const navigate = useNavigate();

    /** Update form input. */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    /** Call parent function with the user's inputs */
    async function handleSubmit(evt) {
        evt.preventDefault();
        await signup(formData);


        // navigate("/");
    }

    const fields = ["Username", "Password", "Email", "Location"];


    return (
        <>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: "50%" }}>
                    {fields.map(f => (
                        <TextField
                            key={camelCase(f)}
                            label={f}
                            variant="standard"
                            name={camelCase(f)}
                            id={camelCase(f)}
                            type={f === "Password" ? "password" : "text"}
                            onChange={handleChange}
                        />
                    ))}
                    <input label="image" name="image" type="file" onChange={handleChange} />
                    <Button variant="outlined" type="submit">Signup!</Button>
                </Stack>
            </form>

        </>
    );
}


export default SignupForm;