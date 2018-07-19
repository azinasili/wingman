# wingman
Wingman, the popup window manager.

## Installation
With [NPM](https://www.npmjs.com/package/wingman):

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

### Configuration options
#### url
**Type:** `String` **Default:** `null`

**Usage:** Url for popup window.

#### name
**Type:** `String` **Default:** `null`

**Usage:** Give popup window a name.

#### height
**Type:** `Number` **Default:** `535`

**Usage:** Height of popup window.

#### width
**Type:** `Number` **Default:** `450`

**Usage:** Width of popup window.

#### eventBeforeOpen
**Type:** `String` **Default:** `wingman:beforeOpen`

**Usage:** Name of event to fire before popup window opens.

#### eventBeforeClose
**Type:** `String` **Default:** `wingman:beforeClose`

**Usage:** Name of event to fire before popup window closes.

#### eventAfterOpen
**Type:** `String` **Default:** `wingman:afterOpen`

**Usage:** Name of event to fire after popup window opens.

#### eventAfterClose
**Type:** `String` **Default:** `wingman:afterClose`

**Usage:** Name of event to fire after popup window closes.

#### beforeOpen
**Type:** `function` **Default:** `null`

**Usage:** Function to run before popup window opens.

#### beforeClose
**Type:** `function` **Default:** `null`

**Usage:** Function to run before popup window closes.

#### afterOpen
**Type:** `function` **Default:** `null`

**Usage:** Function to run after popup window opens.

#### afterClose
**Type:** `function` **Default:** `null`

**Usage:** Function to run after popup window closes.

### Methods
#### open()
**Usage:** Creates new instance of Wingman.

#### destroy()
**Usage:** Kills the instance of Wingman.

## Todo
- [ ] Add documentation for window options
- [ ] Add tests

## License
MIT License
