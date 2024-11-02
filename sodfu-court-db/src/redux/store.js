import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux"
import {thunk} from "redux-thunk"
import appReducer from "./reducers/app-reducer";
import authReducer from "./reducers/auth-reducer";
import courtDocsReducer from "./reducers/court-docs-reducer";
import totalTasksReducer from "./reducers/total-tasks-reducer";
import newTasksReducer from "./reducers/new-tasks-reducer";
import myTasksReducer from "./reducers/my-tasks-reducer";
import usersReducer from "./reducers/users-reducer";
import valuesReducer from "./reducers/values-reducer";
import inWorkTasksReducer from "./reducers/inwork-tasks-reducer";
import courtListReducer from "./reducers/court-list-reducer";

let reducers = combineReducers({
    courtDocs: courtDocsReducer,
    totalTasks: totalTasksReducer,
    newTasks: newTasksReducer,
    myTasks: myTasksReducer,
    inworkTasks: inWorkTasksReducer,
    users: usersReducer,
    dropdownValues: valuesReducer,
    courtList: courtListReducer,
    auth: authReducer,
    app: appReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

window.store = store

export default store