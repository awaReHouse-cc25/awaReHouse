import "../input.css";
import Success from "../components/Success";
import Subscription from "../components/Subscription";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";

function Userpage({
  user,
  message,
  success,
  items,
  chatMessages,
  setChatMessages,
  setMode,
  email
}) {
  function retrieveData() {
    console.log("clicked hehehe");
  }

  const [addItem, setAddItem] = useState(false);
  const[typeBox, setTypeBox]=useState(null);
  const [address, setAddress] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const[tryAgain, setTryAgain] = useState(false)

  const handleChange = (e) => {  
    setTypeBox(e.target.value)
  }

  
  const retrieveAddress = async () => {
    await axios.get(`/users/${email}`)
    .then((res)=> {
      setAddress(res.data[0].adress);
    })
    .catch(function (error) {
      console.log("NOPE! Address data not retrieved");
    });  
  }

  useEffect(()=>{
retrieveAddress()
  },[setAddItem])


const submit1 = () => {
  console.log(typeBox)
  if(typeBox===null){
    setTryAgain(true);
  }
  if (typeBox!==null){
    setConfirmation(true)
  }
}

const submit2 = () => {

}

const cancel = () =>{
  setAddItem(false);
  setTryAgain(false)
  setTypeBox(null)
}


  return (
    <div>
      <button style={{cursor:"pointer"}} onClick={()=>setMode("homePage")}>Back to homepage</button>
      <br></br>
      Welcome {user}
        <br></br>
        <h3>NEXT RETRIEVAL PERIOD: 2022/04/25-2022/05/10</h3>
      <ol>
        CURRENTLY STORED GOODS:
        {items.map((item) => {
          return (
            <div key={item.box_id}>
              <li>{item.declared_content_one}</li>
              <li>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "No Items added"}
              </li>
              <li>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "No Items added"}
              </li>
            </div>
          );
        })}
      </ol>
        <button style={{cursor:"pointer"}} onClick={()=>setAddItem(true)}>Add Storage Items</button>
        {addItem === true ? 
        <div className="containerNewItem">
        <div className="newUser">
          PLEASE SELECT ONE SUITABLE BOX FOR YOUR GOODS
          <br></br>
          <br></br>
          <img
          className="boxPicture"
          src={require("../pictures/corrugated-boxes.jpg")}
          style={{ height: 200}}
          />
          <br></br>
          <br></br>
            Box Type A (27cm x 38cm x 29cm):
            <input type="radio" name="boxType" value="A (27cm x 38cm x 29cm)" id="A" onChange={handleChange}/>
            <br></br>
            Box Type B (32cm x 46cm x 29cm):
            <input type="radio" name="boxType" value="B" id="B (32cm x 46cm x 29cm)" onChange={handleChange}/>
            <br></br>
            Box Type C (40cm x 60cm x 40cm):
            <input type="radio" name="boxType" value="C (40cm x 60cm x 40cm)" onChange={handleChange}/>
            <br></br>
            Box Type D (175cm x 30cm x 15cm):
            <input type="radio" name="boxType" value="D (175cm x 30cm x 15cm)" onChange={handleChange}/>
            <br></br>
          <br></br>
          <input type="submit" value="Submit" onClick={submit1}/>
          <button style={{cursor:"pointer"}} onClick={cancel}>Cancel</button>
          </div>
        </div>: <div></div>}
        {confirmation === true ? <div>
          <form>
          <br></br>
          You selected a type{typeBox} box. Please provde a brief description of the goods you want to store (e.g. Snowboard, summer clothes, barbecue set...)
          <br></br>
          <label>
            Goods description (required):
            <input type="text" name="description1" placeholder="Goods description" /><br></br>
            Goods description (optional):
            <input type="text" name="description2" placeholder="Goods description" /><br></br>
            Goods description (optional):
            <input type="text" name="description3" placeholder="Goods description" /><br></br>
          </label>
          <br></br>
          The boxes will be sent to your registered address: {address}
          <br></br>
          <input type="submit" value="Submit" style={{cursor:"pointer"}}/>
          </form>
          <button onClick={()=>setConfirmation(false)} style={{cursor:"pointer"}}>Cancel</button>
        </div> : <div></div>}
        {tryAgain === true ? <h4> PLEASE SELECT ONE BOX </h4>:<div></div>}
      {success === true ? <Success message={message} /> : <Subscription />}
      <button onClick={retrieveData}>Retrieval</button>
      <button>Storage</button>
      <br />
      <br />
      <Chat chatMessages={chatMessages} setChatMessages={setChatMessages} />
    </div>
  );
}

export default Userpage;
