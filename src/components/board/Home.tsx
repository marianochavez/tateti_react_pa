import {useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Navbar} from "../ui/Navbar";
import {UserContext} from "../providers/UserProvider";
import {BoardContext} from "../providers/BoardProvider";

export const Home = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const {players, isLogged, isLogged2, logout} = useContext(UserContext);
  const {isBoardCreated, isBoardJoined, leaveBoard, clearBoard, userCreateBoard, userJoinGame} =
    useContext(BoardContext);

  const handleCreateBoard = async () => {
    // create a new board
    const res = await userCreateBoard(players[parseInt(Object.keys(players)[0])].token);

    // player 2 join the board
    const resJoin = await userJoinGame(
      res.data.id,
      players[parseInt(Object.keys(players)[1])].token,
    );

    if (resJoin) {
      navigate("/game");
    }
  };

  const handleLogout = (index: number) => {
    leaveBoard(players[parseInt(Object.keys(players)[0])].token);
    clearBoard();
    logout(index);
  };

  return (
    <>
      <Navbar />
      <div className="container " style={{padding: "2em"}}>
        {isLogged && isLogged2 && !isBoardCreated && currentPath == "/" && (
          <button className="nes-btn is-success" onClick={handleCreateBoard}>
            Nuevo juego
          </button>
        )}
        {isBoardCreated && isBoardJoined && currentPath === "/" && (
          <Link className="nes-btn is-success" to="/game">
            Volver al juego
          </Link>
        )}
        {isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Logear jugador 2
          </Link>
        )}
        {!isLogged && !isLogged2 && (
          <Link className="nes-btn is-warning" to="/login">
            Logear jugador 1
          </Link>
        )}
        {isLogged && currentPath === "/" && (
          <button className="nes-btn is-error" onClick={() => handleLogout(0)}>
            {`Deslogear ${players[parseInt(Object.keys(players)[0])]?.name || "jugador 1"}`}
          </button>
        )}
        {isLogged2 && currentPath === "/" && (
          <button className="nes-btn is-error" onClick={() => handleLogout(1)}>
            {`Deslogear ${players[parseInt(Object.keys(players)[1])]?.name || "jugador 2"}`}
          </button>
        )}
      </div>
    </>
  );
};