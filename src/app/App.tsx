import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import { Navbar } from "../components";
import { PostForm, PostsList, Todos, UsersList, UserPosts } from "../pages";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/posts">
            <Route index element={<PostsList />} />
            <Route path=":postId" element={<PostForm use="Edit" />} />
          </Route>
          <Route path="/addPost" element={<PostForm use="Add" />} />
          <Route path="/users">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserPosts />} />
          </Route>
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
