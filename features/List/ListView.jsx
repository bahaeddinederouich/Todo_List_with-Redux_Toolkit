import { useState } from "react";
import { addGroup } from "./listSlice";
import { removeGroup } from "./listSlice";
import { tofinal } from "./listSlice";
import { switchgroup } from "./listSlice";
import { useNavigate } from "react-router-dom";
import listSliceCSS from "./listSlice.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { addGroupForTheFirstTime } from "./listSlice";
const ListView = () => {
  const [groupname, setgroupname] = useState("");
  const [search, setSearch] = useState("");
  const [visibel, setVisibel] = useState(false);
  const groups = useSelector((state) => state.groups);
  const count = useSelector((state) => state.groups.count);
  const added = useSelector((state) => state.groups.added);
  const dispatch = useDispatch();
  const handeladd = () => {
    if (groupname !== "") {
      dispatch(addGroup({ [groupname]: [] }));
      dispatch(addGroupForTheFirstTime(groupname));
      setgroupname("");
    } else {
      setVisibel(true);
    }
  };
  const navigate = useNavigate();
  const handelnavigate = () => {
    navigate("/finalview");
  };
  const handleItemClick = (key) => {
    dispatch(tofinal(key));
  };

  const handelremove = (index) => {
    dispatch(removeGroup(index));
  };
  const handelsearch = (e) => {
    setSearch(e.target.value);
  };
  const switchaddedgroup = () => {
    dispatch(switchgroup());
  };
  return (
    <div className={listSliceCSS.container}>
      <h2 className={listSliceCSS.Title}>Lists</h2>
      <input
        onChange={handelsearch}
        type="text"
        className={listSliceCSS.search}
        placeholder="Search"
        autoFocus
      ></input>
      <div>
        {groups.group.map((obj, index) => (
          <div key={index} className={listSliceCSS.grid}>
            {Object.keys(obj).map((key) => (
              <div key={key} className={listSliceCSS.sousgrid}>
                <div className={listSliceCSS.boxtwo}>
                  <div>
                    {(search !== "" && key.includes(search)) ||
                    search === "" ? (
                      <div>
                        <h4 className={listSliceCSS.key}>{key}</h4>
                        {/* <h4>{index}</h4> */}
                        {/* <div>{count[index].title}</div> */}
                        <div>
                          {count.map(
                            (el, index) =>
                              el.title === key && (
                                <div key={index} className={listSliceCSS.box}>
                                  {el.completed} completed tasks from{" "}
                                  {el.number}
                                </div>
                              )
                          )}
                        </div>
                        <div className={listSliceCSS.icons}>
                          <FontAwesomeIcon
                            className={listSliceCSS.ajoutIcon}
                            icon={faPlus}
                            value={groupname}
                            onClick={() => {
                              handleItemClick(key);
                              handelnavigate();
                            }}
                          />
                          <FontAwesomeIcon
                            className={listSliceCSS.deleteIcon}
                            icon={faTrash}
                            onClick={() => handelremove(index)}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={listSliceCSS.yourDivId}>
        <input
          type="text"
          className={listSliceCSS.addbox}
          placeholder="Group name"
          value={groupname}
          onChange={(e) => setgroupname(e.target.value)}
        />
        <button className={listSliceCSS.addbtn} onClick={handeladd}>
          Create group
        </button>
      </div>
      <div
        className={listSliceCSS.emptypop}
        style={{ display: visibel ? "block" : "none" }}
      >
        <div className={listSliceCSS.popcontainer}>
          <p>you can&apos;t add an empty group</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={listSliceCSS.closebtn}
            onClick={() => setVisibel(false)}
          />
        </div>
      </div>
      {/* this is the second part */}
      <div
        className={listSliceCSS.emptypop}
        style={{ display: added ? "block" : "none" }}
      >
        <div className={listSliceCSS.popcontainer}>
          <p>you can&apos;t add a group already added</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className={listSliceCSS.closebtn}
            onClick={switchaddedgroup}
          />
        </div>
      </div>
    </div>
  );
};
export default ListView;
