
import { toast } from "react-toastify";
let Histroy = "";

const UserOutput = () => {
  const planTripLink = `${process.env.REACT_APP_FRONTEND_URL}/planTrip`;
  const fail = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  let numberofDays = 2;
  const myapi = async () => {
    console.log("herrre\n\n\n");
    // e.preventDefault();
    for (let i = 0; i < numberofDays; i++) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/planTrip`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            duration: 1,
            Destination: "Alex Egypt",
            Month: "March",
            activites: "Swimming walking eating museum",
            Histroy: Histroy,
          }),
          credentials: "include",
        }
      );

      try {
        // Check if the response status code is 200
        if (response.status === 200) {
          const data = await response.json();
		  // names , descriptions , images 

		  
          // show the data in the front end
          Histroy += data[0];
          console.log("data \n\n\n" + data);

          //   console.log(response);
          // Access cookies from the "Set-Cookie" header in the response
          const cookies = response.headers.get("Set-Cookie");
          console.log("done\n\n\n\n");
          // window.location.href = '/Posts';
        } else {
          // Handle non-200 response status code
          console.log("failed \n\n\n\n\n");
          return response.text().then((error) => {
            fail(error);
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
        fail("An error occurred: " + error.message);
      }
    }
	Histroy = "";
  };

  return (
    <div>
      <h1>Array Data</h1>
      <button onClick={myapi}>Click me</button> Use Subscription
	  {/* {data.map((item) => (prompt(item)))} */}
    </div>
  );
};

export default UserOutput;
