import { Route, Routes } from "react-router";
import { AboutPage, Auth, LoginPage, RegisterPage } from "./pages";
import { NotFoundPage, PageLayout, ProtectedRoute } from "./components";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/page"
          element={
            <ProtectedRoute>
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
