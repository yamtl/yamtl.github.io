## YAMTL 

**YAMTL** is an EMF-based model-to-model transformation engine whose transformations are defined with an internal DSL of [Xtend](http://www.eclipse.org/xtend/) (*Yet Another Model Transformation Language*).

### Getting started

YAMTL uses Gradle as build automation tool and relies on:
* EMF 2.12
* Xtend 2.13.0

This means that YAMTL works on **Java 8** only at the moment.

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
		compile "yamtl:yamtl:0.0.2-SNAPSHOT"
	}

### Examples

Several examples are available in [this repository](https://github.com/yamtl/examples).

### Release notes

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