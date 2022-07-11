import { grid } from "@mui/system";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-png-logo-1.png"
          alt=""
          style={{ marginBottom: 10 }}
          height={200}
        />
        <h3>Loading....</h3>
      </div>
    </center>
  );
};

export default Loading;
