import {Login} from "../components/Login/Login";
import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {act} from "react-dom/test-utils";
import '@testing-library/jest-dom';
import React from 'react';
global.React = React

jest.mock('axios');
describe('Test loginpage', () => {

    test('submit without data expect disabled', async () => {
        render(<BrowserRouter> <Login isLoggedIn={false} setIsLoggedIn={() => {
        }}></Login> </BrowserRouter>);
        const button = screen.getByTestId("submit");
        expect(button).toHaveAttribute('disabled');
    });

    test('enable Button when both fields are filled out', async () => {
        render(<BrowserRouter> <Login isLoggedIn={false} setIsLoggedIn={() => {
        }}></Login> </BrowserRouter>);
        const inputEmail = screen.getByTestId("input-password");
        const inputPassword = screen.getByTestId("input-email");
        const button = screen.getByTestId("submit");
        fireEvent.input(inputEmail, {target: {value: "email@provider.com"}});
        fireEvent.input(inputPassword, {target: {value: "password"}});
        expect(inputEmail).toHaveDisplayValue('email@provider.com');
        expect(inputPassword).toHaveDisplayValue('password');
        expect(button).not.toHaveAttribute('disabled');
    });

    test('click on submit calls request', async () => {
        render(<BrowserRouter> <Login isLoggedIn={false} setIsLoggedIn={() => {
        }}></Login> </BrowserRouter>);
        axios.post.mockRejectedValueOnce(new Error("invalid Credentials"));
        const inputEmail = screen.getByTestId("input-password");
        const inputPassword = screen.getByTestId("input-email");
        const button = screen.getByTestId("submit");
        fireEvent.input(inputEmail, {target: {value: "email@provider.com"}});
        fireEvent.input(inputPassword, {target: {value: "password"}});
        expect(inputEmail).toHaveDisplayValue('email@provider.com');
        expect(inputPassword).toHaveDisplayValue('password');

        await act(async () => {
            fireEvent.click(button)
        });
        expect(axios.post).toHaveBeenCalledWith( "/api/login", {"email": "password", "password": "email@provider.com"});
    });
});
