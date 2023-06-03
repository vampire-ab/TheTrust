import { useState } from "react";
import Recepient from "../components/Recepient";
import { GoChevronLeft } from "react-icons/go";
import Location from "../components/Location";
import Connect from "../components/Connect";
import UploadFiles from "../components/UploadFiles";
import { useAccount } from "wagmi";
import Router from "next/router";
import dynamic from "next/dynamic";
import abi from "../contract/ABI.json";
import { ethers } from "ethers";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});
const signup = () => {
  const [ctr, setCtr] = useState(2);
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState([]);
  const [cids, setCids] = useState("");
  const [story, setStory] = useState();
  const [required, setNeed] = useState("");

  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [mail, setMail] = useState("");

  const { address, isConnecting, isDisconnected } = useAccount();

  const handleSubmit = async () => {
    console.log("Here");
    try {
      console.log(cids);
      console.log(address);
      const loc =
        location.length === 2
          ? [location[0].toString(), location[1].toString()]
          : [];
      const _user = {
        recepient: address,
        required: required,
        received: 0,
        kyc: true,
        name: name,
        dob: dob,
        contact: contact,
        story: story,
        location: loc,
        twitter: twitter,
        mail: mail,
        instagram: instagram,
        cid: cids,
      };

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(
        "0xFD074d5a94c4e451ff8E6fbA94FDBEed7451DFEF",
        abi,
        signer
      );
      const res = await contract.createUser(_user);
      console.log(res);
      Router.push("/individual", { query: { address: address } });
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <div className="">
      <div className="max-w-md m-auto mt-6 relative">
        {ctr !== 2 ? (
          <GoChevronLeft
            onClick={() => setCtr(ctr - 1)}
            className="absolute top-10 cursor-pointer left-6 text-xl"
          />
        ) : (
          <></>
        )}

        {ctr === 2 ? (
          <Recepient
            setCtr={setCtr}
            setName={setName}
            setContact={setContact}
            setDob={setDob}
            name={name}
            dob={dob}
            contact={contact}
            story={story}
            setStory={setStory}
            need={required}
            setNeed={setNeed}
          />
        ) : ctr === 3 ? (
          <div>
            <Location
              name={name}
              setCtr={setCtr}
              setLocation={setLocation}
              location={location}
            />
          </div>
        ) : (
          <></>
        )}
        {ctr === 4 ? (
          <Connect
            setTwitter={setTwitter}
            twitter={twitter}
            setInstagram={setInstagram}
            instagram={instagram}
            // setLinkedin={setLinkedin}
            // linkedin={linkedin}
            setMail={setMail}
            mail={mail}
            // setPrsnl={setPrsnl}
            // prsnl={prsnl}
            setCtr={setCtr}
            name={name}
          />
        ) : (
          <></>
        )}
        {ctr === 5 ? (
          <UploadFiles
            setCtr={setCtr}
            handleSubmit={handleSubmit}
            setCids={setCids}
          />
        ) : (
          <></>
        )}
      </div>
      {location.length === 2 ? (
        <div className="flex justify-center items-center w-[400px] h-[400px] mx-auto">
          <Map location={location} user={user} setLocation={setLocation} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default signup;
