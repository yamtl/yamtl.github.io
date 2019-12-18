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
		compile "yamtl:yamtl:0.0.6-SNAPSHOT"
	}

### Examples

Several examples are available in [this repository](https://github.com/yamtl/examples).

### Release notes

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