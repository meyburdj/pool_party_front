import { Route, Routes, Navigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Container } from "@mui/system";
import LoginForm from "./LoginForm";
import PoolList from "./PoolList";
import Home from "./Home";
import { useContext } from "react";
import userContext from "./UserContext";
import Reservations from "./Reservations";
import Users from "./Users";
import Messages from "./Messages";
import MyPools from "./MyPools";

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
                {!user && (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignupForm signup={signup} />} />
                        <Route path="/login" element={<LoginForm login={login} />} />
                    </>
                )}

                {user && (
                    <>
                        <Route path="/" element={<PoolList />} />
                        <Route path="/reservations" element={<Reservations />} />
                        <Route path="/:username/mypools" element={<MyPools />} />
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
