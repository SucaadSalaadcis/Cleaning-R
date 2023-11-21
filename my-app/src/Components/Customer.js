import { useEffect,useState } from "react";
import axios from 'axios';
// import toastr from 'toastr';
// import "toastr/build/toastr.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
function Customer() {

    const [custName, setcustName] =useState("")
    const [homeID, setHomeId] = useState("")
    const [custAddress, setCustAddress] = useState("")
    const [custPhone, setCustPhone] = useState("")
    const [Totalamount, setTotalamount] = useState("")
    const [amountPaid, setamountPaid] = useState("")
    const [balance, setbalance] = useState("")
    const [EditID,setEditID] = useState("")
    const [isEdit,setisEdit] = useState(false)
    const [updateTime, setUpdateTime] = useState(new Date());
    const [apiData, setapiData] = useState([])

    let endpoint = "http://localhost:7000/customers"
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
                custName:custName,
                homeID: homeID,
                custAddress: custAddress,
                custPhone:custPhone,
                Totalamount:Totalamount,
                amountPaid:amountPaid,
                balance:balance,    
            }
            if(isEdit){

                let UpdateEndPoint =`${endpoint}/${EditID}`
                  const {data} = await axios.put(UpdateEndPoint,obj)
                  console.log(data)
                  if(data.Status=="Updated"){
                      const upadateDate = apiData.filter((data)=> data._id!=EditID)
                      setapiData([...upadateDate,data.info])
                      toast.success(data.message)
                  }else{
                      toast.error(data.message)
                  }
                  // console.log(UpdateEndPoint)
                 }else{
            let { data } = await axios.post(endpoint,obj)
            // console.log(data)
            if(data.status=="sucess"){
                toast.success(data.message)
                setapiData([...apiData,data.info])
                setcustName("")
                setHomeId("")
                setCustAddress("")
                setCustPhone("")
                setTotalamount("")
                setamountPaid("")
                setbalance("")
            }else{
                toast.error(data.message)
            }
        }
        }catch (error) {
            toast.error(error.message)
        }

    };

    const handleEdit = (data)=>{
        setcustName(data.custName)
        setHomeId(data.homeID)
        setCustAddress(data.custAddress)
        setCustPhone(data.custPhone)
        setTotalamount(data.Totalamount)
        setamountPaid(data.amountPaid)
        setbalance(data.balance)
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
            <div className="alert alert-danger ">Customer Registation Form</div>
                <div className="row mt-4">

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputPassword">Customer Name</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter User Name" value={custName}
                                onChange={(event) => setcustName(event.target.value)}

                            />
                        </div>
                    </div>
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputPassword">Home ID</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter HomeID" value={homeID}
                                onChange={(event) => setHomeId(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputEmail">Customer Address</label>
                            <input type="text" class="form-control" name="Full Name" placeholder="Enter Cust Address" value={custAddress}
                                onChange={(event) => {
                                    setCustAddress(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />
                        </div>
                    </div>
                   
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputEmail">Customer Phone</label>
                            <input type="number" class="form-control" name="Full Name" placeholder="Enter Cust Phone" value={custPhone}
                                onChange={(event) => {
                                    setCustPhone(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />
                    </div>
                    </div>

                    <div className="col-3">
                     <div class="form-group">
                            <label for="exampleInputEmail">Totalamount</label>
                            <input type="number" class="form-control" name="Full Name" placeholder="Enter Totalamount" value={Totalamount}
                                onChange={(event) => {
                                    setTotalamount(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />
                        </div>
                    </div>
                   
                    <div className="col-3">
                    <div class="form-group">
                            <label for="exampleInputEmail">amountPaid</label>
                            <input type="number" class="form-control" name="Full Name" placeholder="Enter amountPaid" value={amountPaid}
                                onChange={(event) => {
                                    setamountPaid(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-3">
                    <div class="form-group mt-1">
                            <label for="exampleInputEmail">balance</label>
                            <input type="number" class="form-control" name="Full Name" placeholder="Enter balance" value={balance}
                                onChange={(event) => {
                                    setbalance(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />
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
                            <th scope="col">custName</th>
                            {/* <th scope="col">homeID</th> */}
                            <th scope="col">custAddress</th>
                            <th scope="col">custPhone</th>
                            <th scope="col">Totalamount</th>
                            <th scope="col">amountPaid</th>
                            <th scope="col">balance</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {apiData.map(data => {
                        return (<tr>
                            <th scope="row">{data.custName}</th>
                            {/* <td>{data.homeID}</td> */}
                            <td>{data.custAddress}</td>
                            <td>{data.custPhone}</td>
                            <td>{data.Totalamount}</td>
                            <td>{data.amountPaid}</td>
                            <td>{data.balance}</td>
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

export default Customer;