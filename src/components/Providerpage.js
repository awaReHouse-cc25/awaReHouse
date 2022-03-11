import "../input.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from "axios";
import { Badge, Accordion, Card } from "react-bootstrap";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

if (dd > 21) {
  mm++;
  dd = 21;
  today = mm + "/" + dd + "/" + yyyy;
} else {
  dd = 21;
  today = mm + "/" + dd + "/" + yyyy;
}

function Providerpage({ user, email2 }) {

  const [displayProviderTable, setDisplayProviderTable] = useState(false);
  const [providerItems, setProviderItems] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [storageFloor, setStorageFloor] = useState("");
  
  const retrieveProviderAddress = async (req,res) => {
    try {
      await axios.get(`/providers/${email2}`)
      .then((res) => {
        setProviderAddress(res.data[0].adress);
        setStorageFloor(res.data[0].floor)
      })
    } catch{
        console.log("NOPE! Provider address data not retrieved");
    }
  }

  useEffect(()=>{
    retrieveProviderAddress()
  },[])
  
  const retrieveProviderItems = (req,res) => {
    axios.post("/providerItems", { providerAddress }).then((res) => setProviderItems(res.data));
  }

  const renderListOfStorage = () => {
    return (
      <Card className="m-10 max-w-sm">
      <Card.Img variant="top" src={require("../pictures/plain-shipping-boxes-packhelp-kva.jpeg")}/>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Here is a detailed list of the {providerItems.length} box(es) currently stored at {providerAddress}:
              </Accordion.Header>
              <Accordion.Body >
              {providerItems.map((item, idx) => {
                return (
                  <>
                  {/* <ul key={idx}> */}
                    <li key={`${idx}d`} className="mx-0"> Box: {item.box_id} - Weight: {item.weight_in_kg}kg - Floor: {storageFloor} - Should be retrieved in {item.expected_retrieval_season}.</li>

                    {item.fragile === true ? (
                      <li key={`${idx}e`}> Box {item.box_id} is recorded as fragile. </li>
                      ) : (
                        <></>
                        )}
                    {item.heavy === true ? (
                      <li key={`${idx}e`}> Box {item.box_id} is recorded as heavy. </li>
                      ) : (
                        <></>
                        )}
                  {/* </ul> */}
                  </>
                );
              })}
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
    );
  }

  useEffect(()=>{
    retrieveProviderItems()
  },[displayProviderTable])


  return (
    <div id="provider-page-wrapper">
      <Badge bg="light" id="provider">
        Welcome {user}
      </Badge>
      <h3>Next visit will be 02/02/22</h3>
      <br></br>
      <button onClick={()=>{
        setDisplayProviderTable(!displayProviderTable);
        }}>LIST OF STORED BOXES</button>
      <br></br>
      {displayProviderTable === true ? 
      renderListOfStorage() : 
      <></>}
      
      <h4>Your next pay day is: {today}</h4>
      {/* <h4>Your amount of money made: </h4>
      <h4>You will make 12900 yen this month</h4> */}
      <button>Add more storage capacity</button>

      <br />
      <button
        onClick={(e) => {
          window.confirm("Are you sure about to quit the provider?");
        }}
      >
        Stop being a provider
      </button>
      <br />
      <Chat />
    </div>
  );
}

export default Providerpage;
