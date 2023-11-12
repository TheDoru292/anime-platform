import { createStore } from "vuex";
import UserModule from "./user.module";

export default createStore({
  modules: {
    user: UserModule,
  },
});
