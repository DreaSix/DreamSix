import styled from "styled-components";

const Header = ({ title }) => {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: #f4f4f4;
  padding: 2rem;
  text-align: center;
`;

export default Header;
