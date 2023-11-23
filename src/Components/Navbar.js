import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import styled from "styled-components";
const StyledLinked = styled(Link)`
  text-decoration: none;
  color: #e3dede;

  &:hover {
    text-decoration: underline;
  }
`;
function Navbar() {
  return (
    <div className="Navbar">
      <ul id="nav">
        <li>
          <StyledLinked to="/">Home</StyledLinked>
        </li>
        <li>
          <StyledLinked to="/createPost">Create Post</StyledLinked>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
