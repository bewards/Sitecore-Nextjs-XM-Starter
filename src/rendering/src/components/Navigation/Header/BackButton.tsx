import { useContext } from 'react';
import { useI18n } from 'next-localization';
import classNames from 'classnames/bind';

import Button, { ButtonVariant } from 'components/helpers/Button/Button';

import { contextType, HeaderContext } from './Header';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

type BackButtonProps = {
  controls: string;
  visibile: boolean;
};

const BackButton = (props: BackButtonProps): JSX.Element | null => {
  const { isMobile, setOpenSubNav } = useContext(HeaderContext) as contextType;
  const { t } = useI18n();

  if (!isMobile) return null;

  return (
    <Button
      className={cx('header__back-btn')}
      tabIndex={props.visibile ? 0 : -1}
      variant={ButtonVariant.Anchor}
      icon={'carat'}
      data-id="sublink"
      aria-controls={props.controls}
      aria-label={t('Aria-Label-CloseSubMenu')}
      onClick={(e) => {
        const target = e.target as HTMLButtonElement;
        target.focus();
        setOpenSubNav(-1);
      }}
    >
      {t('Subnav-Back-Btn')}
    </Button>
  );
};

export default BackButton;
