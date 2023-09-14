import React, { useState } from "react";
import foto1 from "../assets/Images/FeatureInsurance.jpg";
const backendImagFile = "";
const NewPostModal = ({ modalRef }) => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [description, setDescription] = useState("");
  const [fetchedDescription, setFetchedDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [userid, setUserid] = useState("");
  const toggleFileInput = () => {
    setShowFileInput((prevState) => !prevState);
  };
  const [file, setFile] = useState();
  const handleInputOnchange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handlePostOnclick = (e) => {
    e.preventDefault();

    if (!file) {
      console.log("No file selected.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", 1); // MUST BE CAHANGED TO THE USER ID-*-*-*-*-*-*-*-*-*
    formData.append("description", description);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/uploadPost`, {
      method: "POST",
      body: formData,
    }).then(() => {
      console.log("done");
    });
  };
  const getDescription = (postId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getPostDetials/${postId}`, {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        //-------------------------------
        setFetchedDescription(data.description);
        setUserid(data.user_id);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  const handleGettingPost = (e) => {
    e.preventDefault();
    const postId = 12; // change this to the post id that you want to get*-*-*-*-*-*-*-*-*-*-*-*-*-
    getDescription(postId); // to get description and user id and all post details but not the image

    //to get the image from the backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getPostImage/${postId}`, {
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((imageBlob) => {
        //-------------------------------
        const imageUrl = URL.createObjectURL(imageBlob); /// you can use this url directly in the src attribute of an img tag
        //this is the one that you will use in your post component
        setImageSrc(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };
  const handleDescriptionOnchange = (e) => {
    setDescription(e.target.value);
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;

  return (
    <div>
      {/* You can open the modal using ID.showModal() method */}
      <dialog id="my_modal_4" ref={modalRef} className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl"
          encType="multipart/form-data"
        >
          <div className="avatar online">
            <div className="w-24 rounded-full">
              <img src={foto1} />
            </div>
          </div>
          <h3 className="font-bold text-lg mb-10">Username</h3>
          {/* <p className="py-4">Click the button below to close</p> */}
          <div className="form-control">
            <label className="label">
              <span className="label-text-alt"></span>
              <div className="label-text-alt text-xs badge badge-outline">
                {date}
              </div>
            </label>
            <div> "the user id " {userid}</div>
            <div> "the description id " {fetchedDescription}</div>
            <img src={imageSrc} alt="wating img" />
            <button
              onClick={handleGettingPost}
              style={{
                backgroundColor: "#007bff", // Blue color
                color: "#ffffff", // White color
                padding: "10px 20px", // Padding
                border: "none", // No border
                borderRadius: "5px", // Rounded corners
                cursor: "pointer", // Show pointer cursor on hover
              }}
            >
              Get Details of Post 1
            </button>

            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write your caption here . . ."
              onChange={handleDescriptionOnchange}
            ></textarea>
          </div>
          <br />
          <label className="label">
            <span className="label-text">Add Image</span>
          </label>
          <input
            type="checkbox"
            className="toggle toggle-info mx-2"
            onChange={toggleFileInput}
          ></input>{" "}
          {showFileInput && (
            <input name="image" type="file" onChange={handleInputOnchange} />
          )}
          <div className="modal-action">
            <button className="btn btn-outline" onClick={handlePostOnclick}>
              Post
            </button>
            {/* if there is a button, it will close the modal */}
            <button className="btn">Disgard Post</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default NewPostModal;