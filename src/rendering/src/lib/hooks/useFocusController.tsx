import React from 'react';

import { clamp, cycle } from 'lib/math';

/** Determines the focus behavior of the focus controller. */
type FocusControllerBehavior = 'aria-activedescendant' | 'focus';

/** Options to configure the focus controller. */
interface FocusControllerOptions {
  behavior?: FocusControllerBehavior;
}

/** Hook used to control focus across a group of elements. */
function useFocusController<T extends HTMLElement>(options: FocusControllerOptions = { behavior: 'focus' }) {
  const { behavior } = options;

  /** The index of the focused element. */
  const [focusedElementIndex, setFocusedElementIndex] = React.useState<number>(-1);

  /** Array of focusable element references. */
  const elementRefs = React.useRef<Array<T | null>>([]);

  /**
   * Adds a single element reference to the element references array.
   * @param element - An element.
   * @param index - The index of the element within the array.
   */
  const addToElementRefs = (element: T | null, index: number): void => {
    if (element && !elementRefs?.current?.includes(element)) {
      elementRefs?.current?.splice(index, 0, element);
    }
  };

  /** Focuses an element given its index. */
  const focusElementByIndex = (index: number): void => {
    const element = getElementRefByIndex(index);

    if (element) {
      setFocusedElementIndex(index);
      shouldFocus(element);
    }
  };

  /** Focuses an element where the index is incremented by a number */
  const focusElementByIncrement = (increment: number): void => {
    const index = clamp(focusedElementIndex + increment, 0, getElementRefsLength());
    focusElementByIndex(index);
  };

  /**
   * Focuses a given element.
   * @param element - An element.
   */
  const focusElementByReference = (element: T | null): void => {
    const index = getIndexByElementRef(element);

    if (element && index !== -1) {
      setFocusedElementIndex(index);
      shouldFocus(element);
    }
  };

  /** Focuses the first element in the references array. */
  const focusFirstElement = (): void => {
    focusElementByIndex(0);
  };

  /** Focuses the last element in the references array. */
  const focusLastElement = (): void => {
    focusElementByIndex(getElementRefsLength());
  };

  /** Focuses the next element in the references array. */
  const focusNextElement = (): void => {
    const index = cycle(focusedElementIndex + 1, 0, getElementRefsLength());
    focusElementByIndex(index);
  };

  /** Focuses the previous element in the references array. */
  const focusPreviousElement = (): void => {
    const index = cycle(focusedElementIndex - 1, 0, getElementRefsLength());
    focusElementByIndex(index);
  };

  /**
   * Returns the length of the element references array.
   * @returns A number.
   */
  const getElementRefsLength = (): number => {
    return elementRefs?.current.length - 1;
  };

  /**
   * Returns a single element reference given its index in the references array.
   * @param index - The index of the element reference.
   * @returns An element reference.
   */
  const getElementRefByIndex = (index: number): T | null => {
    let elementRef: T | null = null;

    if (elementRefs && elementRefs?.current && elementRefs?.current[index]) {
      elementRef = elementRefs?.current[index];
    }

    return elementRef;
  };

  /**
   * Returns a single element reference given an attribute name and value.
   * @param name - The name of the attribute.
   * @param value - The value of the attribute.
   * @returns An element reference.
   */
  const getElementRefByAttribute = (name: string, value: unknown): T | null => {
    let elementRef: T | null = null;

    if (elementRefs && elementRefs?.current) {
      elementRef = elementRefs?.current.find((el) => el?.getAttribute(name) === value) || null;
    }

    return elementRef;
  };

  /**
   * Returns a single element reference given text content.
   * @param textContent - A string.
   * @returns An element reference.
   */
  const getElementRefByTextContent = (textContent: string): T | null => {
    let elementRef: T | null = null;

    if (elementRefs && elementRefs?.current) {
      elementRef =
        elementRefs?.current.find((el) =>
          el?.textContent?.trim().toLowerCase().startsWith(textContent.toLowerCase())
        ) || null;
    }

    return elementRef;
  };

  /**
   * Returns the focused element reference.
   * @returns An element reference.
   */
  const getFocusedElement = (): T | null => {
    return getElementRefByIndex(focusedElementIndex);
  };

  /**
   * Returns an index given its element reference.
   * @param element - An element reference.
   * @returns A number.
   */
  const getIndexByElementRef = (element: T | null): number => {
    let index = -1;

    if (element && elementRefs && elementRefs?.current) {
      index = elementRefs?.current.indexOf(element);
    }

    return index;
  };

  /**
   * Attempts to focus an element.
   * @param element - An element.
   * @param focusOptions - Focus options.
   */
  const shouldFocus = (element: T, focusOptions: FocusOptions = { preventScroll: true }): void => {
    if (behavior === 'focus') {
      element?.focus(focusOptions);
    }
    element?.scrollIntoView({ block: 'nearest' });
  };

  return {
    addToElementRefs,
    focusElementByIncrement,
    focusElementByReference,
    focusFirstElement,
    focusLastElement,
    focusNextElement,
    focusPreviousElement,
    getElementRefByAttribute,
    getElementRefByTextContent,
    getFocusedElement,
  };
}

export default useFocusController;
