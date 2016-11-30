/**
 * Afiliados B2W API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see Create account - https://secure.afiliados.com.br/cadastre-se.php
 * @see FRANQ - http://afiliados.com.br/faq.php?interna=5
 */

"use strict";

let AfiliadosB2W = require("./index.js"),
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

