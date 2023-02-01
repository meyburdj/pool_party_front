import { Route, Routes } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Container } from "@mui/system";

/**
 * RoutesList: renders individual Route components
 * 
 * Props: N/A
 * 
 * State: N/A
 */
function RoutesList({ signup }) {

    return (
        <Container>
            <Routes>
                <Route path="/signup" element={<SignupForm signup={signup} />} />
            </Routes>
        </Container>
    );
}


export default RoutesList;