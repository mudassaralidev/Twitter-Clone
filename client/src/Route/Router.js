import Signup from "../pages/Signup/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import LogIn from "../pages/Login/LogIn";

const HandleRoutes = () => {

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<LogIn />}
          />
        </Routes>

      </Container >
    </Router >
  );
};

export default HandleRoutes;