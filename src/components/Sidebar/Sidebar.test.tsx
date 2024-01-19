/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const handleCollapse = jest.fn();
jest.mock("axios");

const response = {
  data: {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
};
describe("App", () => {
  test("Render the Sidebar and the UserMenu with user data", async () => {
    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: response.data })
    );

    await waitFor(async () =>
      render(
        <Provider store={store}>
          <Router>
            <Sidebar collapsed={false} handleCollapse={handleCollapse} />
          </Router>
        </Provider>
      )
    );

    //expect to find the dropdown
    expect(screen.getByText(response.data.name)).toBeInTheDocument();

    //hover on dropdown
    userEvent.hover(screen.getByText(response.data.name));

    //expect to find the user data
    await waitFor(() => {
      expect(screen.getByText(response.data.phone)).toBeInTheDocument();
      expect(screen.getByText(response.data.email)).toBeInTheDocument();
      expect(screen.getByText(response.data.company.name)).toBeInTheDocument();
    });
  });
});
