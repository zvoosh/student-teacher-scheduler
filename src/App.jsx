import { Route, Routes } from "react-router";
import {
  HomePage,
  Auth,
  LoginPage,
  RegisterPage,
  MessagePage,
  ApprovePage,
  AppointmentsPage,
  TeachersPage,
  StudentsPage,
  BookAppoitment,
} from "./pages";
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
          <Route path="home" element={<HomePage />} />
          <Route path="approve" element={<ApprovePage />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="book/appointment" element={<BookAppoitment />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
