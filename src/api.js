import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001/api";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SharebnbApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    static token = "";

    // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    /**
     * request: builds an API request from the provided data.
     *
     * @param {string} endpoint - restful endpoint to make request to
     * @param {object} data - (opt) data to pass in request, either in body or
     * params (defaults to {})
     * @param {string} method - (opt) type of request (defaults to "get")
     * @returns data retrieved from request; error if something went wrong.
     */
    static async request(endpoint, data = {}, method = "get", contentType = 'application/json') {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;

        const headers = {
            Authorization: `Bearer ${SharebnbApi.token}`,
            "Content-Type": contentType,
            // "Content-Type": "multipart/form-data",
        };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /**
     * Get details on a company by handle.
     *
     * @param {string} handle - handle of the company to retrieve
     * @returns object representing a single company
     */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /**
     * Get all companies, filtered if param added.
     *
     * @param {string} nameLike - search term to filter companies by
     * @returns array of company objects
     */
    static async getCompanies(nameLike) {
        // const data = nameLike ? { nameLike } : {};
        const res = await this.request(`companies`, { nameLike });

        return res.companies;
    }

    /**
     * Get jobs, filtered if param added
     *
     * @param {string} title - search term to filter jobs by
     * @returns array of job objects
     */
    static async getJobs(title) {
        const res = await this.request(`jobs`, { title });

        return res.jobs;
    }

    /**
     * Registers a new user
     *
     * @param {object} newUserData - new user information, required: {username,
     * firstName, lastName, password, email}
     * @returns the JWT for the user
     */
    static async signupUser(newUserData) {
        const res = await this.request("auth/signup", newUserData, "post", "multipart/form-data");
        //TODO: add back in resp.token

        console.log("🚀 ~ file: api.js:105 ~ SharebnbApi ~ signupUser ~ res", res);
        return res.token;
    }

    /**
     * Logs in an existing user
     *
     * @param {object} newUserData - new user information, required: {username,
     * password}
     * @returns the JWT for the user
     */
    static async loginUser(userData) {
        const res = await this.request("auth/login", userData, "post");
        console.log("🚀 ~ file: api.js:116 ~ SharebnbApi ~ loginUser ~ res", res);

        return res.token;
    }

    /**
     * Gets user data for the provided user
     *
     * @param {string} username - user's username
     * @param {string} token - JWT
     * @returns object of user data
     */
    static async fetchUserData(username) {
        const res = await this.request(`users/${username}`);

        return res.user;
    }

    /**
     * Patches user data, returning a new user object SANS apllications...
     *
     * @param {object} userData - object with new user data
     * @returns object of updated user data
     */
    static async updateUser({ username, firstName, lastName, email }) {
        const res = await this.request(
            `users/${username}`,
            { firstName, lastName, email },
            "patch"
        );

        return res.user;
    }
}

export default SharebnbApi;