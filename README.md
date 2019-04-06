## YAMTL 

**YAMTL** is an EMF-based model-to-model transformation engine whose transformations are defined with an internal DSL of [Xtend](http://www.eclipse.org/xtend/) (*Yet Another Model Transformation Language*).

### Getting started

YAMTL uses Gradle as build automation tool and can be executed from Java 11.


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
		compile "yamtl:yamtl:0.0.3-SNAPSHOT"
	}

### Examples

Several examples are available in [this repository](https://github.com/yamtl/examples).

### Release notes

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