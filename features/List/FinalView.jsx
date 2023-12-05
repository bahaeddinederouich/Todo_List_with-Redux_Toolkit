import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faBackward,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import finalviewCSS from "./finalview.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addtask } from "./listSlice";
import { switchcheck } from "./listSlice";
import { removetask } from "./listSlice";
import { countCompleted } from "./listSlice";
import { useNavigate } from "react-router-dom";
const FinalView = () => {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [visibel, setVisibel] = useState(false);
  const title = useSelector((state) => state.groups.final);
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const indexOfObjectWithTitle = groups.group.findIndex((obj) =>
    Object.keys(obj).includes(title)
  );
  const handelchange = (e) => {
    setTask(e.target.value);
  };
  const handeladd = () => {
    if (task !== "") {
      dispatch(
        addtask({ index: indexOfObjectWithTitle, title: title, value: task })
      );
      setTask("");
    } else {
      setVisibel(true);
    }
  };
  const handelsearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Cette fonction sera appelée après chaque rendu du composant
    dispatch(
      countCompleted({
        indexone: indexOfObjectWithTitle,
        title: title,
      })
    );
    // Si vous voulez que l'action soit déclenchée uniquement lors du montage initial, omettez les dépendances dans le tableau ci-dessous.
  });
  const navigate = useNavigate();
  const handelnav = () => {
    navigate("/");
  };
  return (
    <div className={finalviewCSS.final}>
      <FontAwesomeIcon
        icon={faBackward}
        className={finalviewCSS.back}
        onClick={handelnav}
      />
      <h2 className={finalviewCSS.title}>{title}</h2>
      <input
        type="text"
        className={finalviewCSS.search}
        placeholder="Search"
        onChange={handelsearch}
      />
      <ul>
        {groups.group[indexOfObjectWithTitle][title].map((el, index) => (
          <div key={index}>
            {(search !== "" && el["task"].includes(search)) || search === "" ? (
              <li className={finalviewCSS.listet}>
                <div>
                  {el.check === "completed" && (
                    <span>
                      <FontAwesomeIcon
                        className={finalviewCSS.checkicon}
                        icon={faCheck}
                      />
                    </span>
                  )}
                  <span>{el["task"]}</span>
                </div>
                <button
                  className={finalviewCSS.checkbtn}
                  onClick={() =>
                    dispatch(
                      switchcheck({
                        indexone: indexOfObjectWithTitle,
                        indextwo: index,
                        title: title,
                      })
                    )
                  }
                >
                  check / uncheck
                </button>
                <span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={finalviewCSS.delete}
                    onClick={() =>
                      dispatch(
                        removetask({
                          indexone: indexOfObjectWithTitle,
                          indextwo: index,
                          title: title,
                        })
                      )
                    }
                  />
                </span>
              </li>
            ) : null}
          </div>
        ))}
      </ul>
      <div className={finalviewCSS.yourDivId}>
        <input
          type="text"
          className={finalviewCSS.add}
          placeholder="add task"
          value={task}
          onChange={handelchange}
        />
        <button className={finalviewCSS.addbtn} onClick={handeladd}>
          Add
        </button>
        <div
          className={finalviewCSS.emptypop}
          style={{ display: visibel ? "block" : "none" }}
        >
          <div className={finalviewCSS.popcontainer}>
          <p>You can&apos;t add an empty task.</p>

            <FontAwesomeIcon
              icon={faCircleXmark}
              className={finalviewCSS.closebtn}
              onClick={() => setVisibel(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FinalView;
