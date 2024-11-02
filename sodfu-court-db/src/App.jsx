import React from "react";
import { connect } from "react-redux";
import { PrimeReactProvider } from 'primereact/api';
import { initializeApp } from "./redux/reducers/app-reducer";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "/node_modules/primeflex/primeflex.css";
import './App.css';
import Error from "./Components/Error/Error";
import CourtDocsContainer from "./Components/Main/CourtDocs/CourtDocsContainer";
import Stat from "./Components/Main/Stat/Stat";
import MainContainer from "./Components/Main/MainContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import UploadCourtDocsContainer from "./Components/Main/UploadCourtDocs/UploadCourtDocsContainer";
import TotalTasksContainer from "./Components/Main/Tasks/TotalTasksContainer";
import NewTasksContainer from "./Components/Main/Tasks/NewTasksContainer";
import MyTasksContainer from "./Components/Main/Tasks/MyTasksContainer";
import InWorkTasksContainer from "./Components/Main/Tasks/InWorkTasksContainer";
import CourtsListTableContainer from "./Components/Main/Tables/Courts/CourtsListTableContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginContainer />,
    errorElement: <Error />,
  },
  {
    path: "main",
    element: <MainContainer />,
    children: [
      {
        path: "statistics",
        element: <Stat />,
      },
      {
        path: "courtdocs",
        element: <CourtDocsContainer />,
      },
      {
        path: "tasks/total",
        element: <TotalTasksContainer />,
      },
      {
        path: "tasks/new",
        element: <NewTasksContainer />,
      },
      {
        path: "tasks/my",
        element: <MyTasksContainer />,
      },
      {
        path: "tasks/my/inwork",
        element: <InWorkTasksContainer />,
      },
      {
        path: "courts",
        element: <CourtsListTableContainer />,
      },
      {
        path: "courtdocs/upload",
        element: <UploadCourtDocsContainer />,
      },
    ],
  },
]);

const value = {
  ripple: true,
};

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {
    return (
      <PrimeReactProvider value={value}>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

const mapDispatchToProps = {
  initializeApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
