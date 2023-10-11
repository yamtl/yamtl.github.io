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
				var mRange = __webpack_require__(/*! ace/range */ "./node_modules/ace-builds/src-noconflict/ace.js");
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
			var mRange = __webpack_require__(/*! ace/range */ "./node_modules/ace-builds/src-noconflict/ace.js");
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
    __webpack_require__(/*! ace-builds/src-noconflict/ace */ "./node_modules/ace-builds/src-noconflict/ace.js"),
    __webpack_require__(/*! ace-builds/src-noconflict/ace */ "./node_modules/ace-builds/src-noconflict/ace.js"),
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
		var mRange = __webpack_require__(/*! ace/range */ "./node_modules/ace-builds/src-noconflict/ace.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3h0ZXh0XzJfMzFfMF94dGV4dC1hY2VfanMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUE2QixFQUFFLGdDQUFFO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRMQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBcUMsQ0FBQywwRUFBUSxDQUFDLGdDQUFFO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsT0FBTztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQix3Q0FBd0M7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLGtFQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhCQUE4QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHFCQUFxQiwwQ0FBMEM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQUEsa0dBQUM7QUFDRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWRlbmV0LWVkdWNhdGlvbnBsYXRmb3JtLy4vc3JjL3h0ZXh0LzIuMzEuMC94dGV4dC1hY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKiBNREVOZXQgLSBtb2RpZmllZCB0byBzdXBwb3J0IFh0ZXh0IGluY2x1c2lvbiBpbiBFZHVjYXRpb24gUGxhdGZvcm0gICovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L2NvbXBhdGliaWxpdHknLFtdLCBmdW5jdGlvbigpIHtcclxuXHRcclxuXHRpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XHJcblx0XHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpXHJcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignYmluZCB0YXJnZXQgaXMgbm90IGNhbGxhYmxlJyk7XHJcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdFx0dmFyIHVuYm91bmRGdW5jID0gdGhpcztcclxuXHRcdFx0dmFyIG5vcEZ1bmMgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0XHRib3VuZEZ1bmMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgbG9jYWxBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRcdFx0XHRyZXR1cm4gdW5ib3VuZEZ1bmMuYXBwbHkodGhpcyBpbnN0YW5jZW9mIG5vcEZ1bmMgPyB0aGlzIDogdGFyZ2V0LFxyXG5cdFx0XHRcdFx0XHRhcmdzLmNvbmNhdChsb2NhbEFyZ3MpKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0bm9wRnVuYy5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcclxuXHRcdFx0Ym91bmRGdW5jLnByb3RvdHlwZSA9IG5ldyBub3BGdW5jKCk7XHJcblx0XHRcdHJldHVybiBib3VuZEZ1bmM7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xyXG5cdFx0QXJyYXkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcblx0XHRcdGlmICh0aGlzID09IG51bGwpXHJcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBpcyBudWxsJyk7XHJcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpXHJcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignY2FsbGJhY2sgaXMgbm90IGNhbGxhYmxlJyk7XHJcblx0XHRcdHZhciBzcmNBcnJheSA9IE9iamVjdCh0aGlzKTtcclxuXHRcdFx0dmFyIGxlbiA9IHNyY0FycmF5Lmxlbmd0aCA+Pj4gMDtcclxuXHRcdFx0dmFyIHRndEFycmF5ID0gbmV3IEFycmF5KGxlbik7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoaSBpbiBzcmNBcnJheSlcclxuXHRcdFx0XHRcdHRndEFycmF5W2ldID0gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBzcmNBcnJheVtpXSwgaSwgc3JjQXJyYXkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0Z3RBcnJheTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0aWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xyXG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xyXG5cdFx0XHRpZiAodGhpcyA9PSBudWxsKVxyXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCcpO1xyXG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIGlzIG5vdCBjYWxsYWJsZScpO1xyXG5cdFx0XHR2YXIgc3JjQXJyYXkgPSBPYmplY3QodGhpcyk7XHJcblx0XHRcdHZhciBsZW4gPSBzcmNBcnJheS5sZW5ndGggPj4+IDA7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoaSBpbiBzcmNBcnJheSlcclxuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc0FyZywgc3JjQXJyYXlbaV0sIGksIHNyY0FycmF5KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZXR1cm4ge307XHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1LCAyMDE3IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsWydqcXVlcnknXSwgZnVuY3Rpb24oalF1ZXJ5KSB7XHJcblx0XHJcblx0dmFyIGdsb2JhbFN0YXRlID0ge307XHJcblx0XHJcblx0LyoqXHJcblx0ICogR2VuZXJpYyBzZXJ2aWNlIGltcGxlbWVudGF0aW9uIHRoYXQgY2FuIHNlcnZlIGFzIHN1cGVyY2xhc3MgZm9yIHNwZWNpYWxpemVkIHNlcnZpY2VzLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIFh0ZXh0U2VydmljZSgpIHt9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSByZXF1ZXN0IG1ldGFkYXRhIGZvciB0aGlzIHNlcnZpY2UgY2xhc3MuIFR3byB2YXJpYW50czpcclxuXHQgKiAgLSBpbml0aWFsaXplKHNlcnZpY2VVcmwsIHNlcnZpY2VUeXBlLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKVxyXG5cdCAqICAtIGluaXRpYWxpemUoeHRleHRTZXJ2aWNlcywgc2VydmljZVR5cGUpXHJcblx0ICovXHJcblx0WHRleHRTZXJ2aWNlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLl9zZXJ2aWNlVHlwZSA9IGFyZ3VtZW50c1sxXTtcclxuXHRcdGlmICh0eXBlb2YoYXJndW1lbnRzWzBdKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0dGhpcy5fcmVxdWVzdFVybCA9IGFyZ3VtZW50c1swXSArICcvJyArIHRoaXMuX3NlcnZpY2VUeXBlO1xyXG5cdFx0XHR2YXIgcmVzb3VyY2VJZCA9IGFyZ3VtZW50c1syXTtcclxuXHRcdFx0aWYgKHJlc291cmNlSWQpXHJcblx0XHRcdFx0dGhpcy5fZW5jb2RlZFJlc291cmNlSWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVzb3VyY2VJZCk7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZVNlcnZpY2UgPSBhcmd1bWVudHNbM107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgeHRleHRTZXJ2aWNlcyA9IGFyZ3VtZW50c1swXTtcclxuXHRcdFx0aWYgKHh0ZXh0U2VydmljZXMub3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMuX3JlcXVlc3RVcmwgPSB4dGV4dFNlcnZpY2VzLm9wdGlvbnMuc2VydmljZVVybCArICcvJyArIHRoaXMuX3NlcnZpY2VUeXBlO1xyXG5cdFx0XHRcdHZhciByZXNvdXJjZUlkID0geHRleHRTZXJ2aWNlcy5vcHRpb25zLnJlc291cmNlSWQ7XHJcblx0XHRcdFx0aWYgKHJlc291cmNlSWQpXHJcblx0XHRcdFx0XHR0aGlzLl9lbmNvZGVkUmVzb3VyY2VJZCA9IGVuY29kZVVSSUNvbXBvbmVudChyZXNvdXJjZUlkKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl91cGRhdGVTZXJ2aWNlID0geHRleHRTZXJ2aWNlcy51cGRhdGVTZXJ2aWNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRYdGV4dFNlcnZpY2UucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGUpIHtcclxuXHRcdHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEludm9rZSB0aGUgc2VydmljZSB3aXRoIGRlZmF1bHQgc2VydmljZSBiZWhhdmlvci5cclxuXHQgKi9cclxuXHRYdGV4dFNlcnZpY2UucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQsIGNhbGxiYWNrcykge1xyXG5cdFx0aWYgKGRlZmVycmVkID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHRcdH1cclxuXHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbih0aGlzLl9jaGVja1ByZWNvbmRpdGlvbnMpICYmICF0aGlzLl9jaGVja1ByZWNvbmRpdGlvbnMoZWRpdG9yQ29udGV4dCwgcGFyYW1zKSkge1xyXG5cdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdH1cclxuXHRcdHZhciBzZXJ2ZXJEYXRhID0ge1xyXG5cdFx0XHRjb250ZW50VHlwZTogcGFyYW1zLmNvbnRlbnRUeXBlXHJcblx0XHR9O1xyXG5cdFx0dmFyIGluaXRSZXN1bHQ7XHJcblx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24odGhpcy5faW5pdFNlcnZlckRhdGEpKVxyXG5cdFx0XHRpbml0UmVzdWx0ID0gdGhpcy5faW5pdFNlcnZlckRhdGEoc2VydmVyRGF0YSwgZWRpdG9yQ29udGV4dCwgcGFyYW1zKTtcclxuXHRcdHZhciBodHRwTWV0aG9kID0gJ0dFVCc7XHJcblx0XHRpZiAoaW5pdFJlc3VsdCAmJiBpbml0UmVzdWx0Lmh0dHBNZXRob2QpXHJcblx0XHRcdGh0dHBNZXRob2QgPSBpbml0UmVzdWx0Lmh0dHBNZXRob2Q7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRpZiAoIShpbml0UmVzdWx0ICYmIGluaXRSZXN1bHQuc3VwcHJlc3NDb250ZW50KSkge1xyXG5cdFx0XHRpZiAocGFyYW1zLnNlbmRGdWxsVGV4dCkge1xyXG5cdFx0XHRcdHNlcnZlckRhdGEuZnVsbFRleHQgPSBlZGl0b3JDb250ZXh0LmdldFRleHQoKTtcclxuXHRcdFx0XHRodHRwTWV0aG9kID0gJ1BPU1QnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xyXG5cdFx0XHRcdGlmIChrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLl91cGRhdGVTZXJ2aWNlKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGtub3duU2VydmVyU3RhdGUuc3RhdGVJZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRzZXJ2ZXJEYXRhLnJlcXVpcmVkU3RhdGVJZCA9IGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIG9uU3VjY2VzcztcclxuXHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbih0aGlzLl9nZXRTdWNjZXNzQ2FsbGJhY2spKSB7XHJcblx0XHRcdG9uU3VjY2VzcyA9IHRoaXMuX2dldFN1Y2Nlc3NDYWxsYmFjayhlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9uU3VjY2VzcyA9IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0XHRcdGlmIChyZXN1bHQuY29uZmxpY3QpIHtcclxuXHRcdFx0XHRcdGlmIChzZWxmLl9pbmNyZWFzZVJlY3Vyc2lvbkNvdW50KGVkaXRvckNvbnRleHQpKSB7XHJcblx0XHRcdFx0XHRcdHZhciBvbkNvbmZsaWN0UmVzdWx0O1xyXG5cdFx0XHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24oc2VsZi5fb25Db25mbGljdCkpIHtcclxuXHRcdFx0XHRcdFx0XHRvbkNvbmZsaWN0UmVzdWx0ID0gc2VsZi5fb25Db25mbGljdChlZGl0b3JDb250ZXh0LCByZXN1bHQuY29uZmxpY3QpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICghKG9uQ29uZmxpY3RSZXN1bHQgJiYgb25Db25mbGljdFJlc3VsdC5zdXBwcmVzc0ZvcmNlZFVwZGF0ZSkgJiYgIXBhcmFtcy5zZW5kRnVsbFRleHRcclxuXHRcdFx0XHRcdFx0XHRcdCYmIHJlc3VsdC5jb25mbGljdCA9PSAnaW52YWxpZFN0YXRlSWQnICYmIHNlbGYuX3VwZGF0ZVNlcnZpY2UpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLl91cGRhdGVTZXJ2aWNlLmFkZENvbXBsZXRpb25DYWxsYmFjayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLl91cGRhdGVTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHNlbGYuX3Byb2Nlc3NSZXN1bHQpKSB7XHJcblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2VkUmVzdWx0ID0gc2VsZi5fcHJvY2Vzc1Jlc3VsdChyZXN1bHQsIGVkaXRvckNvbnRleHQpO1xyXG5cdFx0XHRcdFx0aWYgKHByb2Nlc3NlZFJlc3VsdCkge1xyXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHByb2Nlc3NlZFJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBvbkVycm9yID0gZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG5cdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSA0MDQgJiYgIXBhcmFtcy5sb2FkRnJvbVNlcnZlciAmJiBzZWxmLl9pbmNyZWFzZVJlY3Vyc2lvbkNvdW50KGVkaXRvckNvbnRleHQpKSB7XHJcblx0XHRcdFx0dmFyIG9uQ29uZmxpY3RSZXN1bHQ7XHJcblx0XHRcdFx0aWYgKGpRdWVyeS5pc0Z1bmN0aW9uKHNlbGYuX29uQ29uZmxpY3QpKSB7XHJcblx0XHRcdFx0XHRvbkNvbmZsaWN0UmVzdWx0ID0gc2VsZi5fb25Db25mbGljdChlZGl0b3JDb250ZXh0LCBlcnJvclRocm93bik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xyXG5cdFx0XHRcdGlmICghKG9uQ29uZmxpY3RSZXN1bHQgJiYgb25Db25mbGljdFJlc3VsdC5zdXBwcmVzc0ZvcmNlZFVwZGF0ZSlcclxuXHRcdFx0XHRcdFx0JiYga25vd25TZXJ2ZXJTdGF0ZS50ZXh0ICE9PSB1bmRlZmluZWQgJiYgc2VsZi5fdXBkYXRlU2VydmljZSkge1xyXG5cdFx0XHRcdFx0c2VsZi5fdXBkYXRlU2VydmljZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcclxuXHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycm9yVGhyb3duKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2VsZi5zZW5kUmVxdWVzdChlZGl0b3JDb250ZXh0LCB7XHJcblx0XHRcdHR5cGU6IGh0dHBNZXRob2QsXHJcblx0XHRcdGRhdGE6IHNlcnZlckRhdGEsXHJcblx0XHRcdHN1Y2Nlc3M6IG9uU3VjY2VzcyxcclxuXHRcdFx0ZXJyb3I6IG9uRXJyb3JcclxuXHRcdH0sICFwYXJhbXMuc2VuZEZ1bGxUZXh0KTtcclxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCkuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZWxmLl9yZWN1cnNpb25Db3VudCA9IHVuZGVmaW5lZDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2VuZCBhbiBIVFRQIHJlcXVlc3QgdG8gaW52b2tlIHRoZSBzZXJ2aWNlLlxyXG5cdCAqL1xyXG5cdFh0ZXh0U2VydmljZS5wcm90b3R5cGUuc2VuZFJlcXVlc3QgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBzZXR0aW5ncywgbmVlZHNTZXNzaW9uKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRzZWxmLnNldFN0YXRlKCdzdGFydGVkJyk7XHJcblx0XHR2YXIgY29yc0VuYWJsZWQgPSBlZGl0b3JDb250ZXh0Lnh0ZXh0U2VydmljZXMub3B0aW9uc1snZW5hYmxlQ29ycyddO1xyXG5cdFx0aWYoY29yc0VuYWJsZWQpIHtcclxuXHRcdFx0c2V0dGluZ3MuY3Jvc3NEb21haW4gPSB0cnVlO1xyXG5cdFx0XHRzZXR0aW5ncy54aHJGaWVsZHMgPSB7d2l0aENyZWRlbnRpYWxzOiB0cnVlfTtcclxuXHRcdH0gXHJcblx0XHR2YXIgb25TdWNjZXNzID0gc2V0dGluZ3Muc3VjY2VzcztcclxuXHRcdHNldHRpbmdzLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0dmFyIGFjY2VwdGVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKGpRdWVyeS5pc0Z1bmN0aW9uKG9uU3VjY2VzcykpIHtcclxuXHRcdFx0XHRhY2NlcHRlZCA9IG9uU3VjY2VzcyhyZXN1bHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhY2NlcHRlZCB8fCBhY2NlcHRlZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0c2VsZi5zZXRTdGF0ZSgnZmluaXNoZWQnKTtcclxuXHRcdFx0XHRpZiAoZWRpdG9yQ29udGV4dC54dGV4dFNlcnZpY2VzKSB7XHJcblx0XHRcdFx0XHR2YXIgc3VjY2Vzc0xpc3RlbmVycyA9IGVkaXRvckNvbnRleHQueHRleHRTZXJ2aWNlcy5zdWNjZXNzTGlzdGVuZXJzO1xyXG5cdFx0XHRcdFx0aWYgKHN1Y2Nlc3NMaXN0ZW5lcnMpIHtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdWNjZXNzTGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGxpc3RlbmVyID0gc3VjY2Vzc0xpc3RlbmVyc1tpXTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoalF1ZXJ5LmlzRnVuY3Rpb24obGlzdGVuZXIpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRsaXN0ZW5lcihzZWxmLl9zZXJ2aWNlVHlwZSwgcmVzdWx0KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRcclxuXHRcdHZhciBvbkVycm9yID0gc2V0dGluZ3MuZXJyb3I7XHJcblx0XHRzZXR0aW5ncy5lcnJvciA9IGZ1bmN0aW9uKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHRcdFx0dmFyIHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbihvbkVycm9yKSkge1xyXG5cdFx0XHRcdHJlc29sdmVkID0gb25FcnJvcih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXJlc29sdmVkKSB7XHJcblx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdHNlbGYuX3JlcG9ydEVycm9yKGVkaXRvckNvbnRleHQsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duLCB4aHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0XHJcblx0XHRzZXR0aW5ncy5hc3luYyA9IHRydWU7XHJcblx0XHR2YXIgcmVxdWVzdFVybCA9IHNlbGYuX3JlcXVlc3RVcmw7XHJcblx0XHRpZiAoIXNldHRpbmdzLmRhdGEucmVzb3VyY2UgJiYgc2VsZi5fZW5jb2RlZFJlc291cmNlSWQpIHtcclxuXHRcdFx0aWYgKHJlcXVlc3RVcmwuaW5kZXhPZignPycpID49IDApXHJcblx0XHRcdFx0cmVxdWVzdFVybCArPSAnJnJlc291cmNlPScgKyBzZWxmLl9lbmNvZGVkUmVzb3VyY2VJZDtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJlcXVlc3RVcmwgKz0gJz9yZXNvdXJjZT0nICsgc2VsZi5fZW5jb2RlZFJlc291cmNlSWQ7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmIChuZWVkc1Nlc3Npb24gJiYgZ2xvYmFsU3RhdGUuX2luaXRQZW5kaW5nKSB7XHJcblx0XHRcdC8vIFdlIGhhdmUgdG8gd2FpdCB1bnRpbCB0aGUgaW5pdGlhbCByZXF1ZXN0IGhhcyBmaW5pc2hlZCB0byBtYWtlIHN1cmUgdGhlIGNsaWVudCBoYXNcclxuXHRcdFx0Ly8gcmVjZWl2ZWQgYSB2YWxpZCBzZXNzaW9uIGlkXHJcblx0XHRcdGlmICghZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cylcclxuXHRcdFx0XHRnbG9iYWxTdGF0ZS5fd2FpdGluZ1JlcXVlc3RzID0gW107XHJcblx0XHRcdGdsb2JhbFN0YXRlLl93YWl0aW5nUmVxdWVzdHMucHVzaCh7cmVxdWVzdFVybDogcmVxdWVzdFVybCwgc2V0dGluZ3M6IHNldHRpbmdzfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAobmVlZHNTZXNzaW9uICYmICFnbG9iYWxTdGF0ZS5faW5pdERvbmUpIHtcclxuXHRcdFx0XHRnbG9iYWxTdGF0ZS5faW5pdFBlbmRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdHZhciBvbkNvbXBsZXRlID0gc2V0dGluZ3MuY29tcGxldGU7XHJcblx0XHRcdFx0c2V0dGluZ3MuY29tcGxldGUgPSBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcclxuXHRcdFx0XHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbihvbkNvbXBsZXRlKSkge1xyXG5cdFx0XHRcdFx0XHRvbkNvbXBsZXRlKHhociwgdGV4dFN0YXR1cyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRkZWxldGUgZ2xvYmFsU3RhdGUuX2luaXRQZW5kaW5nO1xyXG5cdFx0XHRcdFx0Z2xvYmFsU3RhdGUuX2luaXREb25lID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGlmIChnbG9iYWxTdGF0ZS5fd2FpdGluZ1JlcXVlc3RzKSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXF1ZXN0ID0gZ2xvYmFsU3RhdGUuX3dhaXRpbmdSZXF1ZXN0c1tpXTtcclxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuYWpheChyZXF1ZXN0LnJlcXVlc3RVcmwsIHJlcXVlc3Quc2V0dGluZ3MpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBnbG9iYWxTdGF0ZS5fd2FpdGluZ1JlcXVlc3RzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRqUXVlcnkuYWpheChyZXF1ZXN0VXJsLCBzZXR0aW5ncyk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFVzZSB0aGlzIGluIGNhc2Ugb2YgYSBjb25mbGljdCBiZWZvcmUgcmV0cnlpbmcgdGhlIHNlcnZpY2UgaW52b2NhdGlvbi4gSWYgdGhlIG51bWJlclxyXG5cdCAqIG9mIHJldHJpZXMgZXhjZWVkcyB0aGUgbGltaXQsIGFuIGVycm9yIGlzIHJlcG9ydGVkIGFuZCB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZS5cclxuXHQgKi9cclxuXHRYdGV4dFNlcnZpY2UucHJvdG90eXBlLl9pbmNyZWFzZVJlY3Vyc2lvbkNvdW50ID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCkge1xyXG5cdFx0aWYgKHRoaXMuX3JlY3Vyc2lvbkNvdW50ID09PSB1bmRlZmluZWQpXHJcblx0XHRcdHRoaXMuX3JlY3Vyc2lvbkNvdW50ID0gMTtcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5fcmVjdXJzaW9uQ291bnQrKztcclxuXHJcblx0XHRpZiAodGhpcy5fcmVjdXJzaW9uQ291bnQgPj0gMTApIHtcclxuXHRcdFx0dGhpcy5fcmVwb3J0RXJyb3IoZWRpdG9yQ29udGV4dCwgJ3dhcm5pbmcnLCAnWHRleHQgc2VydmljZSByZXF1ZXN0IGZhaWxlZCBhZnRlciAxMCBhdHRlbXB0cy4nLCB7fSk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblx0XHJcblx0LyoqXHJcblx0ICogUmVwb3J0IGFuIGVycm9yIHRvIHRoZSBsaXN0ZW5lcnMuXHJcblx0ICovXHJcblx0WHRleHRTZXJ2aWNlLnByb3RvdHlwZS5fcmVwb3J0RXJyb3IgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBzZXZlcml0eSwgbWVzc2FnZSwgcmVxdWVzdERhdGEpIHtcclxuXHRcdGlmIChlZGl0b3JDb250ZXh0Lnh0ZXh0U2VydmljZXMpIHtcclxuXHRcdFx0dmFyIGVycm9yTGlzdGVuZXJzID0gZWRpdG9yQ29udGV4dC54dGV4dFNlcnZpY2VzLmVycm9yTGlzdGVuZXJzO1xyXG5cdFx0XHRpZiAoZXJyb3JMaXN0ZW5lcnMpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yTGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlcnJvckxpc3RlbmVyc1tpXTtcclxuXHRcdFx0XHRcdGlmIChqUXVlcnkuaXNGdW5jdGlvbihsaXN0ZW5lcikpIHtcclxuXHRcdFx0XHRcdFx0bGlzdGVuZXIodGhpcy5fc2VydmljZVR5cGUsIHNldmVyaXR5LCBtZXNzYWdlLCByZXF1ZXN0RGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBYdGV4dFNlcnZpY2U7XHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0xvYWRSZXNvdXJjZVNlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIGxvYWRpbmcgcmVzb3VyY2VzLiBUaGUgcmVzdWx0aW5nIHRleHQgaXMgcGFzc2VkIHRvIHRoZSBlZGl0b3IgY29udGV4dC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBMb2FkUmVzb3VyY2VTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQsIHJldmVydCkge1xyXG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsIHJldmVydCA/ICdyZXZlcnQnIDogJ2xvYWQnLCByZXNvdXJjZUlkKTtcclxuXHR9O1xyXG5cclxuXHRMb2FkUmVzb3VyY2VTZXJ2aWNlLnByb3RvdHlwZSA9IG5ldyBYdGV4dFNlcnZpY2UoKTtcclxuXHRcclxuXHRMb2FkUmVzb3VyY2VTZXJ2aWNlLnByb3RvdHlwZS5faW5pdFNlcnZlckRhdGEgPSBmdW5jdGlvbihzZXJ2ZXJEYXRhLCBlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHN1cHByZXNzQ29udGVudDogdHJ1ZSxcclxuXHRcdFx0aHR0cE1ldGhvZDogdGhpcy5fc2VydmljZVR5cGUgPT0gJ3JldmVydCcgPyAnUE9TVCcgOiAnR0VUJ1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdFxyXG5cdExvYWRSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlLl9nZXRTdWNjZXNzQ2FsbGJhY2sgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBwYXJhbXMsIGRlZmVycmVkKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24ocmVzdWx0KSB7XHJcblx0XHRcdGVkaXRvckNvbnRleHQuc2V0VGV4dChyZXN1bHQuZnVsbFRleHQpO1xyXG5cdFx0XHRlZGl0b3JDb250ZXh0LmNsZWFyVW5kb1N0YWNrKCk7XHJcblx0XHRcdGVkaXRvckNvbnRleHQuc2V0RGlydHkocmVzdWx0LmRpcnR5KTtcclxuXHRcdFx0dmFyIGxpc3RlbmVycyA9IGVkaXRvckNvbnRleHQudXBkYXRlU2VydmVyU3RhdGUocmVzdWx0LmZ1bGxUZXh0LCByZXN1bHQuc3RhdGVJZCk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGlzdGVuZXJzW2ldKHBhcmFtcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIExvYWRSZXNvdXJjZVNlcnZpY2U7XHJcbn0pO1xyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cclxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXHJcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcclxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxyXG4gKlxyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmRlZmluZSgneHRleHQvc2VydmljZXMvU2F2ZVJlc291cmNlU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogU2VydmljZSBjbGFzcyBmb3Igc2F2aW5nIHJlc291cmNlcy5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBTYXZlUmVzb3VyY2VTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnc2F2ZScsIHJlc291cmNlSWQpO1xyXG5cdH07XHJcblxyXG5cdFNhdmVSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xyXG5cclxuXHRTYXZlUmVzb3VyY2VTZXJ2aWNlLnByb3RvdHlwZS5faW5pdFNlcnZlckRhdGEgPSBmdW5jdGlvbihzZXJ2ZXJEYXRhLCBlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGh0dHBNZXRob2Q6ICdQT1NUJ1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdFxyXG5cdFNhdmVSZXNvdXJjZVNlcnZpY2UucHJvdG90eXBlLl9wcm9jZXNzUmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0LCBlZGl0b3JDb250ZXh0KSB7XHJcblx0XHRlZGl0b3JDb250ZXh0LnNldERpcnR5KGZhbHNlKTtcclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBTYXZlUmVzb3VyY2VTZXJ2aWNlO1xyXG59KTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0hpZ2hsaWdodGluZ1NlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIHNlbWFudGljIGhpZ2hsaWdodGluZy5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBIaWdobGlnaHRpbmdTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnaGlnaGxpZ2h0JywgcmVzb3VyY2VJZCk7XHJcblx0fTtcclxuXHJcblx0SGlnaGxpZ2h0aW5nU2VydmljZS5wcm90b3R5cGUgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XHJcblx0XHJcblx0SGlnaGxpZ2h0aW5nU2VydmljZS5wcm90b3R5cGUuX2NoZWNrUHJlY29uZGl0aW9ucyA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlID09PSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRIaWdobGlnaHRpbmdTZXJ2aWNlLnByb3RvdHlwZS5fb25Db25mbGljdCA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIGNhdXNlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHVuZGVmaW5lZCk7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdXBwcmVzc0ZvcmNlZFVwZGF0ZTogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBIaWdobGlnaHRpbmdTZXJ2aWNlO1xyXG59KTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL1ZhbGlkYXRpb25TZXJ2aWNlJyxbJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsICdqcXVlcnknXSwgZnVuY3Rpb24oWHRleHRTZXJ2aWNlLCBqUXVlcnkpIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBTZXJ2aWNlIGNsYXNzIGZvciB2YWxpZGF0aW9uLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIFZhbGlkYXRpb25TZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAndmFsaWRhdGUnLCByZXNvdXJjZUlkKTtcclxuXHR9O1xyXG5cdFxyXG5cdFZhbGlkYXRpb25TZXJ2aWNlLnByb3RvdHlwZSA9IG5ldyBYdGV4dFNlcnZpY2UoKTtcclxuXHRcclxuXHRWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUuX2NoZWNrUHJlY29uZGl0aW9ucyA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlID09PSB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHRWYWxpZGF0aW9uU2VydmljZS5wcm90b3R5cGUuX29uQ29uZmxpY3QgPSBmdW5jdGlvbihlZGl0b3JDb250ZXh0LCBjYXVzZSkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh1bmRlZmluZWQpO1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3VwcHJlc3NGb3JjZWRVcGRhdGU6IHRydWVcclxuXHRcdH07XHJcblx0fTtcclxuXHRcclxuXHRyZXR1cm4gVmFsaWRhdGlvblNlcnZpY2U7XHJcbn0pO1xyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgaXRlbWlzIEFHIChodHRwOi8vd3d3Lml0ZW1pcy5ldSkgYW5kIG90aGVycy5cclxuICogVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmUgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlXHJcbiAqIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIDIuMCB3aGljaCBpcyBhdmFpbGFibGUgYXRcclxuICogaHR0cDovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtMi4wLlxyXG4gKlxyXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmRlZmluZSgneHRleHQvc2VydmljZXMvVXBkYXRlU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogU2VydmljZSBjbGFzcyBmb3IgdXBkYXRpbmcgdGhlIHNlcnZlci1zaWRlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UuXHJcblx0ICogVGhpcyBzZXJ2aWNlIG9ubHkgbWFrZXMgc2Vuc2Ugd2l0aCBhIHN0YXRlZnVsIHNlcnZlciwgd2hlcmUgYW4gdXBkYXRlIHJlcXVlc3QgaXMgc2VudFxyXG5cdCAqIGFmdGVyIGVhY2ggbW9kaWZpY2F0aW9uLiBUaGlzIGNhbiBncmVhdGx5IGltcHJvdmUgcmVzcG9uc2UgdGltZXMgY29tcGFyZWQgdG8gdGhlXHJcblx0ICogc3RhdGVsZXNzIGFsdGVybmF0aXZlLCB3aGVyZSB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgaXMgc2VudCB3aXRoIGVhY2ggc2VydmljZSByZXF1ZXN0LlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIFVwZGF0ZVNlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCkge1xyXG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsICd1cGRhdGUnLCByZXNvdXJjZUlkLCB0aGlzKTtcclxuXHRcdHRoaXMuX2NvbXBsZXRpb25DYWxsYmFja3MgPSBbXTtcclxuXHR9O1xyXG5cdFxyXG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xyXG5cclxuXHQvKipcclxuXHQgKiBDb21wdXRlIGEgZGVsdGEgYmV0d2VlbiB0d28gdmVyc2lvbnMgb2YgYSB0ZXh0LiBJZiBhIGRpZmZlcmVuY2UgaXMgZm91bmQsIHRoZSByZXN1bHRcclxuXHQgKiBjb250YWlucyB0aHJlZSBwcm9wZXJ0aWVzOlxyXG5cdCAqICAgZGVsdGFUZXh0IC0gdGhlIHRleHQgdG8gaW5zZXJ0IGludG8gczFcclxuXHQgKiAgIGRlbHRhT2Zmc2V0IC0gdGhlIHRleHQgaW5zZXJ0aW9uIG9mZnNldFxyXG5cdCAqICAgZGVsdGFSZXBsYWNlTGVuZ3RoIC0gdGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgc2hhbGwgYmUgcmVwbGFjZWQgYnkgdGhlIGluc2VydGVkIHRleHRcclxuXHQgKi9cclxuXHRVcGRhdGVTZXJ2aWNlLnByb3RvdHlwZS5jb21wdXRlRGVsdGEgPSBmdW5jdGlvbihzMSwgczIsIHJlc3VsdCkge1xyXG5cdFx0dmFyIHN0YXJ0ID0gMCwgczFsZW5ndGggPSBzMS5sZW5ndGgsIHMybGVuZ3RoID0gczIubGVuZ3RoO1xyXG5cdFx0d2hpbGUgKHN0YXJ0IDwgczFsZW5ndGggJiYgc3RhcnQgPCBzMmxlbmd0aCAmJiBzMS5jaGFyQ29kZUF0KHN0YXJ0KSA9PT0gczIuY2hhckNvZGVBdChzdGFydCkpIHtcclxuXHRcdFx0c3RhcnQrKztcclxuXHRcdH1cclxuXHRcdGlmIChzdGFydCA9PT0gczFsZW5ndGggJiYgc3RhcnQgPT09IHMybGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJlc3VsdC5kZWx0YU9mZnNldCA9IHN0YXJ0O1xyXG5cdFx0aWYgKHN0YXJ0ID09PSBzMWxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQuZGVsdGFUZXh0ID0gczIuc3Vic3RyaW5nKHN0YXJ0LCBzMmxlbmd0aCk7XHJcblx0XHRcdHJlc3VsdC5kZWx0YVJlcGxhY2VMZW5ndGggPSAwO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2UgaWYgKHN0YXJ0ID09PSBzMmxlbmd0aCkge1xyXG5cdFx0XHRyZXN1bHQuZGVsdGFUZXh0ID0gJyc7XHJcblx0XHRcdHJlc3VsdC5kZWx0YVJlcGxhY2VMZW5ndGggPSBzMWxlbmd0aCAtIHN0YXJ0O1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBlbmQxID0gczFsZW5ndGggLSAxLCBlbmQyID0gczJsZW5ndGggLSAxO1xyXG5cdFx0d2hpbGUgKGVuZDEgPj0gc3RhcnQgJiYgZW5kMiA+PSBzdGFydCAmJiBzMS5jaGFyQ29kZUF0KGVuZDEpID09PSBzMi5jaGFyQ29kZUF0KGVuZDIpKSB7XHJcblx0XHRcdGVuZDEtLTtcclxuXHRcdFx0ZW5kMi0tO1xyXG5cdFx0fVxyXG5cdFx0cmVzdWx0LmRlbHRhVGV4dCA9IHMyLnN1YnN0cmluZyhzdGFydCwgZW5kMiArIDEpO1xyXG5cdFx0cmVzdWx0LmRlbHRhUmVwbGFjZUxlbmd0aCA9IGVuZDEgLSBzdGFydCArIDE7XHJcblx0fTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBJbnZva2UgYWxsIGNvbXBsZXRpb24gY2FsbGJhY2tzIGFuZCBjbGVhciB0aGUgbGlzdCBhZnRlcndhcmRzLlxyXG5cdCAqL1xyXG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlLm9uQ29tcGxldGUgPSBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcclxuXHRcdHZhciBjYWxsYmFja3MgPSB0aGlzLl9jb21wbGV0aW9uQ2FsbGJhY2tzO1xyXG5cdFx0dGhpcy5fY29tcGxldGlvbkNhbGxiYWNrcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldLmNhbGxiYWNrO1xyXG5cdFx0XHR2YXIgcGFyYW1zID0gY2FsbGJhY2tzW2ldLnBhcmFtcztcclxuXHRcdFx0Y2FsbGJhY2socGFyYW1zKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQWRkIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBzZXJ2aWNlIGNhbGwgaGFzIGNvbXBsZXRlZC5cclxuXHQgKi9cclxuXHRVcGRhdGVTZXJ2aWNlLnByb3RvdHlwZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2sgPSBmdW5jdGlvbihjYWxsYmFjaywgcGFyYW1zKSB7XHJcblx0XHR0aGlzLl9jb21wbGV0aW9uQ2FsbGJhY2tzLnB1c2goe2NhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXN9KTtcclxuXHR9XHJcblxyXG5cdFVwZGF0ZVNlcnZpY2UucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpIHtcclxuXHRcdGlmIChkZWZlcnJlZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHR9XHJcblx0XHR2YXIga25vd25TZXJ2ZXJTdGF0ZSA9IGVkaXRvckNvbnRleHQuZ2V0U2VydmVyU3RhdGUoKTtcclxuXHRcdGlmIChrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3MpIHtcclxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHR0aGlzLmFkZENvbXBsZXRpb25DYWxsYmFjayhmdW5jdGlvbigpIHsgc2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCkgfSk7XHJcblx0XHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHZhciBzZXJ2ZXJEYXRhID0ge1xyXG5cdFx0XHRjb250ZW50VHlwZTogcGFyYW1zLmNvbnRlbnRUeXBlXHJcblx0XHR9O1xyXG5cdFx0dmFyIGN1cnJlbnRUZXh0ID0gZWRpdG9yQ29udGV4dC5nZXRUZXh0KCk7XHJcblx0XHRpZiAocGFyYW1zLnNlbmRGdWxsVGV4dCB8fCBrbm93blNlcnZlclN0YXRlLnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRzZXJ2ZXJEYXRhLmZ1bGxUZXh0ID0gY3VycmVudFRleHQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNvbXB1dGVEZWx0YShrbm93blNlcnZlclN0YXRlLnRleHQsIGN1cnJlbnRUZXh0LCBzZXJ2ZXJEYXRhKTtcclxuXHRcdFx0aWYgKHNlcnZlckRhdGEuZGVsdGFUZXh0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRpZiAocGFyYW1zLmZvcmNlVXBkYXRlKSB7XHJcblx0XHRcdFx0XHRzZXJ2ZXJEYXRhLmRlbHRhVGV4dCA9ICcnO1xyXG5cdFx0XHRcdFx0c2VydmVyRGF0YS5kZWx0YU9mZnNldCA9IGVkaXRvckNvbnRleHQuZ2V0Q2FyZXRPZmZzZXQoKTtcclxuXHRcdFx0XHRcdHNlcnZlckRhdGEuZGVsdGFSZXBsYWNlTGVuZ3RoID0gMDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShrbm93blNlcnZlclN0YXRlKTtcclxuXHRcdFx0XHRcdHRoaXMub25Db21wbGV0ZSgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0c2VydmVyRGF0YS5yZXF1aXJlZFN0YXRlSWQgPSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0a25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHNlbGYuc2VuZFJlcXVlc3QoZWRpdG9yQ29udGV4dCwge1xyXG5cdFx0XHR0eXBlOiAnUFVUJyxcclxuXHRcdFx0ZGF0YTogc2VydmVyRGF0YSxcclxuXHRcdFx0XHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0XHRcdGlmIChyZXN1bHQuY29uZmxpY3QpIHtcclxuXHRcdFx0XHRcdC8vIFRoZSBzZXJ2ZXIgaGFzIGxvc3QgaXRzIHNlc3Npb24gc3RhdGUgYW5kIHRoZSByZXNvdXJjZSBpcyBsb2FkZWQgZnJvbSB0aGUgc2VydmVyXHJcblx0XHRcdFx0XHRpZiAoa25vd25TZXJ2ZXJTdGF0ZS50ZXh0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcztcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcclxuXHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocmVzdWx0LmNvbmZsaWN0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGxpc3RlbmVycyA9IGVkaXRvckNvbnRleHQudXBkYXRlU2VydmVyU3RhdGUoY3VycmVudFRleHQsIHJlc3VsdC5zdGF0ZUlkKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0c2VsZi5hZGRDb21wbGV0aW9uQ2FsbGJhY2sobGlzdGVuZXJzW2ldLCBwYXJhbXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzID09IDQwNCAmJiAhcGFyYW1zLmxvYWRGcm9tU2VydmVyICYmIGtub3duU2VydmVyU3RhdGUudGV4dCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHQvLyBUaGUgc2VydmVyIGhhcyBsb3N0IGl0cyBzZXNzaW9uIHN0YXRlIGFuZCB0aGUgcmVzb3VyY2UgaXMgbm90IGxvYWRlZCBmcm9tIHRoZSBzZXJ2ZXJcclxuXHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS50ZXh0O1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcclxuXHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvclRocm93bik7XHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRjb21wbGV0ZTogc2VsZi5vbkNvbXBsZXRlLmJpbmQoc2VsZilcclxuXHRcdH0sIHRydWUpO1xyXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKS5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHRcclxuXHRyZXR1cm4gVXBkYXRlU2VydmljZTtcclxufSk7XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxyXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcclxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxyXG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXHJcbiAqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZGVmaW5lKCd4dGV4dC9zZXJ2aWNlcy9Db250ZW50QXNzaXN0U2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIGNvbnRlbnQgYXNzaXN0IHByb3Bvc2Fscy4gVGhlIHByb3Bvc2FscyBhcmUgcmV0dXJuZWQgYXMgcHJvbWlzZSBvZlxyXG5cdCAqIGEgRGVmZXJyZWQgb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIENvbnRlbnRBc3Npc3RTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnYXNzaXN0JywgcmVzb3VyY2VJZCwgdXBkYXRlU2VydmljZSk7XHJcblx0fVxyXG5cclxuXHRDb250ZW50QXNzaXN0U2VydmljZS5wcm90b3R5cGUgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XHJcblx0XHJcblx0Q29udGVudEFzc2lzdFNlcnZpY2UucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpIHtcclxuXHRcdGlmIChkZWZlcnJlZCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblx0XHR9XHJcblx0XHR2YXIgc2VydmVyRGF0YSA9IHtcclxuXHRcdFx0Y29udGVudFR5cGU6IHBhcmFtcy5jb250ZW50VHlwZVxyXG5cdFx0fTtcclxuXHRcdGlmIChwYXJhbXMub2Zmc2V0KVxyXG5cdFx0XHRzZXJ2ZXJEYXRhLmNhcmV0T2Zmc2V0ID0gcGFyYW1zLm9mZnNldDtcclxuXHRcdGVsc2VcclxuXHRcdFx0c2VydmVyRGF0YS5jYXJldE9mZnNldCA9IGVkaXRvckNvbnRleHQuZ2V0Q2FyZXRPZmZzZXQoKTtcclxuXHRcdHZhciBzZWxlY3Rpb24gPSBwYXJhbXMuc2VsZWN0aW9uID8gcGFyYW1zLnNlbGVjdGlvbiA6IGVkaXRvckNvbnRleHQuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoc2VsZWN0aW9uLnN0YXJ0ICE9IHNlcnZlckRhdGEuY2FyZXRPZmZzZXQgfHwgc2VsZWN0aW9uLmVuZCAhPSBzZXJ2ZXJEYXRhLmNhcmV0T2Zmc2V0KSB7XHJcblx0XHRcdHNlcnZlckRhdGEuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb24uc3RhcnQ7XHJcblx0XHRcdHNlcnZlckRhdGEuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uLmVuZDtcclxuXHRcdH1cclxuXHRcdHZhciBjdXJyZW50VGV4dDtcclxuXHRcdHZhciBodHRwTWV0aG9kID0gJ0dFVCc7XHJcblx0XHR2YXIgb25Db21wbGV0ZSA9IHVuZGVmaW5lZDtcclxuXHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xyXG5cdFx0aWYgKHBhcmFtcy5zZW5kRnVsbFRleHQpIHtcclxuXHRcdFx0c2VydmVyRGF0YS5mdWxsVGV4dCA9IGVkaXRvckNvbnRleHQuZ2V0VGV4dCgpO1xyXG5cdFx0XHRodHRwTWV0aG9kID0gJ1BPU1QnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2VydmVyRGF0YS5yZXF1aXJlZFN0YXRlSWQgPSBrbm93blNlcnZlclN0YXRlLnN0YXRlSWQ7XHJcblx0XHRcdGlmICh0aGlzLl91cGRhdGVTZXJ2aWNlKSB7XHJcblx0XHRcdFx0aWYgKGtub3duU2VydmVyU3RhdGUudGV4dCA9PT0gdW5kZWZpbmVkIHx8IGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlU2VydmljZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cdFx0XHRcdG9uQ29tcGxldGUgPSB0aGlzLl91cGRhdGVTZXJ2aWNlLm9uQ29tcGxldGUuYmluZCh0aGlzLl91cGRhdGVTZXJ2aWNlKTtcclxuXHRcdFx0XHRjdXJyZW50VGV4dCA9IGVkaXRvckNvbnRleHQuZ2V0VGV4dCgpO1xyXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVNlcnZpY2UuY29tcHV0ZURlbHRhKGtub3duU2VydmVyU3RhdGUudGV4dCwgY3VycmVudFRleHQsIHNlcnZlckRhdGEpO1xyXG5cdFx0XHRcdGlmIChzZXJ2ZXJEYXRhLmRlbHRhVGV4dCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRodHRwTWV0aG9kID0gJ1BPU1QnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRzZWxmLnNlbmRSZXF1ZXN0KGVkaXRvckNvbnRleHQsIHtcclxuXHRcdFx0dHlwZTogaHR0cE1ldGhvZCxcclxuXHRcdFx0ZGF0YTogc2VydmVyRGF0YSxcclxuXHRcdFx0XHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0XHRcdGlmIChyZXN1bHQuY29uZmxpY3QpIHtcclxuXHRcdFx0XHRcdC8vIFRoZSBzZXJ2ZXIgaGFzIGxvc3QgaXRzIHNlc3Npb24gc3RhdGUgYW5kIHRoZSByZXNvdXJjZSBpcyBsb2FkZWQgZnJvbSB0aGUgc2VydmVyXHJcblx0XHRcdFx0XHRpZiAoc2VsZi5faW5jcmVhc2VSZWN1cnNpb25Db3VudChlZGl0b3JDb250ZXh0KSkge1xyXG5cdFx0XHRcdFx0XHRpZiAob25Db21wbGV0ZSkge1xyXG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnVwZGF0ZUluUHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudGV4dDtcclxuXHRcdFx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5fdXBkYXRlU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcGFyYW1zQ29weSA9IHt9O1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIHAgaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHApKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJhbXNDb3B5W3BdID0gcGFyYW1zW3BdO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRwYXJhbXNDb3B5LnNlbmRGdWxsVGV4dCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zQ29weSwgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QocmVzdWx0LmNvbmZsaWN0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG9uQ29tcGxldGUgJiYgcmVzdWx0LnN0YXRlSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuc3RhdGVJZCAhPSBlZGl0b3JDb250ZXh0LmdldFNlcnZlclN0YXRlKCkuc3RhdGVJZCkge1xyXG5cdFx0XHRcdFx0dmFyIGxpc3RlbmVycyA9IGVkaXRvckNvbnRleHQudXBkYXRlU2VydmVyU3RhdGUoY3VycmVudFRleHQsIHJlc3VsdC5zdGF0ZUlkKTtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuX3VwZGF0ZVNlcnZpY2UuYWRkQ29tcGxldGlvbkNhbGxiYWNrKGxpc3RlbmVyc1tpXSwgcGFyYW1zKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQuZW50cmllcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG5cdFx0XHRcdGlmIChvbkNvbXBsZXRlICYmIHhoci5zdGF0dXMgPT0gNDA0ICYmICFwYXJhbXMubG9hZEZyb21TZXJ2ZXIgJiYga25vd25TZXJ2ZXJTdGF0ZS50ZXh0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdC8vIFRoZSBzZXJ2ZXIgaGFzIGxvc3QgaXRzIHNlc3Npb24gc3RhdGUgYW5kIHRoZSByZXNvdXJjZSBpcyBub3QgbG9hZGVkIGZyb20gdGhlIHNlcnZlclxyXG5cdFx0XHRcdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUudXBkYXRlSW5Qcm9ncmVzcztcclxuXHRcdFx0XHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnRleHQ7XHJcblx0XHRcdFx0XHRkZWxldGUga25vd25TZXJ2ZXJTdGF0ZS5zdGF0ZUlkO1xyXG5cdFx0XHRcdFx0c2VsZi5fdXBkYXRlU2VydmljZS5hZGRDb21wbGV0aW9uQ2FsbGJhY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuaW52b2tlKGVkaXRvckNvbnRleHQsIHBhcmFtcywgZGVmZXJyZWQpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRzZWxmLl91cGRhdGVTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBwYXJhbXMpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnJvclRocm93bik7XHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRjb21wbGV0ZTogb25Db21wbGV0ZVxyXG5cdFx0fSwgIXBhcmFtcy5zZW5kRnVsbFRleHQpO1xyXG5cdFx0dmFyIHJlc3VsdCA9IGRlZmVycmVkLnByb21pc2UoKTtcclxuXHRcdGlmIChvbkNvbXBsZXRlKSB7XHJcblx0XHRcdHJlc3VsdC5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0a25vd25TZXJ2ZXJTdGF0ZS51cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gQ29udGVudEFzc2lzdFNlcnZpY2U7XHJcbn0pO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0hvdmVyU2VydmljZScsWyd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKFh0ZXh0U2VydmljZSwgalF1ZXJ5KSB7XHJcblx0XHJcblx0LyoqXHJcblx0ICogU2VydmljZSBjbGFzcyBmb3IgaG92ZXIgaW5mb3JtYXRpb24uXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gSG92ZXJTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnaG92ZXInLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKTtcclxuXHR9O1xyXG5cclxuXHRIb3ZlclNlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xyXG5cclxuXHRIb3ZlclNlcnZpY2UucHJvdG90eXBlLl9pbml0U2VydmVyRGF0YSA9IGZ1bmN0aW9uKHNlcnZlckRhdGEsIGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xyXG5cdFx0Ly8gSW4gb3JkZXIgdG8gZGlzcGxheSBob3ZlciBpbmZvIGZvciBhIHNlbGVjdGVkIGNvbXBsZXRpb24gcHJvcG9zYWwgd2hpbGUgdGhlIGNvbnRlbnRcclxuXHRcdC8vIGFzc2lzdCBwb3B1cCBpcyBzaG93biwgdGhlIHNlbGVjdGVkIHByb3Bvc2FsIGlzIHBhc3NlZCBhcyBwYXJhbWV0ZXJcclxuXHRcdGlmIChwYXJhbXMucHJvcG9zYWwgJiYgcGFyYW1zLnByb3Bvc2FsLnByb3Bvc2FsKVxyXG5cdFx0XHRzZXJ2ZXJEYXRhLnByb3Bvc2FsID0gcGFyYW1zLnByb3Bvc2FsLnByb3Bvc2FsO1xyXG5cdFx0aWYgKHBhcmFtcy5vZmZzZXQpXHJcblx0XHRcdHNlcnZlckRhdGEuY2FyZXRPZmZzZXQgPSBwYXJhbXMub2Zmc2V0O1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRzZXJ2ZXJEYXRhLmNhcmV0T2Zmc2V0ID0gZWRpdG9yQ29udGV4dC5nZXRDYXJldE9mZnNldCgpO1xyXG5cdFx0dmFyIHNlbGVjdGlvbiA9IHBhcmFtcy5zZWxlY3Rpb24gPyBwYXJhbXMuc2VsZWN0aW9uIDogZWRpdG9yQ29udGV4dC5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmIChzZWxlY3Rpb24uc3RhcnQgIT0gc2VydmVyRGF0YS5jYXJldE9mZnNldCB8fCBzZWxlY3Rpb24uZW5kICE9IHNlcnZlckRhdGEuY2FyZXRPZmZzZXQpIHtcclxuXHRcdFx0c2VydmVyRGF0YS5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvbi5zdGFydDtcclxuXHRcdFx0c2VydmVyRGF0YS5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb24uZW5kO1xyXG5cdFx0fVxyXG5cdH07XHJcblx0XHJcblx0SG92ZXJTZXJ2aWNlLnByb3RvdHlwZS5fZ2V0U3VjY2Vzc0NhbGxiYWNrID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCkge1xyXG5cdFx0dmFyIGRlbGF5ID0gcGFyYW1zLm1vdXNlSG92ZXJEZWxheTtcclxuXHRcdGlmICghZGVsYXkpXHJcblx0XHRcdGRlbGF5ID0gNTAwO1xyXG5cdFx0dmFyIHNob3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyBkZWxheTtcclxuXHRcdHJldHVybiBmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0aWYgKHJlc3VsdC5jb25mbGljdCB8fCAhcmVzdWx0LnRpdGxlICYmICFyZXN1bHQuY29udGVudCkge1xyXG5cdFx0XHRcdGRlZmVycmVkLnJlamVjdCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciByZW1haW5pbmdUaW1lb3V0ID0gTWF0aC5tYXgoMCwgc2hvd1RpbWUgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmICghcGFyYW1zLnNlbmRGdWxsVGV4dCAmJiByZXN1bHQuc3RhdGVJZCAhPT0gdW5kZWZpbmVkXHJcblx0XHRcdFx0XHRcdFx0JiYgcmVzdWx0LnN0YXRlSWQgIT0gZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpLnN0YXRlSWQpIFxyXG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0XHRcdH0sIHJlbWFpbmluZ1RpbWVvdXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH07XHJcblx0XHJcblx0cmV0dXJuIEhvdmVyU2VydmljZTtcclxufSk7XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxyXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcclxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxyXG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXHJcbiAqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZGVmaW5lKCd4dGV4dC9zZXJ2aWNlcy9PY2N1cnJlbmNlc1NlcnZpY2UnLFsneHRleHQvc2VydmljZXMvWHRleHRTZXJ2aWNlJywgJ2pxdWVyeSddLCBmdW5jdGlvbihYdGV4dFNlcnZpY2UsIGpRdWVyeSkge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNlcnZpY2UgY2xhc3MgZm9yIG1hcmtpbmcgb2NjdXJyZW5jZXMuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gT2NjdXJyZW5jZXNTZXJ2aWNlKHNlcnZpY2VVcmwsIHJlc291cmNlSWQsIHVwZGF0ZVNlcnZpY2UpIHtcclxuXHRcdHRoaXMuaW5pdGlhbGl6ZShzZXJ2aWNlVXJsLCAnb2NjdXJyZW5jZXMnLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKTtcclxuXHR9O1xyXG5cclxuXHRPY2N1cnJlbmNlc1NlcnZpY2UucHJvdG90eXBlID0gbmV3IFh0ZXh0U2VydmljZSgpO1xyXG5cclxuXHRPY2N1cnJlbmNlc1NlcnZpY2UucHJvdG90eXBlLl9pbml0U2VydmVyRGF0YSA9IGZ1bmN0aW9uKHNlcnZlckRhdGEsIGVkaXRvckNvbnRleHQsIHBhcmFtcykge1xyXG5cdFx0aWYgKHBhcmFtcy5vZmZzZXQpXHJcblx0XHRcdHNlcnZlckRhdGEuY2FyZXRPZmZzZXQgPSBwYXJhbXMub2Zmc2V0O1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRzZXJ2ZXJEYXRhLmNhcmV0T2Zmc2V0ID0gZWRpdG9yQ29udGV4dC5nZXRDYXJldE9mZnNldCgpO1xyXG5cdH07XHJcblx0XHJcblx0T2NjdXJyZW5jZXNTZXJ2aWNlLnByb3RvdHlwZS5fZ2V0U3VjY2Vzc0NhbGxiYWNrID0gZnVuY3Rpb24oZWRpdG9yQ29udGV4dCwgcGFyYW1zLCBkZWZlcnJlZCkge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0XHRpZiAocmVzdWx0LmNvbmZsaWN0IHx8ICFwYXJhbXMuc2VuZEZ1bGxUZXh0ICYmIHJlc3VsdC5zdGF0ZUlkICE9PSB1bmRlZmluZWRcclxuXHRcdFx0XHRcdCYmIHJlc3VsdC5zdGF0ZUlkICE9IGVkaXRvckNvbnRleHQuZ2V0U2VydmVyU3RhdGUoKS5zdGF0ZUlkKSBcclxuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoKTtcclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gT2NjdXJyZW5jZXNTZXJ2aWNlO1xyXG59KTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L3NlcnZpY2VzL0Zvcm1hdHRpbmdTZXJ2aWNlJyxbJ3h0ZXh0L3NlcnZpY2VzL1h0ZXh0U2VydmljZScsICdqcXVlcnknXSwgZnVuY3Rpb24oWHRleHRTZXJ2aWNlLCBqUXVlcnkpIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBTZXJ2aWNlIGNsYXNzIGZvciBmb3JtYXR0aW5nIHRleHQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gRm9ybWF0dGluZ1NlcnZpY2Uoc2VydmljZVVybCwgcmVzb3VyY2VJZCwgdXBkYXRlU2VydmljZSkge1xyXG5cdFx0dGhpcy5pbml0aWFsaXplKHNlcnZpY2VVcmwsICdmb3JtYXQnLCByZXNvdXJjZUlkLCB1cGRhdGVTZXJ2aWNlKTtcclxuXHR9O1xyXG5cclxuXHRGb3JtYXR0aW5nU2VydmljZS5wcm90b3R5cGUgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XHJcblxyXG5cdEZvcm1hdHRpbmdTZXJ2aWNlLnByb3RvdHlwZS5faW5pdFNlcnZlckRhdGEgPSBmdW5jdGlvbihzZXJ2ZXJEYXRhLCBlZGl0b3JDb250ZXh0LCBwYXJhbXMpIHtcclxuXHRcdHZhciBzZWxlY3Rpb24gPSBwYXJhbXMuc2VsZWN0aW9uID8gcGFyYW1zLnNlbGVjdGlvbiA6IGVkaXRvckNvbnRleHQuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoc2VsZWN0aW9uLmVuZCA+IHNlbGVjdGlvbi5zdGFydCkge1xyXG5cdFx0XHRzZXJ2ZXJEYXRhLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uLnN0YXJ0O1xyXG5cdFx0XHRzZXJ2ZXJEYXRhLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5lbmQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRodHRwTWV0aG9kOiAnUE9TVCdcclxuXHRcdH07XHJcblx0fTtcclxuXHRcclxuXHRGb3JtYXR0aW5nU2VydmljZS5wcm90b3R5cGUuX3Byb2Nlc3NSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQsIGVkaXRvckNvbnRleHQpIHtcclxuXHRcdC8vIFRoZSB0ZXh0IHVwZGF0ZSBtYXkgYmUgYXN5bmNocm9ub3VzLCBzbyB3ZSBoYXZlIHRvIGNvbXB1dGUgdGhlIG5ldyB0ZXh0IG91cnNlbHZlc1xyXG5cdFx0dmFyIG5ld1RleHQ7XHJcblx0XHRpZiAocmVzdWx0LnJlcGxhY2VSZWdpb24pIHtcclxuXHRcdFx0dmFyIGZ1bGxUZXh0ID0gZWRpdG9yQ29udGV4dC5nZXRUZXh0KCk7XHJcblx0XHRcdHZhciBzdGFydCA9IHJlc3VsdC5yZXBsYWNlUmVnaW9uLm9mZnNldDtcclxuXHRcdFx0dmFyIGVuZCA9IHJlc3VsdC5yZXBsYWNlUmVnaW9uLm9mZnNldCArIHJlc3VsdC5yZXBsYWNlUmVnaW9uLmxlbmd0aDtcclxuXHRcdFx0ZWRpdG9yQ29udGV4dC5zZXRUZXh0KHJlc3VsdC5mb3JtYXR0ZWRUZXh0LCBzdGFydCwgZW5kKTtcclxuXHRcdFx0bmV3VGV4dCA9IGZ1bGxUZXh0LnN1YnN0cmluZygwLCBzdGFydCkgKyByZXN1bHQuZm9ybWF0dGVkVGV4dCArIGZ1bGxUZXh0LnN1YnN0cmluZyhlbmQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWRpdG9yQ29udGV4dC5zZXRUZXh0KHJlc3VsdC5mb3JtYXR0ZWRUZXh0KTtcclxuXHRcdFx0bmV3VGV4dCA9IHJlc3VsdC5mb3JtYXR0ZWRUZXh0O1xyXG5cdFx0fVxyXG5cdFx0dmFyIGxpc3RlbmVycyA9IGVkaXRvckNvbnRleHQudXBkYXRlU2VydmVyU3RhdGUobmV3VGV4dCwgcmVzdWx0LnN0YXRlSWQpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bGlzdGVuZXJzW2ldKHt9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBGb3JtYXR0aW5nU2VydmljZTtcclxufSk7XHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNSBpdGVtaXMgQUcgKGh0dHA6Ly93d3cuaXRlbWlzLmV1KSBhbmQgb3RoZXJzLlxyXG4gKiBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZSBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGVcclxuICogdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgMi4wIHdoaWNoIGlzIGF2YWlsYWJsZSBhdFxyXG4gKiBodHRwOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC0yLjAuXHJcbiAqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L1NlcnZpY2VCdWlsZGVyJyxbXHJcbiAgICAnanF1ZXJ5JyxcclxuICAgICd4dGV4dC9zZXJ2aWNlcy9YdGV4dFNlcnZpY2UnLFxyXG5cdCd4dGV4dC9zZXJ2aWNlcy9Mb2FkUmVzb3VyY2VTZXJ2aWNlJyxcclxuXHQneHRleHQvc2VydmljZXMvU2F2ZVJlc291cmNlU2VydmljZScsXHJcblx0J3h0ZXh0L3NlcnZpY2VzL0hpZ2hsaWdodGluZ1NlcnZpY2UnLFxyXG5cdCd4dGV4dC9zZXJ2aWNlcy9WYWxpZGF0aW9uU2VydmljZScsXHJcblx0J3h0ZXh0L3NlcnZpY2VzL1VwZGF0ZVNlcnZpY2UnLFxyXG5cdCd4dGV4dC9zZXJ2aWNlcy9Db250ZW50QXNzaXN0U2VydmljZScsXHJcblx0J3h0ZXh0L3NlcnZpY2VzL0hvdmVyU2VydmljZScsXHJcblx0J3h0ZXh0L3NlcnZpY2VzL09jY3VycmVuY2VzU2VydmljZScsXHJcblx0J3h0ZXh0L3NlcnZpY2VzL0Zvcm1hdHRpbmdTZXJ2aWNlJ1xyXG5dLCBmdW5jdGlvbihqUXVlcnksIFh0ZXh0U2VydmljZSwgTG9hZFJlc291cmNlU2VydmljZSwgU2F2ZVJlc291cmNlU2VydmljZSwgSGlnaGxpZ2h0aW5nU2VydmljZSxcclxuXHRcdFZhbGlkYXRpb25TZXJ2aWNlLCBVcGRhdGVTZXJ2aWNlLCBDb250ZW50QXNzaXN0U2VydmljZSwgSG92ZXJTZXJ2aWNlLCBPY2N1cnJlbmNlc1NlcnZpY2UsXHJcblx0XHRGb3JtYXR0aW5nU2VydmljZSkge1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEJ1aWxkZXIgY2xhc3MgZm9yIHRoZSBYdGV4dCBzZXJ2aWNlcy5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBTZXJ2aWNlQnVpbGRlcih4dGV4dFNlcnZpY2VzKSB7XHJcblx0XHR0aGlzLnNlcnZpY2VzID0geHRleHRTZXJ2aWNlcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYWxsIHRoZSBhdmFpbGFibGUgWHRleHQgc2VydmljZXMgZGVwZW5kaW5nIG9uIHRoZSBjb25maWd1cmF0aW9uLlxyXG5cdCAqL1xyXG5cdFNlcnZpY2VCdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVTZXJ2aWNlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcclxuXHRcdHZhciBvcHRpb25zID0gc2VydmljZXMub3B0aW9ucztcclxuXHRcdHZhciBlZGl0b3JDb250ZXh0ID0gc2VydmljZXMuZWRpdG9yQ29udGV4dDtcclxuXHRcdGVkaXRvckNvbnRleHQueHRleHRTZXJ2aWNlcyA9IHNlcnZpY2VzO1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0aWYgKCFvcHRpb25zLnNlcnZpY2VVcmwpIHtcclxuXHRcdFx0aWYgKCFvcHRpb25zLmJhc2VVcmwpXHJcblx0XHRcdFx0b3B0aW9ucy5iYXNlVXJsID0gJy8nO1xyXG5cdFx0XHRlbHNlIGlmIChvcHRpb25zLmJhc2VVcmwuY2hhckF0KDApICE9ICcvJylcclxuXHRcdFx0XHRvcHRpb25zLmJhc2VVcmwgPSAnLycgKyBvcHRpb25zLmJhc2VVcmw7XHJcblx0XHRcdG9wdGlvbnMuc2VydmljZVVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIG9wdGlvbnMuYmFzZVVybCArICd4dGV4dC1zZXJ2aWNlJztcclxuXHRcdH1cclxuXHRcdGlmIChvcHRpb25zLnJlc291cmNlSWQpIHtcclxuXHRcdFx0aWYgKCFvcHRpb25zLnh0ZXh0TGFuZylcclxuXHRcdFx0XHRvcHRpb25zLnh0ZXh0TGFuZyA9IG9wdGlvbnMucmVzb3VyY2VJZC5zcGxpdCgvWz8jXS8pWzBdLnNwbGl0KCcuJykucG9wKCk7XHJcblx0XHRcdGlmIChvcHRpb25zLmxvYWRGcm9tU2VydmVyID09PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0b3B0aW9ucy5sb2FkRnJvbVNlcnZlciA9IHRydWU7XHJcblx0XHRcdGlmIChvcHRpb25zLmxvYWRGcm9tU2VydmVyICYmIHRoaXMuc2V0dXBQZXJzaXN0ZW5jZVNlcnZpY2VzKSB7XHJcblx0XHRcdFx0c2VydmljZXMubG9hZFJlc291cmNlU2VydmljZSA9IG5ldyBMb2FkUmVzb3VyY2VTZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkLCBmYWxzZSk7XHJcblx0XHRcdFx0c2VydmljZXMubG9hZFJlc291cmNlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2VydmljZXMubG9hZFJlc291cmNlU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZXJ2aWNlcy5zYXZlUmVzb3VyY2VTZXJ2aWNlID0gbmV3IFNhdmVSZXNvdXJjZVNlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQpO1xyXG5cdFx0XHRcdHNlcnZpY2VzLnNhdmVSZXNvdXJjZSA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLnNhdmVSZXNvdXJjZVNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIFNlcnZpY2VCdWlsZGVyLm1lcmdlT3B0aW9ucyhhZGRQYXJhbXMsIG9wdGlvbnMpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2VydmljZXMucmV2ZXJ0UmVzb3VyY2VTZXJ2aWNlID0gbmV3IExvYWRSZXNvdXJjZVNlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQsIHRydWUpO1xyXG5cdFx0XHRcdHNlcnZpY2VzLnJldmVydFJlc291cmNlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2VydmljZXMucmV2ZXJ0UmVzb3VyY2VTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0dXBQZXJzaXN0ZW5jZVNlcnZpY2VzKCk7XHJcblx0XHRcdFx0c2VydmljZXMubG9hZFJlc291cmNlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChvcHRpb25zLmxvYWRGcm9tU2VydmVyID09PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0b3B0aW9ucy5sb2FkRnJvbVNlcnZlciA9IGZhbHNlO1xyXG5cdFx0XHRpZiAob3B0aW9ucy54dGV4dExhbmcpIHtcclxuXHRcdFx0XHR2YXIgcmFuZG9tSWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMTQ3NDgzNjQ4KS50b1N0cmluZygxNik7XHJcblx0XHRcdFx0b3B0aW9ucy5yZXNvdXJjZUlkID0gcmFuZG9tSWQgKyAnLicgKyBvcHRpb25zLnh0ZXh0TGFuZztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5zZXR1cFN5bnRheEhpZ2hsaWdodGluZykge1xyXG5cdFx0XHR0aGlzLnNldHVwU3ludGF4SGlnaGxpZ2h0aW5nKCk7XHJcblx0XHR9XHJcblx0XHRpZiAob3B0aW9ucy5lbmFibGVIaWdobGlnaHRpbmdTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlSGlnaGxpZ2h0aW5nU2VydmljZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHNlcnZpY2VzLmhpZ2hsaWdodGluZ1NlcnZpY2UgPSBuZXcgSGlnaGxpZ2h0aW5nU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCk7XHJcblx0XHRcdHNlcnZpY2VzLmNvbXB1dGVIaWdobGlnaHRpbmcgPSBmdW5jdGlvbihhZGRQYXJhbXMpIHtcclxuXHRcdFx0XHRyZXR1cm4gc2VydmljZXMuaGlnaGxpZ2h0aW5nU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAob3B0aW9ucy5lbmFibGVWYWxpZGF0aW9uU2VydmljZSB8fCBvcHRpb25zLmVuYWJsZVZhbGlkYXRpb25TZXJ2aWNlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0c2VydmljZXMudmFsaWRhdGlvblNlcnZpY2UgPSBuZXcgVmFsaWRhdGlvblNlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQpO1xyXG5cdFx0XHRzZXJ2aWNlcy52YWxpZGF0ZSA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xyXG5cdFx0XHRcdHJldHVybiBzZXJ2aWNlcy52YWxpZGF0aW9uU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zZXR1cFVwZGF0ZVNlcnZpY2UpIHtcclxuXHRcdFx0ZnVuY3Rpb24gcmVmcmVzaERvY3VtZW50KCkge1xyXG5cdFx0XHRcdGlmIChzZXJ2aWNlcy5oaWdobGlnaHRpbmdTZXJ2aWNlICYmIHNlbGYuZG9IaWdobGlnaHRpbmcpIHtcclxuXHRcdFx0XHRcdHNlcnZpY2VzLmhpZ2hsaWdodGluZ1NlcnZpY2Uuc2V0U3RhdGUodW5kZWZpbmVkKTtcclxuXHRcdFx0XHRcdHNlbGYuZG9IaWdobGlnaHRpbmcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHNlcnZpY2VzLnZhbGlkYXRpb25TZXJ2aWNlICYmIHNlbGYuZG9WYWxpZGF0aW9uKSB7XHJcblx0XHRcdFx0XHRzZXJ2aWNlcy52YWxpZGF0aW9uU2VydmljZS5zZXRTdGF0ZSh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdFx0c2VsZi5kb1ZhbGlkYXRpb24oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFvcHRpb25zLnNlbmRGdWxsVGV4dCkge1xyXG5cdFx0XHRcdHNlcnZpY2VzLnVwZGF0ZVNlcnZpY2UgPSBuZXcgVXBkYXRlU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCk7XHJcblx0XHRcdFx0c2VydmljZXMudXBkYXRlID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2VydmljZXMudXBkYXRlU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoc2VydmljZXMuc2F2ZVJlc291cmNlU2VydmljZSlcclxuXHRcdFx0XHRcdHNlcnZpY2VzLnNhdmVSZXNvdXJjZVNlcnZpY2UuX3VwZGF0ZVNlcnZpY2UgPSBzZXJ2aWNlcy51cGRhdGVTZXJ2aWNlO1xyXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuYWRkU2VydmVyU3RhdGVMaXN0ZW5lcihyZWZyZXNoRG9jdW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2V0dXBVcGRhdGVTZXJ2aWNlKHJlZnJlc2hEb2N1bWVudCk7XHJcblx0XHR9XHJcblx0XHRpZiAoKG9wdGlvbnMuZW5hYmxlQ29udGVudEFzc2lzdFNlcnZpY2UgfHwgb3B0aW9ucy5lbmFibGVDb250ZW50QXNzaXN0U2VydmljZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdCYmIHRoaXMuc2V0dXBDb250ZW50QXNzaXN0U2VydmljZSkge1xyXG5cdFx0XHRzZXJ2aWNlcy5jb250ZW50QXNzaXN0U2VydmljZSA9IG5ldyBDb250ZW50QXNzaXN0U2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XHJcblx0XHRcdHNlcnZpY2VzLmdldENvbnRlbnRBc3Npc3QgPSBmdW5jdGlvbihhZGRQYXJhbXMpIHtcclxuXHRcdFx0XHRyZXR1cm4gc2VydmljZXMuY29udGVudEFzc2lzdFNlcnZpY2UuaW52b2tlKGVkaXRvckNvbnRleHQsIFNlcnZpY2VCdWlsZGVyLm1lcmdlT3B0aW9ucyhhZGRQYXJhbXMsIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnNldHVwQ29udGVudEFzc2lzdFNlcnZpY2UoKTtcclxuXHRcdH1cclxuXHRcdGlmICgob3B0aW9ucy5lbmFibGVIb3ZlclNlcnZpY2UgfHwgb3B0aW9ucy5lbmFibGVIb3ZlclNlcnZpY2UgPT09IHVuZGVmaW5lZClcclxuXHRcdFx0XHQmJiB0aGlzLnNldHVwSG92ZXJTZXJ2aWNlKSB7XHJcblx0XHRcdHNlcnZpY2VzLmhvdmVyU2VydmljZSA9IG5ldyBIb3ZlclNlcnZpY2Uob3B0aW9ucy5zZXJ2aWNlVXJsLCBvcHRpb25zLnJlc291cmNlSWQsIHNlcnZpY2VzLnVwZGF0ZVNlcnZpY2UpO1xyXG5cdFx0XHRzZXJ2aWNlcy5nZXRIb3ZlckluZm8gPSBmdW5jdGlvbihhZGRQYXJhbXMpIHtcclxuXHRcdFx0XHRyZXR1cm4gc2VydmljZXMuaG92ZXJTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXR1cEhvdmVyU2VydmljZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKChvcHRpb25zLmVuYWJsZU9jY3VycmVuY2VzU2VydmljZSB8fCBvcHRpb25zLmVuYWJsZU9jY3VycmVuY2VzU2VydmljZSA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdCYmIHRoaXMuc2V0dXBPY2N1cnJlbmNlc1NlcnZpY2UpIHtcclxuXHRcdFx0c2VydmljZXMub2NjdXJyZW5jZXNTZXJ2aWNlID0gbmV3IE9jY3VycmVuY2VzU2VydmljZShvcHRpb25zLnNlcnZpY2VVcmwsIG9wdGlvbnMucmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XHJcblx0XHRcdHNlcnZpY2VzLmdldE9jY3VycmVuY2VzID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XHJcblx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLm9jY3VycmVuY2VzU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgU2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zKGFkZFBhcmFtcywgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2V0dXBPY2N1cnJlbmNlc1NlcnZpY2UoKTtcclxuXHRcdH1cclxuXHRcdGlmICgob3B0aW9ucy5lbmFibGVGb3JtYXR0aW5nU2VydmljZSB8fCBvcHRpb25zLmVuYWJsZUZvcm1hdHRpbmdTZXJ2aWNlID09PSB1bmRlZmluZWQpXHJcblx0XHRcdFx0JiYgdGhpcy5zZXR1cEZvcm1hdHRpbmdTZXJ2aWNlKSB7XHJcblx0XHRcdHNlcnZpY2VzLmZvcm1hdHRpbmdTZXJ2aWNlID0gbmV3IEZvcm1hdHRpbmdTZXJ2aWNlKG9wdGlvbnMuc2VydmljZVVybCwgb3B0aW9ucy5yZXNvdXJjZUlkLCBzZXJ2aWNlcy51cGRhdGVTZXJ2aWNlKTtcclxuXHRcdFx0c2VydmljZXMuZm9ybWF0ID0gZnVuY3Rpb24oYWRkUGFyYW1zKSB7XHJcblx0XHRcdFx0cmV0dXJuIHNlcnZpY2VzLmZvcm1hdHRpbmdTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZXR1cEZvcm1hdHRpbmdTZXJ2aWNlKCk7XHJcblx0XHR9XHJcblx0XHRpZiAob3B0aW9ucy5lbmFibGVHZW5lcmF0b3JTZXJ2aWNlIHx8IG9wdGlvbnMuZW5hYmxlR2VuZXJhdG9yU2VydmljZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHNlcnZpY2VzLmdlbmVyYXRvclNlcnZpY2UgPSBuZXcgWHRleHRTZXJ2aWNlKCk7XHJcblx0XHRcdHNlcnZpY2VzLmdlbmVyYXRvclNlcnZpY2UuaW5pdGlhbGl6ZShzZXJ2aWNlcywgJ2dlbmVyYXRlJyk7XHJcblx0XHRcdHNlcnZpY2VzLmdlbmVyYXRvclNlcnZpY2UuX2luaXRTZXJ2ZXJEYXRhID0gZnVuY3Rpb24oc2VydmVyRGF0YSwgZWRpdG9yQ29udGV4dCwgcGFyYW1zKSB7XHJcblx0XHRcdFx0aWYgKHBhcmFtcy5hbGxBcnRpZmFjdHMpXHJcblx0XHRcdFx0XHRzZXJ2ZXJEYXRhLmFsbEFydGlmYWN0cyA9IHBhcmFtcy5hbGxBcnRpZmFjdHM7XHJcblx0XHRcdFx0ZWxzZSBpZiAocGFyYW1zLmFydGlmYWN0SWQpXHJcblx0XHRcdFx0XHRzZXJ2ZXJEYXRhLmFydGlmYWN0ID0gcGFyYW1zLmFydGlmYWN0SWQ7XHJcblx0XHRcdFx0aWYgKHBhcmFtcy5pbmNsdWRlQ29udGVudCAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0c2VydmVyRGF0YS5pbmNsdWRlQ29udGVudCA9IHBhcmFtcy5pbmNsdWRlQ29udGVudDtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXJ2aWNlcy5nZW5lcmF0ZSA9IGZ1bmN0aW9uKGFkZFBhcmFtcykge1xyXG5cdFx0XHRcdHJldHVybiBzZXJ2aWNlcy5nZW5lcmF0b3JTZXJ2aWNlLmludm9rZShlZGl0b3JDb250ZXh0LCBTZXJ2aWNlQnVpbGRlci5tZXJnZU9wdGlvbnMoYWRkUGFyYW1zLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKG9wdGlvbnMuZGlydHlFbGVtZW50KSB7XHJcblx0XHRcdHZhciBkb2MgPSBvcHRpb25zLmRvY3VtZW50IHx8IGRvY3VtZW50O1xyXG5cdFx0XHR2YXIgZGlydHlFbGVtZW50O1xyXG5cdFx0XHRpZiAodHlwZW9mKG9wdGlvbnMuZGlydHlFbGVtZW50KSA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0ZGlydHlFbGVtZW50ID0galF1ZXJ5KCcjJyArIG9wdGlvbnMuZGlydHlFbGVtZW50LCBkb2MpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0ZGlydHlFbGVtZW50ID0galF1ZXJ5KG9wdGlvbnMuZGlydHlFbGVtZW50KTtcclxuXHRcdFx0dmFyIGRpcnR5U3RhdHVzQ2xhc3MgPSBvcHRpb25zLmRpcnR5U3RhdHVzQ2xhc3M7XHJcblx0XHRcdGlmICghZGlydHlTdGF0dXNDbGFzcylcclxuXHRcdFx0XHRkaXJ0eVN0YXR1c0NsYXNzID0gJ2RpcnR5JztcclxuXHRcdFx0ZWRpdG9yQ29udGV4dC5hZGREaXJ0eVN0YXRlTGlzdGVuZXIoZnVuY3Rpb24oZGlydHkpIHtcclxuXHRcdFx0XHRpZiAoZGlydHkpXHJcblx0XHRcdFx0XHRkaXJ0eUVsZW1lbnQuYWRkQ2xhc3MoZGlydHlTdGF0dXNDbGFzcyk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0ZGlydHlFbGVtZW50LnJlbW92ZUNsYXNzKGRpcnR5U3RhdHVzQ2xhc3MpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2VydmljZXMuc3VjY2Vzc0xpc3RlbmVycyA9IFtdO1xyXG5cdFx0c2VydmljZXMuZXJyb3JMaXN0ZW5lcnMgPSBbZnVuY3Rpb24oc2VydmljZVR5cGUsIHNldmVyaXR5LCBtZXNzYWdlLCByZXF1ZXN0RGF0YSkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zaG93RXJyb3JEaWFsb2dzKVxyXG5cdFx0XHRcdHdpbmRvdy5hbGVydCgnWHRleHQgc2VydmljZSBcXCcnICsgc2VydmljZVR5cGUgKyAnXFwnIGZhaWxlZDogJyArIG1lc3NhZ2UpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1h0ZXh0IHNlcnZpY2UgXFwnJyArIHNlcnZpY2VUeXBlICsgJ1xcJyBmYWlsZWQ6ICcgKyBtZXNzYWdlKTtcclxuXHRcdH1dO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDaGFuZ2UgdGhlIHJlc291cmNlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNlcnZpY2UgYnVpbGRlci5cclxuXHQgKi9cclxuXHRTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuY2hhbmdlUmVzb3VyY2UgPSBmdW5jdGlvbihyZXNvdXJjZUlkKSB7XHJcblx0XHR2YXIgc2VydmljZXMgPSB0aGlzLnNlcnZpY2VzO1xyXG5cdFx0dmFyIG9wdGlvbnMgPSBzZXJ2aWNlcy5vcHRpb25zO1xyXG5cdFx0b3B0aW9ucy5yZXNvdXJjZUlkID0gcmVzb3VyY2VJZDtcclxuXHRcdGZvciAodmFyIHAgaW4gc2VydmljZXMpIHtcclxuXHRcdFx0aWYgKHNlcnZpY2VzLmhhc093blByb3BlcnR5KHApKSB7XHJcblx0XHRcdFx0dmFyIHNlcnZpY2UgPSBzZXJ2aWNlc1twXTtcclxuXHRcdFx0XHRpZiAoc2VydmljZS5fc2VydmljZVR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oc2VydmljZS5pbml0aWFsaXplKSlcclxuXHRcdFx0XHRcdHNlcnZpY2VzW3BdLmluaXRpYWxpemUob3B0aW9ucy5zZXJ2aWNlVXJsLCBzZXJ2aWNlLl9zZXJ2aWNlVHlwZSwgcmVzb3VyY2VJZCwgc2VydmljZXMudXBkYXRlU2VydmljZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBrbm93blNlcnZlclN0YXRlID0gc2VydmljZXMuZWRpdG9yQ29udGV4dC5nZXRTZXJ2ZXJTdGF0ZSgpO1xyXG5cdFx0ZGVsZXRlIGtub3duU2VydmVyU3RhdGUuc3RhdGVJZDtcclxuXHRcdGRlbGV0ZSBrbm93blNlcnZlclN0YXRlLnRleHQ7XHJcblx0XHRpZiAob3B0aW9ucy5sb2FkRnJvbVNlcnZlciAmJiBqUXVlcnkuaXNGdW5jdGlvbihzZXJ2aWNlcy5sb2FkUmVzb3VyY2UpKSB7XHJcblx0XHRcdHNlcnZpY2VzLmxvYWRSZXNvdXJjZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGUgYSBjb3B5IG9mIHRoZSBnaXZlbiBvYmplY3QuXHJcblx0ICovXHJcblx0U2VydmljZUJ1aWxkZXIuY29weSA9IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0dmFyIGNvcHkgPSB7fTtcclxuXHRcdGZvciAodmFyIHAgaW4gb2JqKSB7XHJcblx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpXHJcblx0XHRcdFx0Y29weVtwXSA9IG9ialtwXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjb3B5O1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBUcmFuc2xhdGUgYW4gSFRNTCBhdHRyaWJ1dGUgbmFtZSB0byBhIEpTIG9wdGlvbiBuYW1lLlxyXG5cdCAqL1xyXG5cdFNlcnZpY2VCdWlsZGVyLm9wdGlvbk5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0XHR2YXIgcHJlZml4ID0gJ2RhdGEtZWRpdG9yLSc7XHJcblx0XHRpZiAobmFtZS5zdWJzdHJpbmcoMCwgcHJlZml4Lmxlbmd0aCkgPT09IHByZWZpeCkge1xyXG5cdFx0XHR2YXIga2V5ID0gbmFtZS5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCk7XHJcblx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC8tKFthLXpdKS9pZywgZnVuY3Rpb24oYWxsLCBjaGFyYWN0ZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4ga2V5O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQ29weSBhbGwgZGVmYXVsdCBvcHRpb25zIGludG8gdGhlIGdpdmVuIHNldCBvZiBhZGRpdGlvbmFsIG9wdGlvbnMuXHJcblx0ICovXHJcblx0U2VydmljZUJ1aWxkZXIubWVyZ2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpIHtcclxuXHRcdGlmIChvcHRpb25zKSB7XHJcblx0XHRcdGZvciAodmFyIHAgaW4gZGVmYXVsdE9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkocCkpXHJcblx0XHRcdFx0XHRvcHRpb25zW3BdID0gZGVmYXVsdE9wdGlvbnNbcF07XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gU2VydmljZUJ1aWxkZXIuY29weShkZWZhdWx0T3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIE1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlbiBwYXJlbnQgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBkZWZhdWx0IG9wdGlvbnMuXHJcblx0ICovXHJcblx0U2VydmljZUJ1aWxkZXIubWVyZ2VQYXJlbnRPcHRpb25zID0gZnVuY3Rpb24ocGFyZW50LCBkZWZhdWx0T3B0aW9ucykge1xyXG5cdFx0dmFyIG9wdGlvbnMgPSBTZXJ2aWNlQnVpbGRlci5jb3B5KGRlZmF1bHRPcHRpb25zKTtcclxuXHRcdGZvciAodmFyIGF0dHIsIGogPSAwLCBhdHRycyA9IHBhcmVudC5hdHRyaWJ1dGVzLCBsID0gYXR0cnMubGVuZ3RoOyBqIDwgbDsgaisrKSB7XHJcblx0XHRcdGF0dHIgPSBhdHRycy5pdGVtKGopO1xyXG5cdFx0XHR2YXIga2V5ID0gU2VydmljZUJ1aWxkZXIub3B0aW9uTmFtZShhdHRyLm5vZGVOYW1lKTtcclxuXHRcdFx0aWYgKGtleSkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZSA9IGF0dHIubm9kZVZhbHVlO1xyXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKVxyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xyXG5cdFx0XHRcdG9wdGlvbnNba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3B0aW9ucztcclxuXHR9XHJcblx0XHJcblx0cmV0dXJuIFNlcnZpY2VCdWlsZGVyO1xyXG59KTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5kZWZpbmUoJ3h0ZXh0L0FjZUVkaXRvckNvbnRleHQnLFtdLCBmdW5jdGlvbigpIHtcclxuXHRcclxuXHQvKipcclxuXHQgKiBBbiBlZGl0b3IgY29udGV4dCBtZWRpYXRlcyBiZXR3ZWVuIHRoZSBYdGV4dCBzZXJ2aWNlcyBhbmQgdGhlIEFjZSBlZGl0b3IgZnJhbWV3b3JrLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIEFjZUVkaXRvckNvbnRleHQoZWRpdG9yKSB7XHJcblx0XHR0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XHJcblx0XHR0aGlzLl9zZXJ2ZXJTdGF0ZSA9IHt9O1xyXG5cdFx0dGhpcy5fc2VydmVyU3RhdGVMaXN0ZW5lcnMgPSBbXTtcclxuXHRcdHRoaXMuX2RpcnR5ID0gZmFsc2U7XHJcblx0XHR0aGlzLl9kaXJ0eVN0YXRlTGlzdGVuZXJzID0gW107XHJcblx0fTtcclxuXHJcblx0QWNlRWRpdG9yQ29udGV4dC5wcm90b3R5cGUgPSB7XHJcblx0XHRcclxuXHRcdGdldFNlcnZlclN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NlcnZlclN0YXRlO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0dXBkYXRlU2VydmVyU3RhdGU6IGZ1bmN0aW9uKGN1cnJlbnRUZXh0LCBjdXJyZW50U3RhdGVJZCkge1xyXG5cdFx0XHR0aGlzLl9zZXJ2ZXJTdGF0ZS50ZXh0ID0gY3VycmVudFRleHQ7XHJcblx0XHRcdHRoaXMuX3NlcnZlclN0YXRlLnN0YXRlSWQgPSBjdXJyZW50U3RhdGVJZDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3NlcnZlclN0YXRlTGlzdGVuZXJzO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0YWRkU2VydmVyU3RhdGVMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuZXIpIHtcclxuXHRcdFx0dGhpcy5fc2VydmVyU3RhdGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRnZXRDYXJldE9mZnNldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBwb3MgPSB0aGlzLl9lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0RG9jdW1lbnQoKS5wb3NpdGlvblRvSW5kZXgocG9zKTtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdGdldExpbmVTdGFydDogZnVuY3Rpb24obGluZU51bWJlcikge1xyXG5cdFx0XHR2YXIgcG9zID0gdGhpcy5fZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XHJcblx0XHRcdHJldHVybiBwb3Mucm93O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0Z2V0U2VsZWN0aW9uOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5fZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XHJcblx0XHRcdHZhciBkb2N1bWVudCA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0RG9jdW1lbnQoKTtcclxuICAgICAgICBcdHJldHVybiB7XHJcbiAgICAgICAgXHRcdHN0YXJ0OiBkb2N1bWVudC5wb3NpdGlvblRvSW5kZXgocmFuZ2Uuc3RhcnQpLFxyXG4gICAgICAgIFx0XHRlbmQ6IGRvY3VtZW50LnBvc2l0aW9uVG9JbmRleChyYW5nZS5lbmQpXHJcbiAgICAgICAgXHR9O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0Z2V0VGV4dDogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG5cdFx0XHR2YXIgc2Vzc2lvbiA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCk7XHJcblx0XHRcdGlmIChzdGFydCAmJiBlbmQpIHtcclxuXHRcdFx0XHR2YXIgZG9jdW1lbnQgPSBzZXNzaW9uLmdldERvY3VtZW50KCk7XHJcblx0XHRcdFx0dmFyIHN0YXJ0UG9zID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKHN0YXJ0KTtcclxuXHRcdFx0XHR2YXIgZW5kUG9zID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKGVuZCk7XHJcblx0XHRcdFx0dmFyIG1SYW5nZSA9IHJlcXVpcmUoJ2FjZS9yYW5nZScpO1xyXG5cdFx0XHRcdC8vdmFyIG1SYW5nZSA9IHJlcXVpcmUoJ2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvYWNlJyk7XHJcblx0XHRcdFx0cmV0dXJuIHNlc3Npb24uZ2V0VGV4dFJhbmdlKG5ldyBtUmFuZ2UuUmFuZ2Uoc3RhcnRQb3Mucm93LCBzdGFydFBvcy5jb2x1bW4sIGVuZFBvcy5yb3csIGVuZFBvcy5jb2x1bW4pKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gc2Vzc2lvbi5nZXRWYWx1ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRpc0RpcnR5OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2RpcnR5O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0c2V0RGlydHk6IGZ1bmN0aW9uKGRpcnR5KSB7XHJcblx0XHRcdGlmIChkaXJ0eSAhPSB0aGlzLl9kaXJ0eSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlydHlTdGF0ZUxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dGhpcy5fZGlydHlTdGF0ZUxpc3RlbmVyc1tpXShkaXJ0eSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX2RpcnR5ID0gZGlydHk7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRhZGREaXJ0eVN0YXRlTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XHJcblx0XHRcdHRoaXMuX2RpcnR5U3RhdGVMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRjbGVhclVuZG9TdGFjazogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuZ2V0VW5kb01hbmFnZXIoKS5yZXNldCgpO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0c2V0Q2FyZXRPZmZzZXQ6IGZ1bmN0aW9uKG9mZnNldCkge1xyXG5cdFx0XHR2YXIgcG9zID0gdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5nZXREb2N1bWVudCgpLmluZGV4VG9Qb3NpdGlvbihvZmZzZXQpO1xyXG5cdFx0XHR0aGlzLl9lZGl0b3IubW92ZUN1cnNvclRvKHBvcy5yb3csIHBvcy5jb2x1bW4pO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0c2V0U2VsZWN0aW9uOiBmdW5jdGlvbihzZWxlY3Rpb24pIHtcclxuXHRcdFx0aWYgKHRoaXMuX2VkaXRvci5zZWxlY3Rpb24pIHtcclxuXHRcdFx0XHR2YXIgZG9jdW1lbnQgPSB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLmdldERvY3VtZW50KCk7XHJcblx0XHRcdFx0dmFyIHN0YXJ0UG9zID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKHNlbGVjdGlvbi5zdGFydCk7XHJcblx0XHRcdFx0dmFyIGVuZFBvcyA9IGRvY3VtZW50LmluZGV4VG9Qb3NpdGlvbihzZWxlY3Rpb24uZW5kKTtcclxuXHRcdFx0XHR0aGlzLl9lZGl0b3Iuc2VsZWN0aW9uLnNldFNlbGVjdGlvblJhbmdlKG5ldyBtUmFuZ2UuUmFuZ2Uoc3RhcnRQb3Mucm93LCBzdGFydFBvcy5jb2x1bW4sIGVuZFBvcy5yb3csIGVuZFBvcy5jb2x1bW4pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0c2V0VGV4dDogZnVuY3Rpb24odGV4dCwgc3RhcnQsIGVuZCkge1xyXG5cdFx0XHR2YXIgc2Vzc2lvbiA9IHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCk7XHJcblx0XHRcdHZhciBkb2N1bWVudCA9IHNlc3Npb24uZ2V0RG9jdW1lbnQoKTtcclxuXHRcdFx0aWYgKCFzdGFydClcclxuXHRcdFx0XHRzdGFydCA9IDA7XHJcblx0XHRcdGlmICghZW5kKVxyXG5cdFx0XHRcdGVuZCA9IGRvY3VtZW50LmdldFZhbHVlKCkubGVuZ3RoO1xyXG5cdFx0XHR2YXIgc3RhcnRQb3MgPSBkb2N1bWVudC5pbmRleFRvUG9zaXRpb24oc3RhcnQpO1xyXG5cdFx0XHR2YXIgZW5kUG9zID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKGVuZCk7XHJcblx0XHRcdHZhciBjdXJzb3JQb3MgPSB0aGlzLl9lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcclxuXHRcdFx0dmFyIG1SYW5nZSA9IHJlcXVpcmUoJ2FjZS9yYW5nZScpO1xyXG5cdFx0XHQvL3ZhciBtUmFuZ2UgPSByZXF1aXJlKCdhY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZScpO1xyXG5cdFx0XHRzZXNzaW9uLnJlcGxhY2UobmV3IG1SYW5nZS5SYW5nZShzdGFydFBvcy5yb3csIHN0YXJ0UG9zLmNvbHVtbiwgZW5kUG9zLnJvdywgZW5kUG9zLmNvbHVtbiksIHRleHQpO1xyXG5cdFx0XHR0aGlzLl9lZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24oY3Vyc29yUG9zKTtcclxuXHRcdFx0dGhpcy5fZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cdFxyXG5cdHJldHVybiBBY2VFZGl0b3JDb250ZXh0O1xyXG59KTtcclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ29weXJpZ2h0IChjKSAyMDE1IGl0ZW1pcyBBRyAoaHR0cDovL3d3dy5pdGVtaXMuZXUpIGFuZCBvdGhlcnMuXHJcbiAqIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZVxyXG4gKiB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSAyLjAgd2hpY2ggaXMgYXZhaWxhYmxlIGF0XHJcbiAqIGh0dHA6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLTIuMC5cclxuICpcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKlxyXG4gKiBVc2UgYGNyZWF0ZUVkaXRvcihvcHRpb25zKWAgdG8gY3JlYXRlIGFuIFh0ZXh0IGVkaXRvci4gWW91IGNhbiBzcGVjaWZ5IG9wdGlvbnMgZWl0aGVyXHJcbiAqIHRocm91Z2ggdGhlIGZ1bmN0aW9uIHBhcmFtZXRlciBvciB0aHJvdWdoIGBkYXRhLWVkaXRvci14YCBhdHRyaWJ1dGVzLCB3aGVyZSB4IGlzIGFuXHJcbiAqIG9wdGlvbiBuYW1lIHdpdGggY2FtZWxDYXNlIGNvbnZlcnRlZCB0byBoeXBoZW4tc2VwYXJhdGVkLlxyXG4gKiBUaGUgZm9sbG93aW5nIG9wdGlvbnMgYXJlIGF2YWlsYWJsZTpcclxuICpcclxuICogYmFzZVVybCA9IFwiL1wiIHtTdHJpbmd9XHJcbiAqICAgICBUaGUgcGF0aCBzZWdtZW50IHdoZXJlIHRoZSBYdGV4dCBzZXJ2aWNlIGlzIGZvdW5kOyBzZWUgc2VydmljZVVybCBvcHRpb24uXHJcbiAqIGNvbnRlbnRUeXBlIHtTdHJpbmd9XHJcbiAqICAgICBUaGUgY29udGVudCB0eXBlIGluY2x1ZGVkIGluIHJlcXVlc3RzIHRvIHRoZSBYdGV4dCBzZXJ2ZXIuXHJcbiAqIGRpcnR5RWxlbWVudCB7U3RyaW5nIHwgRE9NRWxlbWVudH1cclxuICogICAgIEFuIGVsZW1lbnQgaW50byB3aGljaCB0aGUgZGlydHkgc3RhdHVzIGNsYXNzIGlzIHdyaXR0ZW4gd2hlbiB0aGUgZWRpdG9yIGlzIG1hcmtlZCBkaXJ0eTtcclxuICogICAgIGl0IGNhbiBiZSBlaXRoZXIgYSBET00gZWxlbWVudCBvciBhbiBJRCBmb3IgYSBET00gZWxlbWVudC5cclxuICogZGlydHlTdGF0dXNDbGFzcyA9ICdkaXJ0eScge1N0cmluZ31cclxuICogICAgIEEgQ1NTIGNsYXNzIG5hbWUgd3JpdHRlbiBpbnRvIHRoZSBkaXJ0eUVsZW1lbnQgd2hlbiB0aGUgZWRpdG9yIGlzIG1hcmtlZCBkaXJ0eS5cclxuICogZG9jdW1lbnQge0RvY3VtZW50fVxyXG4gKiAgICAgVGhlIGRvY3VtZW50OyBpZiBub3Qgc3BlY2lmaWVkLCB0aGUgZ2xvYmFsIGRvY3VtZW50IGlzIHVzZWQuXHJcbiAqIGVuYWJsZUNvbnRlbnRBc3Npc3RTZXJ2aWNlID0gdHJ1ZSB7Qm9vbGVhbn1cclxuICogICAgIFdoZXRoZXIgY29udGVudCBhc3Npc3Qgc2hvdWxkIGJlIGVuYWJsZWQuXHJcbiAqIGVuYWJsZUZvcm1hdHRpbmdBY3Rpb24gPSBmYWxzZSB7Qm9vbGVhbn1cclxuICogICAgIFdoZXRoZXIgdGhlIGZvcm1hdHRpbmcgYWN0aW9uIHNob3VsZCBiZSBib3VuZCB0byB0aGUgc3RhbmRhcmQga2V5c3Ryb2tlIGN0cmwrc2hpZnQrZiAvIGNtZCtzaGlmdCtmLlxyXG4gKiBlbmFibGVGb3JtYXR0aW5nU2VydmljZSA9IHRydWUge0Jvb2xlYW59XHJcbiAqICAgICBXaGV0aGVyIHRleHQgZm9ybWF0dGluZyBzaG91bGQgYmUgZW5hYmxlZC5cclxuICogZW5hYmxlR2VuZXJhdG9yU2VydmljZSA9IHRydWUge0Jvb2xlYW59XHJcbiAqICAgICBXaGV0aGVyIGNvZGUgZ2VuZXJhdGlvbiBzaG91bGQgYmUgZW5hYmxlZCAobXVzdCBiZSB0cmlnZ2VyZWQgdGhyb3VnaCBKYXZhU2NyaXB0IGNvZGUpLlxyXG4gKiBlbmFibGVPY2N1cnJlbmNlc1NlcnZpY2UgPSB0cnVlIHtCb29sZWFufVxyXG4gKiAgICAgV2hldGhlciBtYXJraW5nIG9jY3VycmVuY2VzIHNob3VsZCBiZSBlbmFibGVkLlxyXG4gKiBlbmFibGVTYXZlQWN0aW9uID0gZmFsc2Uge0Jvb2xlYW59XHJcbiAqICAgICBXaGV0aGVyIHRoZSBzYXZlIGFjdGlvbiBzaG91bGQgYmUgYm91bmQgdG8gdGhlIHN0YW5kYXJkIGtleXN0cm9rZSBjdHJsK3MgLyBjbWQrcy5cclxuICogZW5hYmxlVmFsaWRhdGlvblNlcnZpY2UgPSB0cnVlIHtCb29sZWFufVxyXG4gKiAgICAgV2hldGhlciB2YWxpZGF0aW9uIHNob3VsZCBiZSBlbmFibGVkLlxyXG4gKiBsb2FkRnJvbVNlcnZlciA9IHRydWUge0Jvb2xlYW59XHJcbiAqICAgICBXaGV0aGVyIHRvIGxvYWQgdGhlIGVkaXRvciBjb250ZW50IGZyb20gdGhlIHNlcnZlci5cclxuICogcGFyZW50ID0gJ3h0ZXh0LWVkaXRvcicge1N0cmluZyB8IERPTUVsZW1lbnR9XHJcbiAqICAgICBUaGUgcGFyZW50IGVsZW1lbnQgZm9yIHRoZSB2aWV3OyBpdCBjYW4gYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgYW4gSUQgZm9yIGEgRE9NIGVsZW1lbnQuXHJcbiAqIHBhcmVudENsYXNzID0gJ3h0ZXh0LWVkaXRvcicge1N0cmluZ31cclxuICogICAgIElmIHRoZSAncGFyZW50JyBvcHRpb24gaXMgbm90IGdpdmVuLCB0aGlzIG9wdGlvbiBpcyB1c2VkIHRvIGZpbmQgZWxlbWVudHMgdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gY2xhc3MgbmFtZS5cclxuICogcG9zaXRpb24ge1N0cmluZ31cclxuICogICAgIElmIHRoaXMgb3B0aW9uIGlzIHNldCwgdGhlICdwb3NpdGlvbicgQ1NTIGF0dHJpYnV0ZSBvZiB0aGUgY3JlYXRlZCBlZGl0b3IgaXMgc2V0IGFjY29yZGluZ2x5LlxyXG4gKiByZXNvdXJjZUlkIHtTdHJpbmd9XHJcbiAqICAgICBUaGUgaWRlbnRpZmllciBvZiB0aGUgcmVzb3VyY2UgZGlzcGxheWVkIGluIHRoZSB0ZXh0IGVkaXRvcjsgdGhpcyBvcHRpb24gaXMgc2VudCB0byB0aGUgc2VydmVyIHRvXHJcbiAqICAgICBjb21tdW5pY2F0ZSByZXF1aXJlZCBpbmZvcm1hdGlvbiBvbiB0aGUgcmVzcGVjdGl2ZSByZXNvdXJjZS5cclxuICogc2VsZWN0aW9uVXBkYXRlRGVsYXkgPSA1NTAge051bWJlcn1cclxuICogICAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYWZ0ZXIgYSBzZWxlY3Rpb24gY2hhbmdlIGJlZm9yZSBYdGV4dCBzZXJ2aWNlcyBhcmUgaW52b2tlZC5cclxuICogc2VuZEZ1bGxUZXh0ID0gZmFsc2Uge0Jvb2xlYW59XHJcbiAqICAgICBXaGV0aGVyIHRoZSBmdWxsIHRleHQgc2hhbGwgYmUgc2VudCB0byB0aGUgc2VydmVyIHdpdGggZWFjaCByZXF1ZXN0OyB1c2UgdGhpcyBpZiB5b3Ugd2FudFxyXG4gKiAgICAgdGhlIHNlcnZlciB0byBydW4gaW4gc3RhdGVsZXNzIG1vZGUuIElmIHRoZSBvcHRpb24gaXMgaW5hY3RpdmUsIHRoZSBzZXJ2ZXIgc3RhdGUgaXMgdXBkYXRlZCByZWd1bGFybHkuXHJcbiAqIHNlcnZpY2VVcmwge1N0cmluZ31cclxuICogICAgIFRoZSBVUkwgb2YgdGhlIFh0ZXh0IHNlcnZsZXQ7IGlmIG5vIHZhbHVlIGlzIGdpdmVuLCBpdCBpcyBjb25zdHJ1Y3RlZCB1c2luZyB0aGUgYmFzZVVybCBvcHRpb24gaW4gdGhlIGZvcm1cclxuICogICAgIHtsb2NhdGlvbi5wcm90b2NvbH0vL3tsb2NhdGlvbi5ob3N0fXtiYXNlVXJsfXh0ZXh0LXNlcnZpY2VcclxuICogc2hvd0Vycm9yRGlhbG9ncyA9IGZhbHNlIHtCb29sZWFufVxyXG4gKiAgICAgV2hldGhlciBlcnJvcnMgc2hvdWxkIGJlIGRpc3BsYXllZCBpbiBwb3B1cCBkaWFsb2dzLlxyXG4gKiBzeW50YXhEZWZpbml0aW9uIHtTdHJpbmd9XHJcbiAqICAgICBBIHBhdGggdG8gYSBKUyBmaWxlIGRlZmluaW5nIGFuIEFjZSBzeW50YXggZGVmaW5pdGlvbjsgaWYgbm8gcGF0aCBpcyBnaXZlbiwgaXQgaXMgYnVpbHQgZnJvbVxyXG4gKiAgICAgdGhlICd4dGV4dExhbmcnIG9wdGlvbiBpbiB0aGUgZm9ybSAneHRleHQtcmVzb3VyY2VzL21vZGUte3h0ZXh0TGFuZ30nLiBTZXQgdGhpcyBvcHRpb24gdG8gJ25vbmUnIHRvXHJcbiAqICAgICBkaXNhYmxlIHN5bnRheCBoaWdobGlnaHRpbmcuXHJcbiAqIHRleHRVcGRhdGVEZWxheSA9IDUwMCB7TnVtYmVyfVxyXG4gKiAgICAgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBhZnRlciBhIHRleHQgY2hhbmdlIGJlZm9yZSBYdGV4dCBzZXJ2aWNlcyBhcmUgaW52b2tlZC5cclxuICogdGhlbWUge1N0cmluZ31cclxuICogICAgIFRoZSBwYXRoIG5hbWUgb2YgdGhlIEFjZSB0aGVtZSBmb3IgdGhlIGVkaXRvci5cclxuICogeHRleHRMYW5nIHtTdHJpbmd9XHJcbiAqICAgICBUaGUgbGFuZ3VhZ2UgbmFtZSAodXN1YWxseSB0aGUgZmlsZSBleHRlbnNpb24gY29uZmlndXJlZCBmb3IgdGhlIGxhbmd1YWdlKS5cclxuICovXHJcbi8vJ2FjZS9hY2UnLCBhY2VcclxuLy8nYWNlL2V4dC9sYW5ndWFnZV90b29scycsXHJcbmRlZmluZSgneHRleHQveHRleHQtYWNlJyxbXHJcbiAgICAnanF1ZXJ5JyxcclxuICAgICdhY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZScsXHJcbiAgICAnYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UnLFxyXG4gICAgJ3h0ZXh0L2NvbXBhdGliaWxpdHknLFxyXG4gICAgJ3h0ZXh0L1NlcnZpY2VCdWlsZGVyJyxcclxuXHQneHRleHQvQWNlRWRpdG9yQ29udGV4dCdcclxuXSwgZnVuY3Rpb24oalF1ZXJ5LCBhY2UsIGxhbmd1YWdlVG9vbHMsIGNvbXBhdGliaWxpdHksIFNlcnZpY2VCdWlsZGVyLCBFZGl0b3JDb250ZXh0KSB7XHJcblx0XHJcblx0dmFyIGV4cG9ydHMgPSB7fTtcclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGUgb25lIG9yIG1vcmUgWHRleHQgZWRpdG9yIGluc3RhbmNlcyBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXHJcblx0ICogVGhlIHJldHVybiB2YWx1ZSBpcyBlaXRoZXIgYW4gQWNlIGVkaXRvciBvciBhbiBhcnJheSBvZiBBY2UgZWRpdG9ycywgd2hpY2ggY2FuXHJcblx0ICogYmUgZnVydGhlciBjb25maWd1cmVkIHVzaW5nIHRoZSBBY2UgQVBJLlxyXG5cdCAqL1xyXG5cdGV4cG9ydHMuY3JlYXRlRWRpdG9yID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0aWYgKCFvcHRpb25zKVxyXG5cdFx0XHRvcHRpb25zID0ge307XHJcblx0XHRcclxuXHRcdHZhciBxdWVyeTtcclxuXHRcdGlmIChqUXVlcnkudHlwZShvcHRpb25zLnBhcmVudCkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHF1ZXJ5ID0galF1ZXJ5KCcjJyArIG9wdGlvbnMucGFyZW50LCBvcHRpb25zLmRvY3VtZW50KTtcclxuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5wYXJlbnQpIHtcclxuXHRcdFx0cXVlcnkgPSBqUXVlcnkob3B0aW9ucy5wYXJlbnQpO1xyXG5cdFx0fSBlbHNlIGlmIChqUXVlcnkudHlwZShvcHRpb25zLnBhcmVudENsYXNzKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cXVlcnkgPSBqUXVlcnkoJy4nICsgb3B0aW9ucy5wYXJlbnRDbGFzcywgb3B0aW9ucy5kb2N1bWVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRxdWVyeSA9IGpRdWVyeSgnI3h0ZXh0LWVkaXRvcicsIG9wdGlvbnMuZG9jdW1lbnQpO1xyXG5cdFx0XHRpZiAocXVlcnkubGVuZ3RoID09IDApXHJcblx0XHRcdFx0cXVlcnkgPSBqUXVlcnkoJy54dGV4dC1lZGl0b3InLCBvcHRpb25zLmRvY3VtZW50KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIGVkaXRvcnMgPSBbXTtcclxuXHRcdHF1ZXJ5LmVhY2goZnVuY3Rpb24oaW5kZXgsIHBhcmVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gYWNlLmVkaXQocGFyZW50KTtcclxuXHRcdFx0ZWRpdG9yLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5O1xyXG5cdFx0XHRpZiAob3B0aW9ucy5wb3NpdGlvbilcclxuXHRcdFx0XHRqUXVlcnkocGFyZW50KS5jc3MoJ3Bvc2l0aW9uJywgb3B0aW9ucy5wb3NpdGlvbik7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZWRpdG9yT3B0aW9ucyA9IFNlcnZpY2VCdWlsZGVyLm1lcmdlUGFyZW50T3B0aW9ucyhwYXJlbnQsIG9wdGlvbnMpO1xyXG5cdFx0XHRleHBvcnRzLmNyZWF0ZVNlcnZpY2VzKGVkaXRvciwgZWRpdG9yT3B0aW9ucyk7XHJcblx0XHRcdGlmIChlZGl0b3JPcHRpb25zLnRoZW1lKVxyXG5cdFx0XHRcdGVkaXRvci5zZXRUaGVtZShlZGl0b3JPcHRpb25zLnRoZW1lKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdGVkaXRvci5zZXRUaGVtZSgnYWNlL3RoZW1lL2VjbGlwc2UnKTtcclxuXHRcdFx0ZWRpdG9yc1tpbmRleF0gPSBlZGl0b3I7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0aWYgKGVkaXRvcnMubGVuZ3RoID09IDEpXHJcblx0XHRcdHJldHVybiBlZGl0b3JzWzBdO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gZWRpdG9ycztcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gQWNlU2VydmljZUJ1aWxkZXIoZWRpdG9yLCB4dGV4dFNlcnZpY2VzKSB7XHJcblx0XHR0aGlzLmVkaXRvciA9IGVkaXRvcjtcclxuXHRcdHh0ZXh0U2VydmljZXMuZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnMgPSBbXTtcclxuXHRcdHh0ZXh0U2VydmljZXMuZWRpdG9yQ29udGV4dC5fb2NjdXJyZW5jZU1hcmtlcnMgPSBbXTtcclxuXHRcdFNlcnZpY2VCdWlsZGVyLmNhbGwodGhpcywgeHRleHRTZXJ2aWNlcyk7XHJcblx0fVxyXG5cdEFjZVNlcnZpY2VCdWlsZGVyLnByb3RvdHlwZSA9IG5ldyBTZXJ2aWNlQnVpbGRlcigpO1xyXG5cdFx0XHJcblx0LyoqXHJcblx0ICogQ29uZmlndXJlIFh0ZXh0IHNlcnZpY2VzIGZvciB0aGUgZ2l2ZW4gZWRpdG9yLiBUaGUgZWRpdG9yIGRvZXMgbm90IGhhdmUgdG8gYmUgY3JlYXRlZFxyXG5cdCAqIHdpdGggY3JlYXRlRWRpdG9yKG9wdGlvbnMpLlxyXG5cdCAqL1xyXG5cdGV4cG9ydHMuY3JlYXRlU2VydmljZXMgPSBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcclxuXHRcdHZhciB4dGV4dFNlcnZpY2VzID0ge1xyXG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLFxyXG5cdFx0XHRlZGl0b3JDb250ZXh0OiBuZXcgRWRpdG9yQ29udGV4dChlZGl0b3IpXHJcblx0XHR9O1xyXG5cdFx0dmFyIHNlcnZpY2VCdWlsZGVyID0gbmV3IEFjZVNlcnZpY2VCdWlsZGVyKGVkaXRvciwgeHRleHRTZXJ2aWNlcyk7XHJcblx0XHRzZXJ2aWNlQnVpbGRlci5jcmVhdGVTZXJ2aWNlcygpO1xyXG5cdFx0eHRleHRTZXJ2aWNlcy5zZXJ2aWNlQnVpbGRlciA9IHNlcnZpY2VCdWlsZGVyO1xyXG5cdFx0ZWRpdG9yLnh0ZXh0U2VydmljZXMgPSB4dGV4dFNlcnZpY2VzO1xyXG5cdFx0cmV0dXJuIHh0ZXh0U2VydmljZXM7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZSBhbGwgc2VydmljZXMgYW5kIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiBwcmV2aW91c2x5IGNyZWF0ZWQgd2l0aCBjcmVhdGVTZXJ2aWNlcyhlZGl0b3IsIG9wdGlvbnMpLlxyXG5cdCAqL1xyXG5cdGV4cG9ydHMucmVtb3ZlU2VydmljZXMgPSBmdW5jdGlvbihlZGl0b3IpIHtcclxuXHRcdGlmICghZWRpdG9yLnh0ZXh0U2VydmljZXMpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdHZhciBzZXJ2aWNlcyA9IGVkaXRvci54dGV4dFNlcnZpY2VzO1xyXG5cdFx0dmFyIHNlc3Npb24gPSBlZGl0b3IuZ2V0U2Vzc2lvbigpO1xyXG5cdFx0aWYgKHNlcnZpY2VzLm1vZGVsQ2hhbmdlTGlzdGVuZXIpXHJcblx0XHRcdGVkaXRvci5vZmYoJ2NoYW5nZScsIHNlcnZpY2VzLm1vZGVsQ2hhbmdlTGlzdGVuZXIpO1xyXG5cdFx0aWYgKHNlcnZpY2VzLmNoYW5nZUN1cnNvckxpc3RlbmVyKVxyXG5cdFx0XHRlZGl0b3IuZ2V0U2VsZWN0aW9uKCkub2ZmKCdjaGFuZ2VDdXJzb3InLCBzZXJ2aWNlcy5jaGFuZ2VDdXJzb3JMaXN0ZW5lcik7XHJcblx0XHRpZiAoZWRpdG9yLmNvbW1hbmRzKSB7XHJcblx0XHRcdGlmIChzZXJ2aWNlcy5vcHRpb25zLmVuYWJsZVNhdmVBY3Rpb24pXHJcblx0XHRcdFx0ZWRpdG9yLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmQoJ3h0ZXh0LXNhdmUnKTtcclxuXHRcdFx0aWYgKHNlcnZpY2VzLm9wdGlvbnMuZW5hYmxlRm9ybWF0dGluZ0FjdGlvbilcclxuXHRcdFx0XHRlZGl0b3IuY29tbWFuZHMucmVtb3ZlQ29tbWFuZCgneHRleHQtZm9ybWF0Jyk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2VydmljZXMuY29udGVudEFzc2lzdFNlcnZpY2UpXHJcblx0XHRcdGVkaXRvci5zZXRPcHRpb25zKHsgZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbjogZmFsc2UgfSk7XHJcblx0XHR2YXIgZWRpdG9yQ29udGV4dCA9IHNlcnZpY2VzLmVkaXRvckNvbnRleHQ7XHJcblx0XHR2YXIgYW5ub3RhdGlvbnMgPSBlZGl0b3JDb250ZXh0Ll9hbm5vdGF0aW9ucztcclxuXHRcdGlmIChhbm5vdGF0aW9ucykge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFubm90YXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0c2Vzc2lvbi5yZW1vdmVNYXJrZXIoYW5ub3RhdGlvbnNbaV0ubWFya2VySWQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoW10pO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG9jY3VycmVuY2VNYXJrZXJzID0gZWRpdG9yQ29udGV4dC5fb2NjdXJyZW5jZU1hcmtlcnM7XHJcblx0XHRpZiAob2NjdXJyZW5jZU1hcmtlcnMpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvY2N1cnJlbmNlTWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHNlc3Npb24ucmVtb3ZlTWFya2VyKG9jY3VycmVuY2VNYXJrZXJzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZGVsZXRlIGVkaXRvci54dGV4dFNlcnZpY2VzO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBTeW50YXggaGlnaGxpZ2h0aW5nICh3aXRob3V0IHNlbWFudGljIGhpZ2hsaWdodGluZykuXHJcblx0ICovXHJcblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwU3ludGF4SGlnaGxpZ2h0aW5nID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuc2VydmljZXMub3B0aW9ucztcclxuXHRcdHZhciBzZXNzaW9uID0gdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpO1xyXG5cdFx0aWYgKG9wdGlvbnMuc3ludGF4RGVmaW5pdGlvbiAhPSAnbm9uZScgJiYgKG9wdGlvbnMuc3ludGF4RGVmaW5pdGlvbiB8fCBvcHRpb25zLnh0ZXh0TGFuZykpIHtcclxuXHRcdFx0dmFyIHN5bnRheERlZmluaXRpb24gPSBvcHRpb25zLnN5bnRheERlZmluaXRpb247XHJcblx0XHRcdGlmICghc3ludGF4RGVmaW5pdGlvbilcclxuXHRcdFx0XHRzeW50YXhEZWZpbml0aW9uID0gJ3h0ZXh0LXJlc291cmNlcy9tb2RlLScgKyBvcHRpb25zLnh0ZXh0TGFuZztcclxuXHRcdFx0aWYgKHR5cGVvZihzeW50YXhEZWZpbml0aW9uKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdC8vIFNldCBhY2UgbW9kZSB0aGF0IGhhcyBiZWVuIGxvYWRlZCBieSB0aGUgcGxhdGZvcm1cclxuXHRcdFx0XHRcdHNlc3Npb24uc2V0TW9kZShzeW50YXhEZWZpbml0aW9uKTtcclxuXHRcdFx0fSBlbHNlIGlmIChzeW50YXhEZWZpbml0aW9uLk1vZGUpIHtcclxuXHRcdFx0XHRzZXNzaW9uLnNldE1vZGUobmV3IHN5bnRheERlZmluaXRpb24uTW9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiBEb2N1bWVudCB1cGRhdGUgc2VydmljZS5cclxuXHQgKi9cclxuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuc2V0dXBVcGRhdGVTZXJ2aWNlID0gZnVuY3Rpb24ocmVmcmVzaERvY3VtZW50KSB7XHJcblx0XHR2YXIgc2VydmljZXMgPSB0aGlzLnNlcnZpY2VzO1xyXG5cdFx0dmFyIGVkaXRvckNvbnRleHQgPSBzZXJ2aWNlcy5lZGl0b3JDb250ZXh0O1xyXG5cdFx0dmFyIHRleHRVcGRhdGVEZWxheSA9IHNlcnZpY2VzLm9wdGlvbnMudGV4dFVwZGF0ZURlbGF5O1xyXG5cdFx0aWYgKCF0ZXh0VXBkYXRlRGVsYXkpXHJcblx0XHRcdHRleHRVcGRhdGVEZWxheSA9IDUwMDtcclxuXHRcdHNlcnZpY2VzLm1vZGVsQ2hhbmdlTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRpZiAoIWV2ZW50Ll94dGV4dF9pbml0KVxyXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuc2V0RGlydHkodHJ1ZSk7XHJcblx0XHRcdGlmIChlZGl0b3JDb250ZXh0Ll9tb2RlbENoYW5nZVRpbWVvdXQpXHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGVkaXRvckNvbnRleHQuX21vZGVsQ2hhbmdlVGltZW91dCk7XHJcblx0XHRcdGVkaXRvckNvbnRleHQuX21vZGVsQ2hhbmdlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHNlcnZpY2VzLm9wdGlvbnMuc2VuZEZ1bGxUZXh0KVxyXG5cdFx0XHRcdFx0cmVmcmVzaERvY3VtZW50KCk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0c2VydmljZXMudXBkYXRlKCk7XHJcblx0XHRcdH0sIHRleHRVcGRhdGVEZWxheSk7XHJcblx0XHR9XHJcblx0XHRpZiAoIXNlcnZpY2VzLm9wdGlvbnMucmVzb3VyY2VJZCB8fCAhc2VydmljZXMub3B0aW9ucy5sb2FkRnJvbVNlcnZlcilcclxuXHRcdFx0c2VydmljZXMubW9kZWxDaGFuZ2VMaXN0ZW5lcih7X3h0ZXh0X2luaXQ6IHRydWV9KTtcclxuXHRcdHRoaXMuZWRpdG9yLm9uKCdjaGFuZ2UnLCBzZXJ2aWNlcy5tb2RlbENoYW5nZUxpc3RlbmVyKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogUGVyc2lzdGVuY2Ugc2VydmljZXM6IGxvYWQsIHNhdmUsIGFuZCByZXZlcnQuXHJcblx0ICovXHJcblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwUGVyc2lzdGVuY2VTZXJ2aWNlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlcnZpY2VzID0gdGhpcy5zZXJ2aWNlcztcclxuXHRcdGlmIChzZXJ2aWNlcy5vcHRpb25zLmVuYWJsZVNhdmVBY3Rpb24gJiYgdGhpcy5lZGl0b3IuY29tbWFuZHMpIHtcclxuXHRcdFx0dGhpcy5lZGl0b3IuY29tbWFuZHMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdFx0bmFtZTogJ3h0ZXh0LXNhdmUnLFxyXG5cdFx0XHRcdGJpbmRLZXk6IHt3aW46ICdDdHJsLVMnLCBtYWM6ICdDb21tYW5kLVMnfSxcclxuXHRcdFx0XHRleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcclxuXHRcdFx0XHRcdHNlcnZpY2VzLnNhdmVSZXNvdXJjZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHJcblx0LyoqXHJcblx0ICogQ29udGVudCBhc3Npc3Qgc2VydmljZS5cclxuXHQgKi9cclxuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuc2V0dXBDb250ZW50QXNzaXN0U2VydmljZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbXBsZXRlciA9IHtcclxuXHRcdFx0Z2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGVkaXRvciwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5lY2xpcHNlLm9yZy9idWdzL3Nob3dfYnVnLmNnaT9pZD00ODY2MTVcclxuXHRcdFx0XHR2YXIgc2VydmljZXMgPSBlZGl0b3IueHRleHRTZXJ2aWNlcztcclxuXHRcdFx0XHR2YXIgcGFyYW1zID0gU2VydmljZUJ1aWxkZXIuY29weShzZXJ2aWNlcy5vcHRpb25zKTtcclxuXHRcdFx0XHR2YXIgZG9jdW1lbnQgPSBzZXNzaW9uLmdldERvY3VtZW50KCk7XHJcblx0XHRcdFx0cGFyYW1zLm9mZnNldCA9IGRvY3VtZW50LnBvc2l0aW9uVG9JbmRleChwb3MpO1xyXG5cdFx0XHRcdHZhciByYW5nZSA9IGVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpO1xyXG5cdFx0XHRcdHBhcmFtcy5zZWxlY3Rpb24gPSB7XHJcblx0XHRcdFx0XHRzdGFydDogZG9jdW1lbnQucG9zaXRpb25Ub0luZGV4KHJhbmdlLnN0YXJ0KSxcclxuXHRcdFx0XHRcdGVuZDogZG9jdW1lbnQucG9zaXRpb25Ub0luZGV4KHJhbmdlLmVuZClcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHNlcnZpY2VzLmNvbnRlbnRBc3Npc3RTZXJ2aWNlLmludm9rZShzZXJ2aWNlcy5lZGl0b3JDb250ZXh0LCBwYXJhbXMpLmRvbmUoZnVuY3Rpb24oZW50cmllcykge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgZW50cmllcy5tYXAoZnVuY3Rpb24oZW50cnksIGluZGV4LCBhKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGVudHJ5LnByb3Bvc2FsLFxyXG5cdFx0XHRcdFx0XHRcdGNhcHRpb246IChlbnRyeS5sYWJlbCA/IGVudHJ5LmxhYmVsIDogZW50cnkucHJvcG9zYWwpLFxyXG5cdFx0XHRcdFx0XHRcdG1ldGE6IGVudHJ5LmRlc2NyaXB0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdHNjb3JlOiBhLmxlbmd0aCAtIGluZGV4XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZWRpdG9yLnNldE9wdGlvbnMoeyBlbmFibGVCYXNpY0F1dG9jb21wbGV0aW9uOiBbY29tcGxldGVyXSB9KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQWRkIGEgcHJvYmxlbSBtYXJrZXIgdG8gYW4gZWRpdG9yIHNlc3Npb24uXHJcblx0ICovXHJcblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLl9hZGRNYXJrZXIgPSBmdW5jdGlvbihzZXNzaW9uLCBzdGFydE9mZnNldCwgZW5kT2Zmc2V0LCBjbGF6eiwgdHlwZSkge1xyXG5cdFx0dmFyIGRvY3VtZW50ID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpO1xyXG5cdFx0dmFyIHN0YXJ0ID0gZG9jdW1lbnQuaW5kZXhUb1Bvc2l0aW9uKHN0YXJ0T2Zmc2V0KTtcclxuXHRcdHZhciBlbmQgPSBkb2N1bWVudC5pbmRleFRvUG9zaXRpb24oZW5kT2Zmc2V0KTtcclxuXHRcdHZhciBtUmFuZ2UgPSByZXF1aXJlKCdhY2UvcmFuZ2UnKTtcclxuXHRcdC8vdmFyIG1SYW5nZSA9IHJlcXVpcmUoJ2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvYWNlJyk7XHJcblx0XHR2YXIgcmFuZ2UgPSBuZXcgbVJhbmdlLlJhbmdlKHN0YXJ0LnJvdywgc3RhcnQuY29sdW1uLCBlbmQucm93LCBlbmQuY29sdW1uKTtcclxuXHRcdHJldHVybiBzZXNzaW9uLmFkZE1hcmtlcihyYW5nZSwgJ3h0ZXh0LW1hcmtlcl8nICsgY2xhenosICd0ZXh0Jyk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFZhbGlkYXRpb24gc2VydmljZS5cclxuXHQgKi9cclxuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuZG9WYWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VydmljZXMgPSB0aGlzLnNlcnZpY2VzO1xyXG5cdFx0dmFyIGVkaXRvckNvbnRleHQgPSBzZXJ2aWNlcy5lZGl0b3JDb250ZXh0O1xyXG5cdFx0dmFyIHNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCk7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRzZXJ2aWNlcy52YWxpZGF0ZSgpLmFsd2F5cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGFubm90YXRpb25zID0gZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnM7XHJcblx0XHRcdGlmIChhbm5vdGF0aW9ucykge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbaV07XHJcblx0XHRcdFx0XHRzZXNzaW9uLnJlbW92ZU1hcmtlcihhbm5vdGF0aW9uLm1hcmtlcklkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnMgPSBbXTtcclxuXHRcdH0pLmRvbmUoZnVuY3Rpb24ocmVzdWx0KSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmlzc3Vlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBlbnRyeSA9IHJlc3VsdC5pc3N1ZXNbaV07XHJcblx0XHRcdFx0dmFyIG1hcmtlciA9IHNlbGYuX2FkZE1hcmtlcihzZXNzaW9uLCBlbnRyeS5vZmZzZXQsIGVudHJ5Lm9mZnNldCArIGVudHJ5Lmxlbmd0aCwgZW50cnkuc2V2ZXJpdHkpO1xyXG5cdFx0XHRcdHZhciBzdGFydCA9IHNlc3Npb24uZ2V0RG9jdW1lbnQoKS5pbmRleFRvUG9zaXRpb24oZW50cnkub2Zmc2V0KTtcclxuXHRcdFx0XHRlZGl0b3JDb250ZXh0Ll9hbm5vdGF0aW9ucy5wdXNoKHtcclxuXHRcdFx0XHRcdHJvdzogc3RhcnQucm93LFxyXG5cdFx0XHRcdFx0Y29sdW1uOiBzdGFydC5jb2x1bW4sXHJcblx0XHRcdFx0XHR0ZXh0OiBlbnRyeS5kZXNjcmlwdGlvbixcclxuXHRcdFx0XHRcdHR5cGU6IGVudHJ5LnNldmVyaXR5LFxyXG5cdFx0XHRcdFx0bWFya2VySWQ6IG1hcmtlclxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZWRpdG9yQ29udGV4dC5fYW5ub3RhdGlvbnMpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFx0XHJcblx0LyoqXHJcblx0ICogT2NjdXJyZW5jZXMgc2VydmljZS5cclxuXHQgKi9cclxuXHRBY2VTZXJ2aWNlQnVpbGRlci5wcm90b3R5cGUuc2V0dXBPY2N1cnJlbmNlc1NlcnZpY2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXM7XHJcblx0XHR2YXIgZWRpdG9yQ29udGV4dCA9IHNlcnZpY2VzLmVkaXRvckNvbnRleHQ7XHJcblx0XHR2YXIgc2VsZWN0aW9uVXBkYXRlRGVsYXkgPSBzZXJ2aWNlcy5vcHRpb25zLnNlbGVjdGlvblVwZGF0ZURlbGF5O1xyXG5cdFx0aWYgKCFzZWxlY3Rpb25VcGRhdGVEZWxheSlcclxuXHRcdFx0c2VsZWN0aW9uVXBkYXRlRGVsYXkgPSA1NTA7XHJcblx0XHR2YXIgZWRpdG9yID0gdGhpcy5lZGl0b3I7XHJcblx0XHR2YXIgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRzZXJ2aWNlcy5jaGFuZ2VDdXJzb3JMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoZWRpdG9yQ29udGV4dC5fc2VsZWN0aW9uQ2hhbmdlVGltZW91dCkge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dChlZGl0b3JDb250ZXh0Ll9zZWxlY3Rpb25DaGFuZ2VUaW1lb3V0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlZGl0b3JDb250ZXh0Ll9zZWxlY3Rpb25DaGFuZ2VUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgcGFyYW1zID0gU2VydmljZUJ1aWxkZXIuY29weShzZXJ2aWNlcy5vcHRpb25zKTtcclxuXHRcdFx0XHRwYXJhbXMub2Zmc2V0ID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpLnBvc2l0aW9uVG9JbmRleChlZGl0b3IuZ2V0U2VsZWN0aW9uKCkuZ2V0Q3Vyc29yKCkpO1xyXG5cdFx0XHRcdHNlcnZpY2VzLm9jY3VycmVuY2VzU2VydmljZS5pbnZva2UoZWRpdG9yQ29udGV4dCwgcGFyYW1zKS5hbHdheXMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgb2NjdXJyZW5jZU1hcmtlcnMgPSBlZGl0b3JDb250ZXh0Ll9vY2N1cnJlbmNlTWFya2VycztcclxuXHRcdFx0XHRcdGlmIChvY2N1cnJlbmNlTWFya2Vycykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9jY3VycmVuY2VNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG1hcmtlciA9IG9jY3VycmVuY2VNYXJrZXJzW2ldO1xyXG5cdFx0XHRcdFx0XHRcdHNlc3Npb24ucmVtb3ZlTWFya2VyKG1hcmtlcik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVkaXRvckNvbnRleHQuX29jY3VycmVuY2VNYXJrZXJzID0gW107XHJcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbihvY2N1cnJlbmNlc1Jlc3VsdCkge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvY2N1cnJlbmNlc1Jlc3VsdC5yZWFkUmVnaW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgcmVnaW9uID0gb2NjdXJyZW5jZXNSZXN1bHQucmVhZFJlZ2lvbnNbaV07XHJcblx0XHRcdFx0XHRcdHZhciBtYXJrZXIgPSBzZWxmLl9hZGRNYXJrZXIoc2Vzc2lvbiwgcmVnaW9uLm9mZnNldCwgcmVnaW9uLm9mZnNldCArIHJlZ2lvbi5sZW5ndGgsICdyZWFkJyk7XHJcblx0XHRcdFx0XHRcdGVkaXRvckNvbnRleHQuX29jY3VycmVuY2VNYXJrZXJzLnB1c2gobWFya2VyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2NjdXJyZW5jZXNSZXN1bHQud3JpdGVSZWdpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciByZWdpb24gPSBvY2N1cnJlbmNlc1Jlc3VsdC53cml0ZVJlZ2lvbnNbaV07XHJcblx0XHRcdFx0XHRcdHZhciBtYXJrZXIgPSBzZWxmLl9hZGRNYXJrZXIoc2Vzc2lvbiwgcmVnaW9uLm9mZnNldCwgcmVnaW9uLm9mZnNldCArIHJlZ2lvbi5sZW5ndGgsICd3cml0ZScpO1xyXG5cdFx0XHRcdFx0XHRlZGl0b3JDb250ZXh0Ll9vY2N1cnJlbmNlTWFya2Vycy5wdXNoKG1hcmtlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sIHNlbGVjdGlvblVwZGF0ZURlbGF5KTtcclxuXHRcdH07XHJcblx0XHRlZGl0b3IuZ2V0U2VsZWN0aW9uKCkub24oJ2NoYW5nZUN1cnNvcicsIHNlcnZpY2VzLmNoYW5nZUN1cnNvckxpc3RlbmVyKTtcclxuXHR9XHJcblx0XHRcclxuXHQvKipcclxuXHQgKiBGb3JtYXR0aW5nIHNlcnZpY2UuXHJcblx0ICovXHJcblx0QWNlU2VydmljZUJ1aWxkZXIucHJvdG90eXBlLnNldHVwRm9ybWF0dGluZ1NlcnZpY2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZXJ2aWNlcyA9IHRoaXMuc2VydmljZXM7XHJcblx0XHRpZiAoc2VydmljZXMub3B0aW9ucy5lbmFibGVGb3JtYXR0aW5nQWN0aW9uICYmIHRoaXMuZWRpdG9yLmNvbW1hbmRzKSB7XHJcblx0XHRcdHRoaXMuZWRpdG9yLmNvbW1hbmRzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRcdG5hbWU6ICd4dGV4dC1mb3JtYXQnLFxyXG5cdFx0XHRcdGJpbmRLZXk6IHt3aW46ICdDdHJsLVNoaWZ0LUYnLCBtYWM6ICdDb21tYW5kLVNoaWZ0LUYnfSxcclxuXHRcdFx0XHRleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcclxuXHRcdFx0XHRcdHNlcnZpY2VzLmZvcm1hdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBleHBvcnRzO1xyXG59KTtcclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=