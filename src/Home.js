import React, { useState } from "react";
import data from "./data";
import replyIcon from "./images/icon-reply.svg";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";

export const Home = () => {
  const [comments, setComments] = useState(data.comments);
  const [user, setUser] = useState(data.currentUser);
  const [replyVal, setReplyVal] = useState([]);
  const [replyComment, setReplyComment] = useState("");
  const [showTextBox, setShowTextBox] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  //   console.log(user);

  const allComments =
    JSON.parse(localStorage.getItem("allComments")) || comments;
  const [everyComments, setEveryComments] = useState(allComments);
  // console.log(everyComments);

  const handleUpdate = (id) => {
    setEveryComments(
      everyComments.map((x) =>
        x.id === id ? { ...x, content: replyComment } : x
      )
    );
  };
  const handleRemove = (id) => {
    setEveryComments(
      everyComments.filter((everyComment) => everyComment.id !== id)
    );
  };

  const editComment = (id) => {
    const specificComment = allComments.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setReplyVal(specificComment.content);
  };

  return (
    <section className="comments-container">
      {showDelete && (
        <div className="delete-background">
          (
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
                <img src={plus} alt="plus" />
                <p>{score}</p>
                <img src={minus} alt="minus" />
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
                    <div className="reply-button-container">
                      <img src={replyIcon} alt="reply" />
                      <p>Reply</p>
                    </div>
                  )}
                </div>
                <p className="content">{content}</p>
              </div>
              {/* ----------------------------------------------------------------------------------- */}
              {user.username === "juliusomo" && (
                <div className="comment-edit">
                  <div className="comment-edit-wrapper">
                    {/* {!showTextBox && ( */}
                    <button
                      onClick={() => editComment(id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    {/* )} */}
                    {/* {showTextBox && (
                      <button
                        onClick={() => {
                          handleUpdate(id);
                          setShowTextBox(false);
                          setReplyComment("");
                        }}
                      >
                        Update
                      </button>
                    )} */}
                    <button
                      className="btn-delete"
                      onClick={() => {
                        handleRemove(id);
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
              {/* ---------------------------------------------------------------------------------------- */}
            </div>
            <div className="reply-container">
              {replies.map((reply) => {
                const { id, content, createdAt, score, replyingTo, user } =
                  reply;
                return (
                  <div key={id} className="comments-wrapper reply-wrapper">
                    <div className="score-container">
                      <img src={plus} alt="plus" />
                      <p>{score}</p>
                      <img src={minus} alt="minus" />
                    </div>
                    <div>
                      <div className="comment-header">
                        <div className="header-details">
                          <div className="username-container">
                            <img src={user.image.png} alt="avatar" />
                            <p className="username">{user.username}</p>
                          </div>
                          <p className="created-at">{createdAt}</p>
                        </div>
                        <div className="reply-button-container">
                          <img src={replyIcon} alt="reply" />
                          <p>Reply</p>
                        </div>
                      </div>
                      <p className="content">
                        {" "}
                        <span>@{replyingTo}</span> {content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* -------------------------------------------------------------------------------- */}

      {showTextBox && (
        <div className="text-box-container">
          <textarea
            name="replyComment"
            value={replyComment}
            id="replyComment"
            onChange={(e) => setReplyComment(e.target.value)}
            cols="30"
            placeholder="Edit your comment..."
            rows="5"
          ></textarea>
        </div>
      )}
      {/* ------------------------------------------------------------------------------------- */}
      <section className="main-reply-container">
        <div className="main-reply-wrapper">
          <form>
            <textarea
              name="mainReply"
              id="mainReply"
              cols="35"
              rows="4"
              placeholder="Add a comment..."
              value={replyVal}
              onChange={(e) => setReplyVal(e.target.value)}
            ></textarea>
            <div className="reply-footer">
              <img src={user.image.png} alt="user avatar" />
              <button
                className="btn-send"
                onClick={(e) => {
                  e.preventDefault();
                  if (!replyVal) {
                    console.log("Please add a comment");
                  } else if (replyVal && isEditing) {
                    console.log("Edit mode activated");
                  } else {
                    let newReply = {
                      id: new Date().getTime().toString(),
                      content: replyVal,
                      score: 0,
                      user: user,
                      createdAT: "Just now",
                      replies: [],
                    };
                    // setEveryComments((everyComments) => {
                    //   return [...everyComments, newReply];
                    // });
                    setReplyVal("");
                    everyComments.push(newReply);
                    localStorage.setItem(
                      "allComments",
                      JSON.stringify(everyComments)
                    );
                  }
                }}
              >
                {isEditing ? "EDIT" : "SEND"}
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </section>
    </section>
  );
};
