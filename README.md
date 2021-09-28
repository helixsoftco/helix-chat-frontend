## Description
Frontend component created in Vue js for chat

## Install
``
npm i helix-chat
``

## Usage
```js
import Vue from 'vue';
import HelixChat from "helix-chat"

Vue.use(HelixChat)
```

```html
<helix-chat />
```

## SCSS
``` scss
@import "~helix-chat/src/index";
```

### Customizable variables

```scss
$h-border-radius: 6px !default;
$h-primary-color: #25305A !default;
$h-primary-color-light: #404e81 !default;
$h-primary-color-dark: #1C2140 !default;
$h-secondary-color: #f6355e !default;
$h-white: #ffffff !default;

$h-bg-box: $h-primary-color !default;
$h-icon-header: $h-white !default;
$h-box-border-radius: 10px !default;

$h-bg-box-body: $h-primary-color-dark !default;
$h-box-body-border-radius: $h-border-radius !default;
$h-row-color: $h-white !default;
$h-row-font-size: .9rem !default;
$h-row-border-radius: $h-border-radius !default;
$h-row-bg-input-message: $h-primary-color !default;
$h-row-bg-output-message: $h-secondary-color !default;

$h-contact-list-border-radius: $h-border-radius !default;
$h-contact-list-item-bg-hover: $h-primary-color-light !default;
$h-contact-list-item-color: $h-white !default;

$h-box-user-color: $h-white !default;
$h-box-user-font-weight: bold !default;

$h-input-bg: $h-primary-color-dark !default;
$h-input-color: $h-white !default;
$h-input-placeholder-color: $h-white !default;
$h-input-placeholder-opacity: .5 !default;
$h-input-border-radius: $h-border-radius !default;

$h-floating-button-bg: $h-white !default;
$h-floating-button-bg-ping: $h-secondary-color !default;
```

# For development
you must create two environment variables to configure the proxy *.env.development*


```
VUE_APP_BASE_URL=/auth
VUE_APP_BASE_URL_SOCKET=/socket
```
create or modify the *vue.config.js* file
```js
module.exports = {
    devServer: {
        proxy: {
            '/auth': {
                target: 'http://localhost:8000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': ''
                }
            },
            '/socket': {
                target: 'ws://localhost:8000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/socket': ''
                }
            }
        }
    }
}
```