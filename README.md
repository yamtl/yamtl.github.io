## YAMTL 

**YAMTL** (*Yet Another Model Transformation Language*) is a model-to-model transformation engine whose transformations are defined with an internal DSL of Xtend (also called YAMTL).

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
		compile "yamtl:yamtl:0.0.1-SNAPSHOT"
	}

### Example

A fully working example is available in [this project](https://github.com/yamtl/examples/tree/master/yamtl.examples.mapping.batch.cps2dep).

### Release notes

#### 0.0.1-SNAPSHOT

* Support for batch declarative m2m transformations (`mapping` semantics)
  * n-m m2m rules
  * pattern matching with local search with facilities for encoding search plans
  * filters and actions written using Xtend expressions
  * `fetch` operator and `allInstances`
* Rules with multiple inheritance
* Experimental support for `rewriting` semantics

***
&copy; Artur Boronat, 2018