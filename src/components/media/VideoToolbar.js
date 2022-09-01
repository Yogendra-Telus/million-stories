import React from 'react';
import DiveDeeper from './DiveDeeper';
import Close from '../common/Icons/Close';
import SearchIcon from '../common/Icons/Book';
import CaretIcon from '../common/Icons/CaretRight';

export default function VideoToolbar({
  setIsDiveDeeperOpen,
  setIsSeeWhatsNextOpen,
  isOpen,
  isSeeWhatsNextOpen,
  setIsOpen,
  setIsInfoOpen,
  isInfoOpen,
  ...props
}) {
  return (
    <div className={`video-toolbar${isOpen ? ' open' : ''}${isSeeWhatsNextOpen ? ' none' : ''}`}>
      {props.tools && props.tools.length > 0 && (
        <div
          className={`serchbar${isOpen ? ' ' : ' close'}`}
          onClick={setIsDiveDeeperOpen}
          onKeyDown={setIsDiveDeeperOpen}
          role="button"
          tabIndex="0"
        >
          <SearchIcon iconWidth="28" iconHeight="28" iconfill="#ffffff" />
          <span>Dive Deeper</span>
        </div>
      )}
      <div className={`titlecontent${isOpen ? ' ' : ' disable'}`}>
        {isInfoOpen ? (
          <div className="info-wrapper">
            <div className="info-nav">
              <div>
                <span>You Are Watching:</span>
              </div>
              <div className="info-modal close" onClick={setIsOpen} onKeyDown={setIsOpen} role="button" tabIndex="0">
                <span>Close</span>
                <Close iconWidth="15" iconHeight="23" iconfill="#fff" />
              </div>
            </div>
            <span className="info-title">{props.currMediaTitle}</span>
            {props.currMediaDesc && <p>{props.currMediaDesc}</p>}
          </div>
        ) : (
          <>
            <span>Now Watching:</span>
            <span>{props.currMediaTitle}</span>
            <button className="info-button" onClick={() => setIsInfoOpen(true)}>
              <i className="fa fa-info-circle info-icon" />
            </button>
          </>
        )}
      </div>
      {isOpen ? (
        <div
          className="serchbar see-next-btn"
          onClick={setIsSeeWhatsNextOpen}
          onKeyDown={setIsSeeWhatsNextOpen}
          role="button"
          tabIndex="0"
        >
          <span>See what&apos;s next</span>
          <CaretIcon iconWidth="24" iconHeight="24" iconfill="#ffffff" />
        </div>
      ) : (
        <div className="serchbar close" onClick={setIsOpen} onKeyDown={setIsOpen} role="button" tabIndex="0">
          <span>Close</span>
          <Close iconWidth="18" iconHeight="18" iconfill="#fff" />
        </div>
      )}
      {props.tools && props.tools.length > 0 && <DiveDeeper {...props} />}
    </div>
  );
}
