import { useEffect, useState } from "react";
import axios from 'axios';
// import toastr from 'toastr';
// import "toastr/build/toastr.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
function Receipt() {

    const [custID, setcustID] = useState("")
    const [homeID, sethomeID] = useState("")
    const [receiptAmount, setreceiptAmount] = useState("")
    const [Totalamount, setTotalamount] = useState("")
    const [receiptstatus, setreceiptstatus] = useState("")
    const [balance, setbalance] = useState("")
    const [EditID,setEditID] = useState("")
    const [isEdit,setisEdit] = useState(false)
    const [updateTime, setUpdateTime] = useState(new Date());
    const [apiData, setapiData] = useState([])

    let endpoint = "http://localhost:7000/receipt"
    useEffect(() => {
        async function onload() {
            let { data } = await axios.get(endpoint)
            //  let data = await result.json()
            setapiData(data)
            console.log('data', data)
        }
        onload()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                custID: custID,
                homeID: homeID,
                receiptAmount: receiptAmount,
                Totalamount:Totalamount,
                balance:balance,
                receiptstatus:receiptstatus,
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
                setcustID("")
                sethomeID("")
                setreceiptAmount("")
                setTotalamount("")
                setbalance("")
                setreceiptstatus("")
            }else{
                toast.error(data.message)
            }
        }
        }catch (error) {
            toast.error(error.message)
        }

    };

    const handleEdit = (data)=>{
        setcustID(data.custID)
        sethomeID(data.homeID)
        setreceiptAmount(data.receiptAmount)
        setTotalamount(data.Totalamount)
        setbalance(data.balance)
        setreceiptstatus(data.receiptstatus)
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
            <div className="alert alert-danger ">Receipt Registation Form</div>
                <div className="row mt-4">

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputPassword">CustID</label>
                            <input type="text" class="form-control" id="exampleInputPassword" placeholder="Enter Customer Id" value={custID}
                                onChange={(event) => setcustID(event.target.value)}

                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">HomeID</label>
                            <input type="text" class="form-control" name="password" placeholder="Enter Password" value={homeID}
                                onChange={(event) => {
                                    sethomeID(event.target.value)
                                    // console.log(nameVal)
                                }}
                            />



                        </div>
                    </div>

                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">ReceiptAmount</label>
                            <input type="text" class="form-control" name="password" placeholder="Enter Password" value={receiptAmount}
                                onChange={(event) => {
                                    setreceiptAmount(event.target.value)
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
                   

                        {/*  */}
                    <div className="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail">Status</label>
                            <select
                                type="text" class="form-control" name="status" placeholder="Enter User Status" value={receiptstatus}
                                onChange={(event) => {
                                    setreceiptstatus(event.target.value)
                                    // console.log(nameVal)
                                }}
                            >
                                <option value="">Choose status</option>
                                <option value="paid">paid</option>
                                <option value="pending">pending</option>
                            </select>


                        </div>
                    </div>


                    <div className="col-3 mt-4">
                        <div class="form-group">
                            <button type="submit" class="btn form-control" style={{backgroundColor: "pink"}} >Submit</button>
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
                            <th scope="col">homeID</th>
                            <th scope="col">custID</th>
                            <th scope="col">receiptAmount</th>
                            <th scope="col">Totalamount</th>
                            <th scope="col">balance</th>
                            <th scope="col">receiptstatus</th>
                            <th scope="col">Action</th>



                        </tr>
                    </thead>
                    {apiData.map(data => {

                        return (<tr>
                            <th scope="row">{data.homeID}</th>
                            <td>{data.custID}</td>
                            <td>{data.receiptAmount}</td>
                            <td>{data.Totalamount}</td>
                            <td>{data.balance}</td>
                            <td>{data.receiptstatus}</td>
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

export default Receipt;