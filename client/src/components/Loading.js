import Lottie from "react-lottie";
import animationData from "../animations/spinning-gears.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Lottie
        options={defaultOptions}
        width={400}
        height={400}
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default Loading;
