import { Route, Routes } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Container } from "@mui/system";
import LoginForm from "./LoginForm";
import Home from "./Home";

/**
 * RoutesList: renders individual Route components
 *
 * Props: N/A
 *
 * State: N/A
 */
function RoutesList({ signup, login }) {

    return (
        <Container>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignupForm signup={signup} />} />
                <Route path="/login" element={<LoginForm login={login} />} />
            </Routes>
        </Container>
    );
}


export default RoutesList;