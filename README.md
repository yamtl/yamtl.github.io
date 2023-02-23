## YAMTL 

**YAMTL** is an EMF-based model-to-model transformation engine whose transformations are defined with an internal DSL of [Xtend](http://www.eclipse.org/xtend/) (*Yet Another Model Transformation Language*).

### Getting started

YAMTL uses Gradle as build automation tool and can be executed from Java 8.


### Configuring a Gradle build script to use YAMTL

Add the following repository:

	repositories {
		maven {
			url "https://github.com/yamtl/yamtl.github.io/raw/mvn-repo/mvn-repo/snapshot-repo"
		}
		jcenter()
	}

Declare the following dependencies:

	dependencies {
		compile "org.eclipse.xtend:org.eclipse.xtend.lib:$xtendVersion"
		compile "yamtl:yamtl:X" // replace X with the corresponding version
	}

### Examples

Several examples are available in [this repository](https://github.com/yamtl/examples).

### Release notes


#### 0.3.0

* The `RuntimeModel` has been renamed to `UntypedModel`. YAMTL can import/export untyped models from/to: CSV, XML, JSON. It can import untyped models from EMF. 
* Improved invocation of static operation helpers. When the argument list of the operation is immutable, the call will be indexed.
* Improved storing models: all root objects are stored, independently of where they are created. Previously only root notedes mapped to input objects by trafo steps could be stored.

#### 0.2.9

* EMF models can be loaded as runtime models using `YAMTLModule::loadAsRuntimeModel`.

#### 0.2.8

* The containment hierarchy of an EMF model (including attribute values) can be serialised to JSON/CSV via the runtime model.
* Support for setting feature values of a `dynamicEObject` with `set` in a YAMTL transformation.
* Upgrade to Xtext 2.29.0 to support target compatibility with Java 17.

#### 0.2.7

* Support for parsing CSV, JSON as runtime models
* Support for storing output runtime models as CSV, JSON

#### 0.2.6

* YAMTL transformations without metamodel via the RuntimeModel
* Basic inference of feature types from unstructured data sources (CSV at the moment)


#### 0.2.5

* Upgrade to Java17, AspectJ 1.9.9.1, Gradle 7.5.1, Xtext 2.28.28, EMF change model 2.14.0, Ecore 2.17.0

#### 0.2.4

* Rules `toMany` need to declare the termination condition in the expression `toManyCap`, which returns an integer representing the number of occurrences of the match.
  * `toManyCap` expressions are not inherited and all concrete rules `toMany` need to have an expression `toManyCap`.
  * `matchCount` is an internal variable available at execution time but not at matching time (it cannot be used in filter expressions).

#### 0.2.3

* Boilerplate code generation using `YAMTLModule::generateBoilerplateCode`
  * Adds explicit typing to rules and there is no need to fetch variables from store. In addition, the IDE code completion can be used to write the body of a filter/output action.
  * Built-in helpers are generated too with the right return type. Built-in helpers are generated depending on the configuration parameters of the transformation. For example:
  	* `matchCount` is enabled when there are rules that are `toMany`
  	* `dirtyObjects` and `dirtyFeatures` are generated when `enableExplicitIncrementality`

#### 0.2.2

* YAMTLModule configuration parameters:
  * `fromRoots = true` indicates that an input model can be transformed from root objects following containment references explicitly in transformation rules. By default, this parameter is now set to false.
  * `enableCorrectnessCheck = true` indicates whether the mapping semantics check is enabled or disabled. By default it is true, which is useful for developing model transformations. 
* NEW FEATURE (experimental): matched rules `toMany` are used to enable several rule applications for the same input match, as defined by the filter of the rule. The consequences are that:
  1. An input match can be mapped to a list of output matches. Output actions must be independent of the rule filters as the rule as filters are processed during the matching phase and output actions are executed during the execution phase.
  2. An input match of a rule `toMany` may be related to several output matches, depending on the occurrence of the rule application. `fetch` for an input match will return the first occurrence (`0`) by default. Other occurrences can be retrieved by appending a natural number `occurrence` to the list of arguments of `fetch`. 
  3. The rule filter needs to define a termination condition for the repetition of matches with respect to `fetch('matchCount')`. `fetch('matchCount')` returns the number of times that a rule has been matched already and it can be used in any filter condition during the matching phase.
  4. To use multiple inheritance with `toMany` rules, the superrule needs to be `toMany`, and it should include a termination condition in the filter. To allow `toMany` rule to inherit from injective rules, the scheduler needs to apply repeated matching once a concrete match is found. This is not done yet.
  5. When rules with multiple input elements are used, the termination condition must be defined in the filter of the last matched element in order to increase the match counter when a full match is found.
* FIX issue when matching with multiple inheritance: backtracking was disabled when a non-leaf match failed  
* ChangeSpecification renamed as NotificationSpecification: specification of admissible notification. `YAMTLContentAdapter` filters notifications using this specification.
* The new ChangeSpecification defines the language of admissible changes that are to be propagated. The rest of changes are ignored. The specification is of the form `Map<EClass,Map<String,Map<String,Pair<YAMTLChangeType,(EObject,Object)=>boolean>>>>` indicating `Type |-> (Description |-> (featureName |-> <change,condition>))`. For example:

```
#{
	DocBook.section -> #{ íparasí -> #{
		íSwapping paragraphí -> (YAMTLChangeType.MOVE -> TRIVIAL_CHECK),
		íDeleting paragraphí -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK) }
	},
	DocBook.article -> #{
		ísections_1í -> #{
			íDeleting sectionsí -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK)
		} 
	},
	DocBook.sect1 -> #{ ísections_2í -> #{
		íDeleting sectionsí -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK) },
		íparasí -> #{
			íAdding an existing paragraph to Sect1í -> (YAMTLChangeType.ADD -> [ EObject eObj, Object value |
				val sect1 = eObj as Sect1
				val para = value as Para 
				sect1.paras.exists[it.content.startsWith(para.content)] as (EObject , Object)=>boolean)			
			]
		} 
	}
} 
```

#### 0.2.1

* Renamed propagation methods
  * `propagateDelta` is now called `applyAndPropagateDelta` explicitly indicating that it applies the change to the input model and then propagates it to the output model
  * the new `propagateDelta` only propagates changes to the output model

#### 0.2.0

* Parallel pattern matching with coarse granularity (experimental feature)


#### 0.1.5

* YAMTL can use change notifications to detect changes. The input model that can be subject to changes needs to be adapted with `YAMTLModule::adaptInputModel()`.
  
#### 0.1.2

* Indexing engine (experimental feature)
* Internal optimizations

#### 0.1.1

* allInstances is not a callable element
* bug fixes
* refactored ChangeDescription analysis

#### 0.1.0

Incremental evaluation of callable elements (experimental feature):
* allInstances, 
* staticAttribute, 
* contextualOperation,
* localInputFilter,
* localOutputAction,
* trafoStep

Incremental evaluation at element level excludes: derivedWith, globalFilter, using, undoAction, endWith. These elements of a transformation rule need can be evaluated incrementally at the level of transformation step. Backward compatibility with TrafoStep incrementality.

New features of the language:
* HelperCall: staticAttribute, contextualOperation. The body of helpers must be purely functional.
* DSL with polished syntax for rules and helpers: no more .build()
* impactAnalysis and evaluateAndPropagate at element level
* Lazy initialization of static attribute helpers
* Standalone helpers

#### 0.0.11-SNAPSHOT

* AspectJ configuration is now delegated to client code: aop.xml and aspects.
* Some initialization (deltaMatchPool) is partially reused between propagation of deltas.
* loadDelta() returns the delta where it is stored.

#### 0.0.10-SNAPSHOT

Binaries compiled with Java 11.

#### 0.0.9-SNAPSHOT

* FIX: During impact analysis of deltas, objects are added to the typeExtend when processing dirty objects only  and not when processing dirty features.
* OPTIMIZATION: Actions of out elements initialized to null by default.
* OPTIMIZATION: When undoing trafo steps, out elements are traversed when they have undo actions only.
* NEW FEATURE: When matching, to identify which trafoSteps are affected by featureCalls, YAMTL understands the plural of feature names, in case the name of the getter is different from the name of the feature.
  * An example of such a metamodel is [OSATE AADL](https://osate.org/), where one can find many-bounded features with name `componentInstance` whereas the corresponding getter is `getComponentInstances()`. Feature requested for AADL2AADL trafo provided by Hana Mkaouar, T√©l√©com Paris.

#### 0.0.8-SNAPSHOT

* FIX: Derived features were unset when re-executing transformation steps in propagation mode. This is no longer the case.
  * Found thanks to update case in AADL2AADL trafo provided by Hana Mkaouar, T√©l√©com Paris.

#### 0.0.7-SNAPSHOT

* FIX: Fetching elements with lazy rules that had more than one input element failed. An assertion now checks whether the arguments correspond to inElement patterns.

#### 0.0.6-SNAPSHOT

* Compatibility with Java 8
* Static type checking of the transformation declaration now happens when the transformation module is instantiated.
* The method `YAMTLModule.reset()` also deletes the `typeExtent` when locations initialized using the aspect `InitLocations`. When locations are initialized from the model registry in `YAMTLModule.execute()`, reset does not clear the `typeExtent`. 


#### 0.0.5-SNAPSHOT

* FIX: static helpers (in the helper store of a transformation) can now be used in rule filters.
* Support for delta analysis on target models
* More fine grained analysis of deltas
* Support for inconsistency specifications, with visual reporting using PlantUML
* FIX solve diamond bugs: 
  * bottom rule can only be matched when all of its superrules can match
  * bottom rule only executes actions once: when analysing the transformation statically, the bottom rule could get duplicate out elements by importing the same top outElements from different parents
* FIX matching bug when matching with class inheritance: an object can be a match either for a type in an inElement or for ANY of its supertypes
* FIX: dependencies only need to be tracked in incremental/propagation modes: normal mode was doing some unnecessary work in insertTupleMatch for feature calls/helpers
* Added flag `YAMTLModule::warnings-on` (by default set to `true`), which can be used to error warning messages in the output stream
* Added flag `YAMTLModule::initialSizeFactor` to indicate the initial size of the matchPool (10000 by default)

#### 0.0.4-SNAPSHOT

* Initialization of locations can be disabled during loading. This change breaks previous versions that were relying on this feature. To solve this problems, set the following configuration option in the runner: `YAMTLModule::initLocationsWhenLoading = true` 

#### 0.0.3-SNAPSHOT

* Upgrade to Java 11, Gradle 5, Xtend 2.17.1

#### 0.0.2-SNAPSHOT

* Support for incremental declarative m2m transformations (`mapping` semantics).

#### 0.0.1-SNAPSHOT

* Support for batch declarative m2m transformations (`mapping` semantics):
  * n-m m2m rules;
  * local-search pattern matching with facilities for encoding search plans;
  * filters and actions written using Xtend expressions;
  * operations `fetch` and `allInstances`;
  * matched/lazy/unique lazy rules.
* Rules with multiple inheritance.
* Experimental support for `rewriting` semantics.

***
&copy; [Artur Boronat](arturboronat.info), 2018