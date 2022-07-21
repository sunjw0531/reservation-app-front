import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import RoomTabs from './RoomTabs';
import RoomImageSlider from './RoomImageSlider';
import RoomDetailContent from './RoomDetailContent';
import RoomReviews from './RoomReviews';
import axios from 'axios';

export const RoomModal = ({ show, onHide, roomID }) => {
  const [currTab, setCurrTab] = useState('객실 설명');
  const [roomContent, setRoomContent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      // RoomsButton 컴포넌트에서 초기 roomID값은 empty string임.
      // roomID에 값이 들어올때만 api 요청
      if (roomID !== '') {
        const res = await axios.get(`http://localhost:5000/api/room/${roomID}`);
        setRoomContent(res.data);
      }
    }
    getData();
  }, [roomID]);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        // 모달창을 종료하고 다시 켰을 때 모달창 내부 초기화
        setCurrTab('객실 설명');
      }}
      dialogClassName="my-modal"
      aria-labelledby="roomTitle"
      centered
    >
      <Header id="roomTitle">{roomContent.name}</Header>
      <RoomImageSlider roomContent={roomContent} />
      <ContentContainer>
        <RoomTabs currTab={currTab} setCurrTab={setCurrTab} />
        {currTab === '객실 설명' ? (
          <RoomDetailContent roomData={roomContent} />
        ) : (
          <RoomReviews roomID={roomContent._id} />
        )}
      </ContentContainer>

      <ReserveBtn onClick={() => navigate(`/reservation/${roomID}`)}>
        예약하기
      </ReserveBtn>
    </Modal>
  );
};

const Header = styled.div`
  width: 222px;
  font-size: ${baseStyle.titleFontSize};
  margin: 54px auto auto;
  text-align: center;
`;

const ContentContainer = styled.div`
  width: 570px;
  height: 388px;
  margin: 23px auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReserveBtn = styled(Button)`
  display: block;
  background-color: ${baseStyle.mainColor};
  width: 140px;
  margin: 17px auto 38px;
`;
