var url = require('url');

function HttpRequest(req) {
	/**
	 * @class
	 * @name HttpRequest
	 */
	var serverReq = req.constructor;
	/**
	 * 获取当前请求的所有cookie
	 * 
	 * @returns [array|null] 返回当前请求的所有cookie，
	 * 数组中每个元素都是{cookie名称:cookie值}的格式的对象
	 */
	serverReq.prototype.getCookies = function() {
		return this.cookie;
	}
	
	/**
	 * 获取指定名称的cookie的值
	 * 
	 * @param {string} name
	 * @returns {string|null} 当前索要查询的cookie的值
	 */
	serverReq.prototype.getCookie = function(name) {
		var value = null;

		if (this.cookie instanceof Array) {
			for (var i=0,len=this.cookie.length;i<len;i++) {
				var cookie = this.cookie[i];
				if (typeof (cookie[name]) != 'undefined') {
					value = cookie[name];
					break;
				}
			}
		}
		return value;
	}
	
	/**
	 * 获取session
	 * @returns {Session} 获取session对象
	 */
	serverReq.prototype.getSession = function() {
		return this.session;
	}
	
	/**
	 * 销毁当前session
	 */
	serverReq.prototype.destorySession = function() {
		delete this.session;
	}
	
	/**
	 * 获取请求参数，函数内部根据当前请求类型返回相应的get或者post参数
	 * 
	 * @param {string} name 参数名
	 * @returns {string|null} 当前get或者post的参数值
	 */
	serverReq.prototype.getParam = function(name) {
		var value = null;
		console.log('method:'+this.method);
		if (this.method == 'GET') {
			value = url.parse(this.url,true).query[name];			
		} else if (this.method == 'POST') {
			value = this.post[name];
		}
		return value;		
	}
	return req;
}

module.exports = HttpRequest;
