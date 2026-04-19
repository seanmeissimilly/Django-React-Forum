import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import UserProfileOwn from "./components/UserProfileOwn";
import Forum from "./components/Forum";
import UserProfile from "./components/UserProfile";
import BlogSolo from "./components/BlogSolo";
import UserEditProfile from "./components/UserEditProfile";
import Reports from "./components/Reports";
import Documents from "./components/Documents";
import Tools from "./components/Tools";
import Videos from "./components/Videos";
import Suggestions from "./components/Suggestions";
import ProtectedRoute from "./components/ProtectedRoute";
import DocumentForm from "./components/DocumentForm";
import VideoForm from "./components/VideoForm";
import ToolForm from "./components/ToolForm";
import SuggestionForm from "./components/SuggestionForm";
import BlogForm from "./components/BlogForm";
import AboutUs from "./components/AboutUs";
import Help from "./components/Help";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";
import Chart from "./components/Chart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/forum" element={<Forum />} />
          <Route path="/miPerfil" element={<UserProfileOwn />} />
          <Route path="/miPerfil/editProfile/" element={<UserEditProfile />} />
          <Route
            path="/userProfile/editProfile/:id"
            element={<UserEditProfile />}
          />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/forum/soloBlog/:id" element={<BlogSolo />} />
          <Route
            path="/suggestions/createSuggestion"
            element={<SuggestionForm />}
          />
          <Route
            path="/suggestions/editSuggestion/:id"
            element={<SuggestionForm />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}
          >
            <Route path="/reports" element={<Reports />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/forum/addBlog" element={<BlogForm />} />
            <Route path="/forum/editBlog/:id" element={<BlogForm />} />
            <Route
              path="/documents/createDocument"
              element={<DocumentForm />}
            />
            <Route
              path="/documents/editDocument/:id"
              element={<DocumentForm />}
            />
            <Route path="/videos/createVideo" element={<VideoForm />} />
            <Route path="/videos/editVideo/:id" element={<VideoForm />} />
            <Route path="/tools/createTool" element={<ToolForm />} />
            <Route path="/tools/editTool/:id" element={<ToolForm />} />
          </Route>
        </Route>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
