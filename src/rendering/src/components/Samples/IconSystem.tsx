import AppIcon from 'public/static-assets/svg-icons/app.svg';
import CalendarIcon from 'public/static-assets/svg-icons/calendar.svg';
import CaratIcon from 'public/static-assets/svg-icons/carat.svg';
import ChatIcon from 'public/static-assets/svg-icons/chat.svg';
import CheckmarkInCircleIcon from 'public/static-assets/svg-icons/checkmark-in-circle.svg';
import CheckmarkIcon from 'public/static-assets/svg-icons/checkmark.svg';
import ClockIcon from 'public/static-assets/svg-icons/clock.svg';
import CloseIcon from 'public/static-assets/svg-icons/close.svg';
import DentalIcon from 'public/static-assets/svg-icons/dental.svg';
import DocumentIcon from 'public/static-assets/svg-icons/document.svg';
import DollarSignIcon from 'public/static-assets/svg-icons/dollar-sign.svg';
import DownloadIcon from 'public/static-assets/svg-icons/download.svg';
import EditIcon from 'public/static-assets/svg-icons/edit.svg';
import ErrorIcon from 'public/static-assets/svg-icons/error.svg';
import ExternalLinkIcon from 'public/static-assets/svg-icons/external-link.svg';
import FaceIDIcon from 'public/static-assets/svg-icons/face-id.svg';

import { useEffect } from 'react';

const IconSystem = (): JSX.Element => {
  useEffect(() => {
    console.log(AppIcon);
  }, []);

  return (
    <section style={{ fill: 'var(--bs-primary)' }}>
      <h2>SVG Icons</h2>
      <p>
        The Icons are loaded using the SVGR library. The SVGs default to black and can be changed to different colors
        using the fill property. In the example below, the bootstrap CSS variable primary is being used. <br />
        <br />
        <code>{"style={{ fill: 'var(--bs-primary)' }}"}</code>
      </p>
      <p>Below are some example icons:</p>
      <div className="row">
        <div className="col">
          <AppIcon className="icon--test" />
        </div>
        <div className="col">
          <CalendarIcon className="icon--test" />
        </div>
        <div className="col">
          <CaratIcon className="icon--test" />
        </div>
        <div className="col">
          <ChatIcon className="icon--test" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <CheckmarkInCircleIcon className="icon--test" />
        </div>
        <div className="col">
          <CheckmarkIcon className="icon--test" />
        </div>
        <div className="col">
          <ClockIcon className="icon--test" />
        </div>
        <div className="col">
          <CloseIcon className="icon--test" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DentalIcon className="icon--test" />
        </div>
        <div className="col">
          <DocumentIcon className="icon--test" />
        </div>
        <div className="col">
          <DollarSignIcon className="icon--test" />
        </div>
        <div className="col">
          <DownloadIcon className="icon--test" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <EditIcon className="icon--test" />
        </div>
        <div className="col">
          <ErrorIcon className="icon--test" />
        </div>
        <div className="col">
          <ExternalLinkIcon className="icon--test" />
        </div>
        <div className="col">
          <FaceIDIcon className="icon--test" />
        </div>
      </div>
    </section>
  );
};

export default IconSystem;
