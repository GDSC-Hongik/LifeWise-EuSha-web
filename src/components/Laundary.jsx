import {
  LaundryContainer,
  Header,
  Logo,
  LaundryBG,
} from "./LaundryCss";
import { Link } from "react-router-dom";

const Laundary = () => {
  return (
    <LaundryContainer>
      <Header>
        <Logo>
          <Link to="/">LifeWise</Link>
        </Logo>
      </Header>
      <LaundryBG />
    </LaundryContainer>
  );
};

export default Laundary;
