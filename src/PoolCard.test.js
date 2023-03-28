import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import PoolCard from "./PoolCard";
import userContext from "./UserContext";
import PoolPartyApi from "./api";

jest.mock("./api");

describe("PoolCard", () => {
    const mockPool = {
        id: "1",
        size: "small",
        city: "New York",
        description: "Small pool in New York.",
        image_url: "https://example.com/pool-image.jpg",
        owner_username: "testuser",
    };

    test("renders pool card correctly", () => {
        const { getByText, getByAltText } = render(
            <userContext.Provider value={{ user: null }}>
                <PoolCard pool={mockPool} />
            </userContext.Provider>
        );

        expect(getByText("SMALL pool in NEW YORK")).toBeInTheDocument();
        expect(getByText("Small pool in New York.")).toBeInTheDocument();
        expect(getByAltText(mockPool.image_url)).toBeInTheDocument();
    });

    test("renders user actions when user is logged in and not the pool owner", () => {
        const mockUser = { username: "anotheruser" };
        render(
            <userContext.Provider value={{ user: mockUser }}>
                <PoolCard pool={mockPool} />
            </userContext.Provider>
        );

        expect(screen.getByText("Chat with Host")).toBeInTheDocument();
        expect(screen.getByText("Join the Party!")).toBeInTheDocument();
    });

    test("renders login/signup actions when user is not logged in", () => {
        render(
            <userContext.Provider value={{ user: null }}>
                <PoolCard pool={mockPool} />
            </userContext.Provider>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("signup")).toBeInTheDocument();
    });

    test("opens and closes chat dialog, sends message", async () => {
        const mockUser = { username: "anotheruser" };
        render(
            <userContext.Provider value={{ user: mockUser }}>
                <PoolCard pool={mockPool} />
            </userContext.Provider>
        );

        const chatButton = screen.getByText("Chat with Host");
        userEvent.click(chatButton);

        expect(screen.getByText("Contact your future pool party host!")).toBeInTheDocument();

        const textField = screen.getByLabelText("text");
        userEvent.type(textField, "Hello, I'd like to join your pool party!");

        const sendMessage = jest.spyOn(PoolPartyApi, "sendMessage");
        const sendButton = screen.getByText("Send Message!");
        userEvent.click(sendButton);

        expect(sendMessage).toHaveBeenCalled();

        const cancelButton = screen.getByText("Cancel");
        userEvent.click(cancelButton);

        expect(screen.queryByText("Contact your future pool party host!")).not.toBeInTheDocument();
    });

    test("toggles reserve button color", () => {
        const mockUser = { username: "anotheruser" };
        render(
            <userContext.Provider value={{ user: mockUser }}>
                <PoolCard pool={mockPool} />
            </userContext.Provider>
        );

        const reserveButton = screen.getByText("Join the Party!");

        userEvent.click(reserveButton);
        expect(reserveButton).toHaveStyle("color: green");

        userEvent.click(reserveButton);
        expect(reserveButton).not.toHaveStyle("color: green");
    });
});