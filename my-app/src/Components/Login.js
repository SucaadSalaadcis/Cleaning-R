import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm();
      let endpoint = 'http://localhost:7000/login'    
     let navigate = useNavigate();

      async function handleLogin(obj){
        try {
          const {data} = await axios.post(endpoint,obj) 
          if(data.status=='sucess'){
            toast.success(data.message)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
      }

  return (
    <form  onSubmit={handleSubmit((data) => handleLogin(data))} class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card text-dark border-radius: .3rem" style={{backgroundColor: 'pink'}}>
            <div class="card-body p-5 text-center">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-dark-50 mb-5">Please enter your login and password!</p>
  
                <div class="form-outline form-white mb-4">
                  <input {...register("username",{required:true})} type="text" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>
  
                <div class="form-outline form-white mb-4">
                  <input {...register("password",{required:true})} type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <button class="btn btn-dark btn-lg px-5" type="submit">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  )
}

export default Login