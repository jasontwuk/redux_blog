import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// *** deal with over fetching (users) issue: use another action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // console.log(getState().posts);
  // *** use _.chain() to chain lowdash functions together
  // *** use _.map() to pull out all "userId" property from all "posts"
  // *** use _.uniq() to find the unique ids from all "userId"
  // *** use .value() to execute all chained functions
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();

  // *** the following two lines of code are same as the code above
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
      type: "FETCH_USER",
      payload: response.data,
    });
  };
};

// *** deal with over fetching (users) issue: use "lowdash"
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });
