# wingman
Wingman, the popup window manager.

## Installation
With [NPM](https://www.npmjs.com/package/@azinasili/wingman):

```bash
npm install wingman --save
```

Or include Wingman directly:

```html
<script src="/path/to/wingman.js"></script>
```

## Usage
Import Wingman and configure your component (only required options shown).

```javascript
import Wingman from 'wingman';

const Popup = new Wingman({
  url: 'https://google.com',
  name: 'Google',
});

Popup.open();
```

### Options object
| Property                       | Type     | Default             | Description |
| ------------------------------ | -------- | ------------------- | ----------- |
| url                            | String   | null                | Url for popup window |
| name                           | String   | null                | Give popup window a name |
| height                         | Number   | 535                 | Height of popup window |
| width                          | Number   | 450                 | Width of popup window |
| eventBeforeOpen                | String   | wingman:beforeOpen  | Name of event to fire before popup window opens |
| eventBeforeClose               | String   | wingman:beforeClose | Name of event to fire before popup window closes |
| eventAfterOpen                 | String   | wingman:afterOpen   | Name of event to fire after popup window opens |
| eventAfterClose                | String   | wingman:afterClose  | Name of event to fire after popup window closes |
| beforeOpen                     | Function | null                | Function to run before popup window opens |
| beforeClose                    | Function | null                | Function to run before popup window closes |
| afterOpen                      | Function | null                | Function to run after popup window opens |
| afterClose                     | Function | null                | Function to run after popup window closes |
| windowToolbars.menubar         | Boolean  | false               | The new secondary window renders the menubar |
| windowToolbars.toolbar         | Boolean  | false               | The new secondary window renders the Navigation Toolbar |
| windowToolbars.location        | Boolean  | true                | The new secondary window renders the Location bar |
| windowToolbars.personalbar     | Boolean  | false               | The new secondary window renders the Personal Toolbar |
| windowToolbars.status          | Boolean  | true                | The new secondary window has a status bar |
| windowFeatures.attention       | Boolean  | false               | The window is able to open even if another application is already in the foreground |
| windowFeatures.dependent       | Boolean  | false               | The new window is said to be dependent of its parent window |
| windowFeatures.minimizable     | Boolean  | false               | This setting can only apply to dialog windows |
| windowFeatures.fullscreen      | Boolean  | false               | Fullscreens the new window |
| windowFeatures.noopener        | Boolean  | false               | The newly-opened window will not have access back to the originating window |
| windowFeatures.resizable       | Boolean  | true                | The new secondary window will be resizable |
| windowFeatures.scrollbars      | Boolean  | true                | The new secondary window will show horizontal and/or vertical scrollbar(s) if the document doesn't fit into the window's viewport |
| windowPrivileges.chrome        | Boolean  | false               | The page is loaded as window's only content, without any of the browser's interface elements |
| windowPrivileges.dialog        | Boolean  | false               | The dialog feature removes all icons from the window's titlebar |
| windowPrivileges.modal         | Boolean  | false               | The new window is said to be modal |
| windowPrivileges.titlebar      | Boolean  | false               | Thew new secondary window will have a titlebar |
| windowPrivileges.alwaysRaised  | Boolean  | false               | The new window will always be displayed on top of other browser windows, regardless of whether it is active or not |
| windowPrivileges.alwaysLowered | Boolean  | true                | The new created window floats below, under its own parent when the parent window is not minimized |
| windowPrivileges.close         | Boolean  | false               | This feature removes the system close command icon and system close menu item |



### Methods
| Method  | Description                     |
| ------- | ------------------------------- |
| open    | Creates new instance of Wingman |
| destroy | Kills the instance of Wingman   |

## Todo
- [ ] Add tests

## License
MIT License
