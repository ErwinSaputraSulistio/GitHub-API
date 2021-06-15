import "./App.css"
import {BrowserRouter, Route, Switch} from "react-router-dom"
// PAGE ROUTES
import Home from "./pages/Home"
import GitHub from "./pages/GitHub"
import NotFound from "./pages/404NotFound"

export default function App() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/github/:id" component={GitHub}/>
            <Route component={NotFound}/>
         </Switch>
      </BrowserRouter>
   )
}