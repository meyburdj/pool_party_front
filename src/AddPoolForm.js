import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import camelCase from "lodash/camelCase";
import { useNavigate } from "react-router-dom";

const defaultInitialFormData = {
  rate: "",
  size: "",
  description: "",
  city: "",
  image: null,
};

/**
 *Allows authenticated user to be add a pool
*
* Prop: signup - a function passed down that allows the user state to be set and
for a post to be made creating a User
*
* State: formData - allows the component to be controlled.
* - selectedFile - allows file uploaded to be controlled
 */
function AddPoolForm({ addPool }) {
  const [formDataText, setFormDataText] = useState(defaultInitialFormData);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [toast, setToast] = useState({ open: false, msg: null, style: null });

  const navigate = useNavigate();

  /** Update form text input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormDataText((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Update form file input. */
  function handleFileInput(evt) {
    setSelectedFile(evt.target.files[0]);
  }

  /** Call parent function with the user's inputs */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("formDataText", formDataText);
    console.log("selectedFile", selectedFile);

    const formData = new FormData();
    const formDataTextKeys = Object.keys(formDataText);
    formDataTextKeys.map((x) => formData.append(x, formDataText[x]));

    // formData.append("text", formDataText);
    formData.append("file", selectedFile);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    await addPool(formData);

    setFormDataText(defaultInitialFormData);
    // navigate("/");
  }

  const fields = ["rate", "size", "description", "city"];

  return (
    <>
      <h2>Add Pool Page</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ width: "50%" }}>
          {fields.map((f) => (
            <TextField
              key={camelCase(f)}
              label={f}
              variant="standard"
              name={camelCase(f)}
              id={camelCase(f)}
              type="text"
              onChange={handleChange}
            />
          ))}
          <input
            label="image"
            name="image"
            type="file"
            onChange={handleFileInput}
          />
          <Button variant="outlined" type="submit">
            Add Pool!
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default AddPoolForm;
