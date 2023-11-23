import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/UpdatePost.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function UpdatePost(props) {
  const navigate = useNavigate();
  //Getting Position of the post to be updated from the post array state
  const { pos } = useParams();
  //Getting the post array state from props
  let { postList, setPostList, setExtraMessage } = props;
  //Getting Previous title of the Post which is to be updated
  let prevTitle = postList[pos].Title;
  //Setting state for contrlled input for update for title
  let [titleInput, setTitleInput] = useState(prevTitle);
  //Setting state for contrlled input for update for description
  let prevDes = postList[pos].Description;
  let [desInput, setDesInput] = useState(prevDes);
  //Handle Submit function
  const handleSubmitButton = async (e) => {
    e.preventDefault();
    postList[pos].Title = titleInput;
    postList[pos].Description = desInput;
    setPostList(postList);

    const blogRef = doc(db, "Blog", postList[pos].id);

    await setDoc(
      blogRef,
      { Title: titleInput, Description: desInput },
      { merge: true }
    );

    navigate("/");
    if (prevTitle !== titleInput)
      setExtraMessage(`Post ${prevTitle} Updated to ${titleInput}`);
    else if (prevDes !== desInput) {
      setExtraMessage(`Post ${prevTitle},  description updated`);
    } else {
      setExtraMessage(`No changes made to the Post ${prevTitle}`);
    }
    // setTimeout(() => {
    //   setExtraMessage("");
    // }, 3000);
  };
  return (
    <div className="update-post">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmitButton} className="form-field">
        <label>Post title</label>
        <input
          type="text"
          placeholder="Enter the blog title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          required
        />
        <label>Post Description</label>
        <textarea
          id="post-details"
          placeholder="Describe your blog here..."
          value={desInput}
          onChange={(e) => setDesInput(e.target.value)}
          required
        />

        <button className="update-post-btn">Update</button>
      </form>
    </div>
  );
}
export default UpdatePost;
