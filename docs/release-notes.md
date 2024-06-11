# Release notes

#### 1.0.0

* Version tried and tested since 2018 with reliable support for model-to-model transformations and a Groovy DSL.
* Support for multimodel transformations:
  * Several in/out models can be declared with a unique domainName.
  * allInstances(domainName, type): the domainName needs to be specified when the transformation is multimodel.

#### 0.4.37

FIX: registration of metamodels, removing caching so that they can be updated.

#### 0.4.35, 0.4.36

Support for loading Ecore metamodels with subpackages.

#### 0.4.34

Unified interface for handling flexible models:
* loading models using `loadInputModels` 
* saving models using `saveOutputModels`
* serializing models using `toText`

Added support for YAML.

#### 0.4.33

Improvement in accessors for semi-structured models (JSON, CSV) in the Groovy dialect. The internal structure of the metamodel is hidden and these can be accessed using `.` notation as in mainstream programming languages.

#### 0.4.32

Added programmable evaluation strategies for rules with four new operators: 

* `applyOne()`: applies one rule to the source model, if a match exists. Returns the match or null.
* `applyOne(ruleName)`: applies the rule once, if a match exists. Returns the match or null.
* `applyAll()`: all at once semantics. Find all matches for rules in the ruleStore to the source model. Then applies them. Dependencies between rules are not considered.
* `applyAll(ruleName)`: all at once for a given rule. Find all matches of a given rule and, then apply them in bulk. Dependencies between different rule applications are not considered.

When the module specifies an in-place transformation, `applyOne` and `applyAll` delete the matchPool at the end of the execution.

The method `YAMTLModule::execute(Runnable)` now takes a control flow specification as a `Runnable` that can indicate the order in which rules must be applied using the operators above and control flow logic in the host GPL of choice.

#### 0.4.31

Metamodels/models can be loaded from URL via EMF, just by using a URL to the model instead of a file path.

#### 0.4.27

When an object is modified, the following transformation steps need to be re-evaluated:
1. Transformation steps whose input match involves the object.
2. Transformation steps whose input match involves the object container.

The second case is necessary in case the model update invalidates the match in transformation steps of type 1.

#### 0.4.26

When re-executing trafo steps, those marked as dirty are not re-executed but they are not deleted.

#### 0.4.25

To enable rules that yield destructive actions in the output model, for example:
* undoing a transformation step if the rule match is invalidated (matching semantics);
* in-place rule with node destruction (in-place semantics).

In those cases, models should be saved to a file using the method `YAMTLModule::saveOutputModels(pathList, rootClassNameList)`. 
Only those root objects (detached) that are instance of root classes (whose names are in `rootClassNameList`) will be added to the resource. 
If the list is empty, all objects will be returned.

The method `YAMTLModule::saveOutputModels(pathList)` calls `YAMTLModule::saveOutputModels(pathList, #[])`.

#### 0.4.24

FIX: In incremental execution of model transformation, a source model update may deactivate current tranformation steps and enable the application of one other rule/match.

#### 0.4.23

Graphical representation of metamodels and models using PlantUML in the class `prettyprinting.EMFPrettyPrinter`.

#### 0.4.22

FIX null exception when importing EMF model into untyped model, when applied to UML models.

#### 0.4.21

FIX allInstances due to a bug inserted with SpringAOP proxies

#### 0.4.20

FIX analysis of on-the-fly changes: moving objects was not handled correctly.

#### 0.4.19

FIX `allInstances()`: it needs to return proxies to objects when using SpringAOP.

#### 0.4.18

Support for in-place transformations:
* FIX initialization of in-place transformations. Rename `isSpec` to `isInplace`.
* Rule variables (`using`) can be initialized before `globalFilter`.
* FIX save inOut model

#### 0.4.17

Renamed `.cap()` to `.toManyCap()` in `toMany()` rules.


#### 0.4.16

FIX error message when matches are not unique for matched rules. This was only checked in incremental mode.

#### 0.4.15

A resource factory can now be registered to the YAMTLModule registry allowing loading models using specific parsers. This allows YAMTL to load models from files with a given extension, which have a dedicated parser.

UML2 dependencies have been removed. To work with UML2, its resource factory implementation needs to be registered before loading models:

```
def xform = new ClassExtendingYAMTLModule()
xform.registerResourceFactory("uml", new UMLResourceFactoryImpl())
xform.loadInputModels(["in":"./path/to/model.uml"])
```

#### 0.4.14

* Renamed the static method `YAMTLModule::loadMetamodel(fileName)` to `YAMTLModule:preloadMetamodel(fileName)` and this now returns a resource instead of a package.
* Simplified `YAMTLModule::loadMetamodel(fileName, standalone)`, which enabled the registration of metamodels in the global EMF registry, in favour of `YAMTLModule:loadMetamodel(fileName)`, which only registers the metamodel in the EMF registry associated with the specific transformation module instance.
* Added the YAMTLModule::loadMetamodelResource(Resource) method, which allows for loading a metamodel via its resource. This capability facilitates:
  * Static Preloading: You can preload a metamodel and later load that same metamodel for a specific YAMTLModule instance. This aids in loading models consistently.
  * Dynamic EMF Model Transformations: One application of this configuration arises when there's a need to preload metamodels for transformations dealing with EMF models dynamically (leveraging the EMF reflective API). This results in the generation of output models based on the preloaded output metamodel.
  * Testing: Subsequently, for testing purposes, there might be a need to load the expected output models. It's essential these models use the exact same output metamodel for consistency.

#### 0.4.13

Support for UML2 models in the YAMTL registry. UML2 models can now be loaded without having to register the metamodel.

#### 0.4.12

FIX in YAMTLGroovyExtensions: a getter method was not invoked correctly.

#### 0.4.10, 0.4.11

Reorganised methods in 

* `YAMTLGroovyExtensions`: support for calling helpers and lazy rules. This needs to be executed after the module has been loaded.
* `YAMTLGroovyExtensions_dynamicEMF`: support for parsing the transformation while loading the YAMTL module. It contains support for fetch, and for accessors/mutators since EMF code is not available.

#### 0.4.9

FIX how Groovy calls contextual operations. It was confusing contextual operations with lazy rules.

#### 0.4.8

* FIX: endWith can be used after an out element.
* FIX: removing `with` dependencies in change in 0.3.5 affects model sensitivity. The pattern matcher may reorder the matching of input elements in a way that creates conflicts when evaluating filter expressions. A new flag `YAMTLModule::setEnabledMatchingInputElementOrderBySize` has been added to enable this implicit order that makes pattern matching aware of the model contents. By default, it is disabled. It can be enabled when it does not affect the evaluation of filters. See documentation for further information.

#### 0.4.7

The YAMTL jar includes the dependencies: untyped-model, and classes used for EMFatic parsing. This allows client apps to use these classes within YAMTL without having to import the dependencies explicitly.

#### 0.4.6

Metamodels can be given in EMFatic notation.

#### 0.4.5

Groovy extension for executing static operations.

FIX call to lazy rules in ELEMENT semantics.

#### 0.4.4

Added typing information when mapping EMF models to untyped models.

#### 0.4.3

YAMTLGroovyExtensions_dynamicEMF now supports expressions of the type `pk.Classifier`.

#### 0.4.2

Added EMFComparator for testing.

#### 0.4.1

Remove YAMTLException.

Issues with incremental AADL refinement.

#### 0.3.9-0.4.0

* Added: getInDomains(), getOutDomains(), getInOutDomains() to know the signature of the transformations programmatically.
* GroovyExtensions are now shipped with YAMTL.

#### 0.3.8

Support for dynamic EMF in Groovy:

* Groovy extensions add syntactic sugar for getter/setter. When working with collections, use .add()/.addAll() instead of +=
* Constructor receives metamodels as parameters
* The static method YAMTLModule::loadMetamodel(filePath) returns an EPackage if the file is .ecore

#### 0.3.7

Support for Spring AOP JDK proxies:

* This allows us to execute tests without having to configure AspectJ. The proxy based mechanism slows down the runtime performance.
* We can still configure AspectJ via Spring AOP. That is, we can use AspectJ weaving through Spring AOP but we don't need to configure the AspectJ gradle tasks, which simplifies.

JDK proxies are required to work with EMF generated code.

Limitations: only getters that start with **get** are intercepted. Boolean attribute getters that start with is are not.

#### 0.3.6

Improved rule inheritance.

When using rule inheritance, children rules need not have the same input element patterns as their parent rules. Input element calls in partial matches are extended, overriden or completed by the YAMTL matcher. This allows the rules to be specified in a much more concise way:

* Parent rules do not need to anticipate the input element patterns that will be used in the children rules.
* Children rules do not need to declare parent input element patterns if they don't use them.

The following static checks guarantee that abstract rules are specialized by concrete rules.

* Abstract rules must be specialized by other rules.
* Concrete rules cannot be specialized by abstract rules but can have other specialised concrete rules.

In addition, we have the following constraints:

* The order of input elements in a rule must be preserved throughout the hierarchy. **PENDING**

Diamond problem is avoided as follows:

* Input element pattern: an in element cannot be inherited from different parent rules. The matches now uses depth-first search of the match.
* Output element pattern: the out element can be inherited from two separate rules and a top-down left-most evaluation strategy is used to apply the actions of the out elements along the rule hierarchy.

#### 0.3.5

* Explicit `with` dependencies between `in` elements in the input pattern to guide the matching is not needed anymore. By default, YAMTL takes into account the order in which `in` elements appear in each rule. 
* With inheritance:
  * Parent rules can have `in` domains that need not be specified in a child rule. In this case, the domain is inherited in the child rule. In addition, a child rule may override the domain, in which case the filters of the domain in the parent classes is ignored.
  * Child rules can have `in` domains that need not be specified in a parent rule. In this case, the pattern is extended and internally YAMTL lifts the domain (without filters) to the parent rules so that the match of parent rules is complete, w.r.t. the most concrete rules.

#### 0.3.4

Rules with priorities:
* **PROBLEM**: priorities were taken into account during matching but not for executing each transformation step
* **SOLUTION**: priorities are also taken into account for the execution phase. The logic has updated in propagation mode as well so that priorities are considering when executing transformation rules in incremental mode. More testing is desirable.

#### 0.3.3

* Polyglot YAMTL via functional interfaces: Xtend, Groovy, Java, Kotlin
  * UntypedModel support for Groovy dialect of YAMTL, using Groovy as host language
  * UntypedModel support for Xtend, via a YAMTLModule extension
 

#### 0.3.2

*  Lazy transformation rules can be executed with a list of arguments. This feature enables the caller rule to pass context to the lazy transformation step. Arguments are available within the execution context and can be retrieved with `fetch`.

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
	DocBook.section -> #{ "paras" -> #{
		"Swapping paragraph" -> (YAMTLChangeType.MOVE -> TRIVIAL_CHECK),
		"Deleting paragraph" -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK) }
	},
	DocBook.article -> #{
		"sections_1" -> #{
			"Deleting sections" -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK)
		} 
	},
	DocBook.sect1 -> #{ "sections_2" -> #{
		"Deleting sections" -> (YAMTLChangeType.REMOVE -> TRIVIAL_CHECK) },
		"paras" -> #{
			"Adding an existing paragraph to Sect1" -> (YAMTLChangeType.ADD -> [ EObject eObj, Object value |
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
  * An example of such a metamodel is [OSATE AADL](https://osate.org/), where one can find many-bounded features with name `componentInstance` whereas the corresponding getter is `getComponentInstances()`. Feature requested for AADL2AADL trafo provided by Hana Mkaouar, Télécom Paris.

#### 0.0.8-SNAPSHOT

* FIX: Derived features were unset when re-executing transformation steps in propagation mode. This is no longer the case.
  * Found thanks to update case in AADL2AADL trafo provided by Hana Mkaouar, Télécom Paris.

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

