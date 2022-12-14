import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import axios from 'axios';

const RoomReviews = ({ roomID }) => {
  const [reviews, setReviews] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    async function getDefaultReview() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/review`,
          {
            params: { roomID: roomID, page: currPage, perPage: 5 },
          }
        );
        setReviews(res.data.reviews);
        setTotalPage(res.data.totalPage);
      } catch (e) {
        console.error('객실 후기정보를 불러올 수 없습니다.');
      }
    }
    getDefaultReview();
  }, [currPage]);

  const makePagination = () => {
    let startIndex = parseInt(currPage / 10);
    // currPage가 10의 배수인 경우에 버튼을 누르자마자 다음 페이지로 넘어가는 것을 방지하기 위함
    if (startIndex === currPage / 10) {
      startIndex -= 1;
    }
    const page = [];
    for (let i = startIndex * 10; i < (startIndex + 1) * 10; i++) {
      if (i === totalPage) break;
      page.push(i);
    }
    return page;
  };
  return (
    <>
      {reviews.length > 0 ? (
        <Container>
          <ButtonContainer>
            <LeftArrow
              onClick={() =>
                setCurrPage((curr) => {
                  if (curr > 1) return curr - 1;
                  else return 1;
                })
              }
            />
            {makePagination().map((idx) => {
              return (
                <PageNationBtn
                  key={`pagination-${idx}`}
                  onClick={() => {
                    setCurrPage(idx + 1);
                  }}
                  active={Number(currPage) === Number(idx + 1)}
                >
                  {idx + 1}
                </PageNationBtn>
              );
            })}
            <RigthArrow
              onClick={() =>
                setCurrPage((curr) => {
                  if (curr < totalPage) return curr + 1;
                  else return totalPage;
                })
              }
            />
          </ButtonContainer>
          {reviews.map((data, idx) => {
            return (
              <ReviewContainer key={`${data.objectId} - ${idx}`}>
                <p>
                  <span>
                    <strong>예약자명</strong>
                  </span>
                  <br />
                  {data.userID?.name}
                </p>
                <p>
                  <span>
                    <strong>평점</strong>
                  </span>
                  <br />
                  {data.grade}점
                </p>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      borderBottom: '1px solid lightgray',
                      marginBottom: '5px',
                    }}
                  >
                    <strong>{data.title}</strong>
                  </span>
                  {data.content}
                </p>
              </ReviewContainer>
            );
          })}
        </Container>
      ) : (
        <NonReview>
          <h4>작성된 후기가 없어요 😭</h4>
        </NonReview>
      )}
    </>
  );
};

export default RoomReviews;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  overflow-y: scroll;
`;

const ReviewContainer = styled.div`
  width: 98%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 11px;
  border-radius: 5px;
  box-shadow: 3px 3px 10px lightgray;
  margin: 0 auto 15px;

  & > p {
    flex-basis: 60px;
  }

  & > p:last-child {
    flex-basis: 350px;
  }

  & span {
    color: #00000080;
  }
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const LeftArrow = styled(VscChevronLeft)`
  width: 30px;
  height: 30px;

  :hover {
    cursor: pointer;
  }
`;

const RigthArrow = styled(VscChevronRight)`
  width: 30px;
  height: 30px;

  :hover {
    cursor: pointer;
  }
`;

const PageNationBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 4px 12px;

  ${(props) =>
    props.active &&
    css`
      background-color: ${baseStyle.mainColor};
      color: white;
      border-radius: 8px;
    `}
`;

const NonReview = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
