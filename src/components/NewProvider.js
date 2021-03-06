import React, { useState } from "react";
import axios from "axios";
import "../input.css";
import Compress from "react-image-file-resizer";
import { Button, Form } from "react-bootstrap";
import WelcomingPage from "./WelcomingPage.js";
import { useNavigate } from "react-router-dom";

export default function NerCustomer() {
  const [providerFirstName, setProviderFirstName] = useState("");
  const [providerLastName, setProviderLastName] = useState("");
  const [providerPassword, setProviderPassword] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPicValues, setProviderPicValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  const [providerBankReference, setProviderBankReference] = useState("");
  const [providerEmergencyContact, setProviderEmergencyContact] = useState("");
  const [providerEmergencyContactPhone, setProviderEmergencyContactPhone] =
    useState("");
  const [registrationDone, setRegistrationDone] = useState(false);
  const navigate = useNavigate();

  const setInputFieldValue = (e, setMethod) => {
    const input = e.target.value;
    setMethod(input);
  };

  const pictureStorageHandler = (e) => {
    const file = e.target.files[0];
    const output = Compress.imageFileResizer(
      file,
      480,
      480,
      "JPEG",
      70,
      0,
      (uri) => {
        setProviderPicValues(uri);
      },
      "base64"
    );
  };

  const sendProvider = () => {
    axios
      .post("/providers", {
        first_name: providerFirstName,
        last_name: providerLastName,
        password: providerPassword,
        adress: providerAddress,
        email: providerEmail,
        bank_reference: providerBankReference,
        emergency_contact_person: providerEmergencyContact,
        emergency_contact_phone_number: providerEmergencyContactPhone,
        picture_file: providerPicValues,
      })
      .then(() => {
        console.log("Your database has been updated!");
      })
      .catch(function (error) {
        console.log("NOPE! Provider Data NOT sent");
      });
  };

  const handleProviderSubmit = (e) => {
    sendProvider();
    setRegistrationDone(true);
  };

  if (registrationDone === false) {
    return (
      <div className="containerNewRegistration login">
        <div className=" text-slate-900 m-5">
          <p className="text-white text-center text-4xl">
            Register as a storage provider
          </p>
          <Form onSubmit={handleProviderSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First name"
                onChange={(e) => setInputFieldValue(e, setProviderFirstName)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last name"
                onChange={(e) => setInputFieldValue(e, setProviderLastName)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setInputFieldValue(e, setProviderPassword)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setInputFieldValue(e, setProviderAddress)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setInputFieldValue(e, setProviderEmail)}
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="bankreference"
                placeholder="Banking reference"
                onChange={(e) =>
                  setInputFieldValue(e, setProviderBankReference)
                }
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="emergencycontact"
                placeholder="Emergency contact name"
                onChange={(e) =>
                  setInputFieldValue(e, setProviderEmergencyContact)
                }
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                name="emergencycontactphone"
                placeholder="Emergency contact phone"
                onChange={(e) =>
                  setInputFieldValue(e, setProviderEmergencyContactPhone)
                }
                required
                className="my-3"
              />
            </Form.Group>

            <Form.Group>
              <p className=" text-white  ">
                Please attach a copy of a valid identification document
              </p>
              <Form.Control
                type="file"
                name="file"
                onChange={pictureStorageHandler}
                className="my-3"
              />
            </Form.Group>
            <div className="flex justify-center items-center">
              <Button
                className="mx-3"
                variant="primary"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
              <Button className="mx-3" variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
  if (registrationDone === true) {
    return (
      <div>
        <WelcomingPage />
      </div>
    );
  }
}
