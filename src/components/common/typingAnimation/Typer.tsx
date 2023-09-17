import { CSSProperties } from 'react';
import { styled } from 'styled-components';

interface FontBlue extends CSSProperties {
  color: string;
}

const blues: Array<FontBlue> = [
  { color: '#216b89' },
  { color: '#527e90' },
  { color: '#000000' },
  { color: '#4191dd' },
  { color: '#3e67df' },
  { color: '#939de6' },
];

export function Typer({ data }) {
  const text = [...data];
  const keyword = text.slice(1, text.lastIndexOf('"'));
  return (
    <Wrap>
      <p className="typed">
        &quot;
        {keyword.map((v, idx) => (
          <span key={idx} style={blues[idx % 6]}>
            {v}
          </span>
        ))}
        &quot;에 관한 로드맵을 생성 중...
      </p>
    </Wrap>
  );
}

export function NodeTyper({ data }) {
  return (
    <Wrap style={{ maxWidth: '240px' }}>
      {data.length > 10 ? (
        <p className="typed">{`${data.slice(0, 8)}...`}</p>
      ) : (
        <p className="typed">{data}</p>
      )}
    </Wrap>
  );
}

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

  & .letters {
    display: inline;
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
