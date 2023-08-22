import { Field, LinkField, ImageField, Image, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Select, { SelectHandle } from '../../helpers/Select/Select';
import Link from 'components/helpers/Link/Link';
import styles from './Header.module.scss';
import { contextType, HeaderContext, CustomerType } from './Header';
import { useContext, useRef, useState, ChangeEventHandler, MouseEventHandler } from 'react';
import { ButtonVariant } from 'components/helpers/Button/Button';

type UtilityNavFlyOutProps = {
  userTypeDropdownLabel: Field<string>;
  customerTypes: CustomerType[];
  usernameLabel: Field<string>;
  buttonText: Field<string>;
  errorTextForDropdown: Field<string>;
  errorTextForUsername: Field<string>;
  mobileIcon: ImageField;
  mobileDestination: LinkField;
};

const UtilityNavFlyOut = (props: UtilityNavFlyOutProps): JSX.Element | null => {
  const { isMobile, openFlyout, setShowFlyout } = useContext(HeaderContext) as contextType;
  const [selected, setSelected] = useState<number>(0);
  const [madeChoice, setMadeChoice] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [username, setUsername] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const custTypeRef = useRef<SelectHandle>(null);
  const custTypeLabels = Array<string>(1);
  props.customerTypes.map((customer, x) => (custTypeLabels[x] = customer.fields.dropdownLabel.value));

  const pickType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelected(props.customerTypes.findIndex((customer) => customer.fields.dropdownLabel.value === e.target.value));
    setMadeChoice(true);
  };

  const updateUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.target.value;
    if (!inputVal.trim()) {
      // not allowed: only white-spaces
      setUsername(e.target.value.trim());
    } else {
      setUsername(e.target.value);
    }
  };

  const CheckAndGo: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    let errors = false;

    if (username === '' || username.includes(' ')) {
      setUsernameError(true);
      errors = true;
      usernameRef.current?.focus();
    } else {
      setUsernameError(false);
    }

    if (!madeChoice) {
      setSelectError(true);
      errors = true;
      custTypeRef.current?.focus();
    } else {
      setSelectError(false);
    }

    if (!errors) {
      window.location.href = props.customerTypes[selected].fields.portalDestinationLink.value.href + username;
    }
  };

  return (
    <>
      {isMobile && (
        <Link field={props.mobileDestination} showLinkTextWithChildrenPresent={false}>
          <Image field={props.mobileIcon} />
        </Link>
      )}
      {!isMobile && (
        <div className={styles['flyoutContainer']}>
          <Link
            field={props.mobileDestination}
            href="#"
            showLinkTextWithChildrenPresent={false}
            onClick={(e) => {
              e.preventDefault();
              setShowFlyout(!openFlyout);
            }}
            className={styles['flyoutLink']}
          >
            Sign in/Register
          </Link>
          <div className={styles['flyout']} hidden={!openFlyout}>
            <span className={styles['selectionBox']}>
              <Select
                id="customerType"
                label={props.userTypeDropdownLabel.value}
                labelPosition="top"
                options={custTypeLabels}
                onChange={pickType}
                ref={custTypeRef}
              />
            </span>
            {selectError && (
              <label className={styles['error']} role="alert" htmlFor="customerType">
                {props.errorTextForDropdown.value}
              </label>
            )}
            {!selectError && <br />}
            {props.usernameLabel.value}
            <br />
            <input
              type="text"
              id="userName"
              autoComplete="username"
              value={username}
              onChange={updateUsername}
              ref={usernameRef}
            />
            {usernameError && (
              <label role="alert" htmlFor="userName" className={styles['error']}>
                {props.errorTextForUsername.value}
              </label>
            )}
            {!usernameError && (
              <>
                <br />
                <br />
              </>
            )}
            <div>
              <Link
                variant={ButtonVariant.Primary}
                field={props.customerTypes[selected].fields.portalDestinationLink}
                showLinkTextWithChildrenPresent={false}
                className={styles['loginButton']}
                onClick={CheckAndGo}
              >
                {props.buttonText.value}
              </Link>
            </div>
            <div className={styles['links']}>
              <Link
                field={props.customerTypes[selected].fields.forgotPasswordLink}
                hidden={props.customerTypes[selected].fields.forgotPasswordShortInstructions.value !== ''}
              />
              <RichText field={props.customerTypes[selected].fields.forgotPasswordShortInstructions} />
              <Link field={props.customerTypes[selected].fields.registerLink} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UtilityNavFlyOut;
