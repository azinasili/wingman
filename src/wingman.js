/**
 * Create and manage popup windows
 *
 * Inspired by Yahoo oAuth popup example found at:
 * https://github.com/ydn/yahoo-oauth-popup
 *
 * TODO:
 *  - Provide ability to position window
 *      - Allow custom positions with x/y coords
 */
export default class Wingman {
  /**
   * Create popup
   *
   * @param {Object}   options
   *     Configuration for popups
   *
   * @param {String}   options.url
   *     Domain to point pop to
   *
   * @param {String}   options.name
   *     Name to add to window: Note if name is not given popup opens in a new tab
   *
   * @param {Number}   options.width
   *     Width of popup window
   *
   * @param {Number}   options.height
   *     Height of popup window
   *
   * @param {String}   options.position
   *     Position of popup window, possible options are:
   *      'top-left', 'top-center', 'top-bottom',
   *      'center-left', 'center', 'center-right',
   *      'bottom-left', 'bottom-center', 'bottom-right'
   *
   * @param {Boolean}   options.addEvents
   *      Turn on/off Wingman adding custom events
   *
   * @param {String}   options.eventBeforeOpen
   *      Name of event fired before opening popup window
   *
   * @param {String}   options.eventBeforeClose
   *      Name of event fired before closing popup window
   *
   * @param {String}   options.eventAfterOpen
   *      Name of event fired after opening popup window
   *
   * @param {String}   options.eventAfterClose
   *      Name of event fired after closing popup window
   *
   * @param {Function} options.beforeOpen
   *      Function to run before opening popup window
   *
   * @param {Function} options.beforeClose
   *      Function to run before closing popup window
   *
   * @param {Function} options.afterOpen
   *      Function to run after opening popup window
   *
   * @param {Function} options.afterClose
   *      Function to run after opening popup window
   *
   * @returns Popup window
   */
  constructor(options) {
    this.defaults = {
      url: null,
      name: null,
      width: 450,
      height: 535,
      position: 'center',
      addEvents: false,
      eventBeforeOpen: 'wingman:beforeOpen',
      eventBeforeClose: 'wingman:beforeClose',
      eventAfterOpen: 'wingman:afterOpen',
      eventAfterClose: 'wingman:afterClose',
      beforeOpen: null,
      beforeClose: null,
      afterOpen: null,
      afterClose: null,
      windowToolbars: {
        menubar: false,
        toolbar: false,
        location: true,
        personalbar: false,
        status: true,
      },
      windowFeatures: {
        attention: false,
        dependent: false,
        minimizable: false,
        fullscreen: false,
        noopener: false,
        resizable: true,
        scrollbars: true,
      },
      windowPrivileges: {
        chrome: false,
        dialog: false,
        modal: false,
        titlebar: false,
        alwaysRaised: false,
        alwaysLowered: false,
        close: false,
      },
    };
    this.settings = Object.assign({}, this.defaults, options);
    this.popupWindow = null;
    this.interval = null;
    this.intervalTime = 80;
    this.isPopupOpen = false;
  }

  /**
   * Open popup window
   * @returns {Object} Wingman
   */
  open() {
    const options = Object.assign(
      {},
      this.settings.windowToolbars,
      this.settings.windowFeatures,
      this.settings.windowPrivileges,
    );
    const center = this.constructor.getCenterCoords(this.settings.width, this.settings.height);
    const windowOptions =
      (this.constructor.windowParams(options) > 0)
        ? `${this.constructor.windowParams(options).join(',')}=yes`
        : '';

    // Run beforeOpen function
    if (this.constructor.isFunction(this.settings.beforeOpen)) {
      this.settings.beforeOpen();
    }

    // Create before open event
    if (this.settings.addEvents) {
      this.constructor.fireEvent(this.settings.eventBeforeOpen);
    }

    // Open window and create state
    this.popupWindow = window.open(
      this.settings.url,
      this.settings.name,
      `height=${this.settings.height},width=${this.settings.width},left=${center.x},top=${center.y},${windowOptions}`,
    );
    this.isPopupOpen = true;

    // This allows us to update the popup state if the popup was closed
    // using keyboard or chrome buttons
    this.interval = setInterval(() => {
      if (this.popupWindow && this.popupWindow.closed) {
        this.destroy();
      }
    }, this.intervalTime);

    // Create after open event
    if (this.settings.addEvents) {
      this.constructor.fireEvent(this.settings.eventAfterOpen);
    }

    // Run afterOpen function
    if (this.constructor.isFunction(this.settings.afterOpen)) {
      this.settings.afterOpen();
    }

    return this;
  }

  /**
   * Close popup window
   * @returns {Object} Wingman
   */
  destroy() {
    // Run beforeClose function
    if (this.constructor.isFunction(this.settings.beforeClose)) {
      this.settings.beforeClose();
    }

    // Create before close event
    if (this.settings.addEvents) {
      this.constructor.fireEvent(this.settings.eventBeforeClose);
    }

    // Close window and reset state
    clearInterval(this.interval);
    this.popupWindow.close();
    this.interval = null;
    this.popupWindow = null;
    this.isPopupOpen = false;

    // Create after close event
    if (this.settings.addEvents) {
      this.constructor.fireEvent(this.settings.eventAfterClose);
    }

    // Run afterClose function
    if (this.constructor.isFunction(this.settings.afterClose)) {
      this.settings.afterClose();
    }

    return this;
  }

  /**
   * Convert window options to an Array
   * @param {Object} obj Options for popup window
   * @returns {Array} Enabled window options
   */
  static windowParams(obj) {
    const optionsArray = Object.keys(obj);
    const windowOptions = [];

    optionsArray.forEach((key) => {
      if (obj[key]) {
        windowOptions.push(key);
      }
    });

    return windowOptions;
  }

  /**
   * @typedef {Object} CenterCoords
   * @property {Number} x Center of x
   * @property {Number} y Center of y
   */

  /**
   * Calculate the center coordinates of an item
   * @param {Number} w Width of item
   * @param {Number} h Height of item
   * @return {CenterCoords} Center coordinates
   */
  static getCenterCoords(w, h) {
    const parentWindowPosition = this.getWindowPosition();
    const browserSize = this.getBrowserSize();
    const height = h;
    const width = w;

    const xPos = ((browserSize.width / 2) - (width / 2)) + parentWindowPosition.x;
    const yPos = ((browserSize.height / 2) - (height / 2)) + parentWindowPosition.y;

    return {
      x: xPos,
      y: yPos,
    };
  }

  /**
   * Create custom event for elements
   * @param {String} eventName Name of event to fire
   */
  static fireEvent(eventName) {
    // Use CustomEvent API if it exists
    // fallback to old event creation
    if (window.CustomEvent) {
      const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
      });

      document.dispatchEvent(event);
    } else {
      const event = document.createEvent('Event');

      event.initEvent(eventName, true, true);
      document.dispatchEvent(event);
    }
  }

  /**
   * Check if passed item is a function
   * @param {Function} func Item to check
   * @returns {boolean}
   */
  static isFunction(func) {
    return (func && {}.toString.call(func) === '[object Function]');
  }

  /**
   * @typedef {Object} BrowserSize
   * @property {Number} height The height of the browser
   * @property {Number} width The width of the browser
   */

  /**
   * Returns width and height of the browser
   * @returns {BrowserSize} Browser dimensions
   */
  static getBrowserSize() {
    const height = window.outerHeight;
    const width = window.outerWidth;

    return {
      height,
      width,
    };
  }

  /**
   * @typedef {Object} WindowPosition
   * @property {Number} y The distance of the top window edge to the top of the screen
   * @property {Number} x The distance of the left window edge to the left of the screen
   */

  /**
   * Returns x/y coordinates of the window compared to the screen
   * @returns {WindowPosition} Window coordinates
   */
  static getWindowPosition() {
    let y = 0;
    let x = 0;

    if (window.screenTop || window.screenLeft) {
      y = window.screenTop;
      x = window.screenLeft;
    } else {
      y = window.screenY;
      x = window.screenX;
    }

    return {
      y,
      x,
    };
  }
}
