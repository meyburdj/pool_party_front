import { Route, Routes, Navigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Container } from "@mui/system";
import LoginForm from "./LoginForm";
import PoolList from "./PoolList";
import { useContext } from "react";
import userContext from "./UserContext";
import Users from "./Users";
import MyPools from "./MyPools";
import Mailbox from "./Mailbox";
import ReservationList from "./ReservationList";

/**
 * RoutesList: renders individual Route components
 *
 * Props: signup, login, addReservation, removeReservation
 *
 * State: N/A
 */
function RoutesList({ signup, login, addReservation, removeReservation }) {
    const { user } = useContext(userContext);

    return (
        <Container>
            <Routes>
                {!user && (
                    <>
                        <Route path="/" element={<PoolList />} />
                        <Route path="/signup" element={<SignupForm signup={signup} />} />
                        <Route path="/login" element={<LoginForm login={login} />} />
                    </>
                )}

                {user && (
                    <>
                        <Route path="/" element={<PoolList
                            addReservation={addReservation} removeReservation={removeReservation} />} />
                        <Route path="/memberships" element={<ReservationList
                            addReservation={addReservation} removeReservation={removeReservation} />} />
                        <Route path="/mypools" element={<MyPools />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/messages" element={<Mailbox />} />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
}

export default RoutesList;
