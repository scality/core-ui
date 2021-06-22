//@flow

/*
The Tabs component uses a lot of the code from Material-UI Scrollable Tabs to have the same behavior as it.
Here is the license of material-ui:

The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function easeInOutSin(time: number): number {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

function animate(property: string, element: any, to: number): () => void {
  const duration = 1000; // standard

  let start = null;
  const from = element[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp: number) => {
    if (cancelled) {
      return;
    }
    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);
    element[property] = easeInOutSin(time) * (to - from) + from;
    if (time >= 1) {
      return;
    }
    requestAnimationFrame(step);
  };

  if (from === to) {
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}

const nextItem = (list: Element, item: ?Element): ?Node => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};

const previousItem = (list: Element, item: ?Element): ?Node => {
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};

const moveFocus = (
  list: Element,
  currentFocus: ?Element,
  traversalFunction: (Element, ?Element) => ?Node,
) => {
  let wrappedOnce = false;
  let nextFocus = (traversalFunction(list, currentFocus): any);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    if (!nextFocus.hasAttribute('tabindex')) {
      // Move to the next element.
      nextFocus = (traversalFunction(list, nextFocus): any);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

const useScrollingTabs = (selectedTabIndex: ?number) => {
  const [displayScroll, setDisplayScroll] = useState({
    start: false,
    end: false,
  });
  const scrollButtonEndRef = useRef<?HTMLDivElement>(null);
  const scrollButtonStartRef = useRef<?HTMLDivElement>(null);
  const tabsListRef = useRef<any>(null);
  const tabsRef = useRef<any>(null);

  const scroll = (scrollValue: number) => {
    animate('scrollLeft', tabsRef.current, scrollValue);
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current.scrollLeft;
    scrollValue += delta;
    scroll(scrollValue);
  };

  const getScrollSize = (isStart = false) => {
    const fullContainerSize = tabsListRef.current.clientWidth;
    const containerSize = tabsRef.current.clientWidth;
    let totalSize = 0;
    const children = Array.from(tabsListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab.clientWidth > containerSize) {
        break;
      }
      totalSize += tab.clientWidth;
    }

    const cornerChild = isStart ? children[0] : children[children.length - 1];
    if (
      totalSize +
        tabsRef.current.scrollLeft +
        containerSize +
        cornerChild.clientWidth >
      fullContainerSize
    ) {
      totalSize += cornerChild.clientWidth;
    }
    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize(true));
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize(false));
  };

  const getTabsMeta = useCallback(() => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        scrollLeft: tabsNode.scrollLeft,
        left: rect.left,
        right: rect.right,
      };
    }

    let selectedTabMeta;
    if (tabsNode) {
      const children = tabsListRef.current.children;
      if (children.length > 0) {
        const tab = children[selectedTabIndex];
        selectedTabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, selectedTabMeta };
  }, [selectedTabIndex]);

  const scrollSelectedIntoView = useCallback(
    () => {
      const { tabsMeta, selectedTabMeta } = getTabsMeta();

      if (!selectedTabMeta || !tabsMeta) return;
      if (selectedTabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        const nextScrollStart =
          tabsMeta.scrollLeft + (selectedTabMeta.left - tabsMeta.left);
        scroll(nextScrollStart);
      } else if (selectedTabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        let nextScrollStart =
          tabsMeta.scrollLeft + (selectedTabMeta.right - tabsMeta.right);
        if (
          scrollButtonEndRef.current &&
          ((displayScroll.start && !displayScroll.end) ||
            (!displayScroll.start && displayScroll.end))
        ) {
          nextScrollStart += scrollButtonEndRef.current.getBoundingClientRect()
            .width;
        }
        scroll(nextScrollStart);
      }
    },
    // we do not want to re-trigger this function if display.start / display.end are modified
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getTabsMeta],
  );

  const updateScrollButtonState = useCallback(() => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      let showStartScroll = scrollLeft > 1;
      let showEndScroll = scrollLeft < scrollWidth - clientWidth - 1;

      if (
        showStartScroll !== displayScroll.start ||
        showEndScroll !== displayScroll.end
      ) {
        setDisplayScroll({ start: showStartScroll, end: showEndScroll });
      }
    }
  }, [displayScroll.end, displayScroll.start]);

  useEffect(() => {
    window.addEventListener('resize', updateScrollButtonState);
    return () => {
      window.removeEventListener('resize', updateScrollButtonState);
    };
  }, [updateScrollButtonState]);

  const handleTabsScroll = useMemo(() => () => updateScrollButtonState(), [
    updateScrollButtonState,
  ]);

  useEffect(() => {
    updateScrollButtonState();
  });

  // scroll to selected tab on first render
  useEffect(() => {
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView, selectedTabIndex]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const list = tabsListRef.current;
    const ownerDocument = (list && list.ownerDocument) || document;
    const currentFocus = ownerDocument.activeElement;
    const role = currentFocus.getAttribute('role');
    if (role !== 'tab') {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
      default:
        break;
    }
  };

  return {
    scrollButtonStartRef,
    scrollButtonEndRef,
    tabsRef,
    tabsListRef,
    handleKeyDown,
    handleTabsScroll,
    handleStartScrollClick,
    handleEndScrollClick,
    displayScroll,
  };
};

export default useScrollingTabs;
