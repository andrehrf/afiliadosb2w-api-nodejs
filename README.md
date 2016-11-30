# Afiliados B2W API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/afiliadosb2w-api/master/LICENSE)
[![npm version](https://badge.fury.io/js/afiliadosb2w-api.svg)](https://badge.fury.io/js/afiliadosb2w-api)

API integration with Afiliados B2W

## Install

```bash
$ npm install afiliadosb2w-api
```

## Get Api Key

* Create account - https://secure.afiliados.com.br/cadastre-se.php
* FRANQ - http://afiliados.com.br/faq.php?interna=5

## Usage

```js
"use strict";

let AfiliadosB2W = require("afiliadosb2w-api"),
    afiliadosb2w = new AfiliadosB2W("username", "password", "FRANQ");
        
afiliadosb2w.report("201611", function(err, result){
    console.log(result);
});

afiliadosb2w.fullreport("201611", function(err, result){
    console.log(result);
});
    
afiliadosb2w.deeplink("http://www.americanas.com.br", (err, url) => {
    console.log(url); //https://goo.gl/ADlhJi
});

```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.