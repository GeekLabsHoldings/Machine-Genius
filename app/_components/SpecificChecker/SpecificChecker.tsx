interface ICheckerProps {
  word: string;
  pass: boolean;
}

import styles from "./SpecificChecker.module.css";

// component for type of check and result of check
const SpecificChecker = ({ word, pass }: ICheckerProps) => {
  return (
    <div className={`${styles.properityAndResult}`}>
      {/* type of check */}
      <p>{word}</p>
      {/* right icon with green or red background based on the recieved result */}
      <div>
        {/* <span
          style={{
            width: "24px",
            height: "24px",
            display: "block",
            borderRadius: "50%",
          }}
          className="bg-gray-300"
        ></span> */}
        {pass ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
            className="w-[24px] h-[24px]"
          >
            <path
              fill="#4caf50"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              fill="#ccff90"
              d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="w-[24px] h-[24px]"

            viewBox="0 0 48 48"
          >
            <path
              fill="#f44336"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              fill="#fff"
              d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
            ></path>
            <path
              fill="#fff"
              d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default SpecificChecker;
