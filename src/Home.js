import React, { useState } from "react";
import data from "./data";
import replyIcon from "./images/icon-reply.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import edit from "./images/icon-edit.svg";
import trash from "./images/icon-delete.svg";

export const Home = () => {
  const [comments, setComments] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser);
  const [replyVal, setReplyVal] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [editID, setEditID] = useState(null);
  const [replyID, setReplyID] = useState(null);
  const [innerReplyID, setInnerReplyID] = useState(null);
  const [removeID, setRemoveID] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  const [innerReply, setInnerReply] = useState("");
  const [isInnerReply, setIsInnerReply] = useState(false);

  // array we get from the localStorage storage---------------------------
  const allComments =
    JSON.parse(localStorage.getItem("allComments")) || comments;
  const [everyComments, setEveryComments] = useState(allComments);

  // function for deleting main comment--------------------------
  const handleRemove = (id) => {
    setEveryComments(
      everyComments.filter((everyComment) => everyComment.id !== id)
    );
  };

  // storing the selected item id in a state-------------------------
  const editComment = (id) => {
    const specificComment = everyComments.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setReplyInput(specificComment.content);
  };

  // storing the selected item id in a state-------------------------
  const replyComment = (id) => {
    setReplyID(id);
    setIsReply(true);
  };

  // getting the current time--------------------------------
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  return (
    <section className="comments-container">
      {showDelete && (
        <div className="delete-background">
          <div className="delete-container">
            <h3>Delete comment</h3>
            <p>
              Are you sure you want to delete this comment? This will remove
              this comment and can't be undone.
            </p>
            <div className="confirm-button-container">
              <button
                className="confirm-cancel-btn"
                onClick={() => {
                  window.location.reload(false);
                }}
              >
                no, cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={() => {
                  localStorage.setItem(
                    "allComments",
                    JSON.stringify(everyComments)
                  );
                  setShowDelete(false);
                }}
              >
                yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {everyComments.map((comment) => {
        const { id, content, createdAt, score, user, replies } = comment;
        return (
          <div key={id} className="full-comments">
            <div className="comments-wrapper">
              <div className="score-container">
                {/* adding to the score------------------------------ */}
                <img
                  src={plus}
                  alt="plus"
                  onClick={() => {
                    setEveryComments(
                      everyComments.map((x) =>
                        x.id === id ? { ...x, score: score + 1 } : x
                      )
                    );
                    localStorage.setItem(
                      "allComments",
                      JSON.stringify(everyComments)
                    );
                  }}
                />
                <p>{score}</p>
                {/* subtracting from the score-------------------------------------- */}
                <img
                  src={minus}
                  alt="minus"
                  onClick={() => {
                    setEveryComments(
                      everyComments.map((x) =>
                        x.id === id ? { ...x, score: score - 1 } : x
                      )
                    );
                    localStorage.setItem(
                      "allComments",
                      JSON.stringify(everyComments)
                    );
                  }}
                />
              </div>
              <div className="comment-details">
                <div className="comment-header">
                  <div className="header-details">
                    <div className="username-container">
                      <img src={user.image.png} alt="avatar" />
                      <p className="username">{user.username}</p>
                    </div>
                    <p className="created-at">{createdAt}</p>
                  </div>
                  {user.username !== "juliusomo" && (
                    <div
                      className="reply-button-container"
                      onClick={() => replyComment(id)}
                    >
                      <img src={replyIcon} alt="reply" />
                      <p>Reply</p>
                    </div>
                  )}
                </div>
                <p className="content">{content}</p>
              </div>
              {user.username === "juliusomo" && (
                <div className="comment-edit">
                  <div className="comment-edit-wrapper">
                    <button
                      className="btn-delete"
                      onClick={() => {
                        handleRemove(id);
                        setShowDelete(true);
                      }}
                    >
                      <img src={trash} alt="" />
                      Delete
                    </button>
                    <button
                      onClick={() => editComment(id)}
                      className="btn-edit"
                    >
                      <img src={edit} alt="" />
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* replying main comments----------------------------------------------------------- */}
            {id === replyID
              ? isReply && (
                  <div className="comment-reply-container">
                    <form className="reply-form">
                      <img src={data.currentUser.image.png} alt="" />
                      <textarea
                        name="replyInput"
                        id="replyInput"
                        cols="23"
                        placeholder="Add a reply..."
                        rows="4"
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          let thisReply = {
                            id: new Date().getTime().toString(),
                            content: replyInput,
                            score: 0,
                            user: data.currentUser,
                            createdAt: time,
                            replies: [],
                            replyingTo: user.username,
                          };
                          replies.push(thisReply);
                          setReplyInput("");
                          setIsReply(false);
                          localStorage.setItem(
                            "allComments",
                            JSON.stringify(everyComments)
                          );
                        }}
                      >
                        reply
                      </button>
                    </form>
                  </div>
                )
              : null}
            {/* end of replying main comments-------------------------------------------------------- */}
            {/* editing main comments-------------------------------------------------------- */}
            {id === editID
              ? isEditing && (
                  <div className="comment-reply-container">
                    <form className="reply-form">
                      <img src={data.currentUser.image.png} alt="" />
                      <textarea
                        name="replyInput"
                        id="replyInput"
                        className="replyInput"
                        cols="23"
                        placeholder="Edit your comment..."
                        rows="4"
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          if (replyInput && isEditing) {
                            setEveryComments(
                              everyComments.map((item) => {
                                if (item.id === editID) {
                                  return { ...item, content: replyInput };
                                }
                                return item;
                              })
                            );
                            setReplyInput("");
                            setEditID(null);
                            setIsEditing(false);
                          }
                          localStorage.setItem(
                            "allComments",
                            JSON.stringify(everyComments)
                          );
                        }}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                )
              : null}
            {/* end of editing main comments-------------------------------------------------------- */}
            <div className="reply-container">
              {replies.map((reply) => {
                const { id, content, createdAt, score, replyingTo, user } =
                  reply;
                return (
                  <section className="comments-reply-container">
                    <div key={id} className="comments-wrapper reply-wrapper">
                      <div className="score-container">
                        <img src={plus} alt="plus" />
                        <p>{score}</p>
                        <img src={minus} alt="minus" />
                      </div>
                      <div className="all-replies-wrapper">
                        <div className="comment-header">
                          <div className="header-details">
                            <div className="username-container">
                              <img src={user.image.png} alt="avatar" />
                              <p className="username">{user.username}</p>
                            </div>
                            <p className="created-at">{createdAt}</p>
                          </div>
                          {user.username !== "juliusomo" && (
                            <div
                              className="reply-button-container"
                              onClick={() => {
                                setInnerReplyID(id);
                                setIsInnerReply(true);
                                console.log(innerReplyID);
                              }}
                            >
                              <img src={replyIcon} alt="reply" />
                              <p>Reply</p>
                            </div>
                          )}
                          {user.username === "juliusomo" && (
                            <div>
                              <button
                                onClick={() => {
                                  setRemoveID(id);
                                  replies.pop(removeID === id);
                                  setShowDelete(true);
                                }}
                                className="btn-delete del"
                              >
                                <img src={trash} alt="" />
                                delete
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="content">
                          {" "}
                          <span>@{replyingTo}</span> {content}
                        </p>
                      </div>
                    </div>
                    {/* inner reply------------------------------------------------------------ */}
                    {id === innerReplyID
                      ? isInnerReply && (
                          <div className="inner-reply-container">
                            <form className="inner-reply-form">
                              <textarea
                                name="innerReply"
                                id="innerReply"
                                cols="20"
                                rows="3"
                                placeholder="Add a reply..."
                                value={innerReply}
                                onChange={(e) => setInnerReply(e.target.value)}
                              ></textarea>
                              <button
                                type="submit"
                                onClick={(e) => {
                                  e.preventDefault();
                                  let thisReply = {
                                    id: new Date().getTime().toString(),
                                    content: innerReply,
                                    score: 0,
                                    user: data.currentUser,
                                    createdAt: time,
                                    replies: [],
                                    replyingTo: user.username,
                                  };
                                  replies.push(thisReply);
                                  setInnerReply("");
                                  setIsInnerReply(false);
                                  localStorage.setItem(
                                    "allComments",
                                    JSON.stringify(everyComments)
                                  );
                                }}
                              >
                                Reply
                              </button>
                            </form>
                          </div>
                        )
                      : null}
                    {/* end of inner reply---------------------------------------------------------- */}
                  </section>
                );
              })}
            </div>
          </div>
        );
      })}
      <section className="main-reply">
        <section className="main-reply-container">
          <div className="main-reply-wrapper">
            <form className="main-reply-form">
              <img
                src={user.image.png}
                alt="user avatar"
                className="user-avatar"
              />
              <textarea
                name="mainReply"
                id="mainReply"
                cols="35"
                rows="4"
                placeholder="Add a comment..."
                value={replyVal}
                onChange={(e) => setReplyVal(e.target.value)}
              ></textarea>
              <button
                className="btn-send"
                onClick={(e) => {
                  e.preventDefault();
                  // if the textarea is empty--------------------------
                  if (!replyVal) {
                    console.log("Please add a comment");
                  }
                  // normal reply------------------------------
                  else {
                    let newReply = {
                      id: new Date().getTime().toString(),
                      content: replyVal,
                      score: 0,
                      user: user,
                      createdAt: time,
                      replies: [],
                    };
                    setReplyVal("");
                    everyComments.push(newReply);
                    localStorage.setItem(
                      "allComments",
                      JSON.stringify(everyComments)
                    );
                  }
                }}
              >
                SEND
              </button>
            </form>
          </div>
          <div></div>
        </section>
      </section>
    </section>
  );
};
