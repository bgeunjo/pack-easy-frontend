export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
  };
  
  export const resolvers = {
    Mutation: {
      logUserIn: async(_, { token }, { cache }) => {
        localStorage.setItem("token", token);
        await cache.writeData({
          data: {
            isLoggedIn: true
          }
        });
      console.log(token);
      return null;
      },
      logUserOut: (_, __, { cache }) => {
        localStorage.removeItem("token");
        window.location.reload();
        return null;
      }
    }
  };