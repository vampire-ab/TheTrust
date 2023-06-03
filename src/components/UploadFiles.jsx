import React, { useState } from "react";
import lighthouse from '@lighthouse-web3/sdk';
const UploadFiles = ({ setCtr, handleSubmit, setCids }) => {
  const [files, setFiles] = useState([]);
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async () => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    if (files.length > 0) {
      const output = await lighthouse.upload(
        files,
        process.env.NEXT_PUBLIC_LIGHTHOUSE,
        progressCallback
      );


      console.log("File Status:", output);
      console.log(
        "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
      );
      setCids(output.data.Hash);
    }
    handleSubmit();
  };
  const handleFile = (e) => {
    const newFiles = Array.from(e.target.files);
    newFiles.forEach((file) => {
      setFiles((old) => {
        return [...old, file];
      });
    });
  };
  console.log(files);
  // const uploadFile = async () => {
  //   try {
  //     const formData = new FormData();
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("files", files[i]);
  //       formData.append('fileNames', files[i].name);
  //     }

  //     for (const value of formData.values()) {
  //       console.log(value);
  //     }
  //     const res = await axios.post(
  //       "http://localhost:5000/uploadFiles",
  //       formData, {
  //         headers: {'Content-Type': 'multipart/form-data'}
  //       }
  //     );
  //     console.log(res);
  //     await setCids(res.data.cids);
  //     handleSubmit();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const remove = (name) => {
    setFiles(files.filter((file) => file.name !== name));
  };
  return (
    <div className="border-t-4 border-indigo-600 overflow-hidden rounded shadow-lg">
      <h3 className="text-xl text-center mt-8 mb-8">Well last thing!</h3>
      <div className="px-4 mb-4">
        <input
          type="file"
          multiple
          onChange={handleFile}
          className="rounded w-full p-3 text-center"
        />
      </div>
      <div className="w-full flex px-4">
        {files.map((file, idx) => {
          return (
            <div
              className="w-1/3 h-[100px] rounded relative flex-wrap"
              key={idx}
            >
              <img
                className="w-full object-center max-h-full rounded object-contain"
                src={URL.createObjectURL(file)}
                alt={idx}
              />
              <div
                className="absolute top-0 right-0 "
                onClick={() => remove(file.name)}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 text-center mb-6 text-red-600">
        <button
          onClick={() => uploadFile()}
          className="w-3/4 p-3 rounded bg-indigo-600 text-white"
        >
          Finish
        </button>
        <div className="m-2">Let's make them trust you</div>
      </div>
    </div>
  );
};

export default UploadFiles;
