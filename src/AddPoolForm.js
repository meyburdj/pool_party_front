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
 * AddPoolForm: Form for adding a pool to database.
 *
 * Props:
 * -addPool(): function propdrilled from App that sends a post request 
 * 
 * State: 
 * -formDataText: text entered into form fields
 * -selectedFile: file data added to formData
 *
 * Component tree:
 * -MyPools -> AddPoolForm
 */

function AddPoolForm({ addPool }) {
  const [formDataText, setFormDataText] = useState(defaultInitialFormData);
  const [selectedFile, setSelectedFile] = useState(null);

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

    formData.append("file", selectedFile);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    await addPool(formData);

    setFormDataText(defaultInitialFormData);
    // navigate("/");
  }

  const fields = ["rate", "size", "description"];

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
          <select
            id="city-select"
            name="city"
            value={formDataText.city}
            onChange={handleChange}
          >
            <option value="">Select a city</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
            <option value="New York">New York</option>
          </select>
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