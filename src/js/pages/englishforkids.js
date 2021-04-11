// import React, { useEffect, useState } from "react";
// import useHttp from "../hooks/http.hook";
// import EnglishForKids from "../blocks/englishforkids-block";
// import gameBackground from "../../assets/images/backgrounds/englishforkids.jpg";
// import CircularProgress from "@material-ui/core/CircularProgress";

// export default (props) => {
//   const [fullData, setFullData] = useState(null);

//   const [toggle, setToggle] = useState(null);
//   //const [page, setPage] = useState(1);

//   const { loading, error, request } = useHttp();
//   // const group = 1;
//   // const page = 1;
//   const buttons = [
//     {
//       text: "Очень легко",
//       group: "0",
//     },
//     {
//       text: "Легко",
//       group: "1",
//     },
//     {
//       text: "Средне",
//       group: "2",
//     },
//     {
//       text: "Выше среднего",
//       group: "3",
//     },
//     {
//       text: "Сложно",
//       group: "4",
//     },
//     {
//       text: "Очень сложно",
//       group: "5",
//     },
//   ];
//   const wordsHandler = async (group, page = 0) => {
//     //const group = event.target.value;
//     try {
//       const data = await request(
//         `https://react-learnwords-rslang.herokuapp.com/words?group=${group}&page=${page}`,
//         "GET",
//         null,
//         { accept: "application/json" }
//       );
//       const randomWords = data.slice().sort(() => Math.random() - 0.5);
//       randomWords.map((elem) => (elem.checked = true));
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
//       className="englishforkids"
//       style={{ backgroundImage: `url(${gameBackground})` }}
//     >
//       {!fullData &&
//         !loading &&
//         !props.match.params.group &&
//         !props.match.params.page && (
//           <div>
//             <h1>English For Kids</h1>
//             {buttons.map((elem) => (
//               <button
//                 className="registration__button-submit"
//                 disabled={loading}
//                 onClick={() => wordsHandler(elem.group)}
//                 //value={elem.group}
//               >
//                 {elem.text}
//               </button>
//             ))}
//           </div>
//         )}
//       {!fullData &&
//         !loading &&
//         props.match.params.group &&
//         props.match.params.page && (
//           <div>
//             <h1>English For Kids</h1>
//             <button
//               className="registration__button-submit"
//               disabled={loading}
//               onClick={() =>
//                 wordsHandler(props.match.params.group, props.match.params.page)
//               }
//               //value={elem.group}
//             >
//               Начать игру
//             </button>
//           </div>
//         )}
//       {!fullData && loading && (
//         <div>
//           {" "}
//           <CircularProgress></CircularProgress>
//         </div>
//       )}
//       {fullData && !loading && (
//         <EnglishForKids data={fullData}></EnglishForKids>
//       )}
//     </div>
//   );
// };

import GameLayout from "../layouts/GameLayout";
import EnglishForKids from "../blocks/englishforkids-block";
import gameBackground from "../../assets/images/backgrounds/englishforkids.jpg";

const text = "English for Kids";
export default (props) => {
  return (
    <GameLayout {...props} gameBackground={gameBackground} text={text}>
      {(gameprops) => <EnglishForKids data={gameprops}></EnglishForKids>}
    </GameLayout>
  );
};
