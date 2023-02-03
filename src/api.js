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
  static async request(
    endpoint,
    data = {},
    method = "get",
    contentType = "application/json"
  ) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

    const headers = {
      Authorization: `Bearer ${SharebnbApi.token}`,
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

  // Individual API routes




  /**
   * Create Pool
   *
   * @param {number} newPoolData - new pool data: rate, size, description, address
   * @returns object representing a single pool
   */
  static async getPool(newPoolData) {
    let res = await this.request(`pools`,{newPoolData}, 'post', "multipart/form-data");

    return res.pool;
  }

  /* TODO: PATCH pool */

  /* TODO: POST POOL IMAGE */


  /**
   * Get details on a pool by handle.
   *
   * @param {string} id - id of the pool to retrieve
   * @returns object representing a single pool
   */
  static async getPool(id) {
    let res = await this.request(`pools/${id}`);
    return res.pool;
  }

  /**
   * Get all pools, filtered if param added.
   *
   * @param {string} city - search term to filter pools by
   * @returns array of pool objects
   */
  static async getPools(city) {
    // const data = nameLike ? { nameLike } : {};
    const res = await this.request(`pools/${city}`);

    return res.pools;
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



  /* TODO: POST CREATE MESSAGE */

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
   * Returns all Messages sent to and sent from current user,
   *
   * @param {string} message_id - message_id to retreive message by
   * @returns array of job objects
   */
  static async getMessage(message_id) {
    const res = await this.request(`messages/${message_id}`);

    return res.message;
  }

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
