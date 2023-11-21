import { useEffect, useState } from "react";
import axios from 'axios';
// import toastr from 'toastr';
// import "toastr/build/toastr.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
function Home() {

    const [homeNo, sethomeNo] = useState("")
    const [homeAddress, sethomeAddress] = useState("")
    const [homeStatus, sethomeStatus] = useState("")
    const [EditID,setEditID] = useState("")
    const [isEdit,setisEdit] = useState(false)
    const [updateTime, setUpdateTime] = useState(new Date());
    const [apiData, setapiData] = useState([])

    let endpoint = "http://localhost:7000/home"
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
                homeNo: homeNo,
                homeAddress: homeAddress,
                homeStatus: homeStatus
            }
            
            if(isEdit){
                let UpdateEndPoint =`${endpoint}/${EditID}`
                  const {data} =await axios.put(UpdateEndPoint,obj)
                  console.log(data)
                  if(data.Status=="Updated"){
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
            console.log(data)
            if(data.status=="sucess"){
              toast.success(data.message)
                setapiData([...apiData,data.info])
                sethomeNo("")
                sethomeAddress("")
                sethomeStatus("")
            }else{
                toast.error(data.message)
            }
        }
        }catch (error) {
            toast.error(error.message)
        }

    };
    const handleEdit = (data)=>{
        sethomeNo(data.homeNo)
        sethomeAddress(data.homeAddress)
        sethomeStatus(data.homeStatus)
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
        // const upadateDate= ""
        // setapiData([data.info,...upadateDate])
        setUpdateTime(new Date());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };


    return (
       <div className="container  border mx-auto p-3 mt-4" style={{ width: 1000 }}>
            <form onSubmit={handleSubmit}>
            <div className="alert alert-danger ">Home Registation Form</div>
                <div className="row mt-4">

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputPassword">Home No</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter homeNo" value={homeNo}
                                onChange={(event) => sethomeNo(event.target.value)}

                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">Home Address</label>
                            <input type="text" class="form-control" name="password" placeholder="Enter homeAddress" value={homeAddress}
                                onChange={(event) => {
                                    sethomeAddress(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />



                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">Status</label>
                            <select
                                type="text" class="form-control" name="status" placeholder="Enter User Status" value={homeStatus}
                                onChange={(event) => {
                                    sethomeStatus(event.target.value)
                                    // console.log(nameVal)
                                }}
                            >
                                <option value="">Choose status</option>
                                <option value="active">Active</option>
                                <option value="cancel">Cancel</option>
                               
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
                            <th scope="col">homeNo</th>
                            <th scope="col">homeAddress</th>
                            <th scope="col">homeStatus</th>
                            <th scope="col">Action</th>



                        </tr>
                    </thead>
                    {apiData.map(data => {

                        return (<tr>
                            <th scope="row">{data.homeNo}</th>
                            <td>{data.homeAddress}</td>
                            <td>{data.homeStatus}</td>
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

export default Home;