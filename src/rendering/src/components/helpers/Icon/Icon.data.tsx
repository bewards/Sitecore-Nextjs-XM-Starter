import React from 'react';

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
import FaceIdIcon from 'public/static-assets/svg-icons/face-id.svg';
import FacebookIcon from 'public/static-assets/svg-icons/facebook.svg';
import FilterIcon from 'public/static-assets/svg-icons/filter.svg';
import FlagIcon from 'public/static-assets/svg-icons/flag.svg';
import GridIcon from 'public/static-assets/svg-icons/grid.svg';
import HandicapAccessibleIcon from 'public/static-assets/svg-icons/handicap-accessible.svg';
import HideInformationIcon from 'public/static-assets/svg-icons/hide-information.svg';
import HomeIcon from 'public/static-assets/svg-icons/home.svg';
import HospitalIcon from 'public/static-assets/svg-icons/hospital.svg';
import IdCardIcon from 'public/static-assets/svg-icons/id-card.svg';
import InformationIcon from 'public/static-assets/svg-icons/information.svg';
import InstagramIcon from 'public/static-assets/svg-icons/instagram.svg';
import LinkedinIcon from 'public/static-assets/svg-icons/linkedin.svg';
import ListIcon from 'public/static-assets/svg-icons/list.svg';
import LocationIcon from 'public/static-assets/svg-icons/location.svg';
import LockedIcon from 'public/static-assets/svg-icons/locked.svg';
import MailIcon from 'public/static-assets/svg-icons/mail.svg';
import MedicalIcon from 'public/static-assets/svg-icons/medical.svg';
import MenuIcon from 'public/static-assets/svg-icons/menu.svg';
import MinusIcon from 'public/static-assets/svg-icons/minus.svg';
import MobileTextingSmsIcon from 'public/static-assets/svg-icons/mobile-texting-sms.svg';
import MoreIcon from 'public/static-assets/svg-icons/more.svg';
import PersonIcon from 'public/static-assets/svg-icons/person.svg';
import PharmacyIcon from 'public/static-assets/svg-icons/pharmacy.svg';
import PhoneIcon from 'public/static-assets/svg-icons/phone.svg';
import PinterestIcon from 'public/static-assets/svg-icons/pinterest.svg';
import PlayIcon from 'public/static-assets/svg-icons/play.svg';
import PlusIcon from 'public/static-assets/svg-icons/plus.svg';
import PrinterIcon from 'public/static-assets/svg-icons/printer.svg';
import QuestionIcon from 'public/static-assets/svg-icons/question.svg';
import SearchIcon from 'public/static-assets/svg-icons/search.svg';
import SettingsIcon from 'public/static-assets/svg-icons/settings.svg';
import ShoppingCartIcon from 'public/static-assets/svg-icons/shopping-cart.svg';
import ShowInformationIcon from 'public/static-assets/svg-icons/show-information.svg';
import SortIcon from 'public/static-assets/svg-icons/sort.svg';
import StarFilledIcon from 'public/static-assets/svg-icons/star-filled.svg';
import StarUnfilledIcon from 'public/static-assets/svg-icons/star-unfilled.svg';
import StethoscopeIcon from 'public/static-assets/svg-icons/stethoscope.svg';
import ThumbsDownIcon from 'public/static-assets/svg-icons/thumbs-down.svg';
import ThumbsUpIcon from 'public/static-assets/svg-icons/thumbs-up.svg';
import TouchIdIcon from 'public/static-assets/svg-icons/touch-id.svg';
import TrashIcon from 'public/static-assets/svg-icons/trash.svg';
import TwitterIcon from 'public/static-assets/svg-icons/twitter.svg';
import UnlockedIcon from 'public/static-assets/svg-icons/unlocked.svg';
import UploadIcon from 'public/static-assets/svg-icons/upload.svg';
import VideoIcon from 'public/static-assets/svg-icons/video.svg';
import VisionIcon from 'public/static-assets/svg-icons/vision.svg';
import WarningIcon from 'public/static-assets/svg-icons/warning.svg';
import YoutubeIcon from 'public/static-assets/svg-icons/youtube.svg';

/** Style variant of the icon. */
export type IconVariant =
  | 'app'
  | 'calendar'
  | 'carat'
  | 'chat'
  | 'checkmark-in-circle'
  | 'checkmark'
  | 'clock'
  | 'close'
  | 'dental'
  | 'document'
  | 'dollar-sign'
  | 'download'
  | 'edit'
  | 'error'
  | 'external-link'
  | 'face-id'
  | 'facebook'
  | 'filter'
  | 'flag'
  | 'grid'
  | 'handicap-accessible'
  | 'hide-information'
  | 'home'
  | 'hospital'
  | 'id-card'
  | 'information'
  | 'instagram'
  | 'linkedin'
  | 'list'
  | 'location'
  | 'locked'
  | 'mail'
  | 'medical'
  | 'menu'
  | 'minus'
  | 'mobile-texting-sms'
  | 'more'
  | 'none'
  | 'person'
  | 'pharmacy'
  | 'phone'
  | 'pinterest'
  | 'play'
  | 'plus'
  | 'printer'
  | 'question'
  | 'search'
  | 'settings'
  | 'shopping-cart'
  | 'show-information'
  | 'sort'
  | 'star-filled'
  | 'star-unfilled'
  | 'stethoscope'
  | 'thumbs-down'
  | 'thumbs-up'
  | 'touch-id'
  | 'trash'
  | 'twitter'
  | 'unlocked'
  | 'upload'
  | 'video'
  | 'vision'
  | 'warning'
  | 'youtube';

export const svgByIconVariant: Record<IconVariant, JSX.Element> = {
  app: <AppIcon />,
  calendar: <CalendarIcon />,
  carat: <CaratIcon />,
  chat: <ChatIcon />,
  'checkmark-in-circle': <CheckmarkInCircleIcon />,
  checkmark: <CheckmarkIcon />,
  clock: <ClockIcon />,
  close: <CloseIcon />,
  dental: <DentalIcon />,
  document: <DocumentIcon />,
  'dollar-sign': <DollarSignIcon />,
  download: <DownloadIcon />,
  edit: <EditIcon />,
  error: <ErrorIcon />,
  'external-link': <ExternalLinkIcon />,
  'face-id': <FaceIdIcon />,
  facebook: <FacebookIcon />,
  filter: <FilterIcon />,
  flag: <FlagIcon />,
  grid: <GridIcon />,
  'handicap-accessible': <HandicapAccessibleIcon />,
  'hide-information': <HideInformationIcon />,
  home: <HomeIcon />,
  hospital: <HospitalIcon />,
  'id-card': <IdCardIcon />,
  information: <InformationIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedinIcon />,
  list: <ListIcon />,
  location: <LocationIcon />,
  locked: <LockedIcon />,
  mail: <MailIcon />,
  medical: <MedicalIcon />,
  menu: <MenuIcon />,
  minus: <MinusIcon />,
  'mobile-texting-sms': <MobileTextingSmsIcon />,
  more: <MoreIcon />,
  none: <React.Fragment />,
  person: <PersonIcon />,
  pharmacy: <PharmacyIcon />,
  phone: <PhoneIcon />,
  pinterest: <PinterestIcon />,
  play: <PlayIcon />,
  plus: <PlusIcon />,
  printer: <PrinterIcon />,
  question: <QuestionIcon />,
  search: <SearchIcon />,
  settings: <SettingsIcon />,
  'shopping-cart': <ShoppingCartIcon />,
  'show-information': <ShowInformationIcon />,
  sort: <SortIcon />,
  'star-filled': <StarFilledIcon />,
  'star-unfilled': <StarUnfilledIcon />,
  stethoscope: <StethoscopeIcon />,
  'thumbs-down': <ThumbsDownIcon />,
  'thumbs-up': <ThumbsUpIcon />,
  'touch-id': <TouchIdIcon />,
  trash: <TrashIcon />,
  twitter: <TwitterIcon />,
  unlocked: <UnlockedIcon />,
  upload: <UploadIcon />,
  video: <VideoIcon />,
  vision: <VisionIcon />,
  warning: <WarningIcon />,
  youtube: <YoutubeIcon />,
};
