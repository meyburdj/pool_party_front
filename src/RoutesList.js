import { Route, Routes, Navigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Container } from "@mui/system";
import LoginForm from "./LoginForm";
import Home from "./Home";
import { useContext } from "react";
import userContext from "./UserContext";
import Reservations from "./Reservations";
import Users from "./Users";
import Messages from "./Messages";

/**
 * RoutesList: renders individual Route components
 *
 * Props: N/A
 *
 * State: N/A
 */
function RoutesList({ signup, login }) {
    const { user } = useContext(userContext);

    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                {!user && (
                    <>
                        <Route path="/signup" element={<SignupForm signup={signup} />} />
                        <Route path="/login" element={<LoginForm login={login} />} />
                    </>
                )}

                {user && (
                    <>
                        <Route path="/reservations" element={<Reservations />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/messages" element={<Messages />} />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
}

export default RoutesList;
