// import React, { useEffect, useState } from "react";
// import useHttp from "../hooks/http.hook";
// import SavannaBlock from "../blocks/savanna-block";
// import savannaBackground from "../../assets/images/backgrounds/savannah.jpg";
// import CircularProgress from "@material-ui/core/CircularProgress";

// export default () => {
//   const [fullData, setFullData] = useState(null);
//   const { loading, error, request } = useHttp();
//   const group = 1;
//   const page = 1;
//   const wordsHandler = async () => {
//     try {
//       const data = await request(
//         `https://react-learnwords-rslang.herokuapp.com/words?group=${group}&page=${page}`,
//         "GET",
//         null,
//         { accept: "application/json" }
//       );
//       const randomWords = data.slice().sort(() => Math.random() - 0.5);
//       //const randomGuesses = data.slice().sort(() => Math.random() - 0.5);
//       setFullData({ data: randomWords });
//       console.log(data);
//       console.log(randomWords);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div
//       className="savanna"
//       style={{ backgroundImage: `url(${savannaBackground})` }}
//     >
//       {!fullData && !loading && (
//         <button
//           className="registration__button-submit"
//           disabled={loading}
//           onClick={wordsHandler}
//         >
//           начать
//         </button>
//       )}
//       {!fullData && loading && (
//         <div>
//           <CircularProgress></CircularProgress>
//         </div>
//       )}
//       {fullData && <SavannaBlock data={fullData}></SavannaBlock>}
//     </div>
//   );
// };

import GameLayout from "../layouts/GameLayout";
import SavannaBlock from "../blocks/savanna-block";
import savannaBackground from "../../assets/images/backgrounds/savannah.jpg";

const text = "Саванна";
export default (props) => {
  return (
    <GameLayout
      type="mouyagovnoigra"
      {...props}
      gameBackground={savannaBackground}
      text={text}
    >
      {(fullData) => <SavannaBlock data={fullData}></SavannaBlock>}
    </GameLayout>
  );
};
