import { useNavigate } from "react-router-dom";
import CreatePostStyles from "../Styles/CreatePost.module.css";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const AnonymousButton = styled.button`
  height: 33px;
  background: blue;
  border: 0;
  color: #fff;
  padding: 8px;
  font-size: 15px;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
  display: ${(props) => (props.login ? "block" : "none")};
  &:hover {
    text-decoration: underline;
  }
`;

function CreatePost(props) {
  let { postList, setPostList, setExtraMessage } = props;
  // console.log(props.setPostList);
  const navigate = useNavigate();
  let postTitleInput = "";
  let postDescriptionInput = "";
  let postAuthor = "";
  const handleTitleInput = (e) => {
    postTitleInput = e.target.value;
  };
  const handleDescriptionInput = (e) => {
    postDescriptionInput = e.target.value;
  };
  const postAuthorInput = (e) => {
    postAuthor = e.target.value;
  };
  const addBlogToCloud = async (title, description, author) => {
    // Add a new document with a generated id.
    const collectionRef = collection(db, "Blog");
    // const refOfNewlyCreatedDoc = await addDoc(collectionRef, {
    //   Title: title,
    //   Author: author,
    //   Description: description,
    //   createdOn: new Date(),
    // });

    // console.log("Document written with ID: ", refOfNewlyCreatedDoc.id);

    const data = {
      Title: title,
      Author: author,
      Description: description,
      createdOn: new Date(),
    };
    //Create new document with auto id in the collection
    const newBlogDoc = doc(collectionRef);
    await setDoc(newBlogDoc, data);

    navigate("/");
    setExtraMessage(`${title} Post created`);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const post = {
      Title: postTitleInput,
      Description: postDescriptionInput,
      Author: postAuthor,
      createdOn: new Date(),
    };
    postList.unshift(post);
    setPostList(props.postList);
    addBlogToCloud(postTitleInput, postDescriptionInput, postAuthor);
  };
  return (
    // <div className="create-post">
    <div className={CreatePostStyles.createPost}>
      <h1>Create Post</h1>
      <form
        onSubmit={handleSubmitButton}
        className={CreatePostStyles.formField}>
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={postAuthorInput}
          required
        />
        <label>Post title</label>
        <input
          type="text"
          placeholder="Enter the blog title"
          onChange={handleTitleInput}
          required
        />
        <label>Post Description</label>
        <textarea
          id="post-details"
          placeholder="Describe your blog here..."
          onChange={handleDescriptionInput}
          required
        />
        <button className={CreatePostStyles.createPostBtn}>Create Post</button>
        <AnonymousButton login> Anonymous Post </AnonymousButton>
      </form>
    </div>
  );
}

export default CreatePost;
