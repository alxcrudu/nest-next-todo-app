export const ApiConstants = {
  TODO: {
    ADD: () => {
      return "/todos";
    },
    GET_ALL: () => {
      return "/todos";
    },
    EDIT: (todoId: number) => {
      return "/todos/edit/" + todoId;
    },
    MARK_COMPLETE: (todoId: number) => {
      return "/todos/" + todoId;
    },
    DELETE: (todoId: number) => {
      return "/todos/" + todoId;
    },
  },
  USER: {
    SIGN_UP: "/users/signUp",
    FIND_ALL: "/users",
    DELETE: (userId: number) => {
      return "/users/" + userId;
    },
  },
  LOGIN: "/auth/login",
};
