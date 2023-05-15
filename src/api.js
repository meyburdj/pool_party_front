import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PoolPartyApi {
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
    static async request(
        endpoint,
        data = {},
        method = "get",
        contentType = "application/json"
    ) {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;

        const headers = {
            Authorization: `Bearer ${PoolPartyApi.token}`,
            "Content-Type": contentType,
            // "Content-Type": "multipart/form-data",
        };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /***********************  AUTH REQUESTS START  ************************** */

    /**
     * Registers a new user
     *
     * @param {object} newUserData - new user information, required: {username,
     * firstName, lastName, password, email}
     * @returns the JWT for the user
     */
    static async signupUser(newUserData) {
        const res = await this.request(
            "auth/signup",
            newUserData,
            "post",
            "multipart/form-data"
        );
        //TODO: add back in resp.token

        console.log("🚀 ~ file: api.js:105 ~ PoolPartyApi ~ signupUser ~ res", res);
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
        console.log("🚀 ~ file: api.js:116 ~ PoolPartyApi ~ loginUser ~ res", res);

        return res.token;
    }

    /**************************************************************************/
    /********************   POOL REQUESTS START   *****************************/


    /**
     * Create Pool
     *
     * @param {number} newPoolData - new pool data: rate, size, description, address
     * @returns object representing a single pool
     */
    static async createPool(newPoolData) {
        console.log("im at createPool");
        let res = await this.request(
            "pools",
            newPoolData,
            "post",
            "multipart/form-data");
        console.log("we have gotten to the res", res);
        return res.pool;
    }

    /* TODO: PATCH pool */

    /* TODO: POST POOL IMAGE */


    /**
    * Get details on a pool by handle.
    *
    * @returns object with array of pools
    */
    static async getPools() {
        let res = await this.request(`pools`);
        return res.pools;
    }

    /**
     * Get details on a pool by handle.
     *
     * @param {string} id - id of the pool to retrieve
     * @returns object representing a single pool
     */
    static async getPoolById(id) {
        let res = await this.request(`pools/${id}`);
        return res.pool;
    }

    /**
     * Get all pools, filtered if param added.
     *
     * @param {string} city - search term to filter pools by
     * @returns array of pool objects
     */
    static async getPoolsByCity(city) {
        // const data = nameLike ? { nameLike } : {};
        const res = await this.request(`pools/${city}`);

        return res.pools;
    }

    /**
    * Patch details about a pool by id.
    *
    * @param {string} id - id of the pool to retrieve
    * @returns object representing a single pool
    */
    static async updatePool({ id, size, rate, description, city }) {
        let res = await this.request(
            `pools/${id}`,
            { size, rate, city, description },
            "patch"
        );
        return res.pool;
    }

    /**
     * Delete specified pool
     *
     * @param {string} pool_id - param to delete pool by
     * @returns Success message if deleted
     */
    static async deletePool(pool_id) {
        const res = await this.request(`pools/${pool_id}`, {}, "delete");

        return res;
    }

    /**************************************************************************/
    /*********************   RESERVATIONS REQUESTS START   ********************/


    /**
        * Creates a new reservation
        *
        * @param {object} reservationData - new reservation information, required:
        * {pool_id, start_date, end_date}
        * @returns serialized information on that pool
        */
    static async createReservation({ pool_id, start_date, end_date }) {
        const res = await this.request(
            `reservations/${pool_id}`,
            { start_date, end_date },
            "post");

        return res;
    }

    /**
     * Get Reservations, filtered by pool id if param added
     *
     * @param {string} pool_id - search term to filter pools by
     * @returns array of job objects
     */
    static async getReservationsByPoolId(pool_id) {
        const res = await this.request(`reservations/${pool_id}`);

        return res.reservations;
    }

    /**
     * Get Reservations, filtered by username if param added
     *
     * @param {string} username - search term to filter pools by
     * @returns array of job objects
     */
    static async getReservationsByUsername(username) {
        const res = await this.request(`reservations/${username}`);

        return res.reservations;
    }

    /**
     * Get Reservation by reservation_id
     *
     * @param {string} reservation_id - search term to filter pools by
     * @returns array of job objects
     */
    static async getReservationsByResId(reservation_id) {
        const res = await this.request(`reservations/${reservation_id}`);

        return res.reservations;
    }

    static async deleteBookedReservation(reservation_id) {
        console.log("resId", reservation_id);
        const res = await this.request(`reservations/${reservation_id}`, {}, "delete");
        return res;
    }

    // static async deleteBookedReservation(reservation_id) {
    //     const res = await this.request(`reservations/${reservation_id}`, {}, "delete");
    //     return res;
    // }




    /**
     *
     * @param {object} newMessageData  - new messsage information, {sender_username, recipient_username, title, body, listing}
     * @returns the message data
     */
    static async sendMessage(newMessageData) {
        console.log("🚀 ~ file: api.js:246 ~ PoolPartyApi ~ sendMessage ~ newMessageData", newMessageData);
        // console.log("we have started to send a Message");

        const res = await this.request("messages", newMessageData, "post");

        console.log("we have gotten to the sendMessage res", res);

        return res.message;
    }


    /**
     * Returns all Messages sent to and sent from current user,
     *
     * @returns array of job objects
     */
    static async getAllMessages() {
        const res = await this.request(`messages`);

        return res.messages;
    }

    /**
    * Get Reservations, filtered by username if param added
    *
    * @param {string} reservation_id - search term to filter pools by
    * @returns array of job objects
    */
    static async deleteReservationsByResId(reservation_id) {
        const res = await this.request(
            `reservations/${reservation_id}`,
            {},
            "delete"
        );

        return res;
    }

    /**************************************************************************/
    /************************   MESSAGE REQUESTS START   **********************/


    /**
   * Returns all Messages sent to and sent from current user,
   *
   * @param {string} message_id - message_id to retreive message by
   * @returns object with key of inbox and outbox
   */
    static async getMessages() {
        console.log("i'm in getmessages in api");
        const res = await this.request("messages");
        console.log("res from getmessages api", res);

        return res.messages;
    }
    /**
     * Returns all Messages sent to and sent from current user,
     *
     * @param {string} message_id - message_id to retreive message by
     * @returns object with key of inbox and outbox
     */
    static async getMessage(message_id) {
        const res = await this.request(`messages/${message_id}`);

        return res.message;
    }

    /**************************************************************************/
    /************************   USER REQUESTS START   *************************/

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


    /**
     * Get all pools of logged in user
     *
     * @param {string} username - search term to filter pools by
     * @returns array of pool objects
     */
    static async getPoolsByUsername(username) {
        // const data = nameLike ? { nameLike } : {};
        const res = await this.request(`users/${username}/pools`);
        console.log("pools", res.pools);
        console.log("res", res);
        return res.pools;
    }

}

export default PoolPartyApi;
