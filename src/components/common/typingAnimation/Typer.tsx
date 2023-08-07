import { styled } from 'styled-components';

function Typer({ data }) {
  return (
    <Wrap>
      {' '}
      {/* <p className="typed">AI로 로드맵 생성 중</p> */}
      <p className="typed">{data}</p>
    </Wrap>
  );
}
export default Typer;
const Wrap = styled.div`
  display: inline-block;
  font-family: 'arial';
  font-size: 24px;
  padding: 1rem;

  & .typed {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid;
    width: 0;
    animation:
      typing 1.5s steps(30, end) forwards,
      blinking 1s infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blinking {
    0% {
      border-right-color: transparent;
    }
    50% {
      border-right-color: black;
    }
    100% {
      border-right-color: transparent;
    }
  }
`;
