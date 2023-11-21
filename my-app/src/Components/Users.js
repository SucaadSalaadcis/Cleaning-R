import { useEffect, useState } from "react";
import axios from 'axios';
// import toastr from 'toastr';
// import "toastr/build/toastr.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
// import { AvForm, AvField } from 'availity-reactstrap-validation';
// import {Row,Col,Label} from 'reactstrap'
function Users() {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [EditID,setEditID] = useState("")
    const [isEdit,setisEdit] = useState(false)
    const [updateTime, setUpdateTime] = useState(new Date());
    const [apiData, setapiData] = useState([])

    let endpoint = "http://localhost:7000/users"
    useEffect(() => {
        async function onload() {
            let { data } = await axios.get(endpoint)
            //  let data = await result.json()
            setapiData(data)
            // console.log('data', data)
        }
        onload()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                username: username,
                password: password,
                userStatus: userStatus
            }
           if(isEdit){

          let UpdateEndPoint =`${endpoint}/${EditID}`
            const {data} =await axios.put(UpdateEndPoint,obj)
            console.log(data)
            if(data.Status=="sucess"){
                const upadateDate = apiData.filter((data)=> data._id!=EditID)
                // console.log("update",upadateDate)
                setapiData([...upadateDate,data.info])
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
            // console.log(UpdateEndPoint)
           }else{

            let { data } = await axios.post(endpoint, obj)
            // console.log(data)
            if(data.status=="sucess"){
              toast.success(data.message)
                setapiData([...apiData,data.info])
                setUserName("")
                setPassword("")
                setUserStatus("")
            }else{
                toast.error(data.message)

            } 
           }
        }catch (error) {
            toast.error(error.message)
        }

    };

    const handleEdit = (data)=>{
        setUserName(data.username)
        setPassword(data.password)
        setUserStatus(data. userStatus)
        setEditID(data._id)
        setisEdit(true)
        console.log(data)
    }


    
  const homeDel = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(`${endpoint}/${delId}`);
        console.log(data)
        setUpdateTime(new Date());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

    return (
    <div className="container  border mx-auto p-3 mt-4" style={{ width: 2000 }}>
            <form onSubmit={handleSubmit}>
            <div className="alert alert-danger ">User Registation Form</div>
                <div className="row mt-4">

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputPassword">Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter User Name" value={username}
                                onChange={(event) => setUserName(event.target.value)}

                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">Password</label>
                            <input type="text" class="form-control" name="password" placeholder="Enter Password" value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />



                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">Status</label>
                            <select
                                type="text" class="form-control" name="status" placeholder="Enter User Status" value={userStatus}
                                onChange={(event) => {
                                    setUserStatus(event.target.value)
                                    // console.log(nameVal)
                                }}
                            >
                                <option value="">Choose status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="blocked">Blocked</option>
                            </select>


                        </div>
                    </div>


                    <div className="col-3 mt-4">
                        <div class="form-group">
                            <button type="submit" class="btn form-control" style={{backgroundColor: "pink"}}>Submit</button>
                        </div>
                    </div>

                </div>

            </form>
            <div>
            <ToastContainer/>
            <div className="container mt-3">
        <div className="alert alert-danger ">List Registered Form</div>
        </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">UserStatus</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {apiData.map(data => {

                        return (<tr>
                            <th scope="row">{data.username}</th>
                            <td>{data.password}</td>
                            <td>{data.userStatus}</td>
                            <td>{(
                                <div>
                                    <button onClick={()=> handleEdit(data)} className="btn" style={{backgroundColor: "pink"}}>edit</button>
                                </div>
                            )}</td>

                           <td>
                        <button className="btn" onClick={() => homeDel(data._id)}   style={{backgroundColor: "pink"}}> delete</button>
                        </td>

                        </tr>
                        )
                    })}

                    <tbody>
                    </tbody>

                </table>
            </div>
        </div>



    );
}

export default Users;