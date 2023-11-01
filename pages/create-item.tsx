//@ts-nocheck
import React, { useCallback, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useDropzone } from "react-dropzone";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import CInput from "../components/CInput";
import CTextArea from "../components/CTextArea";
import CButton from "../components/CButton";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getMarketplaceAbi,
  getNFTAbi,
  web3Handler,
} from "../redux/slices/contractSlice";
import { useFormik } from "formik";
import { IPFSInfuraSubDomain } from "../global/routes";
import { toast } from "react-toastify";

const subdomain = IPFSInfuraSubDomain;

const projectId = process.env.NEXT_PUBLIC_IPFS_PID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PSECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const CreateItem: NextPage = () => {
  const marketplace = useAppSelector(getMarketplaceAbi);
  const nft = useAppSelector(getNFTAbi);
  const [image, setImage] = useState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(web3Handler());
  }, []);

  const createNFT = async values => {
    const { name, description, price, image } = values;
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mintThenList(result, price);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result, price) => {
    const uri = `${subdomain}/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    const res = await (
      await marketplace.makeItem(nft.address, id, listingPrice)
    ).wait();

    //call createNFT api (pass result.path)

    if (res.status === 1) {
      toast("🚀 NFT successfully created");
    }
  };

  const validate = values => {
    let errors = {};
    if (!values.price) {
      errors.price = "⋆Required";
    }
    if (!values.name) {
      errors.name = "⋆Required";
    }
    if (!values.description) {
      errors.description = "⋆Required";
    }
    if (!values.image) {
      errors.image = "⋆Required";
    }
    return errors;
  };

  const initialValues = {
    price: "",
    name: "",
    description: "",
    image: "",
  };

  const onSubmit = async (values, onSubmitProps) => {
    console.log({ values });
    createNFT(values);
    // onSubmitProps.resetForm();
    // setImage(null);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  //uploading Image (only) to ipfs
  const uploadToIPFS = async file => {
    console.log(file);
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`${subdomain}/ipfs/${result.path}`);
        formik.setFieldValue("image", `${subdomain}/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  //dropzone
  const onDrop = useCallback(acceptedFiles => {
    console.log(typeof acceptedFiles[0]);
    let newFile = new File([...acceptedFiles], acceptedFiles[0].name); //path property in dropzone overrides path of ipfs thats why I created new file (by default new File does not make file with path property which solved the issue)
    uploadToIPFS(newFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form
      className="mx-auto lg:w-2/5 flex flex-col items-center"
      onSubmit={formik.handleSubmit}
    >
      <h3 className="w-4/5 text-left text-2xl font-semibold py-5">
        Create new Item
      </h3>

      <h4 className="w-4/5 text-left text-large font-medium py-5">
        Upload File
      </h4>

      <div
        {...getRootProps()}
        className="border border-dashed border-gray200 w-4/5 rounded-lg flex justify-center items-center flex-col py-7 px-10"
      >
        <p className="font-semibold text-lg mt-5">
          JPG, PNG, SVG, WEBM, Max 100mb.
        </p>

        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} className="w-20" alt="img-created" />
        ) : (
          <FaImage className="text-9xl block text-gray300" />
        )}
        <p className="font-medium mt-3">
          {image ? "Replace File" : "Drag and Drop File"}
        </p>
        <p className="text-md font-medium">
          <span className="font-light">or</span> browse media from your device
        </p>
        <input {...getInputProps()} accept=".png,.jpg,.jpeg,.webm,.svg" />
      </div>
      <div className="w-4/5 text-left">
        {formik.touched.image && formik.errors.image ? (
          <small
            id="image"
            style={{
              marginBottom: "15px",
              fontSize: "12px",
              color: "red",
            }}
          >
            {formik.errors.image}
          </small>
        ) : null}
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">Name</h4>
      <div className="w-4/5">
        <CInput placeholder="Item Name" name={"name"} formik={formik} />
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">
        Description
      </h4>
      <div className="w-4/5">
        <CTextArea
          placeholder="Description of your item"
          name={"description"}
          formik={formik}
        />
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">Price</h4>
      <div className="w-4/5">
        <CInput placeholder="Enter Price" name={"price"} formik={formik} />
      </div>

      <div className="w-4/5 flex justify-end pt-8 pb-20">
        <CButton variant="primary" type="submit">
          Create Item
        </CButton>
      </div>
    </form>
  );
};

export default CreateItem;
