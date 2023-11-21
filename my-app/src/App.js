import 'bootstrap/dist/css/bootstrap.css'
import Header from './Components/Header'
import Home from './Components/Home'
import Customer from './Components/Customer'
import Receipt from './Components/Receipt'
import Users from './Components/Users'
import Login from './Components/Login'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
       <Header></Header>
       <Routes>
      <Route path='/dashbord' element={<h1>Here Is A Dashboard</h1>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/customers' element={<Customer></Customer>}></Route>
      <Route path='/receipt' element={<Receipt></Receipt>}></Route>
     <Route path='/users' element={<Users></Users>}></Route>
     <Route path='/' element={<Login></Login>}></Route> 
    
    </Routes>

    
    </>
  );
}

export default App;
