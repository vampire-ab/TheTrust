import { useState } from "react";
import Affiliation from "../components/Affiliation";
import Recepient from "../components/Recepient";
import User from "../components/User";
import { GoChevronLeft } from "react-icons/go";
import Location from "../components/Location";
import Connect from "../components/Connect";
import UploadFiles from "../components/UploadFiles";
import GetContract from "../hooks/GetContract";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});
const signup = () => {
  const [ctr, setCtr] = useState(2);
  const [user, setUser] = useState();
  const [affiliation, setAffiliation] = useState();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState([]);
  const [cids, setCids] = useState([]);
  const [story, setStory] = useState();
  const [need, setNeed] = useState();

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
        location !== [] ? [location[0].toString(), location[1].toString()] : [];
      const _user = [
        address,
        name,
        dob,
        contact,
        story,
        loc,
        twitter,
        mail,
        instagram,
        cids,
      ];

      const contract = GetContract();
      const res = await contract.createUser(_user);
      console.log(res);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const router = useRouter();
  return (
    <div className="">
      <div className="max-w-md m-auto mt-6 relative">
        {user === 2 && ctr > 2 ? (
          <button
            onClick={() =>
              ctr !== 5 ? setCtr(ctr + 1) : router.push("/individual")
            }
            className="absolute top-8 right-2 bg-gray-400 rounded py-1 px-3"
          >
            Skip
          </button>
        ) : (
          <></>
        )}
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
            need={need}
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
