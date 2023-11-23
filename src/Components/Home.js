import Post from "./Post";
import "../Styles/Home_.css";
import styled from "styled-components";
const BlogHeading = styled.h1`
  color: red;
  margin-top: 30px;
  font-size: 55px;
`;
function Home(props) {
  let { postList, setPostList, setExtraMessage } = props;

  if (postList.length === 0) {
    return (
      <div className="home">
        <BlogHeading>Blog Web App</BlogHeading>
        <h1>Click on the Create Post to Create Blogs</h1>
      </div>
    );
  }
  return (
    <div className="home">
      <BlogHeading>Blog Web App</BlogHeading>
      {postList.map((post, index) => {
        return (
          <Post
            postTitle={post.Title}
            Author={post.Author}
            setPostList={setPostList}
            postList={postList}
            index={index}
            key={index}
            setExtraMessage={setExtraMessage}
            date={post.createdOn.toDate()}
          />
        );
      })}
    </div>
  );
}
export default Home;
// const styles = {
//   heading: {

//     color: "darkred",
//   },
// };
