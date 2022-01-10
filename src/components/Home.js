import React from "react";
import { useState } from "react";
import { create } from "ipfs-http-client";
import { connectWallet } from "../connections/Connect";
import {
  Card,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { pinJSONToIPFS } from "../connections/Pinata";
import Swal from 'sweetalert2'
import "../App.css";

const client = create("https://ipfs.infura.io:5001/api/v0");

const Home = () => {
  const [walletAddress, setWallet] = useState("");
  const [name, setName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  async function nameOnChange(e) {
    const inputName = e.target.value;
    try {
      setName(inputName);
    } catch (error) {
      console.log(error);
    }
  }

  async function imageOnChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function descriptionOnChange(e) {
    const inputDescription = e.target.value;
    try {
      setDescription(inputDescription);
    } catch (error) {
      console.log(error);
    }
  }

  async function priceOnChange(e) {
    const inputPrice = e.target.value;
    try {
      setPrice(inputPrice);
    } catch (error) {
      console.log(error);
    }
  }

  let metaData = {
    name: { name },
    image: { fileUrl },
    description: { description },
    price: { price },
  };

  async function mintButton() {
    if (name == "" || fileUrl == "" || description == "" || price == "") {
      Swal.fire({
        icon: 'error',
        text: 'All fields must be filled.',
      })
    } else {
      pinJSONToIPFS(metaData);
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <Col sm="4">
            <h4 className="header">Welcome to the NFT Minter dApp</h4>
            <h6 className="header">
              <a
                href="https://github.com/mustafamertkisa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mustafa Mert Kısa
              </a>
            </h6>
          </Col>

          <Col sm="4">
            <img
              id="coverImage"
              src="https://cdn.vox-cdn.com/thumbor/SiIyeqmKIJGcOJccz94pHgwmgvQ=/0x0:1400x1400/1200x800/filters:focal(588x588:812x812):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68837730/poptart1redrainbowfix_1.0.gif"
              alt=""
            />
          </Col>

          <Col sm="4">
            <Button
              id="connectButton"
              color="info"
              outline
              onClick={connectWalletPressed}
            >
              {walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                <span>Connect Wallet</span>
              )}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle tag="h5">General Info</CardTitle>
              <br />
              <CardText>
                <Row>
                  <Col sm="9">
                    <FormGroup>
                      <Label for="nameNft">Name:</Label>
                      <Input
                        id="nameNft"
                        placeholder="Please enter NFT name"
                        type="text"
                        onChange={nameOnChange}
                      />
                      <br />
                      <Label for="fileNft">Your Image:</Label>
                      <Input
                        id="fileNft"
                        type="file"
                        onChange={imageOnChange}
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="3">
                    <img id="imageNft" src={fileUrl} width="600px" />
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle tag="h5">Meta Data</CardTitle>
              <br />
              <CardText>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="descriptionNft">Description:</Label>
                      <Input
                        id="descriptionNft"
                        placeholder="Please enter NFT description"
                        type="textarea"
                        onChange={descriptionOnChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12">
            <Card body>
              <CardTitle tag="h5">Price</CardTitle>
              <br />
              <CardText>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="priceNft">Amount:</Label>
                      <Input
                        id="priceNft"
                        placeholder="Please enter NFT price"
                        type="number"
                        onChange={priceOnChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardText>
            </Card>
          </Col>
        </Row>
        <br />
        <Button id="mintNftButton" color="success" onClick={mintButton}>
          Mint
        </Button>
      </div>
    </>
  );
};

export default Home;
