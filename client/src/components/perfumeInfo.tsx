import React, {FC} from 'react';
import saveAfter from '../assets/images/save_complete.png';
import saveDef from '../assets/images/save_default.png';
import {resultPerfumeData} from '../data/resultPerfumeData';
import PerfumeContent from './perfumeContent';
import {useRecoilState} from 'recoil';
import {showPerfumeContentState} from '../recoil/recoilState';

interface perfumeInfoProps {
    perfumeData: resultPerfumeData,
    isSaved: boolean | undefined,
    saveClick: (id: number, event: React.MouseEvent<HTMLImageElement | HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>, from: string) => void,
    _className: string,
}
const PerfumeInfo: FC<perfumeInfoProps> = ({perfumeData, isSaved, saveClick, _className}) => {
    const [showPerfumeContent, setShowPerfumeContent] = useRecoilState(showPerfumeContentState);
    const numOfChar = perfumeData.name.length;

    const handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setShowPerfumeContent(() => !showPerfumeContent);
    };

    return (
        <div className="w-[1180px] mx-auto">
            <div
                className={_className + ' ' +'flex mx-auto h-[532px] shadow-main-div border border-white rounded-[30px] bg-white-70'}>
                <div className="flex justify-between w-full">
                    <div className="ml-[100px]">
                        <div className="ml-1 mt-[85px] text-2xl font-medium text-caption1 tracking-caption1">
                            {perfumeData.brand}
                        </div>
                        <div className="mt-4 ml-1 font-semibold leading-tight">
                            <span className={numOfChar >= 16 ? 'text-4xl' : 'text-5xl'}>
                                {perfumeData.name}
                            </span>
                        </div>
                        <div className="ml-1 mt-2 text-caption1 font-normal leading-tight text-[26px]">
                            {perfumeData.ename}
                        </div>
                        <div className='mt-[41px] flex items-center'>
                            <button
                                className='w-[22px] h-[22px] font-semibold rounded-3xl bg-question text-questionmark text-caption1 text-center hover:text-white hover:bg-caption1'
                                onClick={handleQuestionClick}
                                aria-expanded={showPerfumeContent}
                                aria-controls={`perfume-content-${perfumeData.id}`}
                                aria-label='상세설명'
                            >
                                ?
                            </button>
                            <div className='ml-2 text-question-text font-medium'>
                                어떤 향인지 알고 싶어요.
                            </div>
                            {showPerfumeContent &&
                                <PerfumeContent id={perfumeData.id} />
                            }
                        </div>

                        <div
                            role='button'
                            className="w-[300px] h-20 bg-white-50 cursor-pointer border border-white rounded-[100px] pl-10 pr-10 mt-[68px] mb-20 pt-6 pb-[26px] shadow-home-button-hover"
                            onClick={(event) => saveClick(perfumeData.id, event, 'main')}
                            tabIndex={0}
                            aria-pressed={isSaved}
                            onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    saveClick(perfumeData.id, event, 'main');
                                }
                            }}
                        >
                            <div className="flex items-center justify-center">
                                {isSaved ? (
                                    <img src={saveAfter} alt='이미 저장된 향수' />
                                ) : (
                                    <img src={saveDef} alt='저장하지 않은 향수' />
                                )}
                                <p className="mb-0 ml-[14px] text-2xl text-save-button">
                                    내 향수 저장하기
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[578px]">
                        <div className="flex items-center justify-center h-full">
                            <img
                                src={perfumeData.imageURL}
                                alt={perfumeData.name}
                                className="max-w-full max-h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PerfumeInfo;