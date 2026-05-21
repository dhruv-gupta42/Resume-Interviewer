import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Interview from "./pages/Interview";
import Results from "./pages/Results";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Landing/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/signup"
element={<Signup/>}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/upload"
element={
<ProtectedRoute>
<UploadResume/>
</ProtectedRoute>
}
/>

<Route
path="/interview"
element={
<ProtectedRoute>
<Interview/>
</ProtectedRoute>
}
/>

<Route
path="/results"
element={
<ProtectedRoute>
<Results/>
</ProtectedRoute>
}
/>

<Route
path="/history"
element={
<ProtectedRoute>
<History/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App;