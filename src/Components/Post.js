import { useNavigate } from "react-router-dom";
import "../Styles/Post.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const PostDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10%;
  align-items: center;
  justify-content: space-between;
  border: 5px double #9f9f9f;
  padding: 10px 10px;
  border-radius: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
  min-width: 250px;

  .blog-decription-ctn {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: first baseline;
    width: 50%;
    p {
      font-size: large;
      margin-top: 0px;
      width: 300px;
      text-align: left;
      color: black;
    }
  }
`;
function Post(props) {
  const navigate = useNavigate();
  //Getting post info from props
  let { postTitle, Author, postList, index, setExtraMessage, date } = props;

  const handleDelete = async () => {
    console.log("Delete Button Pressed");
    //postList.splice(index, 1);
    //let newPostList = [...postList];
    let extraMessage = `Deleted blog post ${postTitle}`;
    //setPostList(newPostList);
    const blogRef = doc(db, "Blog", postList[index].id);

    await deleteDoc(blogRef);

    setExtraMessage(extraMessage);
    // setTimeout(() => {
    //   setExtraMessage("");
    // }, 3000);
  };
  const handleUpdate = () => {
    navigate(`/updatePost/${index}`);
  };
  const handleTitleClick = () => {
    navigate(`/postDetail/${index}`);
  };
  // console.log(author);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month number
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date and time as a string
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Combine date and time
  const viewableDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <PostDiv className="post">
      <div className="blog-decription-ctn">
        <h3 onClick={handleTitleClick}>{postTitle}</h3>
        <p>Blog By - {Author}</p>
        <p>Date Added - {viewableDateTime}</p>
      </div>
      <p id="message">Click on the blog title to read the post</p>
      <div className="btn-ctn">
        <button id="update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button id="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </PostDiv>
  );
}

export default Post;
