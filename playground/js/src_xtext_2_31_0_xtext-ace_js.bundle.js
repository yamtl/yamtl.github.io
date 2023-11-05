(self["webpackChunkmdenet_educationplatform"] = self["webpackChunkmdenet_educationplatform"] || []).push([["src_xtext_2_31_0_xtext-ace_js"],{

/***/ "./src/xtext/2.31.0/xtext-ace.js":
/*!***************************************!*\
  !*** ./src/xtext/2.31.0/xtext-ace.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_4__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_5__, __WEBPACK_LOCAL_MODULE_5__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_6__, __WEBPACK_LOCAL_MODULE_6__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_7__, __WEBPACK_LOCAL_MODULE_7__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_8__, __WEBPACK_LOCAL_MODULE_8__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_9__, __WEBPACK_LOCAL_MODULE_9__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_10__, __WEBPACK_LOCAL_MODULE_10__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_11__, __WEBPACK_LOCAL_MODULE_11__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_12__, __WEBPACK_LOCAL_MODULE_12__exports;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

/* MDENet - modified to support Xtext inclusion in Education Platform  */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_LOCAL_MODULE_0__ = (function() {
	
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(target) {
			if (typeof this !== 'function')
				throw new TypeError('bind target is not callable');
			var args = Array.prototype.slice.call(arguments, 1);
			var unboundFunc = this;
			var nopFunc = function() {};
			boundFunc = function() {
				var localArgs = Array.prototype.slice.call(arguments);
				return unboundFunc.apply(this instanceof nopFunc ? this : target,
						args.concat(localArgs));
			};
			nopFunc.prototype = this.prototype;
			boundFunc.prototype = new nopFunc();
			return boundFunc;
		}
	}
	
	if (!Array.prototype.map) {
		Array.prototype.map = function(callback, thisArg) {
			if (this == null)
				throw new TypeError('this is null');
			if (typeof callback !== 'function')
				throw new TypeError('callback is not callable');
			var srcArray = Object(this);
			var len = srcArray.length >>> 0;
			var tgtArray = new Array(len);
			for (var i = 0; i < len; i++) {
				if (i in srcArray)
					tgtArray[i] = callback.call(thisArg, srcArray[i], i, srcArray);
			}
			return tgtArray;
		}
	}
	
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(callback, thisArg) {
			if (this == null)
				throw new TypeError('this is null');
			if (typeof callback !== 'function')
				throw new TypeError('callback is not callable');
			var srcArray = Object(this);
			var len = srcArray.length >>> 0;
			for (var i = 0; i < len; i++) {
				if (i in srcArray)
					callback.call(thisArg, srcArray[i], i, srcArray);
			}
		}
	}
	
	return {};
}).apply(__WEBPACK_LOCAL_MODULE_0__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__exports));

/*******************************************************************************
 * Copyright (c) 2015, 2017 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_1__ = (function(jQuery) {
	
	var globalState = {};
	
	/**
	 * Generic service implementation that can serve as superclass for specialized services.
	 */
	function XtextService() {};

	/**
	 * Initialize the request metadata for this service class. Two variants:
	 *  - initialize(serviceUrl, serviceType, resourceId, updateService)
	 *  - initialize(xtextServices, serviceType)
	 */
	XtextService.prototype.initialize = function() {
		this._serviceType = arguments[1];
		if (typeof(arguments[0]) === 'string') {
			this._requestUrl = arguments[0] + '/' + this._serviceType;
			var resourceId = arguments[2];
			if (resourceId)
				this._encodedResourceId = encodeURIComponent(resourceId);
			this._updateService = arguments[3];
		} else {
			var xtextServices = arguments[0];
			if (xtextServices.options) {
				this._requestUrl = xtextServices.options.serviceUrl + '/' + this._serviceType;
				var resourceId = xtextServices.options.resourceId;
				if (resourceId)
					this._encodedResourceId = encodeURIComponent(resourceId);
			}
			this._updateService = xtextServices.updateService;
		}
	}
	
	XtextService.prototype.setState = function(state) {
		this._state = state;
	}
	
	/**
	 * Invoke the service with default service behavior.
	 */
	XtextService.prototype.invoke = function(editorContext, params, deferred, callbacks) {
		if (deferred === undefined) {
			deferred = jQuery.Deferred();
		}
		if (jQuery.isFunction(this._checkPreconditions) && !this._checkPreconditions(editorContext, params)) {
			deferred.reject();
			return deferred.promise();
		}
		var serverData = {
			contentType: params.contentType
		};
		var initResult;
		if (jQuery.isFunction(this._initServerData))
			initResult = this._initServerData(serverData, editorContext, params);
		var httpMethod = 'GET';
		if (initResult && initResult.httpMethod)
			httpMethod = initResult.httpMethod;
		var self = this;
		if (!(initResult && initResult.suppressContent)) {
			if (params.sendFullText) {
				serverData.fullText = editorContext.getText();
				httpMethod = 'POST';
			} else {
				var knownServerState = editorContext.getServerState();
				if (knownServerState.updateInProgress) {
					if (self._updateService) {
						self._updateService.addCompletionCallback(function() {
							self.invoke(editorContext, params, deferred);
						});
					} else {
						deferred.reject();
					}
					return deferred.promise();
				}
				if (knownServerState.stateId !== undefined) {
					serverData.requiredStateId = knownServerState.stateId;
				}
			}
		}
		
		var onSuccess;
		if (jQuery.isFunction(this._getSuccessCallback)) {
			onSuccess = this._getSuccessCallback(editorContext, params, deferred);
		} else {
			onSuccess = function(result) {
				if (result.conflict) {
					if (self._increaseRecursionCount(editorContext)) {
						var onConflictResult;
						if (jQuery.isFunction(self._onConflict)) {
							onConflictResult = self._onConflict(editorContext, result.conflict);
						}
						if (!(onConflictResult && onConflictResult.suppressForcedUpdate) && !params.sendFullText
								&& result.conflict == 'invalidStateId' && self._updateService) {
							self._updateService.addCompletionCallback(function() {
								self.invoke(editorContext, params, deferred);
							});
							var knownServerState = editorContext.getServerState();
							delete knownServerState.stateId;
							delete knownServerState.text;
							self._updateService.invoke(editorContext, params);
						} else {
							self.invoke(editorContext, params, deferred);
						}
					} else {
						deferred.reject();
					}
					return false;
				}
				if (jQuery.isFunction(self._processResult)) {
					var processedResult = self._processResult(result, editorContext);
					if (processedResult) {
						deferred.resolve(processedResult);
						return true;
					}
				}
				deferred.resolve(result);
			};
		}
		
		var onError = function(xhr, textStatus, errorThrown) {
			if (xhr.status == 404 && !params.loadFromServer && self._increaseRecursionCount(editorContext)) {
				var onConflictResult;
				if (jQuery.isFunction(self._onConflict)) {
					onConflictResult = self._onConflict(editorContext, errorThrown);
				}
				var knownServerState = editorContext.getServerState();
				if (!(onConflictResult && onConflictResult.suppressForcedUpdate)
						&& knownServerState.text !== undefined && self._updateService) {
					self._updateService.addCompletionCallback(function() {
						self.invoke(editorContext, params, deferred);
					});
					delete knownServerState.stateId;
					delete knownServerState.text;
					self._updateService.invoke(editorContext, params);
					return true;
				}
			}
			deferred.reject(errorThrown);
		}
		
		self.sendRequest(editorContext, {
			type: httpMethod,
			data: serverData,
			success: onSuccess,
			error: onError
		}, !params.sendFullText);
		return deferred.promise().always(function() {
			self._recursionCount = undefined;
		});
	}

	/**
	 * Send an HTTP request to invoke the service.
	 */
	XtextService.prototype.sendRequest = function(editorContext, settings, needsSession) {
		var self = this;
		self.setState('started');
		var corsEnabled = editorContext.xtextServices.options['enableCors'];
		if(corsEnabled) {
			settings.crossDomain = true;
			settings.xhrFields = {withCredentials: true};
		} 
		var onSuccess = settings.success;
		settings.success = function(result) {
			var accepted = true;
			if (jQuery.isFunction(onSuccess)) {
				accepted = onSuccess(result);
			}
			if (accepted || accepted === undefined) {
				self.setState('finished');
				if (editorContext.xtextServices) {
					var successListeners = editorContext.xtextServices.successListeners;
					if (successListeners) {
						for (var i = 0; i < successListeners.length; i++) {
							var listener = successListeners[i];
							if (jQuery.isFunction(listener)) {
								listener(self._serviceType, result);
							}
						}
					}
				}
			}
		};
		
		var onError = settings.error;
		settings.error = function(xhr, textStatus, errorThrown) {
			var resolved = false;
			if (jQuery.isFunction(onError)) {
				resolved = onError(xhr, textStatus, errorThrown);
			}
			if (!resolved) {
				self.setState(undefined);
				self._reportError(editorContext, textStatus, errorThrown, xhr);
			}
		};
		
		settings.async = true;
		var requestUrl = self._requestUrl;
		if (!settings.data.resource && self._encodedResourceId) {
			if (requestUrl.indexOf('?') >= 0)
				requestUrl += '&resource=' + self._encodedResourceId;
			else
				requestUrl += '?resource=' + self._encodedResourceId;
		}
		
		if (needsSession && globalState._initPending) {
			// We have to wait until the initial request has finished to make sure the client has
			// received a valid session id
			if (!globalState._waitingRequests)
				globalState._waitingRequests = [];
			globalState._waitingRequests.push({requestUrl: requestUrl, settings: settings});
		} else {
			if (needsSession && !globalState._initDone) {
				globalState._initPending = true;
				var onComplete = settings.complete;
				settings.complete = function(xhr, textStatus) {
					if (jQuery.isFunction(onComplete)) {
						onComplete(xhr, textStatus);
					}
					delete globalState._initPending;
					globalState._initDone = true;
					if (globalState._waitingRequests) {
						for (var i = 0; i < globalState._waitingRequests.length; i++) {
							var request = globalState._waitingRequests[i];
							jQuery.ajax(request.requestUrl, request.settings);
						}
						delete globalState._waitingRequests;
					}
				}
			}
			jQuery.ajax(requestUrl, settings);
		}
	}
	
	/**
	 * Use this in case of a conflict before retrying the service invocation. If the number
	 * of retries exceeds the limit, an error is reported and the function returns false.
	 */
	XtextService.prototype._increaseRecursionCount = function(editorContext) {
		if (this._recursionCount === undefined)
			this._recursionCount = 1;
		else
			this._recursionCount++;

		if (this._recursionCount >= 10) {
			this._reportError(editorContext, 'warning', 'Xtext service request failed after 10 attempts.', {});
			return false;
		}
		return true;
	},
	
	/**
	 * Report an error to the listeners.
	 */
	XtextService.prototype._reportError = function(editorContext, severity, message, requestData) {
		if (editorContext.xtextServices) {
			var errorListeners = editorContext.xtextServices.errorListeners;
			if (errorListeners) {
				for (var i = 0; i < errorListeners.length; i++) {
					var listener = errorListeners[i];
					if (jQuery.isFunction(listener)) {
						listener(this._serviceType, severity, message, requestData);
					}
				}
			}
		}
	}
	
	return XtextService;
}).apply(__WEBPACK_LOCAL_MODULE_1__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__exports));

/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_2__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for loading resources. The resulting text is passed to the editor context.
	 */
	function LoadResourceService(serviceUrl, resourceId, revert) {
		this.initialize(serviceUrl, revert ? 'revert' : 'load', resourceId);
	};

	LoadResourceService.prototype = new XtextService();
	
	LoadResourceService.prototype._initServerData = function(serverData, editorContext, params) {
		return {
			suppressContent: true,
			httpMethod: this._serviceType == 'revert' ? 'POST' : 'GET'
		};
	};
	
	LoadResourceService.prototype._getSuccessCallback = function(editorContext, params, deferred) {
		return function(result) {
			editorContext.setText(result.fullText);
			editorContext.clearUndoStack();
			editorContext.setDirty(result.dirty);
			var listeners = editorContext.updateServerState(result.fullText, result.stateId);
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](params);
			}
			deferred.resolve(result);
		}
	}

	return LoadResourceService;
}).apply(__WEBPACK_LOCAL_MODULE_2__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_3__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for saving resources.
	 */
	function SaveResourceService(serviceUrl, resourceId) {
		this.initialize(serviceUrl, 'save', resourceId);
	};

	SaveResourceService.prototype = new XtextService();

	SaveResourceService.prototype._initServerData = function(serverData, editorContext, params) {
		return {
			httpMethod: 'POST'
		};
	};
	
	SaveResourceService.prototype._processResult = function(result, editorContext) {
		editorContext.setDirty(false);
	};
	
	return SaveResourceService;
}).apply(__WEBPACK_LOCAL_MODULE_3__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_4__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for semantic highlighting.
	 */
	function HighlightingService(serviceUrl, resourceId) {
		this.initialize(serviceUrl, 'highlight', resourceId);
	};

	HighlightingService.prototype = new XtextService();
	
	HighlightingService.prototype._checkPreconditions = function(editorContext, params) {
		return this._state === undefined;
	}

	HighlightingService.prototype._onConflict = function(editorContext, cause) {
		this.setState(undefined);
		return {
			suppressForcedUpdate: true
		};
	};
	
	return HighlightingService;
}).apply(__WEBPACK_LOCAL_MODULE_4__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_4__ === undefined && (__WEBPACK_LOCAL_MODULE_4__ = __WEBPACK_LOCAL_MODULE_4__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_5__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for validation.
	 */
	function ValidationService(serviceUrl, resourceId) {
		this.initialize(serviceUrl, 'validate', resourceId);
	};
	
	ValidationService.prototype = new XtextService();
	
	ValidationService.prototype._checkPreconditions = function(editorContext, params) {
		return this._state === undefined;
	}

	ValidationService.prototype._onConflict = function(editorContext, cause) {
		this.setState(undefined);
		return {
			suppressForcedUpdate: true
		};
	};
	
	return ValidationService;
}).apply(__WEBPACK_LOCAL_MODULE_5__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_5__ === undefined && (__WEBPACK_LOCAL_MODULE_5__ = __WEBPACK_LOCAL_MODULE_5__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_6__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for updating the server-side representation of a resource.
	 * This service only makes sense with a stateful server, where an update request is sent
	 * after each modification. This can greatly improve response times compared to the
	 * stateless alternative, where the full text content is sent with each service request.
	 */
	function UpdateService(serviceUrl, resourceId) {
		this.initialize(serviceUrl, 'update', resourceId, this);
		this._completionCallbacks = [];
	};
	
	UpdateService.prototype = new XtextService();

	/**
	 * Compute a delta between two versions of a text. If a difference is found, the result
	 * contains three properties:
	 *   deltaText - the text to insert into s1
	 *   deltaOffset - the text insertion offset
	 *   deltaReplaceLength - the number of characters that shall be replaced by the inserted text
	 */
	UpdateService.prototype.computeDelta = function(s1, s2, result) {
		var start = 0, s1length = s1.length, s2length = s2.length;
		while (start < s1length && start < s2length && s1.charCodeAt(start) === s2.charCodeAt(start)) {
			start++;
		}
		if (start === s1length && start === s2length) {
			return;
		}
		result.deltaOffset = start;
		if (start === s1length) {
			result.deltaText = s2.substring(start, s2length);
			result.deltaReplaceLength = 0;
			return;
		} else if (start === s2length) {
			result.deltaText = '';
			result.deltaReplaceLength = s1length - start;
			return;
		}
		
		var end1 = s1length - 1, end2 = s2length - 1;
		while (end1 >= start && end2 >= start && s1.charCodeAt(end1) === s2.charCodeAt(end2)) {
			end1--;
			end2--;
		}
		result.deltaText = s2.substring(start, end2 + 1);
		result.deltaReplaceLength = end1 - start + 1;
	};
	
	/**
	 * Invoke all completion callbacks and clear the list afterwards.
	 */
	UpdateService.prototype.onComplete = function(xhr, textStatus) {
		var callbacks = this._completionCallbacks;
		this._completionCallbacks = [];
		for (var i = 0; i < callbacks.length; i++) {
			var callback = callbacks[i].callback;
			var params = callbacks[i].params;
			callback(params);
		}
	}
	
	/**
	 * Add a callback to be invoked when the service call has completed.
	 */
	UpdateService.prototype.addCompletionCallback = function(callback, params) {
		this._completionCallbacks.push({callback: callback, params: params});
	}

	UpdateService.prototype.invoke = function(editorContext, params, deferred) {
		if (deferred === undefined) {
			deferred = jQuery.Deferred();
		}
		var knownServerState = editorContext.getServerState();
		if (knownServerState.updateInProgress) {
			var self = this;
			this.addCompletionCallback(function() { self.invoke(editorContext, params, deferred) });
			return deferred.promise();
		}
		
		var serverData = {
			contentType: params.contentType
		};
		var currentText = editorContext.getText();
		if (params.sendFullText || knownServerState.text === undefined) {
			serverData.fullText = currentText;
		} else {
			this.computeDelta(knownServerState.text, currentText, serverData);
			if (serverData.deltaText === undefined) {
				if (params.forceUpdate) {
					serverData.deltaText = '';
					serverData.deltaOffset = editorContext.getCaretOffset();
					serverData.deltaReplaceLength = 0;
				} else {
					deferred.resolve(knownServerState);
					this.onComplete();
					return deferred.promise();
				}
			}
			serverData.requiredStateId = knownServerState.stateId;
		}

		knownServerState.updateInProgress = true;
		var self = this;
		self.sendRequest(editorContext, {
			type: 'PUT',
			data: serverData,
			
			success: function(result) {
				if (result.conflict) {
					// The server has lost its session state and the resource is loaded from the server
					if (knownServerState.text !== undefined) {
						delete knownServerState.updateInProgress;
						delete knownServerState.text;
						delete knownServerState.stateId;
						self.invoke(editorContext, params, deferred);
					} else {
						deferred.reject(result.conflict);
					}
					return false;
				}
				var listeners = editorContext.updateServerState(currentText, result.stateId);
				for (var i = 0; i < listeners.length; i++) {
					self.addCompletionCallback(listeners[i], params);
				}
				deferred.resolve(result);
			},
			
			error: function(xhr, textStatus, errorThrown) {
				if (xhr.status == 404 && !params.loadFromServer && knownServerState.text !== undefined) {
					// The server has lost its session state and the resource is not loaded from the server
					delete knownServerState.updateInProgress;
					delete knownServerState.text;
					delete knownServerState.stateId;
					self.invoke(editorContext, params, deferred);
					return true;
				}
				deferred.reject(errorThrown);
			},
			
			complete: self.onComplete.bind(self)
		}, true);
		return deferred.promise().always(function() {
			knownServerState.updateInProgress = false;
		});
	};
	
	return UpdateService;
}).apply(__WEBPACK_LOCAL_MODULE_6__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_6__ === undefined && (__WEBPACK_LOCAL_MODULE_6__ = __WEBPACK_LOCAL_MODULE_6__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_7__ = (function(XtextService, jQuery) {

	/**
	 * Service class for content assist proposals. The proposals are returned as promise of
	 * a Deferred object.
	 */
	function ContentAssistService(serviceUrl, resourceId, updateService) {
		this.initialize(serviceUrl, 'assist', resourceId, updateService);
	}

	ContentAssistService.prototype = new XtextService();
	
	ContentAssistService.prototype.invoke = function(editorContext, params, deferred) {
		if (deferred === undefined) {
			deferred = jQuery.Deferred();
		}
		var serverData = {
			contentType: params.contentType
		};
		if (params.offset)
			serverData.caretOffset = params.offset;
		else
			serverData.caretOffset = editorContext.getCaretOffset();
		var selection = params.selection ? params.selection : editorContext.getSelection();
		if (selection.start != serverData.caretOffset || selection.end != serverData.caretOffset) {
			serverData.selectionStart = selection.start;
			serverData.selectionEnd = selection.end;
		}
		var currentText;
		var httpMethod = 'GET';
		var onComplete = undefined;
		var knownServerState = editorContext.getServerState();
		if (params.sendFullText) {
			serverData.fullText = editorContext.getText();
			httpMethod = 'POST';
		} else {
			serverData.requiredStateId = knownServerState.stateId;
			if (this._updateService) {
				if (knownServerState.text === undefined || knownServerState.updateInProgress) {
					var self = this;
					this._updateService.addCompletionCallback(function() {
						self.invoke(editorContext, params, deferred);
					});
					return deferred.promise();
				}
				knownServerState.updateInProgress = true;
				onComplete = this._updateService.onComplete.bind(this._updateService);
				currentText = editorContext.getText();
				this._updateService.computeDelta(knownServerState.text, currentText, serverData);
				if (serverData.deltaText !== undefined) {
					httpMethod = 'POST';
				}
			}
		}
		
		var self = this;
		self.sendRequest(editorContext, {
			type: httpMethod,
			data: serverData,
			
			success: function(result) {
				if (result.conflict) {
					// The server has lost its session state and the resource is loaded from the server
					if (self._increaseRecursionCount(editorContext)) {
						if (onComplete) {
							delete knownServerState.updateInProgress;
							delete knownServerState.text;
							delete knownServerState.stateId;
							self._updateService.addCompletionCallback(function() {
								self.invoke(editorContext, params, deferred);
							});
							self._updateService.invoke(editorContext, params);
						} else {
							var paramsCopy = {};
							for (var p in params) {
								if (params.hasOwnProperty(p))
									paramsCopy[p] = params[p];
							}
							paramsCopy.sendFullText = true;
							self.invoke(editorContext, paramsCopy, deferred);
						}
					} else {
						deferred.reject(result.conflict);
					}
					return false;
				}
				if (onComplete && result.stateId !== undefined && result.stateId != editorContext.getServerState().stateId) {
					var listeners = editorContext.updateServerState(currentText, result.stateId);
					for (var i = 0; i < listeners.length; i++) {
						self._updateService.addCompletionCallback(listeners[i], params);
					}
				}
				deferred.resolve(result.entries);
			},
			
			error: function(xhr, textStatus, errorThrown) {
				if (onComplete && xhr.status == 404 && !params.loadFromServer && knownServerState.text !== undefined) {
					// The server has lost its session state and the resource is not loaded from the server
					delete knownServerState.updateInProgress;
					delete knownServerState.text;
					delete knownServerState.stateId;
					self._updateService.addCompletionCallback(function() {
						self.invoke(editorContext, params, deferred);
					});
					self._updateService.invoke(editorContext, params);
					return true;
				}
				deferred.reject(errorThrown);
			},
			
			complete: onComplete
		}, !params.sendFullText);
		var result = deferred.promise();
		if (onComplete) {
			result.always(function() {
				knownServerState.updateInProgress = false;
			});
		}
		return result;
	};

	return ContentAssistService;
}).apply(__WEBPACK_LOCAL_MODULE_7__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_7__ === undefined && (__WEBPACK_LOCAL_MODULE_7__ = __WEBPACK_LOCAL_MODULE_7__exports));

/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_8__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for hover information.
	 */
	function HoverService(serviceUrl, resourceId, updateService) {
		this.initialize(serviceUrl, 'hover', resourceId, updateService);
	};

	HoverService.prototype = new XtextService();

	HoverService.prototype._initServerData = function(serverData, editorContext, params) {
		// In order to display hover info for a selected completion proposal while the content
		// assist popup is shown, the selected proposal is passed as parameter
		if (params.proposal && params.proposal.proposal)
			serverData.proposal = params.proposal.proposal;
		if (params.offset)
			serverData.caretOffset = params.offset;
		else
			serverData.caretOffset = editorContext.getCaretOffset();
		var selection = params.selection ? params.selection : editorContext.getSelection();
		if (selection.start != serverData.caretOffset || selection.end != serverData.caretOffset) {
			serverData.selectionStart = selection.start;
			serverData.selectionEnd = selection.end;
		}
	};
	
	HoverService.prototype._getSuccessCallback = function(editorContext, params, deferred) {
		var delay = params.mouseHoverDelay;
		if (!delay)
			delay = 500;
		var showTime = new Date().getTime() + delay;
		return function(result) {
			if (result.conflict || !result.title && !result.content) {
				deferred.reject();
			} else {
				var remainingTimeout = Math.max(0, showTime - new Date().getTime());
				setTimeout(function() {
					if (!params.sendFullText && result.stateId !== undefined
							&& result.stateId != editorContext.getServerState().stateId) 
						deferred.reject();
					else
						deferred.resolve(result);
				}, remainingTimeout);
			}
		};
	};
	
	return HoverService;
}).apply(__WEBPACK_LOCAL_MODULE_8__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_8__ === undefined && (__WEBPACK_LOCAL_MODULE_8__ = __WEBPACK_LOCAL_MODULE_8__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_9__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for marking occurrences.
	 */
	function OccurrencesService(serviceUrl, resourceId, updateService) {
		this.initialize(serviceUrl, 'occurrences', resourceId, updateService);
	};

	OccurrencesService.prototype = new XtextService();

	OccurrencesService.prototype._initServerData = function(serverData, editorContext, params) {
		if (params.offset)
			serverData.caretOffset = params.offset;
		else
			serverData.caretOffset = editorContext.getCaretOffset();
	};
	
	OccurrencesService.prototype._getSuccessCallback = function(editorContext, params, deferred) {
		return function(result) {
			if (result.conflict || !params.sendFullText && result.stateId !== undefined
					&& result.stateId != editorContext.getServerState().stateId) 
				deferred.reject();
			else 
				deferred.resolve(result);
		}
	}

	return OccurrencesService;
}).apply(__WEBPACK_LOCAL_MODULE_9__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_9__ === undefined && (__WEBPACK_LOCAL_MODULE_9__ = __WEBPACK_LOCAL_MODULE_9__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_LOCAL_MODULE_10__ = (function(XtextService, jQuery) {
	
	/**
	 * Service class for formatting text.
	 */
	function FormattingService(serviceUrl, resourceId, updateService) {
		this.initialize(serviceUrl, 'format', resourceId, updateService);
	};

	FormattingService.prototype = new XtextService();

	FormattingService.prototype._initServerData = function(serverData, editorContext, params) {
		var selection = params.selection ? params.selection : editorContext.getSelection();
		if (selection.end > selection.start) {
			serverData.selectionStart = selection.start;
			serverData.selectionEnd = selection.end;
		}
		return {
			httpMethod: 'POST'
		};
	};
	
	FormattingService.prototype._processResult = function(result, editorContext) {
		// The text update may be asynchronous, so we have to compute the new text ourselves
		var newText;
		if (result.replaceRegion) {
			var fullText = editorContext.getText();
			var start = result.replaceRegion.offset;
			var end = result.replaceRegion.offset + result.replaceRegion.length;
			editorContext.setText(result.formattedText, start, end);
			newText = fullText.substring(0, start) + result.formattedText + fullText.substring(end);
		} else {
			editorContext.setText(result.formattedText);
			newText = result.formattedText;
		}
		var listeners = editorContext.updateServerState(newText, result.stateId);
		for (var i = 0; i < listeners.length; i++) {
			listeners[i]({});
		}
	};
	
	return FormattingService;
}).apply(__WEBPACK_LOCAL_MODULE_10__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_10__ === undefined && (__WEBPACK_LOCAL_MODULE_10__ = __WEBPACK_LOCAL_MODULE_10__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js"),
    __WEBPACK_LOCAL_MODULE_1__,
	__WEBPACK_LOCAL_MODULE_2__,
	__WEBPACK_LOCAL_MODULE_3__,
	__WEBPACK_LOCAL_MODULE_4__,
	__WEBPACK_LOCAL_MODULE_5__,
	__WEBPACK_LOCAL_MODULE_6__,
	__WEBPACK_LOCAL_MODULE_7__,
	__WEBPACK_LOCAL_MODULE_8__,
	__WEBPACK_LOCAL_MODULE_9__,
	__WEBPACK_LOCAL_MODULE_10__
], __WEBPACK_LOCAL_MODULE_11__ = (function(jQuery, XtextService, LoadResourceService, SaveResourceService, HighlightingService,
		ValidationService, UpdateService, ContentAssistService, HoverService, OccurrencesService,
		FormattingService) {
	
	/**
	 * Builder class for the Xtext services.
	 */
	function ServiceBuilder(xtextServices) {
		this.services = xtextServices;
	};

	/**
	 * Create all the available Xtext services depending on the configuration.
	 */
	ServiceBuilder.prototype.createServices = function() {
		var services = this.services;
		var options = services.options;
		var editorContext = services.editorContext;
		editorContext.xtextServices = services;
		var self = this;
		if (!options.serviceUrl) {
			if (!options.baseUrl)
				options.baseUrl = '/';
			else if (options.baseUrl.charAt(0) != '/')
				options.baseUrl = '/' + options.baseUrl;
			options.serviceUrl = window.location.protocol + '//' + window.location.host + options.baseUrl + 'xtext-service';
		}
		if (options.resourceId) {
			if (!options.xtextLang)
				options.xtextLang = options.resourceId.split(/[?#]/)[0].split('.').pop();
			if (options.loadFromServer === undefined)
				options.loadFromServer = true;
			if (options.loadFromServer && this.setupPersistenceServices) {
				services.loadResourceService = new LoadResourceService(options.serviceUrl, options.resourceId, false);
				services.loadResource = function(addParams) {
					return services.loadResourceService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
				}
				services.saveResourceService = new SaveResourceService(options.serviceUrl, options.resourceId);
				services.saveResource = function(addParams) {
					return services.saveResourceService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
				}
				services.revertResourceService = new LoadResourceService(options.serviceUrl, options.resourceId, true);
				services.revertResource = function(addParams) {
					return services.revertResourceService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
				}
				this.setupPersistenceServices();
				services.loadResource();
			}
		} else {
			if (options.loadFromServer === undefined)
				options.loadFromServer = false;
			if (options.xtextLang) {
				var randomId = Math.floor(Math.random() * 2147483648).toString(16);
				options.resourceId = randomId + '.' + options.xtextLang;
			}
		}
		
		if (this.setupSyntaxHighlighting) {
			this.setupSyntaxHighlighting();
		}
		if (options.enableHighlightingService || options.enableHighlightingService === undefined) {
			services.highlightingService = new HighlightingService(options.serviceUrl, options.resourceId);
			services.computeHighlighting = function(addParams) {
				return services.highlightingService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
		}
		if (options.enableValidationService || options.enableValidationService === undefined) {
			services.validationService = new ValidationService(options.serviceUrl, options.resourceId);
			services.validate = function(addParams) {
				return services.validationService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
		}
		if (this.setupUpdateService) {
			function refreshDocument() {
				if (services.highlightingService && self.doHighlighting) {
					services.highlightingService.setState(undefined);
					self.doHighlighting();
				}
				if (services.validationService && self.doValidation) {
					services.validationService.setState(undefined);
					self.doValidation();
				}
			}
			if (!options.sendFullText) {
				services.updateService = new UpdateService(options.serviceUrl, options.resourceId);
				services.update = function(addParams) {
					return services.updateService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
				}
				if (services.saveResourceService)
					services.saveResourceService._updateService = services.updateService;
				editorContext.addServerStateListener(refreshDocument);
			}
			this.setupUpdateService(refreshDocument);
		}
		if ((options.enableContentAssistService || options.enableContentAssistService === undefined)
				&& this.setupContentAssistService) {
			services.contentAssistService = new ContentAssistService(options.serviceUrl, options.resourceId, services.updateService);
			services.getContentAssist = function(addParams) {
				return services.contentAssistService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
			this.setupContentAssistService();
		}
		if ((options.enableHoverService || options.enableHoverService === undefined)
				&& this.setupHoverService) {
			services.hoverService = new HoverService(options.serviceUrl, options.resourceId, services.updateService);
			services.getHoverInfo = function(addParams) {
				return services.hoverService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
			this.setupHoverService();
		}
		if ((options.enableOccurrencesService || options.enableOccurrencesService === undefined)
				&& this.setupOccurrencesService) {
			services.occurrencesService = new OccurrencesService(options.serviceUrl, options.resourceId, services.updateService);
			services.getOccurrences = function(addParams) {
				return services.occurrencesService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
			this.setupOccurrencesService();
		}
		if ((options.enableFormattingService || options.enableFormattingService === undefined)
				&& this.setupFormattingService) {
			services.formattingService = new FormattingService(options.serviceUrl, options.resourceId, services.updateService);
			services.format = function(addParams) {
				return services.formattingService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
			this.setupFormattingService();
		}
		if (options.enableGeneratorService || options.enableGeneratorService === undefined) {
			services.generatorService = new XtextService();
			services.generatorService.initialize(services, 'generate');
			services.generatorService._initServerData = function(serverData, editorContext, params) {
				if (params.allArtifacts)
					serverData.allArtifacts = params.allArtifacts;
				else if (params.artifactId)
					serverData.artifact = params.artifactId;
				if (params.includeContent !== undefined)
					serverData.includeContent = params.includeContent;
			}
			services.generate = function(addParams) {
				return services.generatorService.invoke(editorContext, ServiceBuilder.mergeOptions(addParams, options));
			}
		}
		
		if (options.dirtyElement) {
			var doc = options.document || document;
			var dirtyElement;
			if (typeof(options.dirtyElement) === 'string')
				dirtyElement = jQuery('#' + options.dirtyElement, doc);
			else
				dirtyElement = jQuery(options.dirtyElement);
			var dirtyStatusClass = options.dirtyStatusClass;
			if (!dirtyStatusClass)
				dirtyStatusClass = 'dirty';
			editorContext.addDirtyStateListener(function(dirty) {
				if (dirty)
					dirtyElement.addClass(dirtyStatusClass);
				else
					dirtyElement.removeClass(dirtyStatusClass);
			});
		}
		
		services.successListeners = [];
		services.errorListeners = [function(serviceType, severity, message, requestData) {
			if (options.showErrorDialogs)
				window.alert('Xtext service \'' + serviceType + '\' failed: ' + message);
			else
				console.log('Xtext service \'' + serviceType + '\' failed: ' + message);
		}];
	}
	
	/**
	 * Change the resource associated with this service builder.
	 */
	ServiceBuilder.prototype.changeResource = function(resourceId) {
		var services = this.services;
		var options = services.options;
		options.resourceId = resourceId;
		for (var p in services) {
			if (services.hasOwnProperty(p)) {
				var service = services[p];
				if (service._serviceType && jQuery.isFunction(service.initialize))
					services[p].initialize(options.serviceUrl, service._serviceType, resourceId, services.updateService);
			}
		}
		var knownServerState = services.editorContext.getServerState();
		delete knownServerState.stateId;
		delete knownServerState.text;
		if (options.loadFromServer && jQuery.isFunction(services.loadResource)) {
			services.loadResource();
		}
	}
	
	/**
	 * Create a copy of the given object.
	 */
	ServiceBuilder.copy = function(obj) {
		var copy = {};
		for (var p in obj) {
			if (obj.hasOwnProperty(p))
				copy[p] = obj[p];
		}
		return copy;
	}
	
	/**
	 * Translate an HTML attribute name to a JS option name.
	 */
	ServiceBuilder.optionName = function(name) {
		var prefix = 'data-editor-';
		if (name.substring(0, prefix.length) === prefix) {
			var key = name.substring(prefix.length);
			key = key.replace(/-([a-z])/ig, function(all, character) {
				return character.toUpperCase();
			});
			return key;
		}
		return undefined;
	}
	
	/**
	 * Copy all default options into the given set of additional options.
	 */
	ServiceBuilder.mergeOptions = function(options, defaultOptions) {
		if (options) {
			for (var p in defaultOptions) {
				if (defaultOptions.hasOwnProperty(p))
					options[p] = defaultOptions[p];
			}
			return options;
		} else {
			return ServiceBuilder.copy(defaultOptions);
		}
	}
	
	/**
	 * Merge all properties of the given parent element with the given default options.
	 */
	ServiceBuilder.mergeParentOptions = function(parent, defaultOptions) {
		var options = ServiceBuilder.copy(defaultOptions);
		for (var attr, j = 0, attrs = parent.attributes, l = attrs.length; j < l; j++) {
			attr = attrs.item(j);
			var key = ServiceBuilder.optionName(attr.nodeName);
			if (key) {
				var value = attr.nodeValue;
				if (value === 'true' || value === 'false')
					value = value === 'true';
				options[key] = value;
			}
		}
		return options;
	}
	
	return ServiceBuilder;
}).apply(__WEBPACK_LOCAL_MODULE_11__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_11__ === undefined && (__WEBPACK_LOCAL_MODULE_11__ = __WEBPACK_LOCAL_MODULE_11__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_LOCAL_MODULE_12__ = (function() {
	
	/**
	 * An editor context mediates between the Xtext services and the Ace editor framework.
	 */
	function AceEditorContext(editor) {
		this._editor = editor;
		this._serverState = {};
		this._serverStateListeners = [];
		this._dirty = false;
		this._dirtyStateListeners = [];
	};

	AceEditorContext.prototype = {
		
		getServerState: function() {
			return this._serverState;
		},
		
		updateServerState: function(currentText, currentStateId) {
			this._serverState.text = currentText;
			this._serverState.stateId = currentStateId;
			return this._serverStateListeners;
		},
		
		addServerStateListener: function(listener) {
			this._serverStateListeners.push(listener);
		},
		
		getCaretOffset: function() {
			var pos = this._editor.getCursorPosition();
			return this._editor.getSession().getDocument().positionToIndex(pos);
		},
		
		getLineStart: function(lineNumber) {
			var pos = this._editor.getCursorPosition();
			return pos.row;
		},
		
		getSelection: function() {
			var range = this._editor.getSelectionRange();
			var document = this._editor.getSession().getDocument();
        	return {
        		start: document.positionToIndex(range.start),
        		end: document.positionToIndex(range.end)
        	};
		},
		
		getText: function(start, end) {
			var session = this._editor.getSession();
			if (start && end) {
				var document = session.getDocument();
				var startPos = document.indexToPosition(start);
				var endPos = document.indexToPosition(end);
				var mRange = __webpack_require__(/*! ace/range */ "../node_modules/ace-builds/src-noconflict/ace.js");
				//var mRange = require('ace-builds/src-noconflict/ace');
				return session.getTextRange(new mRange.Range(startPos.row, startPos.column, endPos.row, endPos.column));
			} else {
				return session.getValue();
			}
		},
		
		isDirty: function() {
			return this._dirty;
		},
		
		setDirty: function(dirty) {
			if (dirty != this._dirty) {
				for (var i = 0; i < this._dirtyStateListeners.length; i++) {
					this._dirtyStateListeners[i](dirty);
				}
			}
			this._dirty = dirty;
		},
		
		addDirtyStateListener: function(listener) {
			this._dirtyStateListeners.push(listener);
		},
		
		clearUndoStack: function() {
			this._editor.getSession().getUndoManager().reset();
		},
		
		setCaretOffset: function(offset) {
			var pos = this._editor.getSession().getDocument().indexToPosition(offset);
			this._editor.moveCursorTo(pos.row, pos.column);
		},
		
		setSelection: function(selection) {
			if (this._editor.selection) {
				var document = this._editor.getSession().getDocument();
				var startPos = document.indexToPosition(selection.start);
				var endPos = document.indexToPosition(selection.end);
				this._editor.selection.setSelectionRange(new mRange.Range(startPos.row, startPos.column, endPos.row, endPos.column));
			}
		},
		
		setText: function(text, start, end) {
			var session = this._editor.getSession();
			var document = session.getDocument();
			if (!start)
				start = 0;
			if (!end)
				end = document.getValue().length;
			var startPos = document.indexToPosition(start);
			var endPos = document.indexToPosition(end);
			var cursorPos = this._editor.getCursorPosition();
			var mRange = __webpack_require__(/*! ace/range */ "../node_modules/ace-builds/src-noconflict/ace.js");
			//var mRange = require('ace-builds/src-noconflict/ace');
			session.replace(new mRange.Range(startPos.row, startPos.column, endPos.row, endPos.column), text);
			this._editor.moveCursorToPosition(cursorPos);
			this._editor.clearSelection();
		}
		
	};
	
	return AceEditorContext;
}).apply(__WEBPACK_LOCAL_MODULE_12__exports = {}, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_LOCAL_MODULE_12__ === undefined && (__WEBPACK_LOCAL_MODULE_12__ = __WEBPACK_LOCAL_MODULE_12__exports));
/*******************************************************************************
 * Copyright (c) 2015 itemis AG (http://www.itemis.eu) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

/*
 * Use `createEditor(options)` to create an Xtext editor. You can specify options either
 * through the function parameter or through `data-editor-x` attributes, where x is an
 * option name with camelCase converted to hyphen-separated.
 * The following options are available:
 *
 * baseUrl = "/" {String}
 *     The path segment where the Xtext service is found; see serviceUrl option.
 * contentType {String}
 *     The content type included in requests to the Xtext server.
 * dirtyElement {String | DOMElement}
 *     An element into which the dirty status class is written when the editor is marked dirty;
 *     it can be either a DOM element or an ID for a DOM element.
 * dirtyStatusClass = 'dirty' {String}
 *     A CSS class name written into the dirtyElement when the editor is marked dirty.
 * document {Document}
 *     The document; if not specified, the global document is used.
 * enableContentAssistService = true {Boolean}
 *     Whether content assist should be enabled.
 * enableFormattingAction = false {Boolean}
 *     Whether the formatting action should be bound to the standard keystroke ctrl+shift+f / cmd+shift+f.
 * enableFormattingService = true {Boolean}
 *     Whether text formatting should be enabled.
 * enableGeneratorService = true {Boolean}
 *     Whether code generation should be enabled (must be triggered through JavaScript code).
 * enableOccurrencesService = true {Boolean}
 *     Whether marking occurrences should be enabled.
 * enableSaveAction = false {Boolean}
 *     Whether the save action should be bound to the standard keystroke ctrl+s / cmd+s.
 * enableValidationService = true {Boolean}
 *     Whether validation should be enabled.
 * loadFromServer = true {Boolean}
 *     Whether to load the editor content from the server.
 * parent = 'xtext-editor' {String | DOMElement}
 *     The parent element for the view; it can be either a DOM element or an ID for a DOM element.
 * parentClass = 'xtext-editor' {String}
 *     If the 'parent' option is not given, this option is used to find elements that match the given class name.
 * position {String}
 *     If this option is set, the 'position' CSS attribute of the created editor is set accordingly.
 * resourceId {String}
 *     The identifier of the resource displayed in the text editor; this option is sent to the server to
 *     communicate required information on the respective resource.
 * selectionUpdateDelay = 550 {Number}
 *     The number of milliseconds to wait after a selection change before Xtext services are invoked.
 * sendFullText = false {Boolean}
 *     Whether the full text shall be sent to the server with each request; use this if you want
 *     the server to run in stateless mode. If the option is inactive, the server state is updated regularly.
 * serviceUrl {String}
 *     The URL of the Xtext servlet; if no value is given, it is constructed using the baseUrl option in the form
 *     {location.protocol}//{location.host}{baseUrl}xtext-service
 * showErrorDialogs = false {Boolean}
 *     Whether errors should be displayed in popup dialogs.
 * syntaxDefinition {String}
 *     A path to a JS file defining an Ace syntax definition; if no path is given, it is built from
 *     the 'xtextLang' option in the form 'xtext-resources/mode-{xtextLang}'. Set this option to 'none' to
 *     disable syntax highlighting.
 * textUpdateDelay = 500 {Number}
 *     The number of milliseconds to wait after a text change before Xtext services are invoked.
 * theme {String}
 *     The path name of the Ace theme for the editor.
 * xtextLang {String}
 *     The language name (usually the file extension configured for the language).
 */
//'ace/ace', ace
//'ace/ext/language_tools',
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
    __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js"),
    __webpack_require__(/*! ace-builds/src-noconflict/ace */ "../node_modules/ace-builds/src-noconflict/ace.js"),
    __webpack_require__(/*! ace-builds/src-noconflict/ace */ "../node_modules/ace-builds/src-noconflict/ace.js"),
    __WEBPACK_LOCAL_MODULE_0__,
    __WEBPACK_LOCAL_MODULE_11__,
	__WEBPACK_LOCAL_MODULE_12__
], __WEBPACK_AMD_DEFINE_RESULT__ = (function(jQuery, ace, languageTools, compatibility, ServiceBuilder, EditorContext) {
	
	var exports = {};
	
	/**
	 * Create one or more Xtext editor instances configured with the given options.
	 * The return value is either an Ace editor or an array of Ace editors, which can
	 * be further configured using the Ace API.
	 */
	exports.createEditor = function(options) {
		if (!options)
			options = {};
		
		var query;
		if (jQuery.type(options.parent) === 'string') {
			query = jQuery('#' + options.parent, options.document);
		} else if (options.parent) {
			query = jQuery(options.parent);
		} else if (jQuery.type(options.parentClass) === 'string') {
			query = jQuery('.' + options.parentClass, options.document);
		} else {
			query = jQuery('#xtext-editor', options.document);
			if (query.length == 0)
				query = jQuery('.xtext-editor', options.document);
		}
		
		var editors = [];
		query.each(function(index, parent) {
			var editor = ace.edit(parent);
			editor.$blockScrolling = Infinity;
			if (options.position)
				jQuery(parent).css('position', options.position);
			
			var editorOptions = ServiceBuilder.mergeParentOptions(parent, options);
			exports.createServices(editor, editorOptions);
			if (editorOptions.theme)
				editor.setTheme(editorOptions.theme);
			else
				editor.setTheme('ace/theme/eclipse');
			editors[index] = editor;
		});
		
		if (editors.length == 1)
			return editors[0];
		else
			return editors;
	}
	
	function AceServiceBuilder(editor, xtextServices) {
		this.editor = editor;
		xtextServices.editorContext._annotations = [];
		xtextServices.editorContext._occurrenceMarkers = [];
		ServiceBuilder.call(this, xtextServices);
	}
	AceServiceBuilder.prototype = new ServiceBuilder();
		
	/**
	 * Configure Xtext services for the given editor. The editor does not have to be created
	 * with createEditor(options).
	 */
	exports.createServices = function(editor, options) {
		var xtextServices = {
			options: options,
			editorContext: new EditorContext(editor)
		};
		var serviceBuilder = new AceServiceBuilder(editor, xtextServices);
		serviceBuilder.createServices();
		xtextServices.serviceBuilder = serviceBuilder;
		editor.xtextServices = xtextServices;
		return xtextServices;
	}
	
	/**
	 * Remove all services and listeners that have been previously created with createServices(editor, options).
	 */
	exports.removeServices = function(editor) {
		if (!editor.xtextServices)
			return;
		var services = editor.xtextServices;
		var session = editor.getSession();
		if (services.modelChangeListener)
			editor.off('change', services.modelChangeListener);
		if (services.changeCursorListener)
			editor.getSelection().off('changeCursor', services.changeCursorListener);
		if (editor.commands) {
			if (services.options.enableSaveAction)
				editor.commands.removeCommand('xtext-save');
			if (services.options.enableFormattingAction)
				editor.commands.removeCommand('xtext-format');
		}
		if (services.contentAssistService)
			editor.setOptions({ enableBasicAutocompletion: false });
		var editorContext = services.editorContext;
		var annotations = editorContext._annotations;
		if (annotations) {
			for (var i = 0; i < annotations.length; i++) {
				session.removeMarker(annotations[i].markerId);
			}
			session.setAnnotations([]);
		}
		var occurrenceMarkers = editorContext._occurrenceMarkers;
		if (occurrenceMarkers) {
			for (var i = 0; i < occurrenceMarkers.length; i++) {
				session.removeMarker(occurrenceMarkers[i]);
			}
		}
		delete editor.xtextServices;
	}
	
	/**
	 * Syntax highlighting (without semantic highlighting).
	 */
	AceServiceBuilder.prototype.setupSyntaxHighlighting = function() {
		var options = this.services.options;
		var session = this.editor.getSession();
		if (options.syntaxDefinition != 'none' && (options.syntaxDefinition || options.xtextLang)) {
			var syntaxDefinition = options.syntaxDefinition;
			if (!syntaxDefinition)
				syntaxDefinition = 'xtext-resources/mode-' + options.xtextLang;
			if (typeof(syntaxDefinition) === 'string') {
					// Set ace mode that has been loaded by the platform
					session.setMode(syntaxDefinition);
			} else if (syntaxDefinition.Mode) {
				session.setMode(new syntaxDefinition.Mode);
			}
		}
	}
		
	/**
	 * Document update service.
	 */
	AceServiceBuilder.prototype.setupUpdateService = function(refreshDocument) {
		var services = this.services;
		var editorContext = services.editorContext;
		var textUpdateDelay = services.options.textUpdateDelay;
		if (!textUpdateDelay)
			textUpdateDelay = 500;
		services.modelChangeListener = function(event) {
			if (!event._xtext_init)
				editorContext.setDirty(true);
			if (editorContext._modelChangeTimeout)
				clearTimeout(editorContext._modelChangeTimeout);
			editorContext._modelChangeTimeout = setTimeout(function() {
				if (services.options.sendFullText)
					refreshDocument();
				else
					services.update();
			}, textUpdateDelay);
		}
		if (!services.options.resourceId || !services.options.loadFromServer)
			services.modelChangeListener({_xtext_init: true});
		this.editor.on('change', services.modelChangeListener);
	}
	
	/**
	 * Persistence services: load, save, and revert.
	 */
	AceServiceBuilder.prototype.setupPersistenceServices = function() {
		var services = this.services;
		if (services.options.enableSaveAction && this.editor.commands) {
			this.editor.commands.addCommand({
				name: 'xtext-save',
				bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
				exec: function(editor) {
					services.saveResource();
				}
			});
		}
	}
		
	/**
	 * Content assist service.
	 */
	AceServiceBuilder.prototype.setupContentAssistService = function() {
		var completer = {
			getCompletions: function(editor, session, pos, prefix, callback) {
				// See https://bugs.eclipse.org/bugs/show_bug.cgi?id=486615
				var services = editor.xtextServices;
				var params = ServiceBuilder.copy(services.options);
				var document = session.getDocument();
				params.offset = document.positionToIndex(pos);
				var range = editor.getSelectionRange();
				params.selection = {
					start: document.positionToIndex(range.start),
					end: document.positionToIndex(range.end)
				};
				services.contentAssistService.invoke(services.editorContext, params).done(function(entries) {
					callback(null, entries.map(function(entry, index, a) {
						return {
							value: entry.proposal,
							caption: (entry.label ? entry.label : entry.proposal),
							meta: entry.description,
							score: a.length - index
						};
					}));
				});
			}
		}
		this.editor.setOptions({ enableBasicAutocompletion: [completer] });
	}
	
	/**
	 * Add a problem marker to an editor session.
	 */
	AceServiceBuilder.prototype._addMarker = function(session, startOffset, endOffset, clazz, type) {
		var document = session.getDocument();
		var start = document.indexToPosition(startOffset);
		var end = document.indexToPosition(endOffset);
		var mRange = __webpack_require__(/*! ace/range */ "../node_modules/ace-builds/src-noconflict/ace.js");
		//var mRange = require('ace-builds/src-noconflict/ace');
		var range = new mRange.Range(start.row, start.column, end.row, end.column);
		return session.addMarker(range, 'xtext-marker_' + clazz, 'text');
	}
	
	/**
	 * Validation service.
	 */
	AceServiceBuilder.prototype.doValidation = function() {
		var services = this.services;
		var editorContext = services.editorContext;
		var session = this.editor.getSession();
		var self = this;
		services.validate().always(function() {
			var annotations = editorContext._annotations;
			if (annotations) {
				for (var i = 0; i < annotations.length; i++) {
					var annotation = annotations[i];
					session.removeMarker(annotation.markerId);
				}
			}
			editorContext._annotations = [];
		}).done(function(result) {
			for (var i = 0; i < result.issues.length; i++) {
				var entry = result.issues[i];
				var marker = self._addMarker(session, entry.offset, entry.offset + entry.length, entry.severity);
				var start = session.getDocument().indexToPosition(entry.offset);
				editorContext._annotations.push({
					row: start.row,
					column: start.column,
					text: entry.description,
					type: entry.severity,
					markerId: marker
				});
			}
			session.setAnnotations(editorContext._annotations);
		});
	}
		
	/**
	 * Occurrences service.
	 */
	AceServiceBuilder.prototype.setupOccurrencesService = function() {
		var services = this.services;
		var editorContext = services.editorContext;
		var selectionUpdateDelay = services.options.selectionUpdateDelay;
		if (!selectionUpdateDelay)
			selectionUpdateDelay = 550;
		var editor = this.editor;
		var session = editor.getSession();
		var self = this;
		services.changeCursorListener = function() {
			if (editorContext._selectionChangeTimeout) {
				clearTimeout(editorContext._selectionChangeTimeout);
			}
			editorContext._selectionChangeTimeout = setTimeout(function() {
				var params = ServiceBuilder.copy(services.options);
				params.offset = session.getDocument().positionToIndex(editor.getSelection().getCursor());
				services.occurrencesService.invoke(editorContext, params).always(function() {
					var occurrenceMarkers = editorContext._occurrenceMarkers;
					if (occurrenceMarkers) {
						for (var i = 0; i < occurrenceMarkers.length; i++) {
							var marker = occurrenceMarkers[i];
							session.removeMarker(marker);
						}
					}
					editorContext._occurrenceMarkers = [];
				}).done(function(occurrencesResult) {
					for (var i = 0; i < occurrencesResult.readRegions.length; i++) {
						var region = occurrencesResult.readRegions[i];
						var marker = self._addMarker(session, region.offset, region.offset + region.length, 'read');
						editorContext._occurrenceMarkers.push(marker);
					}
					for (var i = 0; i < occurrencesResult.writeRegions.length; i++) {
						var region = occurrencesResult.writeRegions[i];
						var marker = self._addMarker(session, region.offset, region.offset + region.length, 'write');
						editorContext._occurrenceMarkers.push(marker);
					}
				});
			}, selectionUpdateDelay);
		};
		editor.getSelection().on('changeCursor', services.changeCursorListener);
	}
		
	/**
	 * Formatting service.
	 */
	AceServiceBuilder.prototype.setupFormattingService = function() {
		var services = this.services;
		if (services.options.enableFormattingAction && this.editor.commands) {
			this.editor.commands.addCommand({
				name: 'xtext-format',
				bindKey: {win: 'Ctrl-Shift-F', mac: 'Command-Shift-F'},
				exec: function(editor) {
					services.format();
				}
			});
		}
	}
	
	return exports;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3h0ZXh0XzJfMzFfMF94dGV4dC1hY2VfanMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQ0FBNkIsRUFBRSxnQ0FBRTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0TEFBQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFxQyxDQUFDLDBFQUFRLENBQUMsZ0NBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxPQUFPO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnTUFBQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWdDLEVBQUUsaUNBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsOEJBQThCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wscUJBQXFCLDBDQUEwQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQ0FBMkM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNENBQTRDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQSxrR0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21kZW5ldC1lZHVjYXRpb25wbGF0Zm9ybS8uL3NyYy94dGV4dC8yLjMxLjAveHRleHQtYWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyogTURFTmV0IC0gbW9kaWZpZWQgdG8gc3VwcG9ydCBYdGV4dCBpbmNsdXNpb24gaW4gRWR1Y2F0aW9uIFBsYXRmb3JtICAqL1xuXG5kZWZpbmUoJ3h0ZXh0L2NvbXBhdGliaWxpdHknLFtdLCBmdW5jdGlvbigpIHtcblx0XG5cdGlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcblx0XHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdFx0aWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdiaW5kIHRhcmdldCBpcyBub3QgY2FsbGFibGUnKTtcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblx0XHRcdHZhciB1bmJvdW5kRnVuYyA9IHRoaXM7XG5cdFx0XHR2YXIgbm9wRnVuYyA9IGZ1bmN0aW9uKCkge307XG5cdFx0XHRib3VuZEZ1bmMgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGxvY2FsQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHRcdHJldHVybiB1bmJvdW5kRnVuYy5hcHBseSh0aGlzIGluc3RhbmNlb2Ygbm9wRnVuYyA/IHRoaXMgOiB0YXJnZXQsXG5cdFx0XHRcdFx0XHRhcmdzLmNvbmNhdChsb2NhbEFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRub3BGdW5jLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXHRcdFx0Ym91bmRGdW5jLnByb3RvdHlwZSA9IG5ldyBub3BGdW5jKCk7XG5cdFx0XHRyZXR1cm4gYm91bmRGdW5jO1xuXHRcdH1cblx0fVxuXHRcblx0aWYgKCFBcnJheS5wcm90b3R5cGUubWFwKSB7XG5cdFx0QXJyYXkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cdFx0XHRpZiAodGhpcyA9PSBudWxsKVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwnKTtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIGlzIG5vdCBjYWxsYWJsZScpO1xuXHRcdFx0dmFyIHNyY0FycmF5ID0gT2JqZWN0KHRoaXMpO1xuXHRcdFx0dmFyIGxlbiA9IHNyY0FycmF5Lmxlbmd0aCA+Pj4gMDtcblx0XHRcdHZhciB0Z3RBcnJheSA9IG5ldyBBcnJheShsZW4pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRpZiAoaSBpbiBzcmNBcnJheSlcblx0XHRcdFx0XHR0Z3RBcnJheVtpXSA9IGNhbGxiYWNrLmNhbGwodGhpc0FyZywgc3JjQXJyYXlbaV0sIGksIHNyY0FycmF5KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0Z3RBcnJheTtcblx0XHR9XG5cdH1cblx0XG5cdGlmICghQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG5cdFx0XHRpZiAodGhpcyA9PSBudWxsKVxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwnKTtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIGlzIG5vdCBjYWxsYWJsZScpO1xuXHRcdFx0dmFyIHNyY0FycmF5ID0gT2JqZWN0KHRoaXMpO1xuXHRcdFx0dmFyIGxlbiA9IHNyY0FycmF5Lmxlbmd0aCA+Pj4gMDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgaW4gc3JjQXJyYXkpXG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCBzcmNBcnJheVtpXSwgaSwgc3JjQXJyYXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIHt9O1xufSk7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIDIwMTcgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZGVmaW5lKCd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLFsnanF1ZXJ5J10sIGZ1bmN0aW9uKGpRdWVyeSkge1xuXHRcblx0dmFyIGdsb2JhbFN0YXRlID0ge307XG5cdFxuXHQvKipcblx0ICogR2VuZXJpYyBzZXJ2aWNlIGltcGxlbWVudGF0aW9uIHRoYXQgY2FuIHNlcnZlIGFzIHN1cGVyY2xhc3MgZm9yIHNwZWNpYWxpemVkIHNlcnZpY2VzLlxuXHQgKi9cblx0ZnVuY3Rpb24gWHRleHRTZXJ2aWNlKCkge307XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIHJlcXVlc3QgbWV0YWRhdGEgZm9yIHRoaXMgc2VydmljZSBjbGFzcy4gVHdvIHZhcmlhbnRzOlxuXHQgKiAgLSBpbml0aWFsaXplKHNlcnZpY2VVcmwsIHNlcnZpY2VUeXBlLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKVxuXHQgKiAgLSBpbml0aWFsaXplKHh0ZXh0U2VydmljZXMsIHNlcnZpY2VUeXBlKVxuXHQgKi9cblx0WHRleHRTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fc2VydmljZVR5cGUgPSBhcmd1bWVudHNbMV07XG5cdFx0aWYgKHR5cGVvZihhcmd1bWVudHNbMF0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5fcmVxdWVzdFVybCA9IGFyZ3VtZW50c1swXSArICcvJyArIHRoaXMuX3NlcnZpY2VUeXBlO1xuXHRcdFx0dmFyIHJlc291cmNlSWQgPSBhcmd1bWVudHNbMl07XG5cdFx0XHRpZiAocmVzb3VyY2VJZClcblx0XHRcdFx0dGhpcy5fZW5jb2RlZFJlc291cmNlSWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVzb3VyY2VJZCk7XG5cdFx0XHR0aGlzLl91cGRhdGVTZXJ2aWNlID0gYXJndW1lbnRzWzNdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgeHRleHRTZXJ2aWNlcyA9IGFyZ3VtZW50c1swXTtcblx0XHRcdGlmICh4dGV4dFNlcnZpY2VzLm9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5fcmVxdWVzdFVybCA9IHh0ZXh0U2VydmljZXMub3B0aW9ucy5zZXJ2aWNlVXJsICsgJy8nICsgdGhpcy5fc2VydmljZVR5cGU7XG5cdFx0XHRcdHZhciByZXNvdXJjZUlkID0geHRleHRTZXJ2aWNlcy5vcHRpb25zLnJlc291cmNlSWQ7XG5cdFx0XHRcdGlmIChyZXNvdXJjZUlkKVxuXHRcdFx0XHRcdHRoaXMuX2VuY29kZWRSZXNvdXJjZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlc291cmNlSWQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fdXBkYXRlU2VydmljZSA9IHh0ZXh0U2VydmljZXMudXBkYXRlU2VydmljZTtcblx0XHR9XG5cdH1cblx0XG5cdFh0ZXh0U2VydmljZS5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdHRoaXMuX3N0YXRlID0gc3RhdGU7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBJbnZva2UgdGhlIHNlcnZpY2Ugd2l0aCBkZWZhdWx0IHNlcnZpY2UgYmVoYXZpb3IuXG5cdCAqL1xuXHRYdGV4dFNlcnZpY2UucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQsIGNhbGxiYWNrcykge1xuXHRcdGlmIChkZWZlcnJlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXHRcdH1cblx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24odGhpcy5fY2hlY2tQcmVjb25kaXRpb25zKSAmJiAhdGhpcy5fY2hlY2tQcmVjb25kaXRpb25zKGVkaXRvckNvbnRleHQsIHBhcmFtcykpIHtcblx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0XHR9XG5cdFx0dmFyIHNlcnZlckRhdGEgPSB7XG5cdFx0XHRjb250ZW50VHlwZTogcGFyYW1zLmNvbnRlbnRUeXBlXG5cdFx0fTtcblx0XHR2YXIgaW5pdFJlc3VsdDtcblx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24odGhpcy5faW5pdFNlcnZlckRhdGEpKVxuXHRcdFx0aW5pdFJlc3VsdCA9IHRoaXMuX2luaXRTZXJ2ZXJEYXRhKHNlcnZlckRhdGEsIGVkaXRvckNvbnRleHQsIHBhcmFtcyk7XG5cdFx0dmFyIGh0dHBNZXRob2QgPSAnR0VUJztcblx0XHRpZiAoaW5pdFJlc3VsdCAmJiBpbml0UmVzdWx0Lmh0dHBNZXRob2QpXG5cdFx0XHRodHRwTWV0aG9kID0gaW5pdFJlc3VsdC5odHRwTWV0aG9kO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRpZiAoIShpbml0UmVzdWx0ICYmIGluaXRSZXN1bHQuc3VwcHJlc3NDb250ZW50KSkge1xuXHRcdFx0aWYgKHBhcmFtcy5zZW5kRnVsbFRleHQpIHtcblx0XHRcdFx0c2VydmVyRGF0YS5mdWxsVGV4dCA9IGVkaXRvckNvbnRleHQuZ2V0VGV4dCgpO1xuXHRcdFx0XHRodHRwTWV0aG9kID0gJ1BPU1QnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIGtub3duU2VydmVyU3RhdGUgPSBlZGl0b3JDb250ZXh0LmdldFNlcnZlclN0YXRlKCk7XG5cdFx0XHRcdGlmIChrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRpZiAoc2VsZi5fdXBkYXRlU2VydmljZSkge1xuXHRcdFx0XHRcdFx0c2VsZi5fdXBkYXRlU2VydmljZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChrbm93blNlcnZlclN0YXRlLnN0YXRlSWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHNlcnZlckRhdGEucmVxdWlyZWRTdGF0ZUlkID0ga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBvblN1Y2Nlc3M7XG5cdFx0aWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHRoaXMuX2dldFN1Y2Nlc3NDYWxsYmFjaykpIHtcblx0XHRcdG9uU3VjY2VzcyA9IHRoaXMuX2dldFN1Y2Nlc3NDYWxsYmFjayhlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b25TdWNjZXNzID0gZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGlmIChyZXN1bHQuY29uZmxpY3QpIHtcblx0XHRcdFx0XHRpZiAoc2VsZi5faW5jcmVhc2VSZWN1cnNpb25Db3VudChlZGl0b3JDb250ZXh0KSkge1xuXHRcdFx0XHRcdFx0dmFyIG9uQ29uZmxpY3RSZXN1bHQ7XG5cdFx0XHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24oc2VsZi5fb25Db25mbGljdCkpIHtcblx0XHRcdFx0XHRcdFx0b25Db25mbGljdFJlc3VsdCA9IHNlbGYuX29uQ29uZmxpY3QoZWRpdG9yQ29udGV4dCwgcmVzdWx0LmNvbmZsaWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghKG9uQ29uZmxpY3RSZXN1bHQgJiYgb25Db25mbGljdFJlc3VsdC5zdXBwcmVzc0ZvcmNlZFVwZGF0ZSkgJiYgIXBhcmFtcy5zZW5kRnVsbFRleHRcblx0XHRcdFx0XHRcdFx0XHQmJiByZXN1bHQuY29uZmxpY3QgPT0gJ2ludmFsaWRTdGF0ZUlkJyAmJiBzZWxmLl91cGRhdGVTZXJ2aWNlKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0dmFyIGtub3duU2VydmVyU3RhdGUgPSBlZGl0b3JDb250ZXh0LmdldFNlcnZlclN0YXRlKCk7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnRleHQ7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxmLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24oc2VsZi5fcHJvY2Vzc1Jlc3VsdCkpIHtcblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2VkUmVzdWx0ID0gc2VsZi5fcHJvY2Vzc1Jlc3VsdChyZXN1bHQsIGVkaXRvckNvbnRleHQpO1xuXHRcdFx0XHRcdGlmIChwcm9jZXNzZWRSZXN1bHQpIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocHJvY2Vzc2VkUmVzdWx0KTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRcblx0XHR2YXIgb25FcnJvciA9IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblx0XHRcdGlmICh4aHIuc3RhdHVzID09IDQwNCAmJiAhcGFyYW1zLmxvYWRGcm9tU2VydmVyICYmIHNlbGYuX2luY3JlYXNlUmVjdXJzaW9uQ291bnQoZWRpdG9yQ29udGV4dCkpIHtcblx0XHRcdFx0dmFyIG9uQ29uZmxpY3RSZXN1bHQ7XG5cdFx0XHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbihzZWxmLl9vbkNvbmZsaWN0KSkge1xuXHRcdFx0XHRcdG9uQ29uZmxpY3RSZXN1bHQgPSBzZWxmLl9vbkNvbmZsaWN0KGVkaXRvckNvbnRleHQsIGVycm9yVGhyb3duKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIga25vd25TZXJ2ZXJTdGF0ZSA9IGVkaXRvckNvbnRleHQuZ2V0U2VydmVyU3RhdGUoKTtcblx0XHRcdFx0aWYgKCEob25Db25mbGljdFJlc3VsdCAmJiBvbkNvbmZsaWN0UmVzdWx0LnN1cHByZXNzRm9yY2VkVXBkYXRlKVxuXHRcdFx0XHRcdFx0JiYga25vd25TZXJ2ZXJTdGF0ZS50ZXh0ICE9PSB1bmRlZmluZWQgJiYgc2VsZi5fdXBkYXRlU2VydmljZSkge1xuXHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS50ZXh0O1xuXHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvclRocm93bik7XG5cdFx0fVxuXHRcdFxuXHRcdHNlbGYuc2VuZFJlcXVlc3QoZWRpdG9yQ29udGV4dCwge1xuXHRcdFx0dHlwZTogaHR0cE1ldGhvZCxcblx0XHRcdGRhdGE6IHNlcnZlckRhdGEsXG5cdFx0XHRzdWNjZXNzOiBvblN1Y2Nlc3MsXG5cdFx0XHRlcnJvcjogb25FcnJvclxuXHRcdH0sICFwYXJhbXMuc2VuZEZ1bGxUZXh0KTtcblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuX3JlY3Vyc2lvbkNvdW50ID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNlbmQgYW4gSFRUUCByZXF1ZXN0IHRvIGludm9rZSB0aGUgc2VydmljZS5cblx0ICovXG5cdFh0ZXh0U2VydmljZS5wcm90b3R5cGUuc2VuZFJlcXVlc3QgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBzZXR0aW5ncywgbmVlZHNTZXNzaW9uKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHNlbGYuc2V0U3RhdGUoJ3N0YXJ0ZWQnKTtcblx0XHR2YXIgY29yc0VuYWJsZWQgPSBlZGl0b3JDb250ZXh0Lnh0ZXh0U2VydmljZXMub3B0aW9uc1snZW5hYmxlQ29ycyddO1xuXHRcdGlmKGNvcnNFbmFibGVkKSB7XG5cdFx0XHRzZXR0aW5ncy5jcm9zc0RvbWFpbiA9IHRydWU7XG5cdFx0XHRzZXR0aW5ncy54aHJGaWVsZHMgPSB7d2l0aENyZWRlbnRpYWxzOiB0cnVlfTtcblx0XHR9IFxuXHRcdHZhciBvblN1Y2Nlc3MgPSBzZXR0aW5ncy5zdWNjZXNzO1xuXHRcdHNldHRpbmdzLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdHZhciBhY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24ob25TdWNjZXNzKSkge1xuXHRcdFx0XHRhY2NlcHRlZCA9IG9uU3VjY2VzcyhyZXN1bHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFjY2VwdGVkIHx8IGFjY2VwdGVkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0c2VsZi5zZXRTdGF0ZSgnZmluaXNoZWQnKTtcblx0XHRcdFx0aWYgKGVkaXRvckNvbnRleHQueHRleHRTZXJ2aWNlcykge1xuXHRcdFx0XHRcdHZhciBzdWNjZXNzTGlzdGVuZXJzID0gZWRpdG9yQ29udGV4dC54dGV4dFNlcnZpY2VzLnN1Y2Nlc3NMaXN0ZW5lcnM7XG5cdFx0XHRcdFx0aWYgKHN1Y2Nlc3NMaXN0ZW5lcnMpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3VjY2Vzc0xpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBzdWNjZXNzTGlzdGVuZXJzW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24obGlzdGVuZXIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0bGlzdGVuZXIoc2VsZi5fc2VydmljZVR5cGUsIHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdFxuXHRcdHZhciBvbkVycm9yID0gc2V0dGluZ3MuZXJyb3I7XG5cdFx0c2V0dGluZ3MuZXJyb3IgPSBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cdFx0XHR2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcblx0XHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbihvbkVycm9yKSkge1xuXHRcdFx0XHRyZXNvbHZlZCA9IG9uRXJyb3IoeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXJlc29sdmVkKSB7XG5cdFx0XHRcdHNlbGYuc2V0U3RhdGUodW5kZWZpbmVkKTtcblx0XHRcdFx0c2VsZi5fcmVwb3J0RXJyb3IoZWRpdG9yQ29udGV4dCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24sIHhocik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRcblx0XHRzZXR0aW5ncy5hc3luYyA9IHRydWU7XG5cdFx0dmFyIHJlcXVlc3RVcmwgPSBzZWxmLl9yZXF1ZXN0VXJsO1xuXHRcdGlmICghc2V0dGluZ3MuZGF0YS5yZXNvdXJjZSAmJiBzZWxmLl9lbmNvZGVkUmVzb3VyY2VJZCkge1xuXHRcdFx0aWYgKHJlcXVlc3RVcmwuaW5kZXhPZignPycpID49IDApXG5cdFx0XHRcdHJlcXVlc3RVcmwgKz0gJyZyZXNvdXJjZT0nICsgc2VsZi5fZW5jb2RlZFJlc291cmNlSWQ7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJlcXVlc3RVcmwgKz0gJz9yZXNvdXJjZT0nICsgc2VsZi5fZW5jb2RlZFJlc291cmNlSWQ7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChuZWVkc1Nlc3Npb24gJiYgZ2xvYmFsU3RhdGUuX2luaXRQZW5kaW5nKSB7XG5cdFx0XHQvLyBXZSBoYXZlIHRvIHdhaXQgdW50aWwgdGhlIGluaXRpYWwgcmVxdWVzdCBoYXMgZmluaXNoZWQgdG8gbWFrZSBzdXJlIHRoZSBjbGllbnQgaGFzXG5cdFx0XHQvLyByZWNlaXZlZCBhIHZhbGlkIHNlc3Npb24gaWRcblx0XHRcdGlmICghZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cylcblx0XHRcdFx0Z2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cyA9IFtdO1xuXHRcdFx0Z2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cy5wdXNoKHtyZXF1ZXN0VXJsOiByZXF1ZXN0VXJsLCBzZXR0aW5nczogc2V0dGluZ3N9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKG5lZWRzU2Vzc2lvbiAmJiAhZ2xvYmFsU3RhdGUuX2luaXREb25lKSB7XG5cdFx0XHRcdGdsb2JhbFN0YXRlLl9pbml0UGVuZGluZyA9IHRydWU7XG5cdFx0XHRcdHZhciBvbkNvbXBsZXRlID0gc2V0dGluZ3MuY29tcGxldGU7XG5cdFx0XHRcdHNldHRpbmdzLmNvbXBsZXRlID0gZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG5cdFx0XHRcdFx0aWYgKGpRdWVyeS5pc0Z1bmN0aW9uKG9uQ29tcGxldGUpKSB7XG5cdFx0XHRcdFx0XHRvbkNvbXBsZXRlKHhociwgdGV4dFN0YXR1cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlbGV0ZSBnbG9iYWxTdGF0ZS5faW5pdFBlbmRpbmc7XG5cdFx0XHRcdFx0Z2xvYmFsU3RhdGUuX2luaXREb25lID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAoZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cykge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxTdGF0ZS5fd2FpdGluZ1JlcXVlc3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0c1tpXTtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmFqYXgocmVxdWVzdC5yZXF1ZXN0VXJsLCByZXF1ZXN0LnNldHRpbmdzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGV0ZSBnbG9iYWxTdGF0ZS5fd2FpdGluZ1JlcXVlc3RzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0alF1ZXJ5LmFqYXgocmVxdWVzdFVybCwgc2V0dGluZ3MpO1xuXHRcdH1cblx0fVxuXHRcblx0LyoqXG5cdCAqIFVzZSB0aGlzIGluIGNhc2Ugb2YgYSBjb25mbGljdCBiZWZvcmUgcmV0cnlpbmcgdGhlIHNlcnZpY2UgaW52b2NhdGlvbi4gSWYgdGhlIG51bWJlclxuXHQgKiBvZiByZXRyaWVzIGV4Y2VlZHMgdGhlIGxpbWl0LCBhbiBlcnJvciBpcyByZXBvcnRlZCBhbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UuXG5cdCAqL1xuXHRYdGV4dFNlcnZpY2UucHJvdG90eXBlLl9pbmNyZWFzZVJlY3Vyc2lvbkNvdW50ID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCkge1xuXHRcdGlmICh0aGlzLl9yZWN1cnNpb25Db3VudCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhpcy5fcmVjdXJzaW9uQ291bnQgPSAxO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3JlY3Vyc2lvbkNvdW50Kys7XG5cblx0XHRpZiAodGhpcy5fcmVjdXJzaW9uQ291bnQgPj0gMTApIHtcblx0XHRcdHRoaXMuX3JlcG9ydEVycm9yKGVkaXRvckNvbnRleHQsICd3YXJuaW5nJywgJ1h0ZXh0IHNlcnZpY2UgcmVxdWVzdCBmYWlsZWQgYWZ0ZXIgMTAgYXR0ZW1wdHMuJywge30pO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0XG5cdC8qKlxuXHQgKiBSZXBvcnQgYW4gZXJyb3IgdG8gdGhlIGxpc3RlbmVycy5cblx0ICovXG5cdFh0ZXh0U2VydmljZS5wcm90b3R5cGUuX3JlcG9ydEVycm9yID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgc2V2ZXJpdHksIG1lc3NhZ2UsIHJlcXVlc3REYXRhKSB7XG5cdFx0aWYgKGVkaXRvckNvbnRleHQueHRleHRTZXJ2aWNlcykge1xuXHRcdFx0dmFyIGVycm9yTGlzdGVuZXJzID0gZWRpdG9yQ29udGV4dC54dGV4dFNlcnZpY2VzLmVycm9yTGlzdGVuZXJzO1xuXHRcdFx0aWYgKGVycm9yTGlzdGVuZXJzKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlcnJvckxpc3RlbmVyc1tpXTtcblx0XHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24obGlzdGVuZXIpKSB7XG5cdFx0XHRcdFx0XHRsaXN0ZW5lcih0aGlzLl9zZXJ2aWNlVHlwZSwgc2V2ZXJpdHksIG1lc3NhZ2UsIHJlcXVlc3REYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHJldHVybiBYdGV4dFNlcnZpY2U7XG59KTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0xvYWRSZXNvdXJjZVNlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xuXHRcblx0LyoqXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIGxvYWRpbmcgcmVzb3VyY2VzLiBUaGUgcmVzdWx0aW5nIHRleHQgaXMgcGFzc2VkIHRvIHRoZSBlZGl0b3IgY29udGV4dC5cblx0ICovXG5cdGZ1bmN0aW9uIExvYWRSZXNvdXJjZVNlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCwgcmV2ZXJ0KSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsIHJldmVydCA/ICdyZXZlcnQnIDogJ2xvYWQnLCByZXNvdXJjZUlkKTtcblx0fTtcblxuXHRMb2FkUmVzb3VyY2VTZXJ2aWNlLnByb3RvdHlwZSA9IG5ldyBYdGV4dFNlcnZpY2UoKTtcblx0XG5cdExvYWRSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlLl9pbml0U2VydmVyRGF0YSA9IGZ1bmN0aW9uKHNlcnZlckRhdGEsIGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdXBwcmVzc0NvbnRlbnQ6IHRydWUsXG5cdFx0XHRodHRwTWV0aG9kOiB0aGlzLl9zZXJ2aWNlVHlwZSA9PSAncmV2ZXJ0JyA/ICdQT1NUJyA6ICdHRVQnXG5cdFx0fTtcblx0fTtcblx0XG5cdExvYWRSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlLl9nZXRTdWNjZXNzQ2FsbGJhY2sgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0ZWRpdG9yQ29udGV4dC5zZXRUZXh0KHJlc3VsdC5mdWxsVGV4dCk7XG5cdFx0XHRlZGl0b3JDb250ZXh0LmNsZWFyVW5kb1N0YWNrKCk7XG5cdFx0XHRlZGl0b3JDb250ZXh0LnNldERpcnR5KHJlc3VsdC5kaXJ0eSk7XG5cdFx0XHR2YXIgbGlzdGVuZXJzID0gZWRpdG9yQ29udGV4dC51cGRhdGVTZXJ2ZXJTdGF0ZShyZXN1bHQuZnVsbFRleHQsIHJlc3VsdC5zdGF0ZUlkKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxpc3RlbmVyc1tpXShwYXJhbXMpO1xuXHRcdFx0fVxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBMb2FkUmVzb3VyY2VTZXJ2aWNlO1xufSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmRlZmluZSgneHRleHQvc2VydmljZXMvU2F2ZVJlc291cmNlU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XG5cdFxuXHQvKipcblx0ICogU2VydmljZSBjbGFzcyBmb3Igc2F2aW5nIHJlc291cmNlcy5cblx0ICovXG5cdGZ1bmN0aW9uIFNhdmVSZXNvdXJjZVNlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnc2F2ZScsIHJlc291cmNlSWQpO1xuXHR9O1xuXG5cdFNhdmVSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xuXG5cdFNhdmVSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlLl9pbml0U2VydmVyRGF0YSA9IGZ1bmN0aW9uKHNlcnZlckRhdGEsIGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRodHRwTWV0aG9kOiAnUE9TVCdcblx0XHR9O1xuXHR9O1xuXHRcblx0U2F2ZVJlc291cmNlU2VydmljZS5wcm90b3R5cGUuX3Byb2Nlc3NSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQsIGVkaXRvckNvbnRleHQpIHtcblx0XHRlZGl0b3JDb250ZXh0LnNldERpcnR5KGZhbHNlKTtcblx0fTtcblx0XG5cdHJldHVybiBTYXZlUmVzb3VyY2VTZXJ2aWNlO1xufSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmRlZmluZSgneHRleHQvc2VydmljZXMvSGlnaGxpZ2h0aW5nU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XG5cdFxuXHQvKipcblx0ICogU2VydmljZSBjbGFzcyBmb3Igc2VtYW50aWMgaGlnaGxpZ2h0aW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gSGlnaGxpZ2h0aW5nU2VydmljZShzZXJ2aWNlVXJsLCByZXNvdXJjZUlkKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsICdoaWdobGlnaHQnLCByZXNvdXJjZUlkKTtcblx0fTtcblxuXHRIaWdobGlnaHRpbmdTZXJ2aWNlLnByb3RvdHlwZSA9IG5ldyBYdGV4dFNlcnZpY2UoKTtcblx0XG5cdEhpZ2hsaWdodGluZ1NlcnZpY2UucHJvdG90eXBlLl9jaGVja1ByZWNvbmRpdGlvbnMgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUgPT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdEhpZ2hsaWdodGluZ1NlcnZpY2UucHJvdG90eXBlLl9vbkNvbmZsaWN0ID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgY2F1c2UpIHtcblx0XHR0aGlzLnNldFN0YXRlKHVuZGVmaW5lZCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1cHByZXNzRm9yY2VkVXBkYXRlOiB0cnVlXG5cdFx0fTtcblx0fTtcblx0XG5cdHJldHVybiBIaWdobGlnaHRpbmdTZXJ2aWNlO1xufSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmRlZmluZSgneHRleHQvc2VydmljZXMvVmFsaWRhdGlvblNlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xuXHRcblx0LyoqXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIHZhbGlkYXRpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBWYWxpZGF0aW9uU2VydmljZShzZXJ2aWNlVXJsLCByZXNvdXJjZUlkKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsICd2YWxpZGF0ZScsIHJlc291cmNlSWQpO1xuXHR9O1xuXHRcblx0VmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xuXHRcblx0VmFsaWRhdGlvblNlcnZpY2UucHJvdG90eXBlLl9jaGVja1ByZWNvbmRpdGlvbnMgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUgPT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5fb25Db25mbGljdCA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIGNhdXNlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh1bmRlZmluZWQpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdXBwcmVzc0ZvcmNlZFVwZGF0ZTogdHJ1ZVxuXHRcdH07XG5cdH07XG5cdFxuXHRyZXR1cm4gVmFsaWRhdGlvblNlcnZpY2U7XG59KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZGVmaW5lKCd4dGV4dC9zZXJ2aWNlcy9VcGRhdGVTZXJ2aWNlJyxbJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsICdqcXVlcnknXSwgZnVuY3Rpb24oWHRleHRTZXJ2aWNlLCBqUXVlcnkpIHtcblx0XG5cdC8qKlxuXHQgKiBTZXJ2aWNlIGNsYXNzIGZvciB1cGRhdGluZyB0aGUgc2VydmVyLXNpZGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cblx0ICogVGhpcyBzZXJ2aWNlIG9ubHkgbWFrZXMgc2Vuc2Ugd2l0aCBhIHN0YXRlZnVsIHNlcnZlciwgd2hlcmUgYW4gdXBkYXRlIHJlcXVlc3QgaXMgc2VudFxuXHQgKiBhZnRlciBlYWNoIG1vZGlmaWNhdGlvbi4gVGhpcyBjYW4gZ3JlYXRseSBpbXByb3ZlIHJlc3BvbnNlIHRpbWVzIGNvbXBhcmVkIHRvIHRoZVxuXHQgKiBzdGF0ZWxlc3MgYWx0ZXJuYXRpdmUsIHdoZXJlIHRoZSBmdWxsIHRleHQgY29udGVudCBpcyBzZW50IHdpdGggZWFjaCBzZXJ2aWNlIHJlcXVlc3QuXG5cdCAqL1xuXHRmdW5jdGlvbiBVcGRhdGVTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQpIHtcblx0XHR0aGlzLmluaXRpYWxpemUoc2VydmljZVVybCwgJ3VwZGF0ZScsIHJlc291cmNlSWQsIHRoaXMpO1xuXHRcdHRoaXMuX2NvbXBsZXRpb25DYWxsYmFja3MgPSBbXTtcblx0fTtcblx0XG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xuXG5cdC8qKlxuXHQgKiBDb21wdXRlIGEgZGVsdGEgYmV0d2VlbiB0d28gdmVyc2lvbnMgb2YgYSB0ZXh0LiBJZiBhIGRpZmZlcmVuY2UgaXMgZm91bmQsIHRoZSByZXN1bHRcblx0ICogY29udGFpbnMgdGhyZWUgcHJvcGVydGllczpcblx0ICogICBkZWx0YVRleHQgLSB0aGUgdGV4dCB0byBpbnNlcnQgaW50byBzMVxuXHQgKiAgIGRlbHRhT2Zmc2V0IC0gdGhlIHRleHQgaW5zZXJ0aW9uIG9mZnNldFxuXHQgKiAgIGRlbHRhUmVwbGFjZUxlbmd0aCAtIHRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IHNoYWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSBpbnNlcnRlZCB0ZXh0XG5cdCAqL1xuXHRVcGRhdGVTZXJ2aWNlLnByb3RvdHlwZS5jb21wdXRlRGVsdGEgPSBmdW5jdGlvbihzMSwgczIsIHJlc3VsdCkge1xuXHRcdHZhciBzdGFydCA9IDAsIHMxbGVuZ3RoID0gczEubGVuZ3RoLCBzMmxlbmd0aCA9IHMyLmxlbmd0aDtcblx0XHR3aGlsZSAoc3RhcnQgPCBzMWxlbmd0aCAmJiBzdGFydCA8IHMybGVuZ3RoICYmIHMxLmNoYXJDb2RlQXQoc3RhcnQpID09PSBzMi5jaGFyQ29kZUF0KHN0YXJ0KSkge1xuXHRcdFx0c3RhcnQrKztcblx0XHR9XG5cdFx0aWYgKHN0YXJ0ID09PSBzMWxlbmd0aCAmJiBzdGFydCA9PT0gczJsZW5ndGgpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cmVzdWx0LmRlbHRhT2Zmc2V0ID0gc3RhcnQ7XG5cdFx0aWYgKHN0YXJ0ID09PSBzMWxlbmd0aCkge1xuXHRcdFx0cmVzdWx0LmRlbHRhVGV4dCA9IHMyLnN1YnN0cmluZyhzdGFydCwgczJsZW5ndGgpO1xuXHRcdFx0cmVzdWx0LmRlbHRhUmVwbGFjZUxlbmd0aCA9IDA7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIGlmIChzdGFydCA9PT0gczJsZW5ndGgpIHtcblx0XHRcdHJlc3VsdC5kZWx0YVRleHQgPSAnJztcblx0XHRcdHJlc3VsdC5kZWx0YVJlcGxhY2VMZW5ndGggPSBzMWxlbmd0aCAtIHN0YXJ0O1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgZW5kMSA9IHMxbGVuZ3RoIC0gMSwgZW5kMiA9IHMybGVuZ3RoIC0gMTtcblx0XHR3aGlsZSAoZW5kMSA+PSBzdGFydCAmJiBlbmQyID49IHN0YXJ0ICYmIHMxLmNoYXJDb2RlQXQoZW5kMSkgPT09IHMyLmNoYXJDb2RlQXQoZW5kMikpIHtcblx0XHRcdGVuZDEtLTtcblx0XHRcdGVuZDItLTtcblx0XHR9XG5cdFx0cmVzdWx0LmRlbHRhVGV4dCA9IHMyLnN1YnN0cmluZyhzdGFydCwgZW5kMiArIDEpO1xuXHRcdHJlc3VsdC5kZWx0YVJlcGxhY2VMZW5ndGggPSBlbmQxIC0gc3RhcnQgKyAxO1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIEludm9rZSBhbGwgY29tcGxldGlvbiBjYWxsYmFja3MgYW5kIGNsZWFyIHRoZSBsaXN0IGFmdGVyd2FyZHMuXG5cdCAqL1xuXHRVcGRhdGVTZXJ2aWNlLnByb3RvdHlwZS5vbkNvbXBsZXRlID0gZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzKSB7XG5cdFx0dmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NvbXBsZXRpb25DYWxsYmFja3M7XG5cdFx0dGhpcy5fY29tcGxldGlvbkNhbGxiYWNrcyA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV0uY2FsbGJhY2s7XG5cdFx0XHR2YXIgcGFyYW1zID0gY2FsbGJhY2tzW2ldLnBhcmFtcztcblx0XHRcdGNhbGxiYWNrKHBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cdFxuXHQvKipcblx0ICogQWRkIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZXJ2aWNlIGNhbGwgaGFzIGNvbXBsZXRlZC5cblx0ICovXG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlLmFkZENvbXBsZXRpb25DYWxsYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBwYXJhbXMpIHtcblx0XHR0aGlzLl9jb21wbGV0aW9uQ2FsbGJhY2tzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXN9KTtcblx0fVxuXG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpIHtcblx0XHRpZiAoZGVmZXJyZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblx0XHR9XG5cdFx0dmFyIGtub3duU2VydmVyU3RhdGUgPSBlZGl0b3JDb250ZXh0LmdldFNlcnZlclN0YXRlKCk7XG5cdFx0aWYgKGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0dGhpcy5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7IHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpIH0pO1xuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIHNlcnZlckRhdGEgPSB7XG5cdFx0XHRjb250ZW50VHlwZTogcGFyYW1zLmNvbnRlbnRUeXBlXG5cdFx0fTtcblx0XHR2YXIgY3VycmVudFRleHQgPSBlZGl0b3JDb250ZXh0LmdldFRleHQoKTtcblx0XHRpZiAocGFyYW1zLnNlbmRGdWxsVGV4dCB8fCBrbm93blNlcnZlclN0YXRlLnRleHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0c2VydmVyRGF0YS5mdWxsVGV4dCA9IGN1cnJlbnRUZXh0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbXB1dGVEZWx0YShrbm93blNlcnZlclN0YXRlLnRleHQsIGN1cnJlbnRUZXh0LCBzZXJ2ZXJEYXRhKTtcblx0XHRcdGlmIChzZXJ2ZXJEYXRhLmRlbHRhVGV4dCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmIChwYXJhbXMuZm9yY2VVcGRhdGUpIHtcblx0XHRcdFx0XHRzZXJ2ZXJEYXRhLmRlbHRhVGV4dCA9ICcnO1xuXHRcdFx0XHRcdHNlcnZlckRhdGEuZGVsdGFPZmZzZXQgPSBlZGl0b3JDb250ZXh0LmdldENhcmV0T2Zmc2V0KCk7XG5cdFx0XHRcdFx0c2VydmVyRGF0YS5kZWx0YVJlcGxhY2VMZW5ndGggPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUoa25vd25TZXJ2ZXJTdGF0ZSk7XG5cdFx0XHRcdFx0dGhpcy5vbkNvbXBsZXRlKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0c2VydmVyRGF0YS5yZXF1aXJlZFN0YXRlSWQgPSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XG5cdFx0fVxuXG5cdFx0a25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5zZW5kUmVxdWVzdChlZGl0b3JDb250ZXh0LCB7XG5cdFx0XHR0eXBlOiAnUFVUJyxcblx0XHRcdGRhdGE6IHNlcnZlckRhdGEsXG5cdFx0XHRcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0XHRpZiAocmVzdWx0LmNvbmZsaWN0KSB7XG5cdFx0XHRcdFx0Ly8gVGhlIHNlcnZlciBoYXMgbG9zdCBpdHMgc2Vzc2lvbiBzdGF0ZSBhbmQgdGhlIHJlc291cmNlIGlzIGxvYWRlZCBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRcdFx0XHRpZiAoa25vd25TZXJ2ZXJTdGF0ZS50ZXh0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3M7XG5cdFx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS50ZXh0O1xuXHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcblx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocmVzdWx0LmNvbmZsaWN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBsaXN0ZW5lcnMgPSBlZGl0b3JDb250ZXh0LnVwZGF0ZVNlcnZlclN0YXRlKGN1cnJlbnRUZXh0LCByZXN1bHQuc3RhdGVJZCk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0c2VsZi5hZGRDb21wbGV0aW9uQ2FsbGJhY2sobGlzdGVuZXJzW2ldLCBwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdGVycm9yOiBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzID09IDQwNCAmJiAhcGFyYW1zLmxvYWRGcm9tU2VydmVyICYmIGtub3duU2VydmVyU3RhdGUudGV4dCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Ly8gVGhlIHNlcnZlciBoYXMgbG9zdCBpdHMgc2Vzc2lvbiBzdGF0ZSBhbmQgdGhlIHJlc291cmNlIGlzIG5vdCBsb2FkZWQgZnJvbSB0aGUgc2VydmVyXG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcztcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS50ZXh0O1xuXHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XG5cdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycm9yVGhyb3duKTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdGNvbXBsZXRlOiBzZWxmLm9uQ29tcGxldGUuYmluZChzZWxmKVxuXHRcdH0sIHRydWUpO1xuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0a25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cdFx0fSk7XG5cdH07XG5cdFxuXHRyZXR1cm4gVXBkYXRlU2VydmljZTtcbn0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0NvbnRlbnRBc3Npc3RTZXJ2aWNlJyxbJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsICdqcXVlcnknXSwgZnVuY3Rpb24oWHRleHRTZXJ2aWNlLCBqUXVlcnkpIHtcblxuXHQvKipcblx0ICogU2VydmljZSBjbGFzcyBmb3IgY29udGVudCBhc3Npc3QgcHJvcG9zYWxzLiBUaGUgcHJvcG9zYWxzIGFyZSByZXR1cm5lZCBhcyBwcm9taXNlIG9mXG5cdCAqIGEgRGVmZXJyZWQgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gQ29udGVudEFzc2lzdFNlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCwgdXBkYXRlU2VydmljZSkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnYXNzaXN0JywgcmVzb3VyY2VJZCwgdXBkYXRlU2VydmljZSk7XG5cdH1cblxuXHRDb250ZW50QXNzaXN0U2VydmljZS5wcm90b3R5cGUgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XG5cdFxuXHRDb250ZW50QXNzaXN0U2VydmljZS5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCkge1xuXHRcdGlmIChkZWZlcnJlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXHRcdH1cblx0XHR2YXIgc2VydmVyRGF0YSA9IHtcblx0XHRcdGNvbnRlbnRUeXBlOiBwYXJhbXMuY29udGVudFR5cGVcblx0XHR9O1xuXHRcdGlmIChwYXJhbXMub2Zmc2V0KVxuXHRcdFx0c2VydmVyRGF0YS5jYXJldE9mZnNldCA9IHBhcmFtcy5vZmZzZXQ7XG5cdFx0ZWxzZVxuXHRcdFx0c2VydmVyRGF0YS5jYXJldE9mZnNldCA9IGVkaXRvckNvbnRleHQuZ2V0Q2FyZXRPZmZzZXQoKTtcblx0XHR2YXIgc2VsZWN0aW9uID0gcGFyYW1zLnNlbGVjdGlvbiA/IHBhcmFtcy5zZWxlY3Rpb24gOiBlZGl0b3JDb250ZXh0LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWxlY3Rpb24uc3RhcnQgIT0gc2VydmVyRGF0YS5jYXJldE9mZnNldCB8fCBzZWxlY3Rpb24uZW5kICE9IHNlcnZlckRhdGEuY2FyZXRPZmZzZXQpIHtcblx0XHRcdHNlcnZlckRhdGEuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb24uc3RhcnQ7XG5cdFx0XHRzZXJ2ZXJEYXRhLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5lbmQ7XG5cdFx0fVxuXHRcdHZhciBjdXJyZW50VGV4dDtcblx0XHR2YXIgaHR0cE1ldGhvZCA9ICdHRVQnO1xuXHRcdHZhciBvbkNvbXBsZXRlID0gdW5kZWZpbmVkO1xuXHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xuXHRcdGlmIChwYXJhbXMuc2VuZEZ1bGxUZXh0KSB7XG5cdFx0XHRzZXJ2ZXJEYXRhLmZ1bGxUZXh0ID0gZWRpdG9yQ29udGV4dC5nZXRUZXh0KCk7XG5cdFx0XHRodHRwTWV0aG9kID0gJ1BPU1QnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXJ2ZXJEYXRhLnJlcXVpcmVkU3RhdGVJZCA9IGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcblx0XHRcdGlmICh0aGlzLl91cGRhdGVTZXJ2aWNlKSB7XG5cdFx0XHRcdGlmIChrbm93blNlcnZlclN0YXRlLnRleHQgPT09IHVuZGVmaW5lZCB8fCBrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlU2VydmljZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzZWxmLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdG9uQ29tcGxldGUgPSB0aGlzLl91cGRhdGVTZXJ2aWNlLm9uQ29tcGxldGUuYmluZCh0aGlzLl91cGRhdGVTZXJ2aWNlKTtcblx0XHRcdFx0Y3VycmVudFRleHQgPSBlZGl0b3JDb250ZXh0LmdldFRleHQoKTtcblx0XHRcdFx0dGhpcy5fdXBkYXRlU2VydmljZS5jb21wdXRlRGVsdGEoa25vd25TZXJ2ZXJTdGF0ZS50ZXh0LCBjdXJyZW50VGV4dCwgc2VydmVyRGF0YSk7XG5cdFx0XHRcdGlmIChzZXJ2ZXJEYXRhLmRlbHRhVGV4dCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aHR0cE1ldGhvZCA9ICdQT1NUJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0c2VsZi5zZW5kUmVxdWVzdChlZGl0b3JDb250ZXh0LCB7XG5cdFx0XHR0eXBlOiBodHRwTWV0aG9kLFxuXHRcdFx0ZGF0YTogc2VydmVyRGF0YSxcblx0XHRcdFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGlmIChyZXN1bHQuY29uZmxpY3QpIHtcblx0XHRcdFx0XHQvLyBUaGUgc2VydmVyIGhhcyBsb3N0IGl0cyBzZXNzaW9uIHN0YXRlIGFuZCB0aGUgcmVzb3VyY2UgaXMgbG9hZGVkIGZyb20gdGhlIHNlcnZlclxuXHRcdFx0XHRcdGlmIChzZWxmLl9pbmNyZWFzZVJlY3Vyc2lvbkNvdW50KGVkaXRvckNvbnRleHQpKSB7XG5cdFx0XHRcdFx0XHRpZiAob25Db21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS50ZXh0O1xuXHRcdFx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xuXHRcdFx0XHRcdFx0XHRzZWxmLl91cGRhdGVTZXJ2aWNlLmFkZENvbXBsZXRpb25DYWxsYmFjayhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWxmLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgcGFyYW1zQ29weSA9IHt9O1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBwIGluIHBhcmFtcykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocCkpXG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJhbXNDb3B5W3BdID0gcGFyYW1zW3BdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBhcmFtc0NvcHkuc2VuZEZ1bGxUZXh0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zQ29weSwgZGVmZXJyZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocmVzdWx0LmNvbmZsaWN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbkNvbXBsZXRlICYmIHJlc3VsdC5zdGF0ZUlkICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnN0YXRlSWQgIT0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpLnN0YXRlSWQpIHtcblx0XHRcdFx0XHR2YXIgbGlzdGVuZXJzID0gZWRpdG9yQ29udGV4dC51cGRhdGVTZXJ2ZXJTdGF0ZShjdXJyZW50VGV4dCwgcmVzdWx0LnN0YXRlSWQpO1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl91cGRhdGVTZXJ2aWNlLmFkZENvbXBsZXRpb25DYWxsYmFjayhsaXN0ZW5lcnNbaV0sIHBhcmFtcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0LmVudHJpZXMpO1xuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcblx0XHRcdFx0aWYgKG9uQ29tcGxldGUgJiYgeGhyLnN0YXR1cyA9PSA0MDQgJiYgIXBhcmFtcy5sb2FkRnJvbVNlcnZlciAmJiBrbm93blNlcnZlclN0YXRlLnRleHQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8vIFRoZSBzZXJ2ZXIgaGFzIGxvc3QgaXRzIHNlc3Npb24gc3RhdGUgYW5kIHRoZSByZXNvdXJjZSBpcyBub3QgbG9hZGVkIGZyb20gdGhlIHNlcnZlclxuXHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3M7XG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xuXHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VsZi5fdXBkYXRlU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyb3JUaHJvd24pO1xuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Y29tcGxldGU6IG9uQ29tcGxldGVcblx0XHR9LCAhcGFyYW1zLnNlbmRGdWxsVGV4dCk7XG5cdFx0dmFyIHJlc3VsdCA9IGRlZmVycmVkLnByb21pc2UoKTtcblx0XHRpZiAob25Db21wbGV0ZSkge1xuXHRcdFx0cmVzdWx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0a25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRyZXR1cm4gQ29udGVudEFzc2lzdFNlcnZpY2U7XG59KTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0hvdmVyU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XG5cdFxuXHQvKipcblx0ICogU2VydmljZSBjbGFzcyBmb3IgaG92ZXIgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBIb3ZlclNlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCwgdXBkYXRlU2VydmljZSkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnaG92ZXInLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKTtcblx0fTtcblxuXHRIb3ZlclNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xuXG5cdEhvdmVyU2VydmljZS5wcm90b3R5cGUuX2luaXRTZXJ2ZXJEYXRhID0gZnVuY3Rpb24oc2VydmVyRGF0YSwgZWRpdG9yQ29udGV4dCwgcGFyYW1zKSB7XG5cdFx0Ly8gSW4gb3JkZXIgdG8gZGlzcGxheSBob3ZlciBpbmZvIGZvciBhIHNlbGVjdGVkIGNvbXBsZXRpb24gcHJvcG9zYWwgd2hpbGUgdGhlIGNvbnRlbnRcblx0XHQvLyBhc3Npc3QgcG9wdXAgaXMgc2hvd24sIHRoZSBzZWxlY3RlZCBwcm9wb3NhbCBpcyBwYXNzZWQgYXMgcGFyYW1ldGVyXG5cdFx0aWYgKHBhcmFtcy5wcm9wb3NhbCAmJiBwYXJhbXMucHJvcG9zYWwucHJvcG9zYWwpXG5cdFx0XHRzZXJ2ZXJEYXRhLnByb3Bvc2FsID0gcGFyYW1zLnByb3Bvc2FsLnByb3Bvc2FsO1xuXHRcdGlmIChwYXJhbXMub2Zmc2V0KVxuXHRcdFx0c2VydmVyRGF0YS5jYXJldE9mZnNldCA9IHBhcmFtcy5vZmZzZXQ7XG5cdFx0ZWxzZVxuXHRcdFx0c2VydmVyRGF0YS5jYXJldE9mZnNldCA9IGVkaXRvckNvbnRleHQuZ2V0Q2FyZXRPZmZzZXQoKTtcblx0XHR2YXIgc2VsZWN0aW9uID0gcGFyYW1zLnNlbGVjdGlvbiA/IHBhcmFtcy5zZWxlY3Rpb24gOiBlZGl0b3JDb250ZXh0LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmIChzZWxlY3Rpb24uc3RhcnQgIT0gc2VydmVyRGF0YS5jYXJldE9mZnNldCB8fCBzZWxlY3Rpb24uZW5kICE9IHNlcnZlckRhdGEuY2FyZXRPZmZzZXQpIHtcblx0XHRcdHNlcnZlckRhdGEuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb24uc3RhcnQ7XG5cdFx0XHRzZXJ2ZXJEYXRhLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5lbmQ7XG5cdFx0fVxuXHR9O1xuXHRcblx0SG92ZXJTZXJ2aWNlLnByb3RvdHlwZS5fZ2V0U3VjY2Vzc0NhbGxiYWNrID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCkge1xuXHRcdHZhciBkZWxheSA9IHBhcmFtcy5tb3VzZUhvdmVyRGVsYXk7XG5cdFx0aWYgKCFkZWxheSlcblx0XHRcdGRlbGF5ID0gNTAwO1xuXHRcdHZhciBzaG93VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgZGVsYXk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0aWYgKHJlc3VsdC5jb25mbGljdCB8fCAhcmVzdWx0LnRpdGxlICYmICFyZXN1bHQuY29udGVudCkge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciByZW1haW5pbmdUaW1lb3V0ID0gTWF0aC5tYXgoMCwgc2hvd1RpbWUgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCFwYXJhbXMuc2VuZEZ1bGxUZXh0ICYmIHJlc3VsdC5zdGF0ZUlkICE9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0JiYgcmVzdWx0LnN0YXRlSWQgIT0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpLnN0YXRlSWQpIFxuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KCk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9LCByZW1haW5pbmdUaW1lb3V0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRcblx0cmV0dXJuIEhvdmVyU2VydmljZTtcbn0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL09jY3VycmVuY2VzU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XG5cdFxuXHQvKipcblx0ICogU2VydmljZSBjbGFzcyBmb3IgbWFya2luZyBvY2N1cnJlbmNlcy5cblx0ICovXG5cdGZ1bmN0aW9uIE9jY3VycmVuY2VzU2VydmljZShzZXJ2aWNlVXJsLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsICdvY2N1cnJlbmNlcycsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpO1xuXHR9O1xuXG5cdE9jY3VycmVuY2VzU2VydmljZS5wcm90b3R5cGUgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XG5cblx0T2NjdXJyZW5jZXNTZXJ2aWNlLnByb3RvdHlwZS5faW5pdFNlcnZlckRhdGEgPSBmdW5jdGlvbihzZXJ2ZXJEYXRhLCBlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcblx0XHRpZiAocGFyYW1zLm9mZnNldClcblx0XHRcdHNlcnZlckRhdGEuY2FyZXRPZmZzZXQgPSBwYXJhbXMub2Zmc2V0O1xuXHRcdGVsc2Vcblx0XHRcdHNlcnZlckRhdGEuY2FyZXRPZmZzZXQgPSBlZGl0b3JDb250ZXh0LmdldENhcmV0T2Zmc2V0KCk7XG5cdH07XG5cdFxuXHRPY2N1cnJlbmNlc1NlcnZpY2UucHJvdG90eXBlLl9nZXRTdWNjZXNzQ2FsbGJhY2sgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdFx0aWYgKHJlc3VsdC5jb25mbGljdCB8fCAhcGFyYW1zLnNlbmRGdWxsVGV4dCAmJiByZXN1bHQuc3RhdGVJZCAhPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0JiYgcmVzdWx0LnN0YXRlSWQgIT0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpLnN0YXRlSWQpIFxuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcblx0XHRcdGVsc2UgXG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gT2NjdXJyZW5jZXNTZXJ2aWNlO1xufSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmRlZmluZSgneHRleHQvc2VydmljZXMvRm9ybWF0dGluZ1NlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xuXHRcblx0LyoqXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIGZvcm1hdHRpbmcgdGV4dC5cblx0ICovXG5cdGZ1bmN0aW9uIEZvcm1hdHRpbmdTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpIHtcblx0XHR0aGlzLmluaXRpYWxpemUoc2VydmljZVVybCwgJ2Zvcm1hdCcsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpO1xuXHR9O1xuXG5cdEZvcm1hdHRpbmdTZXJ2aWNlLnByb3RvdHlwZSA9IG5ldyBYdGV4dFNlcnZpY2UoKTtcblxuXHRGb3JtYXR0aW5nU2VydmljZS5wcm90b3R5cGUuX2luaXRTZXJ2ZXJEYXRhID0gZnVuY3Rpb24oc2VydmVyRGF0YSwgZWRpdG9yQ29udGV4dCwgcGFyYW1zKSB7XG5cdFx0dmFyIHNlbGVjdGlvbiA9IHBhcmFtcy5zZWxlY3Rpb24gPyBwYXJhbXMuc2VsZWN0aW9uIDogZWRpdG9yQ29udGV4dC5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoc2VsZWN0aW9uLmVuZCA+IHNlbGVjdGlvbi5zdGFydCkge1xuXHRcdFx0c2VydmVyRGF0YS5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvbi5zdGFydDtcblx0XHRcdHNlcnZlckRhdGEuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uLmVuZDtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdGh0dHBNZXRob2Q6ICdQT1NUJ1xuXHRcdH07XG5cdH07XG5cdFxuXHRGb3JtYXR0aW5nU2VydmljZS5wcm90b3R5cGUuX3Byb2Nlc3NSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQsIGVkaXRvckNvbnRleHQpIHtcblx0XHQvLyBUaGUgdGV4dCB1cGRhdGUgbWF5IGJlIGFzeW5jaHJvbm91cywgc28gd2UgaGF2ZSB0byBjb21wdXRlIHRoZSBuZXcgdGV4dCBvdXJzZWx2ZXNcblx0XHR2YXIgbmV3VGV4dDtcblx0XHRpZiAocmVzdWx0LnJlcGxhY2VSZWdpb24pIHtcblx0XHRcdHZhciBmdWxsVGV4dCA9IGVkaXRvckNvbnRleHQuZ2V0VGV4dCgpO1xuXHRcdFx0dmFyIHN0YXJ0ID0gcmVzdWx0LnJlcGxhY2VSZWdpb24ub2Zmc2V0O1xuXHRcdFx0dmFyIGVuZCA9IHJlc3VsdC5yZXBsYWNlUmVnaW9uLm9mZnNldCArIHJlc3VsdC5yZXBsYWNlUmVnaW9uLmxlbmd0aDtcblx0XHRcdGVkaXRvckNvbnRleHQuc2V0VGV4dChyZXN1bHQuZm9ybWF0dGVkVGV4dCwgc3RhcnQsIGVuZCk7XG5cdFx0XHRuZXdUZXh0ID0gZnVsbFRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIHJlc3VsdC5mb3JtYXR0ZWRUZXh0ICsgZnVsbFRleHQuc3Vic3RyaW5nKGVuZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVkaXRvckNvbnRleHQuc2V0VGV4dChyZXN1bHQuZm9ybWF0dGVkVGV4dCk7XG5cdFx0XHRuZXdUZXh0ID0gcmVzdWx0LmZvcm1hdHRlZFRleHQ7XG5cdFx0fVxuXHRcdHZhciBsaXN0ZW5lcnMgPSBlZGl0b3JDb250ZXh0LnVwZGF0ZVNlcnZlclN0YXRlKG5ld1RleHQsIHJlc3VsdC5zdGF0ZUlkKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdGVuZXJzW2ldKHt9KTtcblx0XHR9XG5cdH07XG5cdFxuXHRyZXR1cm4gRm9ybWF0dGluZ1NlcnZpY2U7XG59KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5kZWZpbmUoJ3h0ZXh0L1NlcnZpY2VCdWlsZGVyJyxbXG4gICAgJ2pxdWVyeScsXG4gICAgJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsXG5cdCd4dGV4dC9zZXJ2aWNlcy9Mb2FkUmVzb3VyY2VTZXJ2aWNlJyxcblx0J3h0ZXh0L3NlcnZpY2VzL1NhdmVSZXNvdXJjZVNlcnZpY2UnLFxuXHQneHRleHQvc2VydmljZXMvSGlnaGxpZ2h0aW5nU2VydmljZScsXG5cdCd4dGV4dC9zZXJ2aWNlcy9WYWxpZGF0aW9uU2VydmljZScsXG5cdCd4dGV4dC9zZXJ2aWNlcy9VcGRhdGVTZXJ2aWNlJyxcblx0J3h0ZXh0L3NlcnZpY2VzL0NvbnRlbnRBc3Npc3RTZXJ2aWNlJyxcblx0J3h0ZXh0L3NlcnZpY2VzL0hvdmVyU2VydmljZScsXG5cdCd4dGV4dC9zZXJ2aWNlcy9PY2N1cnJlbmNlc1NlcnZpY2UnLFxuXHQneHRleHQvc2VydmljZXMvRm9ybWF0dGluZ1NlcnZpY2UnXG5dLCBmdW5jdGlvbihqUXVlcnksIFh0ZXh0U2VydmljZSwgTG9hZFJlc291cmNlU2VydmljZSwgU2F2ZVJlc291cmNlU2VydmljZSwgSGlnaGxpZ2h0aW5nU2VydmljZSxcblx0XHRWYWxpZGF0aW9uU2VydmljZSwgVXBkYXRlU2VydmljZSwgQ29udGVudEFzc2lzdFNlcnZpY2UsIEhvdmVyU2VydmljZSwgT2NjdXJyZW5jZXNTZXJ2aWNlLFxuXHRcdEZvcm1hdHRpbmdTZXJ2aWNlKSB7XG5cdFxuXHQvKipcblx0ICogQnVpbGRlciBjbGFzcyBmb3IgdGhlIFh0ZXh0IHNlcnZpY2VzLlxuXHQgKi9cblx0ZnVuY3Rpb24gU2VydmljZUJ1aWxkZXIoeHRleHRTZXJ2aWNlcykge1xuXHRcdHRoaXMuc2VydmljZXMgPSB4dGV4dFNlcnZpY2VzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYWxsIHRoZSBhdmFpbGFibGUgWHRleHQgc2VydmljZXMgZGVwZW5kaW5nIG9uIHRoZSBjb25maWd1cmF0aW9uLlxuXHQgKi9cblx0U2VydmljZUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVNlcnZpY2VzID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcblx0XHR2YXIgb3B0aW9ucyA9IHNlcnZpY2VzLm9wdGlvbnM7XG5cdFx0dmFyIGVkaXRvckNvbnRleHQgPSBzZXJ2aWNlcy5lZGl0b3JDb250ZXh0O1xuXHRcdGVkaXRvckNvbnRleHQueHRleHRTZXJ2aWNlcyA9IHNlcnZpY2VzO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRpZiAoIW9wdGlvbnMuc2VydmljZVVybCkge1xuXHRcdFx0aWYgKCFvcHRpb25zLmJhc2VVcmwpXG5cdFx0XHRcdG9wdGlvbnMuYmFzZVVybCA9ICcvJztcblx0XHRcdGVsc2UgaWYgKG9wdGlvbnMuYmFzZVVybC5jaGFyQXQoMCkgIT0gJy8nKVxuXHRcdFx0XHRvcHRpb25zLmJhc2VVcmwgPSAnLycgKyBvcHRpb25zLmJhc2VVcmw7XG5cdFx0XHRvcHRpb25zLnNlcnZpY2VVcmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBvcHRpb25zLmJhc2VVcmwgKyAneHRleHQtc2VydmljZSc7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLnJlc291cmNlSWQpIHtcblx0XHRcdGlmICghb3B0aW9ucy54dGV4dExhbmcpXG5cdFx0XHRcdG9wdGlvbnMueHRleHRMYW5nID0gb3B0aW9ucy5yZXNvdXJjZUlkLnNwbGl0KC9bPyNdLylbMF0uc3BsaXQoJy4nKS5wb3AoKTtcblx0XHRcdGlmIChvcHRpb25zLmxvYWRGcm9tU2VydmVyID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdG9wdGlvbnMubG9hZEZyb21TZXJ2ZXIgPSB0cnVlO1xuXHRcdFx0aWYgKG9wdGlvbnMubG9hZEZyb21TZXJ2ZXIgJiYgdGhpcy5zZXR1cFBlcnNpc3RlbmNlU2VydmljZXMpIHtcblx0XHRcdFx0c2VydmljZXMubG9hZFJlc291cmNlU2VydmljZSA9IG5ldyBMb2FkUmVzb3VyY2VTZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkLCBmYWxzZSk7XG5cdFx0XHRcdHNlcnZpY2VzLmxvYWRSZXNvdXJjZSA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xuXHRcdFx0XHRcdHJldHVybiBzZXJ2aWNlcy5sb2FkUmVzb3VyY2VTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VydmljZXMuc2F2ZVJlc291cmNlU2VydmljZSA9IG5ldyBTYXZlUmVzb3VyY2VTZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkKTtcblx0XHRcdFx0c2VydmljZXMuc2F2ZVJlc291cmNlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLnNhdmVSZXNvdXJjZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIFNlcnZpY2VCdWlsZGVyLm1lcmdlT3B0aW9ucyhhZGRQYXJhbXMsIG9wdGlvbnMpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZXJ2aWNlcy5yZXZlcnRSZXNvdXJjZVNlcnZpY2UgPSBuZXcgTG9hZFJlc291cmNlU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCwgdHJ1ZSk7XG5cdFx0XHRcdHNlcnZpY2VzLnJldmVydFJlc291cmNlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLnJldmVydFJlc291cmNlU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0dXBQZXJzaXN0ZW5jZVNlcnZpY2VzKCk7XG5cdFx0XHRcdHNlcnZpY2VzLmxvYWRSZXNvdXJjZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAob3B0aW9ucy5sb2FkRnJvbVNlcnZlciA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRvcHRpb25zLmxvYWRGcm9tU2VydmVyID0gZmFsc2U7XG5cdFx0XHRpZiAob3B0aW9ucy54dGV4dExhbmcpIHtcblx0XHRcdFx0dmFyIHJhbmRvbUlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjE0NzQ4MzY0OCkudG9TdHJpbmcoMTYpO1xuXHRcdFx0XHRvcHRpb25zLnJlc291cmNlSWQgPSByYW5kb21JZCArICcuJyArIG9wdGlvbnMueHRleHRMYW5nO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRpZiAodGhpcy5zZXR1cFN5bnRheEhpZ2hsaWdodGluZykge1xuXHRcdFx0dGhpcy5zZXR1cFN5bnRheEhpZ2hsaWdodGluZygpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5lbmFibGVIaWdobGlnaHRpbmdTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlSGlnaGxpZ2h0aW5nU2VydmljZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzZXJ2aWNlcy5oaWdobGlnaHRpbmdTZXJ2aWNlID0gbmV3IEhpZ2hsaWdodGluZ1NlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQpO1xuXHRcdFx0c2VydmljZXMuY29tcHV0ZUhpZ2hsaWdodGluZyA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xuXHRcdFx0XHRyZXR1cm4gc2VydmljZXMuaGlnaGxpZ2h0aW5nU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5lbmFibGVWYWxpZGF0aW9uU2VydmljZSB8fCBvcHRpb25zLmVuYWJsZVZhbGlkYXRpb25TZXJ2aWNlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHNlcnZpY2VzLnZhbGlkYXRpb25TZXJ2aWNlID0gbmV3IFZhbGlkYXRpb25TZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkKTtcblx0XHRcdHNlcnZpY2VzLnZhbGlkYXRlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XG5cdFx0XHRcdHJldHVybiBzZXJ2aWNlcy52YWxpZGF0aW9uU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5zZXR1cFVwZGF0ZVNlcnZpY2UpIHtcblx0XHRcdGZ1bmN0aW9uIHJlZnJlc2hEb2N1bWVudCgpIHtcblx0XHRcdFx0aWYgKHNlcnZpY2VzLmhpZ2hsaWdodGluZ1NlcnZpY2UgJiYgc2VsZi5kb0hpZ2hsaWdodGluZykge1xuXHRcdFx0XHRcdHNlcnZpY2VzLmhpZ2hsaWdodGluZ1NlcnZpY2Uuc2V0U3RhdGUodW5kZWZpbmVkKTtcblx0XHRcdFx0XHRzZWxmLmRvSGlnaGxpZ2h0aW5nKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHNlcnZpY2VzLnZhbGlkYXRpb25TZXJ2aWNlICYmIHNlbGYuZG9WYWxpZGF0aW9uKSB7XG5cdFx0XHRcdFx0c2VydmljZXMudmFsaWRhdGlvblNlcnZpY2Uuc2V0U3RhdGUodW5kZWZpbmVkKTtcblx0XHRcdFx0XHRzZWxmLmRvVmFsaWRhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIW9wdGlvbnMuc2VuZEZ1bGxUZXh0KSB7XG5cdFx0XHRcdHNlcnZpY2VzLnVwZGF0ZVNlcnZpY2UgPSBuZXcgVXBkYXRlU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCk7XG5cdFx0XHRcdHNlcnZpY2VzLnVwZGF0ZSA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xuXHRcdFx0XHRcdHJldHVybiBzZXJ2aWNlcy51cGRhdGVTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHNlcnZpY2VzLnNhdmVSZXNvdXJjZVNlcnZpY2UpXG5cdFx0XHRcdFx0c2VydmljZXMuc2F2ZVJlc291cmNlU2VydmljZS5fdXBkYXRlU2VydmljZSA9IHNlcnZpY2VzLnVwZGF0ZVNlcnZpY2U7XG5cdFx0XHRcdGVkaXRvckNvbnRleHQuYWRkU2VydmVyU3RhdGVMaXN0ZW5lcihyZWZyZXNoRG9jdW1lbnQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXR1cFVwZGF0ZVNlcnZpY2UocmVmcmVzaERvY3VtZW50KTtcblx0XHR9XG5cdFx0aWYgKChvcHRpb25zLmVuYWJsZUNvbnRlbnRBc3Npc3RTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlQ29udGVudEFzc2lzdFNlcnZpY2UgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0JiYgdGhpcy5zZXR1cENvbnRlbnRBc3Npc3RTZXJ2aWNlKSB7XG5cdFx0XHRzZXJ2aWNlcy5jb250ZW50QXNzaXN0U2VydmljZSA9IG5ldyBDb250ZW50QXNzaXN0U2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XG5cdFx0XHRzZXJ2aWNlcy5nZXRDb250ZW50QXNzaXN0ID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XG5cdFx0XHRcdHJldHVybiBzZXJ2aWNlcy5jb250ZW50QXNzaXN0U2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXR1cENvbnRlbnRBc3Npc3RTZXJ2aWNlKCk7XG5cdFx0fVxuXHRcdGlmICgob3B0aW9ucy5lbmFibGVIb3ZlclNlcnZpY2UgfHwgb3B0aW9ucy5lbmFibGVIb3ZlclNlcnZpY2UgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0JiYgdGhpcy5zZXR1cEhvdmVyU2VydmljZSkge1xuXHRcdFx0c2VydmljZXMuaG92ZXJTZXJ2aWNlID0gbmV3IEhvdmVyU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XG5cdFx0XHRzZXJ2aWNlcy5nZXRIb3ZlckluZm8gPSBmdW5jdGlvbihhZGRQYXJhbXMpIHtcblx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLmhvdmVyU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXR1cEhvdmVyU2VydmljZSgpO1xuXHRcdH1cblx0XHRpZiAoKG9wdGlvbnMuZW5hYmxlT2NjdXJyZW5jZXNTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlT2NjdXJyZW5jZXNTZXJ2aWNlID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdCYmIHRoaXMuc2V0dXBPY2N1cnJlbmNlc1NlcnZpY2UpIHtcblx0XHRcdHNlcnZpY2VzLm9jY3VycmVuY2VzU2VydmljZSA9IG5ldyBPY2N1cnJlbmNlc1NlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQsIHNlcnZpY2VzLnVwZGF0ZVNlcnZpY2UpO1xuXHRcdFx0c2VydmljZXMuZ2V0T2NjdXJyZW5jZXMgPSBmdW5jdGlvbihhZGRQYXJhbXMpIHtcblx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLm9jY3VycmVuY2VzU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXR1cE9jY3VycmVuY2VzU2VydmljZSgpO1xuXHRcdH1cblx0XHRpZiAoKG9wdGlvbnMuZW5hYmxlRm9ybWF0dGluZ1NlcnZpY2UgfHwgb3B0aW9ucy5lbmFibGVGb3JtYXR0aW5nU2VydmljZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHQmJiB0aGlzLnNldHVwRm9ybWF0dGluZ1NlcnZpY2UpIHtcblx0XHRcdHNlcnZpY2VzLmZvcm1hdHRpbmdTZXJ2aWNlID0gbmV3IEZvcm1hdHRpbmdTZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkLCBzZXJ2aWNlcy51cGRhdGVTZXJ2aWNlKTtcblx0XHRcdHNlcnZpY2VzLmZvcm1hdCA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xuXHRcdFx0XHRyZXR1cm4gc2VydmljZXMuZm9ybWF0dGluZ1NlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIFNlcnZpY2VCdWlsZGVyLm1lcmdlT3B0aW9ucyhhZGRQYXJhbXMsIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0dXBGb3JtYXR0aW5nU2VydmljZSgpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5lbmFibGVHZW5lcmF0b3JTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlR2VuZXJhdG9yU2VydmljZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRzZXJ2aWNlcy5nZW5lcmF0b3JTZXJ2aWNlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xuXHRcdFx0c2VydmljZXMuZ2VuZXJhdG9yU2VydmljZS5pbml0aWFsaXplKHNlcnZpY2VzLCAnZ2VuZXJhdGUnKTtcblx0XHRcdHNlcnZpY2VzLmdlbmVyYXRvclNlcnZpY2UuX2luaXRTZXJ2ZXJEYXRhID0gZnVuY3Rpb24oc2VydmVyRGF0YSwgZWRpdG9yQ29udGV4dCwgcGFyYW1zKSB7XG5cdFx0XHRcdGlmIChwYXJhbXMuYWxsQXJ0aWZhY3RzKVxuXHRcdFx0XHRcdHNlcnZlckRhdGEuYWxsQXJ0aWZhY3RzID0gcGFyYW1zLmFsbEFydGlmYWN0cztcblx0XHRcdFx0ZWxzZSBpZiAocGFyYW1zLmFydGlmYWN0SWQpXG5cdFx0XHRcdFx0c2VydmVyRGF0YS5hcnRpZmFjdCA9IHBhcmFtcy5hcnRpZmFjdElkO1xuXHRcdFx0XHRpZiAocGFyYW1zLmluY2x1ZGVDb250ZW50ICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0c2VydmVyRGF0YS5pbmNsdWRlQ29udGVudCA9IHBhcmFtcy5pbmNsdWRlQ29udGVudDtcblx0XHRcdH1cblx0XHRcdHNlcnZpY2VzLmdlbmVyYXRlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XG5cdFx0XHRcdHJldHVybiBzZXJ2aWNlcy5nZW5lcmF0b3JTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChvcHRpb25zLmRpcnR5RWxlbWVudCkge1xuXHRcdFx0dmFyIGRvYyA9IG9wdGlvbnMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cdFx0XHR2YXIgZGlydHlFbGVtZW50O1xuXHRcdFx0aWYgKHR5cGVvZihvcHRpb25zLmRpcnR5RWxlbWVudCkgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRkaXJ0eUVsZW1lbnQgPSBqUXVlcnkoJyMnICsgb3B0aW9ucy5kaXJ0eUVsZW1lbnQsIGRvYyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGRpcnR5RWxlbWVudCA9IGpRdWVyeShvcHRpb25zLmRpcnR5RWxlbWVudCk7XG5cdFx0XHR2YXIgZGlydHlTdGF0dXNDbGFzcyA9IG9wdGlvbnMuZGlydHlTdGF0dXNDbGFzcztcblx0XHRcdGlmICghZGlydHlTdGF0dXNDbGFzcylcblx0XHRcdFx0ZGlydHlTdGF0dXNDbGFzcyA9ICdkaXJ0eSc7XG5cdFx0XHRlZGl0b3JDb250ZXh0LmFkZERpcnR5U3RhdGVMaXN0ZW5lcihmdW5jdGlvbihkaXJ0eSkge1xuXHRcdFx0XHRpZiAoZGlydHkpXG5cdFx0XHRcdFx0ZGlydHlFbGVtZW50LmFkZENsYXNzKGRpcnR5U3RhdHVzQ2xhc3MpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZGlydHlFbGVtZW50LnJlbW92ZUNsYXNzKGRpcnR5U3RhdHVzQ2xhc3MpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdHNlcnZpY2VzLnN1Y2Nlc3NMaXN0ZW5lcnMgPSBbXTtcblx0XHRzZXJ2aWNlcy5lcnJvckxpc3RlbmVycyA9IFtmdW5jdGlvbihzZXJ2aWNlVHlwZSwgc2V2ZXJpdHksIG1lc3NhZ2UsIHJlcXVlc3REYXRhKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5zaG93RXJyb3JEaWFsb2dzKVxuXHRcdFx0XHR3aW5kb3cuYWxlcnQoJ1h0ZXh0IHNlcnZpY2UgXFwnJyArIHNlcnZpY2VUeXBlICsgJ1xcJyBmYWlsZWQ6ICcgKyBtZXNzYWdlKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29uc29sZS5sb2coJ1h0ZXh0IHNlcnZpY2UgXFwnJyArIHNlcnZpY2VUeXBlICsgJ1xcJyBmYWlsZWQ6ICcgKyBtZXNzYWdlKTtcblx0XHR9XTtcblx0fVxuXHRcblx0LyoqXG5cdCAqIENoYW5nZSB0aGUgcmVzb3VyY2UgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc2VydmljZSBidWlsZGVyLlxuXHQgKi9cblx0U2VydmljZUJ1aWxkZXIucHJvdG90eXBlLmNoYW5nZVJlc291cmNlID0gZnVuY3Rpb24ocmVzb3VyY2VJZCkge1xuXHRcdHZhciBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXM7XG5cdFx0dmFyIG9wdGlvbnMgPSBzZXJ2aWNlcy5vcHRpb25zO1xuXHRcdG9wdGlvbnMucmVzb3VyY2VJZCA9IHJlc291cmNlSWQ7XG5cdFx0Zm9yICh2YXIgcCBpbiBzZXJ2aWNlcykge1xuXHRcdFx0aWYgKHNlcnZpY2VzLmhhc093blByb3BlcnR5KHApKSB7XG5cdFx0XHRcdHZhciBzZXJ2aWNlID0gc2VydmljZXNbcF07XG5cdFx0XHRcdGlmIChzZXJ2aWNlLl9zZXJ2aWNlVHlwZSAmJiBqUXVlcnkuaXNGdW5jdGlvbihzZXJ2aWNlLmluaXRpYWxpemUpKVxuXHRcdFx0XHRcdHNlcnZpY2VzW3BdLmluaXRpYWxpemUob3B0aW9ucy5zZXJ2aWNlVXJsLCBzZXJ2aWNlLl9zZXJ2aWNlVHlwZSwgcmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gc2VydmljZXMuZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xuXHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XG5cdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcblx0XHRpZiAob3B0aW9ucy5sb2FkRnJvbVNlcnZlciAmJiBqUXVlcnkuaXNGdW5jdGlvbihzZXJ2aWNlcy5sb2FkUmVzb3VyY2UpKSB7XG5cdFx0XHRzZXJ2aWNlcy5sb2FkUmVzb3VyY2UoKTtcblx0XHR9XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBjb3B5IG9mIHRoZSBnaXZlbiBvYmplY3QuXG5cdCAqL1xuXHRTZXJ2aWNlQnVpbGRlci5jb3B5ID0gZnVuY3Rpb24ob2JqKSB7XG5cdFx0dmFyIGNvcHkgPSB7fTtcblx0XHRmb3IgKHZhciBwIGluIG9iaikge1xuXHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSlcblx0XHRcdFx0Y29weVtwXSA9IG9ialtwXTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvcHk7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBUcmFuc2xhdGUgYW4gSFRNTCBhdHRyaWJ1dGUgbmFtZSB0byBhIEpTIG9wdGlvbiBuYW1lLlxuXHQgKi9cblx0U2VydmljZUJ1aWxkZXIub3B0aW9uTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHR2YXIgcHJlZml4ID0gJ2RhdGEtZWRpdG9yLSc7XG5cdFx0aWYgKG5hbWUuc3Vic3RyaW5nKDAsIHByZWZpeC5sZW5ndGgpID09PSBwcmVmaXgpIHtcblx0XHRcdHZhciBrZXkgPSBuYW1lLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKTtcblx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC8tKFthLXpdKS9pZywgZnVuY3Rpb24oYWxsLCBjaGFyYWN0ZXIpIHtcblx0XHRcdFx0cmV0dXJuIGNoYXJhY3Rlci50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4ga2V5O1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cdFxuXHQvKipcblx0ICogQ29weSBhbGwgZGVmYXVsdCBvcHRpb25zIGludG8gdGhlIGdpdmVuIHNldCBvZiBhZGRpdGlvbmFsIG9wdGlvbnMuXG5cdCAqL1xuXHRTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zLCBkZWZhdWx0T3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIGRlZmF1bHRPcHRpb25zKSB7XG5cdFx0XHRcdGlmIChkZWZhdWx0T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwKSlcblx0XHRcdFx0XHRvcHRpb25zW3BdID0gZGVmYXVsdE9wdGlvbnNbcF07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFNlcnZpY2VCdWlsZGVyLmNvcHkoZGVmYXVsdE9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXHRcblx0LyoqXG5cdCAqIE1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlbiBwYXJlbnQgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBkZWZhdWx0IG9wdGlvbnMuXG5cdCAqL1xuXHRTZXJ2aWNlQnVpbGRlci5tZXJnZVBhcmVudE9wdGlvbnMgPSBmdW5jdGlvbihwYXJlbnQsIGRlZmF1bHRPcHRpb25zKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSBTZXJ2aWNlQnVpbGRlci5jb3B5KGRlZmF1bHRPcHRpb25zKTtcblx0XHRmb3IgKHZhciBhdHRyLCBqID0gMCwgYXR0cnMgPSBwYXJlbnQuYXR0cmlidXRlcywgbCA9IGF0dHJzLmxlbmd0aDsgaiA8IGw7IGorKykge1xuXHRcdFx0YXR0ciA9IGF0dHJzLml0ZW0oaik7XG5cdFx0XHR2YXIga2V5ID0gU2VydmljZUJ1aWxkZXIub3B0aW9uTmFtZShhdHRyLm5vZGVOYW1lKTtcblx0XHRcdGlmIChrZXkpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gYXR0ci5ub2RlVmFsdWU7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKVxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUgPT09ICd0cnVlJztcblx0XHRcdFx0b3B0aW9uc1trZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvcHRpb25zO1xuXHR9XG5cdFxuXHRyZXR1cm4gU2VydmljZUJ1aWxkZXI7XG59KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZGVmaW5lKCd4dGV4dC9BY2VFZGl0b3JDb250ZXh0JyxbXSwgZnVuY3Rpb24oKSB7XG5cdFxuXHQvKipcblx0ICogQW4gZWRpdG9yIGNvbnRleHQgbWVkaWF0ZXMgYmV0d2VlbiB0aGUgWHRleHQgc2VydmljZXMgYW5kIHRoZSBBY2UgZWRpdG9yIGZyYW1ld29yay5cblx0ICovXG5cdGZ1bmN0aW9uIEFjZUVkaXRvckNvbnRleHQoZWRpdG9yKSB7XG5cdFx0dGhpcy5fZWRpdG9yID0gZWRpdG9yO1xuXHRcdHRoaXMuX3NlcnZlclN0YXRlID0ge307XG5cdFx0dGhpcy5fc2VydmVyU3RhdGVMaXN0ZW5lcnMgPSBbXTtcblx0XHR0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdHRoaXMuX2RpcnR5U3RhdGVMaXN0ZW5lcnMgPSBbXTtcblx0fTtcblxuXHRBY2VFZGl0b3JDb250ZXh0LnByb3RvdHlwZSA9IHtcblx0XHRcblx0XHRnZXRTZXJ2ZXJTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc2VydmVyU3RhdGU7XG5cdFx0fSxcblx0XHRcblx0XHR1cGRhdGVTZXJ2ZXJTdGF0ZTogZnVuY3Rpb24oY3VycmVudFRleHQsIGN1cnJlbnRTdGF0ZUlkKSB7XG5cdFx0XHR0aGlzLl9zZXJ2ZXJTdGF0ZS50ZXh0ID0gY3VycmVudFRleHQ7XG5cdFx0XHR0aGlzLl9zZXJ2ZXJTdGF0ZS5zdGF0ZUlkID0gY3VycmVudFN0YXRlSWQ7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc2VydmVyU3RhdGVMaXN0ZW5lcnM7XG5cdFx0fSxcblx0XHRcblx0XHRhZGRTZXJ2ZXJTdGF0ZUxpc3RlbmVyOiBmdW5jdGlvbihsaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5fc2VydmVyU3RhdGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cdFx0fSxcblx0XHRcblx0XHRnZXRDYXJldE9mZnNldDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcG9zID0gdGhpcy5fZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5nZXREb2N1bWVudCgpLnBvc2l0aW9uVG9JbmRleChwb3MpO1xuXHRcdH0sXG5cdFx0XG5cdFx0Z2V0TGluZVN0YXJ0OiBmdW5jdGlvbihsaW5lTnVtYmVyKSB7XG5cdFx0XHR2YXIgcG9zID0gdGhpcy5fZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG5cdFx0XHRyZXR1cm4gcG9zLnJvdztcblx0XHR9LFxuXHRcdFxuXHRcdGdldFNlbGVjdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLl9lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcblx0XHRcdHZhciBkb2N1bWVudCA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgXHRyZXR1cm4ge1xuICAgICAgICBcdFx0c3RhcnQ6IGRvY3VtZW50LnBvc2l0aW9uVG9JbmRleChyYW5nZS5zdGFydCksXG4gICAgICAgIFx0XHRlbmQ6IGRvY3VtZW50LnBvc2l0aW9uVG9JbmRleChyYW5nZS5lbmQpXG4gICAgICAgIFx0fTtcblx0XHR9LFxuXHRcdFxuXHRcdGdldFRleHQ6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcblx0XHRcdHZhciBzZXNzaW9uID0gdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKTtcblx0XHRcdGlmIChzdGFydCAmJiBlbmQpIHtcblx0XHRcdFx0dmFyIGRvY3VtZW50ID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpO1xuXHRcdFx0XHR2YXIgc3RhcnRQb3MgPSBkb2N1bWVudC5pbmRleFRvUG9zaXRpb24oc3RhcnQpO1xuXHRcdFx0XHR2YXIgZW5kUG9zID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKGVuZCk7XG5cdFx0XHRcdHZhciBtUmFuZ2UgPSByZXF1aXJlKCdhY2UvcmFuZ2UnKTtcblx0XHRcdFx0Ly92YXIgbVJhbmdlID0gcmVxdWlyZSgnYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UnKTtcblx0XHRcdFx0cmV0dXJuIHNlc3Npb24uZ2V0VGV4dFJhbmdlKG5ldyBtUmFuZ2UuUmFuZ2Uoc3RhcnRQb3Mucm93LCBzdGFydFBvcy5jb2x1bW4sIGVuZFBvcy5yb3csIGVuZFBvcy5jb2x1bW4pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBzZXNzaW9uLmdldFZhbHVlKCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcblx0XHRpc0RpcnR5OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLl9kaXJ0eTtcblx0XHR9LFxuXHRcdFxuXHRcdHNldERpcnR5OiBmdW5jdGlvbihkaXJ0eSkge1xuXHRcdFx0aWYgKGRpcnR5ICE9IHRoaXMuX2RpcnR5KSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlydHlTdGF0ZUxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuX2RpcnR5U3RhdGVMaXN0ZW5lcnNbaV0oZGlydHkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9kaXJ0eSA9IGRpcnR5O1xuXHRcdH0sXG5cdFx0XG5cdFx0YWRkRGlydHlTdGF0ZUxpc3RlbmVyOiBmdW5jdGlvbihsaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5fZGlydHlTdGF0ZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblx0XHR9LFxuXHRcdFxuXHRcdGNsZWFyVW5kb1N0YWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0VW5kb01hbmFnZXIoKS5yZXNldCgpO1xuXHRcdH0sXG5cdFx0XG5cdFx0c2V0Q2FyZXRPZmZzZXQ6IGZ1bmN0aW9uKG9mZnNldCkge1xuXHRcdFx0dmFyIHBvcyA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0RG9jdW1lbnQoKS5pbmRleFRvUG9zaXRpb24ob2Zmc2V0KTtcblx0XHRcdHRoaXMuX2VkaXRvci5tb3ZlQ3Vyc29yVG8ocG9zLnJvdywgcG9zLmNvbHVtbik7XG5cdFx0fSxcblx0XHRcblx0XHRzZXRTZWxlY3Rpb246IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHRcdFx0aWYgKHRoaXMuX2VkaXRvci5zZWxlY3Rpb24pIHtcblx0XHRcdFx0dmFyIGRvY3VtZW50ID0gdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5nZXREb2N1bWVudCgpO1xuXHRcdFx0XHR2YXIgc3RhcnRQb3MgPSBkb2N1bWVudC5pbmRleFRvUG9zaXRpb24oc2VsZWN0aW9uLnN0YXJ0KTtcblx0XHRcdFx0dmFyIGVuZFBvcyA9IGRvY3VtZW50LmluZGV4VG9Qb3NpdGlvbihzZWxlY3Rpb24uZW5kKTtcblx0XHRcdFx0dGhpcy5fZWRpdG9yLnNlbGVjdGlvbi5zZXRTZWxlY3Rpb25SYW5nZShuZXcgbVJhbmdlLlJhbmdlKHN0YXJ0UG9zLnJvdywgc3RhcnRQb3MuY29sdW1uLCBlbmRQb3Mucm93LCBlbmRQb3MuY29sdW1uKSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcblx0XHRzZXRUZXh0OiBmdW5jdGlvbih0ZXh0LCBzdGFydCwgZW5kKSB7XG5cdFx0XHR2YXIgc2Vzc2lvbiA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCk7XG5cdFx0XHR2YXIgZG9jdW1lbnQgPSBzZXNzaW9uLmdldERvY3VtZW50KCk7XG5cdFx0XHRpZiAoIXN0YXJ0KVxuXHRcdFx0XHRzdGFydCA9IDA7XG5cdFx0XHRpZiAoIWVuZClcblx0XHRcdFx0ZW5kID0gZG9jdW1lbnQuZ2V0VmFsdWUoKS5sZW5ndGg7XG5cdFx0XHR2YXIgc3RhcnRQb3MgPSBkb2N1bWVudC5pbmRleFRvUG9zaXRpb24oc3RhcnQpO1xuXHRcdFx0dmFyIGVuZFBvcyA9IGRvY3VtZW50LmluZGV4VG9Qb3NpdGlvbihlbmQpO1xuXHRcdFx0dmFyIGN1cnNvclBvcyA9IHRoaXMuX2VkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuXHRcdFx0dmFyIG1SYW5nZSA9IHJlcXVpcmUoJ2FjZS9yYW5nZScpO1xuXHRcdFx0Ly92YXIgbVJhbmdlID0gcmVxdWlyZSgnYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UnKTtcblx0XHRcdHNlc3Npb24ucmVwbGFjZShuZXcgbVJhbmdlLlJhbmdlKHN0YXJ0UG9zLnJvdywgc3RhcnRQb3MuY29sdW1uLCBlbmRQb3Mucm93LCBlbmRQb3MuY29sdW1uKSwgdGV4dCk7XG5cdFx0XHR0aGlzLl9lZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24oY3Vyc29yUG9zKTtcblx0XHRcdHRoaXMuX2VkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuXHRcdH1cblx0XHRcblx0fTtcblx0XG5cdHJldHVybiBBY2VFZGl0b3JDb250ZXh0O1xufSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qXG4gKiBVc2UgYGNyZWF0ZUVkaXRvcihvcHRpb25zKWAgdG8gY3JlYXRlIGFuIFh0ZXh0IGVkaXRvci4gWW91IGNhbiBzcGVjaWZ5IG9wdGlvbnMgZWl0aGVyXG4gKiB0aHJvdWdoIHRoZSBmdW5jdGlvbiBwYXJhbWV0ZXIgb3IgdGhyb3VnaCBgZGF0YS1lZGl0b3IteGAgYXR0cmlidXRlcywgd2hlcmUgeCBpcyBhblxuICogb3B0aW9uIG5hbWUgd2l0aCBjYW1lbENhc2UgY29udmVydGVkIHRvIGh5cGhlbi1zZXBhcmF0ZWQuXG4gKiBUaGUgZm9sbG93aW5nIG9wdGlvbnMgYXJlIGF2YWlsYWJsZTpcbiAqXG4gKiBiYXNlVXJsID0gXCIvXCIge1N0cmluZ31cbiAqICAgICBUaGUgcGF0aCBzZWdtZW50IHdoZXJlIHRoZSBYdGV4dCBzZXJ2aWNlIGlzIGZvdW5kOyBzZWUgc2VydmljZVVybCBvcHRpb24uXG4gKiBjb250ZW50VHlwZSB7U3RyaW5nfVxuICogICAgIFRoZSBjb250ZW50IHR5cGUgaW5jbHVkZWQgaW4gcmVxdWVzdHMgdG8gdGhlIFh0ZXh0IHNlcnZlci5cbiAqIGRpcnR5RWxlbWVudCB7U3RyaW5nIHwgRE9NRWxlbWVudH1cbiAqICAgICBBbiBlbGVtZW50IGludG8gd2hpY2ggdGhlIGRpcnR5IHN0YXR1cyBjbGFzcyBpcyB3cml0dGVuIHdoZW4gdGhlIGVkaXRvciBpcyBtYXJrZWQgZGlydHk7XG4gKiAgICAgaXQgY2FuIGJlIGVpdGhlciBhIERPTSBlbGVtZW50IG9yIGFuIElEIGZvciBhIERPTSBlbGVtZW50LlxuICogZGlydHlTdGF0dXNDbGFzcyA9ICdkaXJ0eScge1N0cmluZ31cbiAqICAgICBBIENTUyBjbGFzcyBuYW1lIHdyaXR0ZW4gaW50byB0aGUgZGlydHlFbGVtZW50IHdoZW4gdGhlIGVkaXRvciBpcyBtYXJrZWQgZGlydHkuXG4gKiBkb2N1bWVudCB7RG9jdW1lbnR9XG4gKiAgICAgVGhlIGRvY3VtZW50OyBpZiBub3Qgc3BlY2lmaWVkLCB0aGUgZ2xvYmFsIGRvY3VtZW50IGlzIHVzZWQuXG4gKiBlbmFibGVDb250ZW50QXNzaXN0U2VydmljZSA9IHRydWUge0Jvb2xlYW59XG4gKiAgICAgV2hldGhlciBjb250ZW50IGFzc2lzdCBzaG91bGQgYmUgZW5hYmxlZC5cbiAqIGVuYWJsZUZvcm1hdHRpbmdBY3Rpb24gPSBmYWxzZSB7Qm9vbGVhbn1cbiAqICAgICBXaGV0aGVyIHRoZSBmb3JtYXR0aW5nIGFjdGlvbiBzaG91bGQgYmUgYm91bmQgdG8gdGhlIHN0YW5kYXJkIGtleXN0cm9rZSBjdHJsK3NoaWZ0K2YgLyBjbWQrc2hpZnQrZi5cbiAqIGVuYWJsZUZvcm1hdHRpbmdTZXJ2aWNlID0gdHJ1ZSB7Qm9vbGVhbn1cbiAqICAgICBXaGV0aGVyIHRleHQgZm9ybWF0dGluZyBzaG91bGQgYmUgZW5hYmxlZC5cbiAqIGVuYWJsZUdlbmVyYXRvclNlcnZpY2UgPSB0cnVlIHtCb29sZWFufVxuICogICAgIFdoZXRoZXIgY29kZSBnZW5lcmF0aW9uIHNob3VsZCBiZSBlbmFibGVkIChtdXN0IGJlIHRyaWdnZXJlZCB0aHJvdWdoIEphdmFTY3JpcHQgY29kZSkuXG4gKiBlbmFibGVPY2N1cnJlbmNlc1NlcnZpY2UgPSB0cnVlIHtCb29sZWFufVxuICogICAgIFdoZXRoZXIgbWFya2luZyBvY2N1cnJlbmNlcyBzaG91bGQgYmUgZW5hYmxlZC5cbiAqIGVuYWJsZVNhdmVBY3Rpb24gPSBmYWxzZSB7Qm9vbGVhbn1cbiAqICAgICBXaGV0aGVyIHRoZSBzYXZlIGFjdGlvbiBzaG91bGQgYmUgYm91bmQgdG8gdGhlIHN0YW5kYXJkIGtleXN0cm9rZSBjdHJsK3MgLyBjbWQrcy5cbiAqIGVuYWJsZVZhbGlkYXRpb25TZXJ2aWNlID0gdHJ1ZSB7Qm9vbGVhbn1cbiAqICAgICBXaGV0aGVyIHZhbGlkYXRpb24gc2hvdWxkIGJlIGVuYWJsZWQuXG4gKiBsb2FkRnJvbVNlcnZlciA9IHRydWUge0Jvb2xlYW59XG4gKiAgICAgV2hldGhlciB0byBsb2FkIHRoZSBlZGl0b3IgY29udGVudCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBwYXJlbnQgPSAneHRleHQtZWRpdG9yJyB7U3RyaW5nIHwgRE9NRWxlbWVudH1cbiAqICAgICBUaGUgcGFyZW50IGVsZW1lbnQgZm9yIHRoZSB2aWV3OyBpdCBjYW4gYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgYW4gSUQgZm9yIGEgRE9NIGVsZW1lbnQuXG4gKiBwYXJlbnRDbGFzcyA9ICd4dGV4dC1lZGl0b3InIHtTdHJpbmd9XG4gKiAgICAgSWYgdGhlICdwYXJlbnQnIG9wdGlvbiBpcyBub3QgZ2l2ZW4sIHRoaXMgb3B0aW9uIGlzIHVzZWQgdG8gZmluZCBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBjbGFzcyBuYW1lLlxuICogcG9zaXRpb24ge1N0cmluZ31cbiAqICAgICBJZiB0aGlzIG9wdGlvbiBpcyBzZXQsIHRoZSAncG9zaXRpb24nIENTUyBhdHRyaWJ1dGUgb2YgdGhlIGNyZWF0ZWQgZWRpdG9yIGlzIHNldCBhY2NvcmRpbmdseS5cbiAqIHJlc291cmNlSWQge1N0cmluZ31cbiAqICAgICBUaGUgaWRlbnRpZmllciBvZiB0aGUgcmVzb3VyY2UgZGlzcGxheWVkIGluIHRoZSB0ZXh0IGVkaXRvcjsgdGhpcyBvcHRpb24gaXMgc2VudCB0byB0aGUgc2VydmVyIHRvXG4gKiAgICAgY29tbXVuaWNhdGUgcmVxdWlyZWQgaW5mb3JtYXRpb24gb24gdGhlIHJlc3BlY3RpdmUgcmVzb3VyY2UuXG4gKiBzZWxlY3Rpb25VcGRhdGVEZWxheSA9IDU1MCB7TnVtYmVyfVxuICogICAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYWZ0ZXIgYSBzZWxlY3Rpb24gY2hhbmdlIGJlZm9yZSBYdGV4dCBzZXJ2aWNlcyBhcmUgaW52b2tlZC5cbiAqIHNlbmRGdWxsVGV4dCA9IGZhbHNlIHtCb29sZWFufVxuICogICAgIFdoZXRoZXIgdGhlIGZ1bGwgdGV4dCBzaGFsbCBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIgd2l0aCBlYWNoIHJlcXVlc3Q7IHVzZSB0aGlzIGlmIHlvdSB3YW50XG4gKiAgICAgdGhlIHNlcnZlciB0byBydW4gaW4gc3RhdGVsZXNzIG1vZGUuIElmIHRoZSBvcHRpb24gaXMgaW5hY3RpdmUsIHRoZSBzZXJ2ZXIgc3RhdGUgaXMgdXBkYXRlZCByZWd1bGFybHkuXG4gKiBzZXJ2aWNlVXJsIHtTdHJpbmd9XG4gKiAgICAgVGhlIFVSTCBvZiB0aGUgWHRleHQgc2VydmxldDsgaWYgbm8gdmFsdWUgaXMgZ2l2ZW4sIGl0IGlzIGNvbnN0cnVjdGVkIHVzaW5nIHRoZSBiYXNlVXJsIG9wdGlvbiBpbiB0aGUgZm9ybVxuICogICAgIHtsb2NhdGlvbi5wcm90b2NvbH0vL3tsb2NhdGlvbi5ob3N0fXtiYXNlVXJsfXh0ZXh0LXNlcnZpY2VcbiAqIHNob3dFcnJvckRpYWxvZ3MgPSBmYWxzZSB7Qm9vbGVhbn1cbiAqICAgICBXaGV0aGVyIGVycm9ycyBzaG91bGQgYmUgZGlzcGxheWVkIGluIHBvcHVwIGRpYWxvZ3MuXG4gKiBzeW50YXhEZWZpbml0aW9uIHtTdHJpbmd9XG4gKiAgICAgQSBwYXRoIHRvIGEgSlMgZmlsZSBkZWZpbmluZyBhbiBBY2Ugc3ludGF4IGRlZmluaXRpb247IGlmIG5vIHBhdGggaXMgZ2l2ZW4sIGl0IGlzIGJ1aWx0IGZyb21cbiAqICAgICB0aGUgJ3h0ZXh0TGFuZycgb3B0aW9uIGluIHRoZSBmb3JtICd4dGV4dC1yZXNvdXJjZXMvbW9kZS17eHRleHRMYW5nfScuIFNldCB0aGlzIG9wdGlvbiB0byAnbm9uZScgdG9cbiAqICAgICBkaXNhYmxlIHN5bnRheCBoaWdobGlnaHRpbmcuXG4gKiB0ZXh0VXBkYXRlRGVsYXkgPSA1MDAge051bWJlcn1cbiAqICAgICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGFmdGVyIGEgdGV4dCBjaGFuZ2UgYmVmb3JlIFh0ZXh0IHNlcnZpY2VzIGFyZSBpbnZva2VkLlxuICogdGhlbWUge1N0cmluZ31cbiAqICAgICBUaGUgcGF0aCBuYW1lIG9mIHRoZSBBY2UgdGhlbWUgZm9yIHRoZSBlZGl0b3IuXG4gKiB4dGV4dExhbmcge1N0cmluZ31cbiAqICAgICBUaGUgbGFuZ3VhZ2UgbmFtZSAodXN1YWxseSB0aGUgZmlsZSBleHRlbnNpb24gY29uZmlndXJlZCBmb3IgdGhlIGxhbmd1YWdlKS5cbiAqL1xuLy8nYWNlL2FjZScsIGFjZVxuLy8nYWNlL2V4dC9sYW5ndWFnZV90b29scycsXG5kZWZpbmUoJ3h0ZXh0L3h0ZXh0LWFjZScsW1xuICAgICdqcXVlcnknLFxuICAgICdhY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZScsXG4gICAgJ2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvYWNlJyxcbiAgICAneHRleHQvY29tcGF0aWJpbGl0eScsXG4gICAgJ3h0ZXh0L1NlcnZpY2VCdWlsZGVyJyxcblx0J3h0ZXh0L0FjZUVkaXRvckNvbnRleHQnXG5dLCBmdW5jdGlvbihqUXVlcnksIGFjZSwgbGFuZ3VhZ2VUb29scywgY29tcGF0aWJpbGl0eSwgU2VydmljZUJ1aWxkZXIsIEVkaXRvckNvbnRleHQpIHtcblx0XG5cdHZhciBleHBvcnRzID0ge307XG5cdFxuXHQvKipcblx0ICogQ3JlYXRlIG9uZSBvciBtb3JlIFh0ZXh0IGVkaXRvciBpbnN0YW5jZXMgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuXHQgKiBUaGUgcmV0dXJuIHZhbHVlIGlzIGVpdGhlciBhbiBBY2UgZWRpdG9yIG9yIGFuIGFycmF5IG9mIEFjZSBlZGl0b3JzLCB3aGljaCBjYW5cblx0ICogYmUgZnVydGhlciBjb25maWd1cmVkIHVzaW5nIHRoZSBBY2UgQVBJLlxuXHQgKi9cblx0ZXhwb3J0cy5jcmVhdGVFZGl0b3IgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0aWYgKCFvcHRpb25zKVxuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdFxuXHRcdHZhciBxdWVyeTtcblx0XHRpZiAoalF1ZXJ5LnR5cGUob3B0aW9ucy5wYXJlbnQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0cXVlcnkgPSBqUXVlcnkoJyMnICsgb3B0aW9ucy5wYXJlbnQsIG9wdGlvbnMuZG9jdW1lbnQpO1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5wYXJlbnQpIHtcblx0XHRcdHF1ZXJ5ID0galF1ZXJ5KG9wdGlvbnMucGFyZW50KTtcblx0XHR9IGVsc2UgaWYgKGpRdWVyeS50eXBlKG9wdGlvbnMucGFyZW50Q2xhc3MpID09PSAnc3RyaW5nJykge1xuXHRcdFx0cXVlcnkgPSBqUXVlcnkoJy4nICsgb3B0aW9ucy5wYXJlbnRDbGFzcywgb3B0aW9ucy5kb2N1bWVudCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHF1ZXJ5ID0galF1ZXJ5KCcjeHRleHQtZWRpdG9yJywgb3B0aW9ucy5kb2N1bWVudCk7XG5cdFx0XHRpZiAocXVlcnkubGVuZ3RoID09IDApXG5cdFx0XHRcdHF1ZXJ5ID0galF1ZXJ5KCcueHRleHQtZWRpdG9yJywgb3B0aW9ucy5kb2N1bWVudCk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBlZGl0b3JzID0gW107XG5cdFx0cXVlcnkuZWFjaChmdW5jdGlvbihpbmRleCwgcGFyZW50KSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gYWNlLmVkaXQocGFyZW50KTtcblx0XHRcdGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcblx0XHRcdGlmIChvcHRpb25zLnBvc2l0aW9uKVxuXHRcdFx0XHRqUXVlcnkocGFyZW50KS5jc3MoJ3Bvc2l0aW9uJywgb3B0aW9ucy5wb3NpdGlvbik7XG5cdFx0XHRcblx0XHRcdHZhciBlZGl0b3JPcHRpb25zID0gU2VydmljZUJ1aWxkZXIubWVyZ2VQYXJlbnRPcHRpb25zKHBhcmVudCwgb3B0aW9ucyk7XG5cdFx0XHRleHBvcnRzLmNyZWF0ZVNlcnZpY2VzKGVkaXRvciwgZWRpdG9yT3B0aW9ucyk7XG5cdFx0XHRpZiAoZWRpdG9yT3B0aW9ucy50aGVtZSlcblx0XHRcdFx0ZWRpdG9yLnNldFRoZW1lKGVkaXRvck9wdGlvbnMudGhlbWUpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRlZGl0b3Iuc2V0VGhlbWUoJ2FjZS90aGVtZS9lY2xpcHNlJyk7XG5cdFx0XHRlZGl0b3JzW2luZGV4XSA9IGVkaXRvcjtcblx0XHR9KTtcblx0XHRcblx0XHRpZiAoZWRpdG9ycy5sZW5ndGggPT0gMSlcblx0XHRcdHJldHVybiBlZGl0b3JzWzBdO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBlZGl0b3JzO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBBY2VTZXJ2aWNlQnVpbGRlcihlZGl0b3IsIHh0ZXh0U2VydmljZXMpIHtcblx0XHR0aGlzLmVkaXRvciA9IGVkaXRvcjtcblx0XHR4dGV4dFNlcnZpY2VzLmVkaXRvckNvbnRleHQuX2Fubm90YXRpb25zID0gW107XG5cdFx0eHRleHRTZXJ2aWNlcy5lZGl0b3JDb250ZXh0Ll9vY2N1cnJlbmNlTWFya2VycyA9IFtdO1xuXHRcdFNlcnZpY2VCdWlsZGVyLmNhbGwodGhpcywgeHRleHRTZXJ2aWNlcyk7XG5cdH1cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlID0gbmV3IFNlcnZpY2VCdWlsZGVyKCk7XG5cdFx0XG5cdC8qKlxuXHQgKiBDb25maWd1cmUgWHRleHQgc2VydmljZXMgZm9yIHRoZSBnaXZlbiBlZGl0b3IuIFRoZSBlZGl0b3IgZG9lcyBub3QgaGF2ZSB0byBiZSBjcmVhdGVkXG5cdCAqIHdpdGggY3JlYXRlRWRpdG9yKG9wdGlvbnMpLlxuXHQgKi9cblx0ZXhwb3J0cy5jcmVhdGVTZXJ2aWNlcyA9IGZ1bmN0aW9uKGVkaXRvciwgb3B0aW9ucykge1xuXHRcdHZhciB4dGV4dFNlcnZpY2VzID0ge1xuXHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdGVkaXRvckNvbnRleHQ6IG5ldyBFZGl0b3JDb250ZXh0KGVkaXRvcilcblx0XHR9O1xuXHRcdHZhciBzZXJ2aWNlQnVpbGRlciA9IG5ldyBBY2VTZXJ2aWNlQnVpbGRlcihlZGl0b3IsIHh0ZXh0U2VydmljZXMpO1xuXHRcdHNlcnZpY2VCdWlsZGVyLmNyZWF0ZVNlcnZpY2VzKCk7XG5cdFx0eHRleHRTZXJ2aWNlcy5zZXJ2aWNlQnVpbGRlciA9IHNlcnZpY2VCdWlsZGVyO1xuXHRcdGVkaXRvci54dGV4dFNlcnZpY2VzID0geHRleHRTZXJ2aWNlcztcblx0XHRyZXR1cm4geHRleHRTZXJ2aWNlcztcblx0fVxuXHRcblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgc2VydmljZXMgYW5kIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiBwcmV2aW91c2x5IGNyZWF0ZWQgd2l0aCBjcmVhdGVTZXJ2aWNlcyhlZGl0b3IsIG9wdGlvbnMpLlxuXHQgKi9cblx0ZXhwb3J0cy5yZW1vdmVTZXJ2aWNlcyA9IGZ1bmN0aW9uKGVkaXRvcikge1xuXHRcdGlmICghZWRpdG9yLnh0ZXh0U2VydmljZXMpXG5cdFx0XHRyZXR1cm47XG5cdFx0dmFyIHNlcnZpY2VzID0gZWRpdG9yLnh0ZXh0U2VydmljZXM7XG5cdFx0dmFyIHNlc3Npb24gPSBlZGl0b3IuZ2V0U2Vzc2lvbigpO1xuXHRcdGlmIChzZXJ2aWNlcy5tb2RlbENoYW5nZUxpc3RlbmVyKVxuXHRcdFx0ZWRpdG9yLm9mZignY2hhbmdlJywgc2VydmljZXMubW9kZWxDaGFuZ2VMaXN0ZW5lcik7XG5cdFx0aWYgKHNlcnZpY2VzLmNoYW5nZUN1cnNvckxpc3RlbmVyKVxuXHRcdFx0ZWRpdG9yLmdldFNlbGVjdGlvbigpLm9mZignY2hhbmdlQ3Vyc29yJywgc2VydmljZXMuY2hhbmdlQ3Vyc29yTGlzdGVuZXIpO1xuXHRcdGlmIChlZGl0b3IuY29tbWFuZHMpIHtcblx0XHRcdGlmIChzZXJ2aWNlcy5vcHRpb25zLmVuYWJsZVNhdmVBY3Rpb24pXG5cdFx0XHRcdGVkaXRvci5jb21tYW5kcy5yZW1vdmVDb21tYW5kKCd4dGV4dC1zYXZlJyk7XG5cdFx0XHRpZiAoc2VydmljZXMub3B0aW9ucy5lbmFibGVGb3JtYXR0aW5nQWN0aW9uKVxuXHRcdFx0XHRlZGl0b3IuY29tbWFuZHMucmVtb3ZlQ29tbWFuZCgneHRleHQtZm9ybWF0Jyk7XG5cdFx0fVxuXHRcdGlmIChzZXJ2aWNlcy5jb250ZW50QXNzaXN0U2VydmljZSlcblx0XHRcdGVkaXRvci5zZXRPcHRpb25zKHsgZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbjogZmFsc2UgfSk7XG5cdFx0dmFyIGVkaXRvckNvbnRleHQgPSBzZXJ2aWNlcy5lZGl0b3JDb250ZXh0O1xuXHRcdHZhciBhbm5vdGF0aW9ucyA9IGVkaXRvckNvbnRleHQuX2Fubm90YXRpb25zO1xuXHRcdGlmIChhbm5vdGF0aW9ucykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbm5vdGF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzZXNzaW9uLnJlbW92ZU1hcmtlcihhbm5vdGF0aW9uc1tpXS5tYXJrZXJJZCk7XG5cdFx0XHR9XG5cdFx0XHRzZXNzaW9uLnNldEFubm90YXRpb25zKFtdKTtcblx0XHR9XG5cdFx0dmFyIG9jY3VycmVuY2VNYXJrZXJzID0gZWRpdG9yQ29udGV4dC5fb2NjdXJyZW5jZU1hcmtlcnM7XG5cdFx0aWYgKG9jY3VycmVuY2VNYXJrZXJzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9jY3VycmVuY2VNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHNlc3Npb24ucmVtb3ZlTWFya2VyKG9jY3VycmVuY2VNYXJrZXJzW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZGVsZXRlIGVkaXRvci54dGV4dFNlcnZpY2VzO1xuXHR9XG5cdFxuXHQvKipcblx0ICogU3ludGF4IGhpZ2hsaWdodGluZyAod2l0aG91dCBzZW1hbnRpYyBoaWdobGlnaHRpbmcpLlxuXHQgKi9cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwU3ludGF4SGlnaGxpZ2h0aW5nID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLnNlcnZpY2VzLm9wdGlvbnM7XG5cdFx0dmFyIHNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCk7XG5cdFx0aWYgKG9wdGlvbnMuc3ludGF4RGVmaW5pdGlvbiAhPSAnbm9uZScgJiYgKG9wdGlvbnMuc3ludGF4RGVmaW5pdGlvbiB8fCBvcHRpb25zLnh0ZXh0TGFuZykpIHtcblx0XHRcdHZhciBzeW50YXhEZWZpbml0aW9uID0gb3B0aW9ucy5zeW50YXhEZWZpbml0aW9uO1xuXHRcdFx0aWYgKCFzeW50YXhEZWZpbml0aW9uKVxuXHRcdFx0XHRzeW50YXhEZWZpbml0aW9uID0gJ3h0ZXh0LXJlc291cmNlcy9tb2RlLScgKyBvcHRpb25zLnh0ZXh0TGFuZztcblx0XHRcdGlmICh0eXBlb2Yoc3ludGF4RGVmaW5pdGlvbikgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0Ly8gU2V0IGFjZSBtb2RlIHRoYXQgaGFzIGJlZW4gbG9hZGVkIGJ5IHRoZSBwbGF0Zm9ybVxuXHRcdFx0XHRcdHNlc3Npb24uc2V0TW9kZShzeW50YXhEZWZpbml0aW9uKTtcblx0XHRcdH0gZWxzZSBpZiAoc3ludGF4RGVmaW5pdGlvbi5Nb2RlKSB7XG5cdFx0XHRcdHNlc3Npb24uc2V0TW9kZShuZXcgc3ludGF4RGVmaW5pdGlvbi5Nb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XHRcblx0LyoqXG5cdCAqIERvY3VtZW50IHVwZGF0ZSBzZXJ2aWNlLlxuXHQgKi9cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwVXBkYXRlU2VydmljZSA9IGZ1bmN0aW9uKHJlZnJlc2hEb2N1bWVudCkge1xuXHRcdHZhciBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXM7XG5cdFx0dmFyIGVkaXRvckNvbnRleHQgPSBzZXJ2aWNlcy5lZGl0b3JDb250ZXh0O1xuXHRcdHZhciB0ZXh0VXBkYXRlRGVsYXkgPSBzZXJ2aWNlcy5vcHRpb25zLnRleHRVcGRhdGVEZWxheTtcblx0XHRpZiAoIXRleHRVcGRhdGVEZWxheSlcblx0XHRcdHRleHRVcGRhdGVEZWxheSA9IDUwMDtcblx0XHRzZXJ2aWNlcy5tb2RlbENoYW5nZUxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmICghZXZlbnQuX3h0ZXh0X2luaXQpXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuc2V0RGlydHkodHJ1ZSk7XG5cdFx0XHRpZiAoZWRpdG9yQ29udGV4dC5fbW9kZWxDaGFuZ2VUaW1lb3V0KVxuXHRcdFx0XHRjbGVhclRpbWVvdXQoZWRpdG9yQ29udGV4dC5fbW9kZWxDaGFuZ2VUaW1lb3V0KTtcblx0XHRcdGVkaXRvckNvbnRleHQuX21vZGVsQ2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmIChzZXJ2aWNlcy5vcHRpb25zLnNlbmRGdWxsVGV4dClcblx0XHRcdFx0XHRyZWZyZXNoRG9jdW1lbnQoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHNlcnZpY2VzLnVwZGF0ZSgpO1xuXHRcdFx0fSwgdGV4dFVwZGF0ZURlbGF5KTtcblx0XHR9XG5cdFx0aWYgKCFzZXJ2aWNlcy5vcHRpb25zLnJlc291cmNlSWQgfHwgIXNlcnZpY2VzLm9wdGlvbnMubG9hZEZyb21TZXJ2ZXIpXG5cdFx0XHRzZXJ2aWNlcy5tb2RlbENoYW5nZUxpc3RlbmVyKHtfeHRleHRfaW5pdDogdHJ1ZX0pO1xuXHRcdHRoaXMuZWRpdG9yLm9uKCdjaGFuZ2UnLCBzZXJ2aWNlcy5tb2RlbENoYW5nZUxpc3RlbmVyKTtcblx0fVxuXHRcblx0LyoqXG5cdCAqIFBlcnNpc3RlbmNlIHNlcnZpY2VzOiBsb2FkLCBzYXZlLCBhbmQgcmV2ZXJ0LlxuXHQgKi9cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwUGVyc2lzdGVuY2VTZXJ2aWNlcyA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXM7XG5cdFx0aWYgKHNlcnZpY2VzLm9wdGlvbnMuZW5hYmxlU2F2ZUFjdGlvbiAmJiB0aGlzLmVkaXRvci5jb21tYW5kcykge1xuXHRcdFx0dGhpcy5lZGl0b3IuY29tbWFuZHMuYWRkQ29tbWFuZCh7XG5cdFx0XHRcdG5hbWU6ICd4dGV4dC1zYXZlJyxcblx0XHRcdFx0YmluZEtleToge3dpbjogJ0N0cmwtUycsIG1hYzogJ0NvbW1hbmQtUyd9LFxuXHRcdFx0XHRleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcblx0XHRcdFx0XHRzZXJ2aWNlcy5zYXZlUmVzb3VyY2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdFx0XG5cdC8qKlxuXHQgKiBDb250ZW50IGFzc2lzdCBzZXJ2aWNlLlxuXHQgKi9cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwQ29udGVudEFzc2lzdFNlcnZpY2UgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29tcGxldGVyID0ge1xuXHRcdFx0Z2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGVkaXRvciwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuZWNsaXBzZS5vcmcvYnVncy9zaG93X2J1Zy5jZ2k/aWQ9NDg2NjE1XG5cdFx0XHRcdHZhciBzZXJ2aWNlcyA9IGVkaXRvci54dGV4dFNlcnZpY2VzO1xuXHRcdFx0XHR2YXIgcGFyYW1zID0gU2VydmljZUJ1aWxkZXIuY29weShzZXJ2aWNlcy5vcHRpb25zKTtcblx0XHRcdFx0dmFyIGRvY3VtZW50ID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpO1xuXHRcdFx0XHRwYXJhbXMub2Zmc2V0ID0gZG9jdW1lbnQucG9zaXRpb25Ub0luZGV4KHBvcyk7XG5cdFx0XHRcdHZhciByYW5nZSA9IGVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpO1xuXHRcdFx0XHRwYXJhbXMuc2VsZWN0aW9uID0ge1xuXHRcdFx0XHRcdHN0YXJ0OiBkb2N1bWVudC5wb3NpdGlvblRvSW5kZXgocmFuZ2Uuc3RhcnQpLFxuXHRcdFx0XHRcdGVuZDogZG9jdW1lbnQucG9zaXRpb25Ub0luZGV4KHJhbmdlLmVuZClcblx0XHRcdFx0fTtcblx0XHRcdFx0c2VydmljZXMuY29udGVudEFzc2lzdFNlcnZpY2UuaW52b2tlKHNlcnZpY2VzLmVkaXRvckNvbnRleHQsIHBhcmFtcykuZG9uZShmdW5jdGlvbihlbnRyaWVzKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnksIGluZGV4LCBhKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHR2YWx1ZTogZW50cnkucHJvcG9zYWwsXG5cdFx0XHRcdFx0XHRcdGNhcHRpb246IChlbnRyeS5sYWJlbCA/IGVudHJ5LmxhYmVsIDogZW50cnkucHJvcG9zYWwpLFxuXHRcdFx0XHRcdFx0XHRtZXRhOiBlbnRyeS5kZXNjcmlwdGlvbixcblx0XHRcdFx0XHRcdFx0c2NvcmU6IGEubGVuZ3RoIC0gaW5kZXhcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5lZGl0b3Iuc2V0T3B0aW9ucyh7IGVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb246IFtjb21wbGV0ZXJdIH0pO1xuXHR9XG5cdFxuXHQvKipcblx0ICogQWRkIGEgcHJvYmxlbSBtYXJrZXIgdG8gYW4gZWRpdG9yIHNlc3Npb24uXG5cdCAqL1xuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuX2FkZE1hcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24sIHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQsIGNsYXp6LCB0eXBlKSB7XG5cdFx0dmFyIGRvY3VtZW50ID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpO1xuXHRcdHZhciBzdGFydCA9IGRvY3VtZW50LmluZGV4VG9Qb3NpdGlvbihzdGFydE9mZnNldCk7XG5cdFx0dmFyIGVuZCA9IGRvY3VtZW50LmluZGV4VG9Qb3NpdGlvbihlbmRPZmZzZXQpO1xuXHRcdHZhciBtUmFuZ2UgPSByZXF1aXJlKCdhY2UvcmFuZ2UnKTtcblx0XHQvL3ZhciBtUmFuZ2UgPSByZXF1aXJlKCdhY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZScpO1xuXHRcdHZhciByYW5nZSA9IG5ldyBtUmFuZ2UuUmFuZ2Uoc3RhcnQucm93LCBzdGFydC5jb2x1bW4sIGVuZC5yb3csIGVuZC5jb2x1bW4pO1xuXHRcdHJldHVybiBzZXNzaW9uLmFkZE1hcmtlcihyYW5nZSwgJ3h0ZXh0LW1hcmtlcl8nICsgY2xhenosICd0ZXh0Jyk7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBWYWxpZGF0aW9uIHNlcnZpY2UuXG5cdCAqL1xuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuZG9WYWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcblx0XHR2YXIgZWRpdG9yQ29udGV4dCA9IHNlcnZpY2VzLmVkaXRvckNvbnRleHQ7XG5cdFx0dmFyIHNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCk7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHNlcnZpY2VzLnZhbGlkYXRlKCkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGFubm90YXRpb25zID0gZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnM7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbnMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbm5vdGF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbaV07XG5cdFx0XHRcdFx0c2Vzc2lvbi5yZW1vdmVNYXJrZXIoYW5ub3RhdGlvbi5tYXJrZXJJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVkaXRvckNvbnRleHQuX2Fubm90YXRpb25zID0gW107XG5cdFx0fSkuZG9uZShmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmlzc3Vlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZW50cnkgPSByZXN1bHQuaXNzdWVzW2ldO1xuXHRcdFx0XHR2YXIgbWFya2VyID0gc2VsZi5fYWRkTWFya2VyKHNlc3Npb24sIGVudHJ5Lm9mZnNldCwgZW50cnkub2Zmc2V0ICsgZW50cnkubGVuZ3RoLCBlbnRyeS5zZXZlcml0eSk7XG5cdFx0XHRcdHZhciBzdGFydCA9IHNlc3Npb24uZ2V0RG9jdW1lbnQoKS5pbmRleFRvUG9zaXRpb24oZW50cnkub2Zmc2V0KTtcblx0XHRcdFx0ZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnMucHVzaCh7XG5cdFx0XHRcdFx0cm93OiBzdGFydC5yb3csXG5cdFx0XHRcdFx0Y29sdW1uOiBzdGFydC5jb2x1bW4sXG5cdFx0XHRcdFx0dGV4dDogZW50cnkuZGVzY3JpcHRpb24sXG5cdFx0XHRcdFx0dHlwZTogZW50cnkuc2V2ZXJpdHksXG5cdFx0XHRcdFx0bWFya2VySWQ6IG1hcmtlclxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdFx0XG5cdC8qKlxuXHQgKiBPY2N1cnJlbmNlcyBzZXJ2aWNlLlxuXHQgKi9cblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwT2NjdXJyZW5jZXNTZXJ2aWNlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcblx0XHR2YXIgZWRpdG9yQ29udGV4dCA9IHNlcnZpY2VzLmVkaXRvckNvbnRleHQ7XG5cdFx0dmFyIHNlbGVjdGlvblVwZGF0ZURlbGF5ID0gc2VydmljZXMub3B0aW9ucy5zZWxlY3Rpb25VcGRhdGVEZWxheTtcblx0XHRpZiAoIXNlbGVjdGlvblVwZGF0ZURlbGF5KVxuXHRcdFx0c2VsZWN0aW9uVXBkYXRlRGVsYXkgPSA1NTA7XG5cdFx0dmFyIGVkaXRvciA9IHRoaXMuZWRpdG9yO1xuXHRcdHZhciBzZXNzaW9uID0gZWRpdG9yLmdldFNlc3Npb24oKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0c2VydmljZXMuY2hhbmdlQ3Vyc29yTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChlZGl0b3JDb250ZXh0Ll9zZWxlY3Rpb25DaGFuZ2VUaW1lb3V0KSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChlZGl0b3JDb250ZXh0Ll9zZWxlY3Rpb25DaGFuZ2VUaW1lb3V0KTtcblx0XHRcdH1cblx0XHRcdGVkaXRvckNvbnRleHQuX3NlbGVjdGlvbkNoYW5nZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcGFyYW1zID0gU2VydmljZUJ1aWxkZXIuY29weShzZXJ2aWNlcy5vcHRpb25zKTtcblx0XHRcdFx0cGFyYW1zLm9mZnNldCA9IHNlc3Npb24uZ2V0RG9jdW1lbnQoKS5wb3NpdGlvblRvSW5kZXgoZWRpdG9yLmdldFNlbGVjdGlvbigpLmdldEN1cnNvcigpKTtcblx0XHRcdFx0c2VydmljZXMub2NjdXJyZW5jZXNTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMpLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgb2NjdXJyZW5jZU1hcmtlcnMgPSBlZGl0b3JDb250ZXh0Ll9vY2N1cnJlbmNlTWFya2Vycztcblx0XHRcdFx0XHRpZiAob2NjdXJyZW5jZU1hcmtlcnMpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2NjdXJyZW5jZU1hcmtlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIG1hcmtlciA9IG9jY3VycmVuY2VNYXJrZXJzW2ldO1xuXHRcdFx0XHRcdFx0XHRzZXNzaW9uLnJlbW92ZU1hcmtlcihtYXJrZXIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlZGl0b3JDb250ZXh0Ll9vY2N1cnJlbmNlTWFya2VycyA9IFtdO1xuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKG9jY3VycmVuY2VzUmVzdWx0KSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvY2N1cnJlbmNlc1Jlc3VsdC5yZWFkUmVnaW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHJlZ2lvbiA9IG9jY3VycmVuY2VzUmVzdWx0LnJlYWRSZWdpb25zW2ldO1xuXHRcdFx0XHRcdFx0dmFyIG1hcmtlciA9IHNlbGYuX2FkZE1hcmtlcihzZXNzaW9uLCByZWdpb24ub2Zmc2V0LCByZWdpb24ub2Zmc2V0ICsgcmVnaW9uLmxlbmd0aCwgJ3JlYWQnKTtcblx0XHRcdFx0XHRcdGVkaXRvckNvbnRleHQuX29jY3VycmVuY2VNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvY2N1cnJlbmNlc1Jlc3VsdC53cml0ZVJlZ2lvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciByZWdpb24gPSBvY2N1cnJlbmNlc1Jlc3VsdC53cml0ZVJlZ2lvbnNbaV07XG5cdFx0XHRcdFx0XHR2YXIgbWFya2VyID0gc2VsZi5fYWRkTWFya2VyKHNlc3Npb24sIHJlZ2lvbi5vZmZzZXQsIHJlZ2lvbi5vZmZzZXQgKyByZWdpb24ubGVuZ3RoLCAnd3JpdGUnKTtcblx0XHRcdFx0XHRcdGVkaXRvckNvbnRleHQuX29jY3VycmVuY2VNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSwgc2VsZWN0aW9uVXBkYXRlRGVsYXkpO1xuXHRcdH07XG5cdFx0ZWRpdG9yLmdldFNlbGVjdGlvbigpLm9uKCdjaGFuZ2VDdXJzb3InLCBzZXJ2aWNlcy5jaGFuZ2VDdXJzb3JMaXN0ZW5lcik7XG5cdH1cblx0XHRcblx0LyoqXG5cdCAqIEZvcm1hdHRpbmcgc2VydmljZS5cblx0ICovXG5cdEFjZVNlcnZpY2VCdWlsZGVyLnByb3RvdHlwZS5zZXR1cEZvcm1hdHRpbmdTZXJ2aWNlID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcblx0XHRpZiAoc2VydmljZXMub3B0aW9ucy5lbmFibGVGb3JtYXR0aW5nQWN0aW9uICYmIHRoaXMuZWRpdG9yLmNvbW1hbmRzKSB7XG5cdFx0XHR0aGlzLmVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kKHtcblx0XHRcdFx0bmFtZTogJ3h0ZXh0LWZvcm1hdCcsXG5cdFx0XHRcdGJpbmRLZXk6IHt3aW46ICdDdHJsLVNoaWZ0LUYnLCBtYWM6ICdDb21tYW5kLVNoaWZ0LUYnfSxcblx0XHRcdFx0ZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG5cdFx0XHRcdFx0c2VydmljZXMuZm9ybWF0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRcblx0cmV0dXJuIGV4cG9ydHM7XG59KTtcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=