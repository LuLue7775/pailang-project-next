import React, { useEffect, useRef } from 'react'
import styled from "styled-components";

const modalAnimation = (ref) => {

};

export default function ModalStart({ modalShow }) {
    const modalRef = useRef();

    useEffect(() => {
        if (!modalShow) modalAnimation(modalRef.current);
    }, [modalShow]);

    return (
        <StyledModal className='modal' ref={modalRef}>
            <StyledModalTitle className='modal-title'>
                <div> 土地承認 </div>
                <div> Land Acknowledgement </div>
            </StyledModalTitle>
            <StyledModalContent>
                <div>
                    土地承認正文：宣布今（5）日本土新增30035例確診個案，也代表台灣短短3天就從2萬衝破3萬大關，這也讓全台醫護量能拉緊報，甚至還出現打三劑疫苗仍染死亡的20多歲個案，也讓許多民眾人心惶惶。對此，毒物專家招名威教授就表示，全台本土破三萬大關，的確有「禁內用」的必要，雖然與病毒共存是共識，但「如果什麼都不做，單日確診破十萬人這天很快就會到來」。
                </div>
                <div>
                    The domestic epidemic situation is becoming more and more serious, and the command center also announced that today (5) Japan has added 30,035 confirmed cases, which also means that Taiwan has surpassed the 30,000 mark from 20,000 in just 3 days, which also allows the entire Taiwan medical care to be tightened. There were even cases of people in their 20s who died after receiving three doses of the vaccine, which made many people panic. In this regard, Professor Zhao Mingwei, a poison expert, said that the 30,000 mark in Taiwan is indeed necessary to &quot;ban domestic use&quot;. Although coexistence with the virus is a consensus, &quot;if nothing is done, the diagnosis will be broken in a single day.&quot; The day of 100,000 people will come soon.&quot;
                </div>
            </StyledModalContent>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: absolute;
    height: 600px;
    width: 850px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #FFD233F0;
    color: #000;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;
const StyledModalTitle = styled.h2`
    text-align: center;
`;
const StyledModalContent = styled.div`
    // max-height: 50%; 
    max-width: 80%; 
    overflow: hidden;
    font-size: .8rem;
`;
