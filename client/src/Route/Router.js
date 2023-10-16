import Signup from "../pages/Signup/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import LogIn from "../pages/Login/LogIn";
import { useEffect, useState } from "react";
import { loggedInDetail } from "../api/user";
import Sidebar from "../pages/Sidebar/Sidebar";
import Home from "../pages/Home/Home";

const HandleRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    loggedInDetail(setLoggedIn);
  }, []);

  return (
    <Router>
      <Container>
        <Row>
          {loggedIn === true && (
            <Col lg={2} md={3} xs={3}>
              <div className="fixed">
                <Sidebar />
              </div>
            </Col>
          )}
        </Row>
        <Col lg={10} md={8} xs={9}>
          <Routes>
            {loggedIn === true ? (<Route
              path="/"
              element={<Home />}
            />) : (<Route
              path="/login"
              element={<LogIn />}
            />)}
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </Col>

      </Container >
    </Router >
  );
};

export default HandleRoutes;