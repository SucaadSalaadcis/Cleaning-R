import { Link} from 'react-router-dom';
const Header = () => {

  
    return (
        <nav class="navbar navbar-expand-lg navbar-danger px-0 py-3" style={{backgroundColor: 'pink'}}>
            <div class="container-xl">
                <div class="collapse navbar-collapse " id='navbarCollapse' >
                    <div class="navbar-nav mx-lg-auto text-dark">
                        <Link class="nav-item nav-link active" to="/dashbord" aria-current="page">Dashboard</Link>
                        <Link class="nav-item nav-link active" to="/home">Home</Link>
                        <Link class="nav-item nav-link active" to="/customers">Customers</Link>
                        <Link class="nav-item nav-link active" to="/receipt">Receipts</Link>
                        <Link class="nav-item nav-link active" to="/users">users</Link>
                      
                    </div>
                        
                            <div class="navbar-nav ms-lg-4">
                            <Link class="nav-item nav-link" to="/">LogIn</Link> 
                           </div>
                       
                    
                   
                       <div class="d-flex" align-items-lg-center mt-3 mt-lg-0>
                       <button class="btn btn-sm  w-full w-lg-auto" style={{backgroundColor: 'white'}}>LogOut</button>
                         </div>
                   
                   
                </div>
            </div>
        </nav>
    );
    }


export default Header;
