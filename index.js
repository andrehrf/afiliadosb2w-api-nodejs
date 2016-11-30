"use strict";

const url = require("url"),
      request = require("request"),
      cheerio = require("cheerio");

module.exports = function(user, pass, franq){
    return {
        /**
         * Cookie list to send 
         */
        cookies: null,
        
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param string method
         * @param object data
         * @param function cb
         */
        getinapi: function(URL, method, data, cb) {   
            if(method == "POST"){
                let paramsStr = Object.keys(data).map(function(k) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                }).join('&');
                
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', "Cookie": this.cookies},
                    url: URL,
                    body: paramsStr
                }, function(error, response, body){
                    cb(null, body);
                });
            }
            else{
                let options = {url: URL, method: method, headers: {"Cookie": this.cookies}};
                request(options, (error, response, body) => { cb(error, body); });
            }
        },
                
        /**
         * Function to login 
         */
        login: function(cb){
            var _this = this;
            
            if(_this.cookies){
                cb(false, null); 
            }
            else{
                request.post({url: "https://secure.afiliados.com.br/login.php", form: {"codigo-afiliado": user, "senha": pass}}, (error, response, body) => {
                    if(response.headers["set-cookie"]){
                        var cookies = "";
                                                
                        for(var key in response.headers["set-cookie"])
                            cookies += ((cookies != "") ? "; " : "") + response.headers["set-cookie"][key];
                        
                        _this.cookies = cookies;
                        cb(false, null); 
                    }
                    else{
                        cb(true, "Invalid login"); 
                    }
                });
            }
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
                        
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @param string datestart Query start date in AAAAMM format
         * @param function cb
         */
        report: function(date, cb){
            var _this = this;
            
            this.login(function(error, body){
                if(!error)
                    _this.getinapi("https://secure.afiliados.com.br/relatorio-vendas.php?relat="+date+"&site="+franq+"&marca=todas&saida=excel&submit=Gerar+Relat%C3%B3rio", "GET", null, (error, body) => {
                        var $ = cheerio.load(body);
                        var ths = [];
                        var table = [];
                        
                        $("th").each(function(i, elem){
                            ths.push($(this).text());
                        });
                        
                        $("tr").each(function(i, elem){
                            if(i > 0){
                                table[i] = {};
                            
                                $("td", this).each(function(i2, elem){
                                    table[i][ths[i2]] = $(elem).text()
                                });
                            }
                        });
                        
                        cb(null, table);                        
                    });
                else
                    cb(body, null);
            });
        },
        
        /**
         * Return full report with sale ID, payment day, product, price, comission, etc
         * 
         * @param string datestart Query start date in AAAAMM format
         * @param function cb
         */
        fullreport: function(date, cb){
            var _this = this;
            
            this.login(function(error, body){
                if(!error)
                    _this.getinapi("https://secure.afiliados.com.br/relatorio-vendas-detalhes.php?relat="+date+"&site="+franq+"&marca=todas&saida=excel&submit=Gerar+Relat%C3%B3rio", "GET", null, (error, body) => {
                        var $ = cheerio.load(body);
                        var ths = [];
                        var table = [];
                        
                        $("th").each(function(i, elem){
                            ths.push($(this).text());
                        });
                        
                        $("tr").each(function(i, elem){
                            if(i > 0){
                                table[i] = {};
                            
                                $("td", this).each(function(i2, elem){
                                    table[i][ths[i2]] = $(elem).text()
                                });
                            }
                        });
                        
                        cb(null, table);                        
                    });
                else
                    cb(body, null);
            });
        },
        
        /**
         * Create tracking links
         * 
         * @param string url
         * @param integer progid
         * @return void
         */
        deeplink: function(url, cb){
            var _this = this;
            
            this.login(function(error, body){
                if(!error)
                    _this.getinapi("https://secure.afiliados.com.br/gerador-links.php", "POST", {linkOferta: url, slcFranq: franq.split("-")[2], encurtador: true}, (error, body) => {
                        if(body){
                            var resultJSON = JSON.parse(body);
                            cb(null, resultJSON.linkFranq);
                        }
                        else{
                            cb(error, null);
                        }
                    });
                else
                    cb(body, null);
            });
        }
    }
}
