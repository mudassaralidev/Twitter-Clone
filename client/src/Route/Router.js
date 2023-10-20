import Signup from "../pages/Signup/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import LogIn from "../pages/Login/LogIn";
import { useEffect } from "react";
import { loggedInDetail } from "../api/user";
import Sidebar from "../pages/Sidebar/Sidebar";
import Home from "../pages/Home/Home";
import { getLoggedInUserId } from "../features/user";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

const HandleRoutes = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state?.user?.loggedIn);
  const loading = useSelector((state) => state?.user?.loading);

  useEffect(() => {
    loggedInDetail(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoggedInUserId());
  }, [dispatch, loggedIn]);

  if (loading) {
    return <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  }

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
          <Col lg={10} md={8} xs={9}>
            <Routes>
              {loggedIn === true ? (<Route
                path="/"
                element={<Home />}
              />) : (<Route
                path="/"
                element={<LogIn />}
              />)}
              <Route
                path="/signup"
                element={<Signup />}
              />
            </Routes>
          </Col>
        </Row>
      </Container >
    </Router >
  );
};

export default HandleRoutes;