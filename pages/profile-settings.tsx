//@ts-nocheck
import React, { useCallback, useEffect, useRef } from "react";
import CButton from "../components/CButton";
import CInput from "../components/CInput";
import { useDropzone } from "react-dropzone";
import CTextArea from "../components/CTextArea";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { useFormik } from "formik";
import { getAccounts, web3Handler } from "../redux/slices/contractSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  editUserProfile,
  getUserProfile,
  getUserProfileFromState,
} from "../redux/slices/userSlice";

const ProfileSettings = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(getAccounts);
  const userProfile = useAppSelector(getUserProfileFromState);
  const S3FileUpload = useRef(null);

  useEffect(() => {
    dispatch(web3Handler());
    import("react-s3").then(importedLib => {
      S3FileUpload.current = importedLib;
    });
  }, [dispatch]);

  useEffect(() => {
    account && dispatch(getUserProfile(account));
  }, [account, dispatch]);

  const uploadPicToS3Handler = async imageF => {
    if (!S3FileUpload.current) return;
    const { uploadFile } = S3FileUpload.current;
    const config = {
      bucketName: "mealproofimages",
      region: "us-east-2",
      accessKeyId: "AKIA5PXMLJQLONQAOAEY",
      secretAccessKey: "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",
    };

    try {
      const response = await uploadFile(imageF, config);
      console.log(response, "response");
      if (response.result.status === 204) {
        let image = response.location;
        return image;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validate = values => {
    let errors = {};
    if (!values.username) {
      errors.username = "⋆Required";
    }
    if (!values.email) {
      errors.email = "⋆Required";
    }
    if (!values.bio) {
      errors.bio = "⋆Required";
    }
    if (!values.profile_url) {
      errors.profile_url = "⋆Required";
    }
    return errors;
  };

  const initialValues = {
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    bio: userProfile?.bio || "",
    profile_url: userProfile?.profile_url || "",
    profile_banner: userProfile?.profile_banner || "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log({ values });
    dispatch(editUserProfile(account, values));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true,
  });

  //dropzone
  const onDrop = useCallback(
    async acceptedFiles => {
      console.log(acceptedFiles);
      let s3Res = await uploadPicToS3Handler(acceptedFiles[0]);
      console.log(s3Res);
      formik.setFieldValue("profile_url", s3Res);
    },
    [formik]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form
      className="mx-auto lg:w-2/5 flex flex-col items-center"
      onSubmit={formik.handleSubmit}
    >
      <h3 className="w-4/5 text-left text-2xl font-semibold py-5">
        Profile Settings
      </h3>

      {/* <h4 className="w-4/5 text-left text-large font-medium py-5">
        Profile Banner
      </h4>

      <div
        {...getRootProps()}
        className="border border-dashed border-gray200 w-4/5 rounded-lg flex justify-center items-center flex-col py-7 px-10"
      >
        <p className="font-semibold text-lg mt-5">
          JPG, PNG, SVG, WEBM, Max 100mb.
        </p>

        {formik.values.profile_banner ? (
          <>
            <img
              src={formik.values.profile_banner}
              // className="w-20"
              alt="img-created"
            />
            <p className="font-medium mt-3">Update File</p>
          </>
        ) : (
          <>
            <FaImage className="text-9xl block text-gray300" />
            <p className="font-medium mt-3">Drag and Drop File</p>
          </>
        )}

        <p className="text-md font-medium">
          <span className="font-light">or</span> browse media on your device
        </p>
        <input
          {...getInputProps()}
          accept=".png,.jpg,.jpeg,.webm,.svg"
          name="profile_banner"
        />
      </div> */}

      <h4 className="w-4/5 text-left text-large font-medium py-5">
        Profile Image
      </h4>

      <div
        {...getRootProps()}
        className="border border-dashed border-gray200 w-4/5 rounded-lg flex justify-center items-center flex-col py-7 px-10"
      >
        <p className="font-semibold text-lg mt-5">
          JPG, PNG, SVG, WEBM, Max 100mb.
        </p>

        {formik.values.profile_url ? (
          <>
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formik.values.profile_url}
              className="w-20"
              alt="img-created"
            />
            <p className="font-medium mt-3">Update File</p>
          </>
        ) : (
          <FaImage className="text-9xl block text-gray300" />
        )}
        <div className="w-4/5 text-left">
          {formik.touched.profile_url && formik.errors.profile_url ? (
            <small
              id="profile_url"
              style={{
                marginBottom: "15px",
                fontSize: "12px",
                color: "red",
              }}
            >
              {formik.errors.profile_url}
            </small>
          ) : null}
        </div>

        <p className="font-medium mt-3">Drag and Drop File</p>
        <p className="text-md font-medium">
          <span className="font-light">or</span> browse media on your device
        </p>
        <input
          {...getInputProps()}
          accept=".png,.jpg,.jpeg,.webm,.svg"
          name="profile_url"
        />
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">Username</h4>
      <div className="w-4/5">
        <CInput placeholder="Username" name="username" formik={formik} />
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">Email</h4>
      <div className="w-4/5">
        <CInput placeholder="Email" name="email" formik={formik} />
      </div>

      <h4 className="w-4/5 text-left text-large font-medium py-5">Bio</h4>
      <div className="w-4/5">
        <CTextArea
          placeholder="Tell the world your story!"
          name="bio"
          formik={formik}
        />
      </div>

      <div className="w-4/5 flex justify-end pt-8 pb-20">
        <CButton type="submit" variant="primary">
          Submit
        </CButton>
      </div>
    </form>
  );
};

export default ProfileSettings;
